import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

export default antfu({
	react: true,
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
		"react-hooks/exhaustive-deps": "off",
	},
}, [
	...tailwind.configs["flat/recommended"],
	{
		settings: {
			tailwindcss: {
				rules: {
					"tailwindcss/no-custom-classname": "off",
				},
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
