export const SiteConfig = {
    title: '天翔TNXGの自留地',
    master: '天翔TNXG',
    description: '明日尚未到来，希望凝于心上',
    SiteURL: 'https://tnxg.top',
    Language: 'zh-CN',
    Author: {
        Name: '天翔TNXG',
        Email: 'tnxg@outlook.jp'
    },
    SocialMedia: {
        Twitter: 'https://twitter.com/iykrzu',
        GitHub: 'https://github.com/tnxg'
    },
};

export const SidebarConfig = {
    sections: [
        {
            name: '首页',
            icon: 'mdi:home',
            path: '/'
        },
        {
            name: '动态',
            icon: 'mingcute:bubble-line',
            path: '/recently/'
        },
        {
            name: '友链',
            icon: 'carbon:friendship',
            path: '/friends/'
        },
        {
            name: "归档",
            icon: 'material-symbols:archive-outline',
            path: '/archive/'
        }
    ],
    copyright: {
        StartDate: 2019,
        text: '© {{date}} 天翔TNXG.',
        license: {
            name: 'CC BY-NC-SA 4.0',
            url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
        }
    }
};