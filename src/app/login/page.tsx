import { getLocale, getTranslations } from "next-intl/server";
import { LoginLayout } from "@/components/layouts/login";

export async function generateMetadata() {
	const locale = await getLocale();
	const t = await getTranslations({ locale });
	return {
		title: t("login.name"),
	};
}

export default async function LoginPage() {
	const response = await fetch("https://api-space.tnxg.top/images/wallpaper/?type=json");
	if (!response.ok)
		throw new Error(`HTTP error status: ${response.status}`);
	const data = (await response.json()).data;

	return (
		<div className="min-h-screen relative overflow-hidden">
			<div className="p-4 flex min-h-screen items-center justify-center relative z-10">
				<LoginLayout
					blurhash={data.blurhash}
					backgroundImage={data.image}
				/>
			</div>
		</div>
	);
}
