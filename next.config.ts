import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
	"./src/locales/index.ts",
);

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		domains: ["api-space.tnxg.top", "cdn.tnxg.top"], // 添加你需要的域名
	},
};

export default withNextIntl(nextConfig);
