import { XMLBuilder } from "fast-xml-parser";
import { getTranslations } from "next-intl/server";
import { cache } from "react";
import { APIConfig, SiteConfig } from "@/config";

const getFriends = async (): Promise<Friend[]> => {
	const response = cache(async () => {
		const res = await fetch(APIConfig.endpoints.friends);
		const data: Friend[] = (await res.json()).data;
		return data;
	});

	const friendsData: Friend[] = await response();
	const filteredFriends = friendsData.filter(friend => friend.state === 0 && friend.rssurl !== null);
	return filteredFriends;
};

const xmlBuilderOptions = {
	attributeNamePrefix: "$",
	format: true,
	ignoreAttributes: false,
};

const builder = new XMLBuilder(xmlBuilderOptions);

export async function GET() {
	const t = await getTranslations();

	const friends = await getFriends();

	let earliestDate: Date | null = null;
	let latestDate: Date | null = null;

	for (const friend of friends) {
		const friendDate = new Date(friend.created);

		if (Number.isNaN(friendDate.getTime())) {
			console.error(`Invalid date value for friend ${friend.name}:`, friend.created);
			continue;
		}

		if (!earliestDate || friendDate < earliestDate) {
			earliestDate = friendDate;
		}

		if (!latestDate || friendDate > latestDate) {
			latestDate = friendDate;
		}
	}

	const opml = {
		$version: "2.0",
		head: {
			title: `${t(SiteConfig.master)}的友链订阅`,
			dateCreated: earliestDate?.toISOString() || "",
			dateModified: latestDate?.toISOString() || "",
			ownerName: t(SiteConfig.master),
			ownerEmail: SiteConfig.masterEmail,
			ownerId: SiteConfig.SiteURL,
			docs: "https://opml.org/spec2.opml",
		},
		body: {
			outline: friends.map((friend) => {
				const createdDate = new Date(friend.created);
				if (Number.isNaN(createdDate.getTime())) {
					console.error(`Invalid date value for friend ${friend.name}:`, friend.created);
					return null;
				}
				return {
					$title: friend.name,
					$created: createdDate.toISOString(),
					$description: friend.description,
					$text: friend.name,
					$type: "rss",
					$xmlUrl: friend.rssurl,
					$htmlUrl: friend.url,
				};
			}).filter(item => item !== null),
		},
	};

	const xmlContent = builder.build({
		"?xml": { $version: "1.0", $encoding: "UTF-8" },
		opml,
	});

	// 使用 Response 对象替代 setHeader
	return new Response(xmlContent, {
		status: 200,
		headers: {
			"Content-Type": "application/xml; charset=UTF-8",
		},
	});
}
