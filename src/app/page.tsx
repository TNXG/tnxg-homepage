import HomeLayout from "@/components/layouts/home";

export default async function Page() {
	return (
		<div className="flex min-h-screen flex-col">
			<div className="pr-[15%]">
				<HomeLayout />
			</div>
		</div>
	);
}
