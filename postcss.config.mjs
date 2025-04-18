const config = {
	plugins: {
		"@unocss/postcss": {
			content: ["./src/app/**/*.{html,ts,tsx}"],
		},
		"@tailwindcss/postcss": {},
	},
};

export default config;
