import type { LinkModel } from "@mx-space/api-client";
import FriendsLayout from "@/components/layouts/friends";
import { cache } from "react";
import "server-only";
import { APIConfig } from "@/config";

export const metadata = {
	title: "友情链接",
};

// 获取朋友数据
const getFriends = async (): Promise<Friend[]> => {
	const response = cache(async () => {
		const res = await fetch(`${APIConfig.baseURL}${APIConfig.endpoints.friends}`);
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
export const Friends = async () => {
	const friends = await getFriends();
	return (<div className="ml-0 xl:ml-96"><FriendsLayout friends={friends} /></div>);
};

export default Friends;
