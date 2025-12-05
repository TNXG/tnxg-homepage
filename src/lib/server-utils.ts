"use server";

import type { ActionResponse } from "@/hooks/form-schema";
import type { Locale } from "@/locales";
import fs from "node:fs/promises";
import process from "node:process";
import { cookies } from "next/headers";
import { APIConfig } from "@/config";
import { signToken } from "@/lib/jwt";
import { defaultLocale } from "@/locales";

import "server-only";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
	const cookieLocale = (await cookies()).get(COOKIE_NAME)?.value;
	// 如果cookie中的locale是旧格式（如zh、ja、en），则映射到新格式
	if (cookieLocale) {
		// 从locales模块导入的localeMapping
		const { localeMapping } = await import("@/locales");
		return localeMapping[cookieLocale] || cookieLocale;
	}
	return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
	(await cookies()).set(COOKIE_NAME, locale);
}

export const serverAction = async (prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> => {
	const entries = formData.entries();
	const rawData = Object.fromEntries(entries) as Record<string, any>;

	for (const key in rawData) {
		if (rawData[key] === "on") {
			rawData[key] = true;
		} else if (rawData[key] === "off") {
			rawData[key] = false;
		}
	}

	try {
		if (rawData.techstack) {
			try {
				rawData.techstack = JSON.parse(rawData.techstack);
			} catch {
				rawData.techstack = rawData.techstack
					.split(",")
					.map((item: string) => item.trim())
					.filter(Boolean);
			}
		}

		const response = await fetch(`${APIConfig.endpoints.space}/links/submit`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(rawData),
		});

		const data = await response.json();

		if (data.status === "success") {
			return {
				success: true,
				message: "Data saved successfully",
				inputs: rawData,
			};
		} else {
			return {
				success: false,
				message: data.message || "Failed to submit data",
				inputs: rawData,
			};
		}
	} catch (error) {
		console.error("Error in serverAction:", error);
		return {
			success: false,
			message: "An error occurred while processing your request",
			inputs: rawData,
		};
	}
};

export const sendVerificationCode = async (
	email: string,
	method: "links" | "login",
): Promise<{
	success: boolean;
	message: string;
}> => {
	try {
		const response = await fetch(`${APIConfig.endpoints.space}/email/send`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, method }),
		});

		const data = await response.json();

		if (data.status === "success") {
			return {
				success: true,
				message: "api.email.send.success",
			};
		} else {
			console.error("Error in sendVerificationCode:", data);
			return {
				success: false,
				message: data.message || "api.email.send.error",
			};
		}
	} catch (error) {
		console.error("Error in verifyEmail:", error);
		return {
			success: false,
			message: "api.email.send.service_error",
		};
	}
};

export const verifyEmailSign = async (
	email: string,
	code: string,
): Promise<{
	success: boolean;
	message: string;
}> => {
	try {
		const response = await fetch(`${APIConfig.endpoints.space}/email/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, code }),
		});

		const data = await response.json();

		const token = await signToken({ email });

		if (data.status === "success") {
			const cookieStore = await cookies();
			cookieStore.set("auth-token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: 24 * 60 * 60 * 7,
			});
			return {
				success: true,
				message: "api.email.verify.success",
			};
		} else {
			return {
				success: false,
				message: "api.email.verify.error",
			};
		}
	} catch (error: any) {
		console.error("[verifyEmailSign] Error:", error);
		return {
			success: false,
			message: error?.message || "api.email.verify.service_error",
		};
	}
};

export const getContentFile = async (filename: string): Promise<string> => {
	try {
		const filePath = `${process.cwd()}/src/content/${filename}`;
		const content = await fs.readFile(filePath, "utf-8");
		if (!content || content.trim() === "") {
			console.warn(`文件 ${filename} 内容为空`);
		}
		return content;
	} catch (error) {
		console.error(`Error reading file ${filename}:`, error);
		return "";
	}
};
