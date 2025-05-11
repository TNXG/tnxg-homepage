import HomeLayout from "@/components/layouts/home";

export default async function Page() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="pr-[15%]">
				<HomeLayout />
			</div>
		</div>
	);
}
