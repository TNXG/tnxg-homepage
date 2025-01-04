import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
	"./src/locales/index.ts",
);

const nextConfig: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default withNextIntl(nextConfig);
