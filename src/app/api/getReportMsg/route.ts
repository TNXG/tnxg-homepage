import { APIConfig } from "@/config";

export const GET = async () => {
	const encoder = new TextEncoder();
	let isConnectionActive = true;

	const stream = new ReadableStream({
		async start(controller) {
			const fetchAndSendData = async () => {
				if (!isConnectionActive)
					return;

				try {
					// 获取主状态数据
					const response = await fetch(APIConfig.endpoints.status, {
						method: "POST",
					});
					const returndata = await response.json();

					// 如果没有 mediaInfo，尝试从 space_status 获取
					if (!returndata.mediaInfo) {
						const fallbackResponse = await fetch(`${APIConfig.endpoints.space_status}/?s=n`);
						const fallbackData = await fallbackResponse.json();

						if (fallbackData.data?.user?.active === true) {
							returndata.mediaInfo = {
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
							};
						}
					}

					if (isConnectionActive) {
						controller.enqueue(encoder.encode(`data: ${JSON.stringify(returndata)}\n\n`));
					}
				}
				catch (error) {
					console.error("Fetch error:", error);
					if (isConnectionActive) {
						controller.enqueue(
							encoder.encode(`data: ${JSON.stringify({ error: "Failed to fetch data" })}\n\n`),
						);
					}
				}
			};

			// 立即执行一次
			await fetchAndSendData();

			// 每 5 秒执行一次
			const interval = setInterval(fetchAndSendData, 5000);

			// 清理函数
			return () => {
				isConnectionActive = false;
				clearInterval(interval);
				controller.close(); // Ensure the controller is closed
			};
		},
		cancel() {
			isConnectionActive = false;
		},
	});

	return new Response(stream, {
		headers: {
			"Content-Type": "text/event-stream",
			"Cache-Control": "no-cache",
			"Connection": "keep-alive",
		},
	});
};
