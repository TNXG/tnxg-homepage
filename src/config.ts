import dotenv from "dotenv";

dotenv.config();

export const SiteConfig = {
	title: "site.title",
	master: "site.master",
	description: "site.description",
	SiteURL: "https://tnxg.top",
	masterEmail: "tnxg@outlook.jp",
	Avatar: "https://api-space.tnxg.top/avatar?s=qq",
	followListURL: "https://app.follow.is/share/lists/104218695533715456",
	opmlURL: "/tnxg.opml",
	Features: {
		StatusDot: true,
		StatusAPI: true,
	},
	keywords: ["天翔TNXG", "TNXG", "个人主页", "天翔TNXGの自留地", "homepage", "nextjs"],
	Author: {
		Name: "site.author.name",
		Email: "tnxg@outlook.jp",
	},
	SocialMedia: {
		Twitter: "https://twitter.com/iykrzu",
		GitHub: "https://github.com/tnxg",
	},
	favicon: {
		default: "/favicon.ico",
		dark: "/favicon.ico",
		apple: "/favicon.ico",
	},
	HomeConfig: {
		greeting: "site.home.greeting",
		namePrefix: "site.home.namePrefix",
		nameJP: "site.home.nameJP",
		nameEN: "site.home.nameEN",
		motto: "site.home.motto",
		socialLinks: [
			{
				name: "site.home.socialLinks.blog",
				icon: "mingcute:book-line",
				href: "https://tnxgmoe.com",
			},
			{
				name: "site.home.socialLinks.github",
				icon: "mingcute:github-line",
				href: "https://github.com/TNXG",
			},
			{
				name: "site.home.socialLinks.bilibili",
				icon: "mingcute:bilibili-line",
				href: "https://space.bilibili.com/175424674",
			},
			{
				name: "site.home.socialLinks.neteasemusic",
				icon: "mingcute:netease-music-line",
				href: "https://music.163.com/#/user/home?id=515522946",
			},
		],
	},
	BackgroundConfig: {
		images: [
			"https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
			"https://cdn.tnxg.top/images/cover/tomori_nst.png",
			"https://cdn.tnxg.top/images/cover/MyGo!!!!!_Kaisou_Soyo.nst.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res036012_rip/trim_normal.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res036010_rip/trim_normal.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res036010_rip/trim_after_training.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res038009_rip/trim_after_training.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res038008_rip/trim_after_training.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res037011_rip/trim_after_training.png",
			"https://bestdori.com/assets/cn/characters/resourceset/res037008_rip/trim_after_training.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res039011_rip/trim_after_training.png",
			"https://bestdori.com/assets/jp/characters/resourceset/res040011_rip/trim_after_training.png",
			"https://bestdori.com/assets/cn/characters/resourceset/res040005_rip/trim_after_training.png",

		],
		opacity: 0.5,
	},
	Shiki: {
		langs: ["bat", "c", "cpp", "css", "diff", "html", "ini", "java", "js", "json", "log", "makefile", "matlab", "md", "mdc", "powershell", "python", "sh", "sql", "ssh-config", "toml", "ts", "tsx", "vb", "vue", "xml", "yaml"],
	},
};

export const SidebarConfig = {
	sections: [
		{ name: "sidebar.sections.home", icon: "mingcute:home-6-line", href: "/" },
		{ name: "sidebar.sections.recently", icon: "mingcute:bubble-line", href: "/recently" },
		{ name: "sidebar.sections.friends", icon: "mingcute:link-fill", href: "/friends" },
		{ name: "sidebar.sections.anime", icon: "mingcute:tv-2-line", href: "/anime" },
	],
	copyright: {
		StartDate: 2019,
		text: "sidebar.copyright.text",
		license: {
			name: "CC BY-NC-SA 4.0",
			url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
		},
	},
	externalLinks: [
		{ name: "sidebar.externalLinks.qq", icon: "mingcute:qq-line", href: "https://jq.qq.com/?_wv=1027&k=hc3OKNED" },
		{ name: "sidebar.externalLinks.blog", icon: "mingcute:book-6-line", href: "https://tnxgmoe.com" },
		{ name: "sidebar.externalLinks.github", icon: "mingcute:github-line", href: "https://github.com/TNXG" },
		{ name: "site.home.socialLinks.bilibili", icon: "mingcute:bilibili-line", href: "https://space.bilibili.com/175424674" },

	],
};

export const FriendsConfig = {
	title: "friends.title",
	description: {
		text: "friends.description.text",
		link: {
			text: "friends.description.link.text",
			url: "https://tnxgmoe.com/friends",
		},
		suffix: "friends.description.suffix",
	},
};

export const RecentlyConfig = {
	title: "recently.title",
	description: "recently.description",
};

export const APIConfig = {
	misskey: {
		user: "a3yf78qadjmq0009",
		// eslint-disable-next-line node/prefer-global/process
		token: process.env.MISSKEY_TOKEN,
	},
	bangumi: {
		username: "tnxg",
	},
	baseURL: "https://mx.tnxg.top/api/v2",
	endpoints: {
		// 自制的后端api，详见https://github.com/TNXG/space-api/
		friends: "https://api-space.tnxg.top/links",
		space: "https://api-space.tnxg.top",
		space_status: "https://api-space.tnxg.top/status", // 实际获取无参和带s=n的状态
		// misskeyapi接口
		misskey: "https://afhub.top",
		// 实际上以下的api都是Mix-Space提供的，这里提供一个方便更换的接口
		recently: "https://mx.tnxg.top/api/v2/recently/all",
		status: "https://api-space.tnxg.top/status/getReportMsg",
	},
};
