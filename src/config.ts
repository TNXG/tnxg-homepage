export const SiteConfig = {
	title: "天翔TNXGの自留地",
	master: "天翔TNXG",
	description: "明日尚未到来，希望凝于心上",
	SiteURL: "https://tnxg.top",
	Language: "zh-CN",
	Avatar: "https://api-space.tnxg.top/avatar?s=qq",
	Author: {
		Name: "天翔TNXG",
		Email: "tnxg@outlook.jp",
	},
	SocialMedia: {
		Twitter: "https://twitter.com/iykrzu",
		GitHub: "https://github.com/tnxg",
	},
};

export const SidebarConfig = {
	sections: [
		{ name: "首页", icon: "mingcute:home-6-line", href: "/" },
		{ name: "动态", icon: "mingcute:bubble-line", href: "/recently/" },
		{ name: "友链", icon: "mingcute:link-fill", href: "/friends/" },
		// { name: "归档", icon: "mingcute:archive-line", href: "/archive/" },
	],
	copyright: {
		StartDate: 2019,
		text: "© {{date}} 天翔TNXG.",
		license: {
			name: "CC BY-NC-SA 4.0",
			url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
		},
	},
};
