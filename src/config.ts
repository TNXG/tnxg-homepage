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
		Beian: false,
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
	LearningConfig: {
		sections: {
			currentlyStudying: {
				title: "learning.currentlyStudying.title",
				description: "learning.currentlyStudying.description",
				icon: "TrendingUp",
				iconColor: "text-green-500",
				languages: [
					{
						name: "Python",
						icon: "logos:python",
						color: "text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 dark:hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "JavaScript",
						icon: "logos:javascript",
						color: "text-yellow-500 border-yellow-500 hover:bg-yellow-50 hover:text-yellow-600 hover:border-yellow-600 dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-300 dark:hover:border-yellow-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "TypeScript",
						icon: "logos:typescript-icon",
						color: "text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 dark:hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
				],
			},
			exploring: {
				title: "learning.exploring.title",
				description: "learning.exploring.description",
				icon: "Code",
				iconColor: "text-orange-500",
				languages: [
					{
						name: "Rust",
						icon: "logos:rust",
						color: "text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-600 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-900/30 dark:hover:text-orange-300 dark:hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Golang",
						icon: "logos:go",
						color: "text-cyan-500 border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-600 dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-300 dark:hover:border-cyan-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Dart",
						icon: "logos:dart",
						color: "text-blue-400 border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600 dark:text-blue-300 dark:border-blue-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-200 dark:hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow-md",
					},
				],
			},
			frameworks: {
				title: "learning.frameworks.title",
				description: "learning.frameworks.description",
				icon: "Award",
				iconColor: "text-purple-500",
				frameworks: [
					{
						name: "Flask",
						icon: "simple-icons:flask",
						color: "text-gray-700 border-gray-700 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-800 dark:text-gray-300 dark:border-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-gray-200 dark:hover:border-gray-200 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Nuxt (Vue)",
						icon: "logos:nuxt-icon",
						color: "text-green-500 border-green-500 hover:bg-green-50 hover:text-green-600 hover:border-green-600 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/30 dark:hover:text-green-300 dark:hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Next (React)",
						icon: "logos:nextjs-icon",
						color: "text-gray-800 border-gray-800 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-900 dark:text-gray-200 dark:border-gray-200 dark:hover:bg-gray-700/50 dark:hover:text-gray-100 dark:hover:border-gray-100 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Flutter",
						icon: "logos:flutter",
						color: "text-cyan-500 border-cyan-500 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-600 dark:text-cyan-400 dark:border-cyan-400 dark:hover:bg-cyan-900/30 dark:hover:text-cyan-300 dark:hover:border-cyan-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
					{
						name: "Tauri",
						icon: "simple-icons:tauri",
						color: "text-orange-600 border-orange-600 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-700 dark:text-orange-400 dark:border-orange-400 dark:hover:bg-orange-900/30 dark:hover:text-orange-300 dark:hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-md",
					},
				],
			},
		},
		sectionTitle: "learning.sectionTitle",
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
	beian: {
		text: "新ICP备2025023032号-1",
		url: "https://beian.miit.gov.cn/",
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
	blinko: {
		// eslint-disable-next-line node/prefer-global/process
		token: process.env.BLINKO_TOKEN,
	},
	bangumi: {
		username: "tnxg",
	},
	endpoints: {
		baseURL: "https://mx.tnxg.top/api/v2",
		// 自制的后端api，详见https://github.com/TNXG/space-api/
		friends: "https://api-space.tnxg.top/links",
		space: "https://api-space.tnxg.top",
		space_status: "https://api-space.tnxg.top/status", // 实际获取无参和带s=n的状态
		// blinko接口
		blinko: "https://b.tnxg.top/api",
		// 实际上以下的api都是Mix-Space提供的，这里提供一个方便更换的接口
		recently: "https://mx.tnxg.top/api/v2/recently/all",
		status: "https://api-space.tnxg.top/status",
		wakatime: {
			TimeTracking: "https://wakatime.com/share/@TNXG/2c1b5024-665a-48b3-a349-593e38ed5662.json",
			Language: "https://wakatime.com/share/@TNXG/fc9f392a-373e-4826-9ab1-074c4bb241b2.json	",
			OSUsage: "https://wakatime.com/share/@TNXG/bab66e06-f956-4807-833e-9e825ba1f7e3.json",
		},
	},
};
