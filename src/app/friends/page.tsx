import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import FriendsLayout from "@/components/layouts/friends";
import { APIConfig } from "@/config";
import "server-only";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: t("sidebar.sections.friends"),
	};
}

// 获取朋友数据
const getFriends = cache(async (): Promise<Friend[]> => {
	try {
		const res = await fetch(APIConfig.endpoints.friends, {
			next: { revalidate: 2 * 60 * 60 },
		});

		if (!res.ok) {
			throw new Error(`Failed to fetch friends data: ${res.status}`);
		}

		const data = await res.json();
		if (!data || !data.data) {
			throw new Error("Invalid response format");
		}

		const friendsData: Friend[] = data.data;
		const filteredFriends = friendsData.filter(friend => friend.state === 0);
		return filteredFriends;
	} catch (error) {
		console.warn("Error fetching friends data:", error);
		const locale = await getLocale();
		const t = await getTranslations({ locale });
		console.warn(t("common.errors.content_load_failed"));
		return [];
	}
});

// 异步获取并渲染好友列表
export default async function Page() {
	const friends = await getFriends();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<FriendsLayout friends={friends} />
		</div>
	);
};
