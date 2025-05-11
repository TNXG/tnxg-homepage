// unocss.config.ts
import { presetWind4 } from "@unocss/preset-wind4";
import { defineConfig } from "unocss";

export default defineConfig({
	presets: [
		presetWind4({
			dark: "media",
		}),
	],
	content: {
		pipeline: {
			include: [
				/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
				"(components|src)/**/*.{js,ts}",
			],
		},
	},
});
