export const SiteConfig = {
	title: "site.title",
	master: "site.master",
	description: "site.description",
	SiteURL: "https://tnxg.top",
	Avatar: "https://api-space.tnxg.top/avatar?s=qq",
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
				url: "https://tnxgmoe.com",
			},
			{
				name: "site.home.socialLinks.github",
				icon: "mingcute:github-line",
				url: "https://github.com/TNXG",
			},
			{
				name: "site.home.socialLinks.twitter",
				icon: "mingcute:twitter-line",
				url: "https://twitter.com/iykrzu",
			},
			{
				name: "site.home.socialLinks.telegram",
				icon: "mingcute:telegram-line",
				url: "https://telegram.me/iykrzu",
			},
		],
	},
	BackgroundConfig: {
		images: [
			"https://cdn.tnxg.top/images/cover/119207866_p0_nst.png",
			"https://cdn.tnxg.top/images/cover/tomori_nst.png",
			"https://cdn.tnxg.top/images/cover/MyGo!!!!!_Kaisou_Soyo.nst.png",
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
	baseURL: "https://mx.tnxg.top/api/v2",
	endpoints: {
		ncm: "https://api-ncm.prts.top", // 某个还能用的网易云音乐API
		// 实际上以下的api都是Mix-Space提供的，这里提供一个方便更换的接口
		recently: "https://mx.tnxg.top/api/v2/recently/all",
		friends: "https://mx.tnxg.top/api/v2/links?page=1&size=50",
		status: "https://mx.tnxg.top/api/v2/fn/ps/update",
	},
};
