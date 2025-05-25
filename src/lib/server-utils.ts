"use server";

import type { ActionResponse } from "@/hooks/form-schema";
import type { Locale } from "@/locales";
import fs from "node:fs/promises";
import process from "node:process";
import { cookies } from "next/headers";
import { APIConfig } from "@/config";
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

		console.info("API response:", data);

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

export const verifyEmail = async (
	email: string,
): Promise<{
	success: boolean;
	message: string;
}> => {
	try {
		const response = await fetch(`${APIConfig.endpoints.space}/links/verify`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});

		const data = await response.json();

		if (data.status === "success") {
			return {
				success: true,
				message: "Verification code sent successfully",
			};
		} else {
			return {
				success: false,
				message: data.message || "Failed to send verification code",
			};
		}
	} catch (error) {
		console.error("Error in verifyEmail:", error);
		return {
			success: false,
			message: "An error occurred while sending verification code",
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
