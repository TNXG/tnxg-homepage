import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const token = request.cookies.get("auth-token")?.value;

	let response: NextResponse;

	// 只对特定路径执行认证逻辑
	const isDashboardPath = pathname.startsWith("/dashboard");
	const isLoginPath = pathname === "/signin";

	if (isDashboardPath) {
		// Dashboard 路径需要认证
		if (!token) {
			return NextResponse.redirect(new URL("/signin", request.url));
		}

		try {
			const payload = await verifyToken(token);
			if (!payload) {
				const redirectResponse = NextResponse.redirect(new URL("/signin", request.url));
				redirectResponse.cookies.delete("auth-token");
				return redirectResponse;
			}

			// 认证成功
			response = NextResponse.next();
		} catch {
			const redirectResponse = NextResponse.redirect(new URL("/signin", request.url));
			redirectResponse.cookies.delete("auth-token");
			return redirectResponse;
		}
	} else if (isLoginPath && token) {
		// 已登录用户访问登录页，重定向到 dashboard
		try {
			const payload = await verifyToken(token);
			if (payload) {
				return NextResponse.redirect(new URL("/dashboard", request.url));
			}
		} catch {
			// token 无效，清除它但允许访问登录页
			response = NextResponse.next();
			response.cookies.delete("auth-token");
		}
	}

	response = NextResponse.next();

	response.headers.set("x-pathname", pathname);
	response.headers.set("x-invoke-path", pathname);

	return response;
}

export const config = {
	matcher: [
		/*
		 * 匹配所有路径除了以下开头的:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - 静态资源文件
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
