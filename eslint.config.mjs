import antfu from "@antfu/eslint-config";
import eslintPluginNext from "@next/eslint-plugin-next";

export default antfu({
	plugins: {
		"@next/next": eslintPluginNext,
	},
	formatters: true,
	stylistic: {
		indent: "tab",
		quotes: "double",
		semi: true,
	},
	rules: {
		// 忽略 antfu/top-level-function 规则
		"antfu/top-level-function": "off",
	},
	env: {
		browser: true,
		esnext: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@next/next/recommended",
	],
});
