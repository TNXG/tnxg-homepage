import type { NextRequest } from "next/server";
import { APIConfig } from "@/config";
import { NextResponse } from "next/server";

export const revalidate = 86400;
export const GET = async (req: NextRequest) => {
	const query = req.nextUrl.searchParams;

	try {
		const songName = query.get("songName") || "";
		const artist = query.get("artist") || "";
		const searchkey = `${songName.replace("-天翔TNXG-歌曲-哔哩哔哩视频", "")} - ${artist}`;
		const searchResponse = await fetch(`${APIConfig.endpoints.ncm}/search?keywords=${searchkey}`);
		const searchData = await searchResponse.json();
		if (!searchData.result.songs || searchData.result.songs.length === 0) {
			return NextResponse.json({ error: "No songs found" });
		}
		const songId = searchData.result.songs[0].id;
		const detailResponse = await fetch(`${APIConfig.endpoints.ncm}/song/detail?ids=${songId}`);
		const detailData = await detailResponse.json();
		if (!detailData.songs || detailData.songs.length === 0) {
			throw new Error("No song details found");
		}
		const returndata = detailData.songs[0];
		const artistNames = returndata.ar.map((ar: any) => ar.name).join("/");
		const response: MediaInfoResponse = {
			name: returndata.name,
			artist: artistNames,
			album: returndata.al.name || null,
			image: returndata.al.picUrl || null,
			tns: returndata.tns ? returndata.tns[0] || null : null,
		};
		return NextResponse.json(response);
	}
	catch (error) {
		console.error("Error fetching media info:", error);
		return { error: "Failed to fetch media info" };
	}
};
