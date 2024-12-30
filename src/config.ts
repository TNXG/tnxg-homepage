export const SiteConfig = {
	title: "天翔TNXGの自留地",
	master: "天翔TNXG",
	description: "明日尚未到来，希望凝于心上",
	SiteURL: "https://tnxg.top",
	Language: "zh-CN",
	Avatar: "https://api-space.tnxg.top/avatar?s=qq",
	Features: {
		StatusDot: false,
		StatusAPI: false,
	},
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
		{ name: "动态", icon: "mingcute:bubble-line", href: "/recently" },
		{ name: "友链", icon: "mingcute:link-fill", href: "/friends" },
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
	externalLinks: [
		{ name: "QQ", icon: "mingcute:qq-line", href: "https://jq.qq.com/?_wv=1027&k=hc3OKNED" },
		{ name: "Blog", icon: "mingcute:book-6-line", href: "https://tnxgmoe.com" },
		{ name: "GitHub", icon: "mingcute:github-line", href: "https://github.com/TNXG" },
	],
};

export const FriendsConfig = {
	title: "友情链接",
	description: {
		text: "你可以点击",
		link: {
			text: "朋友们 - 天翔TNXGの空间站",
			url: "https://tnxgmoe.com/friends"
		},
		suffix: "来申请友链哦！"
	}
};

export const RecentlyConfig = {
	title: "动态",
	description: `"每一步都在寻找，属于自己的光。"

在这条路上，悄悄走过每个晨曦 | 不需要大声宣告，也不怕孤单
不必急于追寻远方，步伐已在心中轻轻起舞 | 每一次转身，都是心底的坚定
偶尔迷失，也不过是寻找到更好的自己 | 在平凡的日子里，悄然期待着某个瞬间的不同
只是那些小小的坚持，让一切变得真实而温暖 | 直到有一天，所有的点滴拼凑成属于我的故事。

今天的我，正一步一步走向明天的自己`
};

export const APIConfig = {
	baseURL: "https://mx.tnxg.top/api/v2",
	endpoints: {
		recently: "/recently/all",
		friends: "/links?page=1&size=50"
	}
};
