import { NextResponse } from "next/server";

export const GET = async () => {
	const data = await fetch("https://mx.tnxg.top/api/v2/fn/ps/update", {
		method: "POST",
	});
	return NextResponse.json(await data.json());
};
