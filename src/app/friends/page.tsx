import type { LinkModel } from "@mx-space/api-client";
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
		const data: LinkModel[] = (await res.json()).data;
		return data;
	});

	const friendsData: Friend[] = (await response()).map(friend => ({
		id: friend.id,
		name: friend.name,
		url: friend.url,
		avatar: friend.avatar,
		description: friend.description || "",
		hide: friend.hide,
		state: friend.state,
	}));

	return friendsData;
};

// 异步获取并渲染好友列表
export default async function Page() {
	const friends = await getFriends();
	return (<div className="ml-0 xl:ml-96"><FriendsLayout friends={friends} /></div>);
};
