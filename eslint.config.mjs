import antfu from "@antfu/eslint-config";
import eslintPluginNext from "@next/eslint-plugin-next";
import tailwind from "eslint-plugin-tailwindcss";

export default antfu({
	react: true,
	plugins: {
		"@next/next": eslintPluginNext,
	},
	formatters: {
		css: true,
		html: true,
		prettierOptions: {
			plugins: ["prettier-plugin-tailwindcss"],
		},
	},
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: true,
	},
	rules: {
		// 忽略 antfu/top-level-function 规则
		"antfu/top-level-function": "off",
	},
}, [
	...tailwind.configs["flat/recommended"],
	{
		settings: {
			tailwindcss: {
				callees: ["classnames", "clsx", "ctl"],
				config: "tailwind.config.js",
				cssFiles: [
					"**/*.css",
					"!**/node_modules",
					"!**/.*",
					"!**/dist",
					"!**/build",
				],
				cssFilesRefreshRate: 5_000,
				removeDuplicates: true,
				skipClassAttribute: false,
				whitelist: [],
				tags: [],
				classRegex: "^class(Name)?$",
			},
		},
	},
]);
