"use server";

import type { ActionResponse } from "@/hooks/form-schema";
import type { Locale } from "@/locales";
import { APIConfig } from "@/config";
import { defaultLocale } from "@/locales";
import { cookies } from "next/headers";

const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
	return (await cookies()).get(COOKIE_NAME)?.value || defaultLocale;
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
		}
	}

	try {
		if (rawData.techstack) {
			rawData.techstack = rawData.techstack
				.split(",")
				.map((item: string) => item.trim())
				.filter(Boolean);
			rawData.state = 1;
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
	} catch {
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
	} catch {
		return {
			success: false,
			message: "An error occurred while sending verification code",
		};
	}
};
