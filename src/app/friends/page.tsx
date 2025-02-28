import type { Metadata } from "next";
import FriendsLayout from "@/components/layouts/friends";
import { APIConfig } from "@/config";
import { getLocale, getTranslations } from "next-intl/server";
import { cache } from "react";
import "server-only";

export async function generateMetadata(): Promise<Metadata> {
	const locale = await getLocale();
	const t = await getTranslations({ locale });

	return {
		title: t("sidebar.sections.friends"),
	};
}

// 获取朋友数据
const getFriends = async (): Promise<Friend[]> => {
	const response = cache(async () => {
		const res = await fetch(APIConfig.endpoints.friends);
		const data: Friend[] = (await res.json()).data;
		return data;
	});

	const friendsData: Friend[] = await response();
	const filteredFriends = friendsData.filter(friend => friend.state === 0);
	return filteredFriends;
};

// 异步获取并渲染好友列表
export default async function Page() {
	const friends = await getFriends();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<FriendsLayout friends={friends} />
		</div>
	);
};
