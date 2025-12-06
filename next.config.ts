import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/locales/index.ts");

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api-space.tnxg.top",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.tnxg.top",
				port: "",
				pathname: "/**",
			},
		],
	},
	outputFileTracingIncludes: {
		"/terms": ["./src/content/**"],
	},
};

export default withNextIntl(nextConfig);
