export const SiteConfig = {
    title: '天翔TNXGの自留地',
    SiteURL: 'https://tnxgmoe.com',
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
            name: '关于',
            icon: 'mdi:about-circle-outline',
            path: '/about'
        },
        {
            name: '项目',
            icon: 'codicon:github-project',
            path: '/projects'
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