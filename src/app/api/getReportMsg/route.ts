import { APIConfig } from "@/config";
import { NextResponse } from "next/server";

export const GET = async () => {
	// 发起第一个请求
	return fetch(APIConfig.endpoints.status, {
		method: "POST",
	}).then(response => response.json()).then((returndata) => {
		if (!returndata.mediaInfo) {
			return fetch(`${APIConfig.endpoints.space_status}/?s=n`)
				.then(fallbackResponse => fallbackResponse.json())
				.then((fallbackData) => {
					if (fallbackData.data?.user?.active === true) {
						const formattedData = {
							processName: returndata.processName,
							mediaInfo: {
								AlbumArtist: fallbackData.data.song.artists
									.map((artist: any) => artist.name)
									.join(" / "),
								AlbumTitle: fallbackData.data.song.album.name,
								SourceAppName: "Netease Music NowPlaying Function",
								artist: fallbackData.data.song.artists
									.map((artist: any) => artist.name)
									.join(" / "),
								title: fallbackData.data.song.name,
								AlbumThumbnail: fallbackData.data.song.album.image,
							},
						};
						return NextResponse.json(formattedData);
					}
					else {
						return NextResponse.json(returndata);
					}
				});
		}
		return NextResponse.json(returndata);
	}).catch((error) => {
		// 错误处理
		console.error("Fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data" },
			{ status: 500 },
		);
	});
};
