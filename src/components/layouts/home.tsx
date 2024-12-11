import { Button } from "@/components/ui/button";
import { SiteConfig } from "@/config";
import { Icon } from "@iconify/react";

import React from "react";

export const HomeLayout: React.FC = () => {
	return (
		<div className="w-full flex flex-col items-start mb-6 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col md:flex-row items-start justify-center mx-auto px-4 py-8 pt-16 font-[moonbridge]">
				<div className="avatar">
					<div className="mask mask-squircle w-24 -z-1">
						<img src={SiteConfig.Avatar} className="w-24 h-24 object-cover" alt="avatar" />
					</div>
				</div>
				<div className="ml-0 md:ml-4 mt-4 md:mt-0">
					<h1 className="text-6xl font-bold">Hello</h1>
					<div className="flex items-center space-x-2">
						<h2 className="text-5xl font-bold mt-4">I'm</h2>
						<h2 className="text-5xl font-bold text-[#007acc] mt-4">
							<sup className="text-xs">いゆくるず iykrzu</sup>
							<br />
							天翔TNXG
						</h2>
						<span className="text-2xl font-medium break-words">TiaNXianG</span>
					</div>
					<br />
					<p className="text-xl mt-2">明日尚未到来，希望凝于心上</p>
					<div className="flex flex-wrap items-center gap-4 mt-4 mb-4 font-sans">
						<Button
							asChild
							className="gap-2"
						>
							<a href="https://tnxgmoe.com" target="_blank" rel="noopener noreferrer">
								<Icon icon="mingcute:book-line" width="24" height="24" />
								<span>Blog</span>
							</a>
						</Button>
						<Button
							asChild
							className="gap-2"
						>
							<a href="https://github.com/TNXG" target="_blank" rel="noopener noreferrer">
								<Icon icon="mingcute:github-line" width="24" height="24" />
								<span>Github</span>
							</a>
						</Button>
						<Button
							asChild
							className="gap-2"
						>
							<a href="https://twitter.com/iykrzu" target="_blank" rel="noopener noreferrer">
								<Icon icon="mingcute:twitter-line" width="24" height="24" />
								<span>Twitter</span>
							</a>
						</Button>
						<Button
							asChild
							className="gap-2"
						>
							<a href="https://telegram.me/iykrzu" target="_blank" rel="noopener noreferrer">
								<Icon icon="mingcute:telegram-line" width="24" height="24" />
								<span>Telegram</span>
							</a>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeLayout;
