export const SiteConfig = {
    title: '天翔TNXGの自留地',
    master: '天翔TNXG',
    description: '明日尚未到来，希望凝于心上',
    SiteURL: 'https://tnxg.com',
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

export const mxConfig = {
    endpoint: 'https://mx.tnxg.top/api/v2',
}