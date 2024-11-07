import React from "react";
import { Icon } from "@iconify/react";

import { SiteConfig } from "@/config";

const Home = () => {
	return (
		<div className="flex flex-col md:flex-row items-start justify-center mx-auto px-4 py-8 pt-16">
			<div className="avatar">
				<div className="mask mask-squircle w-24 -z-10">
					<img
						src={SiteConfig.Avatar}
						className="w-24 h-24 object-cover"
						alt="avatar"
					/>
				</div>
			</div>
			<div className="ml-0 md:ml-4 mt-4 md:mt-0">
				<h1 className="text-6xl font-bold">Hello</h1>
				<div className="flex items-center space-x-2">
					<h2 className="text-5xl font-bold mt-4">I'm</h2>
					<h2 className="text-5xl font-bold text-[#007acc] mt-4">
						<sup className="text-xs -z-10">いゆくるず iykrzu</sup>
						<br />
						天翔TNXG
					</h2>
					<span className="text-2xl font-medium break-words">TiaNXianG</span>
				</div>
				<br />
				<p className="text-xl mt-2">明日尚未到来，希望凝于心上</p>
				<div className="flex flex-wrap items-center gap-12 mt-4 mb-4">
					<div className="text-gray-600">
						<a
							href="https://tnxgmoe.com"
							target="_blank"
							rel="noopener noreferrer"
							className="btn mt-4 mb-2"
						>
							<Icon icon="mingcute:book-line" width="24" height="24" /> Blog
						</a>
						&nbsp;
						<a
							href="https://github.com/TNXG"
							target="_blank"
							rel="noopener noreferrer"
							className="btn mt-4 mb-2"
						>
							<Icon icon="mingcute:github-line" width="24" height="24" /> Github
						</a>
						&nbsp;
						<a
							href="https://twitter.com/TNXG"
							target="_blank"
							rel="noopener noreferrer"
							className="btn mt-4 mb-2"
						>
							<Icon icon="mingcute:twitter-line" width="24" height="24" />{" "}
							Twitter
						</a>
						&nbsp;
						<a
							href="https://telegram.me/TNXG"
							target="_blank"
							rel="noopener noreferrer"
							className="btn mt-4 mb-2"
						>
							<Icon icon="mingcute:telegram-line" width="24" height="24" />{" "}
							Telegram
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
