import * as z from "zod";

export interface ActionResponse<T = any> {
	success: boolean;
	message: string;
	errors?: {
		[K in keyof T]?: string[]
	};
	inputs?: T;
}

export const formSchema = z.object({});
