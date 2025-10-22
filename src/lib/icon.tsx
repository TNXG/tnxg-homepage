// 部分代码来自Zhilu(L33Z22L11)
// @keep-sorted
const archIcons = {
	"Astro": "simple-icons:astro",
	"Cloudflare": "simple-icons:cloudflare",
	"Deno Deploy": "simple-icons:deno",
	"GitHub Pages": "simple-icons:github",
	"Gridea": "tabler:square-rounded-letter-g-filled", // 不准确
	"Halo": "material-symbols:h-mobiledata-badge", // 不准确
	"Hexo": "simple-icons:hexo",
	"HTML": "simple-icons:html5",
	"Hugo": "simple-icons:hugo",
	"Jekyll": "simple-icons:jekyll",
	"Mix Space": "ph:yarn",
	"Netlify": "simple-icons:netlify",
	"Next.js": "simple-icons:nextdotjs",
	"Nuxt": "simple-icons:nuxtdotjs",
	"Python": "simple-icons:python",
	"Typecho": "icon-park-solid:align-text-left-one", // 不准确
	"Vercel": "simple-icons:vercel",
	"VitePress": "simple-icons:vitepress",
	"Vue": "uim:vuejs",
	"WordPress": "simple-icons:wordpress",
	"ZBlog": "mynaui:letter-z-hexagon-solid", // 不准确
	"Zebaur": "tabler:square-letter-z-filled",
	"国内 CDN": "ph:cloud-check-fill",
	"服务器": "ph:hard-drives-fill",

	"虚拟主机": "ph:file-cloud-bold", // 不准确
};

export type Arch = keyof typeof archIcons;

export function getArchIcon(arch: Arch) {
	return archIcons[arch] ?? "";
}

/**
 * 从 URL 中提取完整主机名（含子域）
 */
export function getDomain(href?: string): string {
	if (!href)
		return "";
	try {
		const u = new URL(href);
		return u.hostname;
	} catch {
		return "";
	}
}

/**
 * 提取主域名（去除常见子域）
 * 例如: sub.example.com -> example.com
 */
export function getMainDomain(href?: string, keepSubdomain = false): string {
	const host = getDomain(href);
	if (!host)
		return "";
	if (keepSubdomain)
		return host;

	const parts = host.split(".");
	if (parts.length <= 2)
		return host;

	// 简单处理常见的双后缀域名（不求完美，够用即可）
	const tlds2 = new Set([
		"com.cn",
		"net.cn",
		"org.cn",
		"gov.cn",
		"co.uk",
		"com.hk",
		"com.tw",
	]);
	const last2 = parts.slice(-2).join(".");
	const last3 = parts.slice(-3).join(".");
	if (tlds2.has(last2) && parts.length >= 3)
		return parts.slice(-3).join(".");
	if (tlds2.has(last3) && parts.length >= 4)
		return parts.slice(-4).join(".");
	return last2;
}

/**
 * 根据域名映射返回 Iconify 图标名
 */
export function getDomainIcon(href?: string): string | undefined {
	const host = getDomain(href);
	if (!host)
		return undefined;
	if (domainIcons[host])
		return domainIcons[host];
	const main = getMainDomain(href);
	return mainDomainIcons[main];
}

/** 主域名图标映射 */
export const mainDomainIcons: Record<string, string> = {
	"bilibili.com": "ri:bilibili-fill",
	"creativecommons.org": "ri:creative-commons-line",
	"github.com": "ri:github-fill",
	"github.io": "ri:github-fill",
	"microsoft.com": "ri:microsoft-fill",
	"netlify.app": "simple-icons:netlify",
	"pages.dev": "simple-icons:cloudflare",
	"qq.com": "ri:qq-fill",
	"thisis.host": "ph:star-four-fill",
	"vercel.app": "simple-icons:vercel",
	"zabaur.app": "tabler:square-letter-z-filled",
	"zhihu.com": "ri:zhihu-line",
};

/** 专门域名图标映射，优先级高于主域名图标 */
export const domainIcons: Record<string, string> = {
	"mp.weixin.qq.com": "ri:wechat-fill",
};

/** 文件名后缀图标映射，优先级高于代码块语言图标映射 */
const file2icon: Record<string, string> = {
	".crt": "catppuccin:certificate",
	".gitattributes": "catppuccin:git",
	".gitconfig": "catppuccin:git",
	".gitignore": "catppuccin:git",
	".key": "catppuccin:key",
	".npmrc": "catppuccin:npm",
	".patch": "catppuccin:git",
	".prettierrc": "catppuccin:prettier",
	"CHANGELOG.md": "catppuccin:changelog",
	"CODE_OF_CONDUCT.md": "catppuccin:code-of-conduct",
	"CONTRIBUTING.md": "catppuccin:contributing",
	"eslint.config.mjs": "catppuccin:eslint",
	"LICENSE": "catppuccin:license",
	"netlify.toml": "catppuccin:netlify",
	"nuxt.config.ts": "catppuccin:nuxt",
	"package.json": "catppuccin:package-json",
	"pnpm-workspace.yaml": "catppuccin:pnpm",
	"README.md": "catppuccin:readme",
	"stylelint.config.mjs": "catppuccin:stylelint",
	"tsconfig.json": "catppuccin:typescript-config",
	"verccel.json": "catppuccin:vercel",
};

export function getFileIcon(filename?: string) {
	if (!filename)
		return undefined;
	const extension = Object.keys(file2icon).find(ext => filename.endsWith(ext));
	return extension ? file2icon[extension] : undefined;
}

/**
 * 代码块语言简写或别名到 Catppuccin 图标库中的语言名映射
 *
 * 将 blogConfig.shiki.langs 的部分后缀名简写
 * 转换为代码块语言对应的 Iconify Catppuccin图标
 */
const ext2lang: Record<string, string> = {
	"bat": "batch",
	"ini": "properties",
	"js": "javascript",
	"md": "markdown",
	"mdc": "markdown",
	"sh": "bash",
	"ssh-config": "properties",
	"ts": "typescript",
	"tsx": "typescript-react",
	"typescriptreact": "typescript-react",
	"jsx": "javascript-react",
	"javascriptreact": "javascript-react",
	"vb": "visual-studio",
	"vue.js": "vue",
};

export function getLangIcon(extension?: string): string {
	if (!extension) {
		extension = "file";
	}
	const fileType = ext2lang[extension] || extension;
	return `catppuccin:${fileType}`;
}

/**
 * 获取站点 favicon
 * 使用 unavatar 服务获取域名的 favicon
 */
export function getFavicon(domain: string, options: Record<string, any> = {
	provider: "google",
	size: 32,
}) {
	return `https://unavatar.webp.se/${options.provider}/${domain}?w=${options.size}`;
}
