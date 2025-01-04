import { APIConfig } from "@/config";
import { NextResponse } from "next/server";

export const GET = async () => {
	const data = await fetch(APIConfig.endpoints.status, {
		method: "POST",
	});
	return NextResponse.json(await data.json());
};
