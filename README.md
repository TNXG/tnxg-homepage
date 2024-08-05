# **tnxg-homepages**

`tnxg-homepages` 是由 天翔TNXG 创建并维护的个人网站，部分内容依赖 [Mix-Space](https://github.com/mx-space)。旨在展示个人信息、动态、项目等内容。该项目由 `Nuxt.js` 框架构建，使用了多种现代前端技术，为用户提供了一个美观、响应式的个人主页。

## **部署方式**

1. **安装依赖**：
   使用 `pnpm` 作为包管理器，首先确保已安装 `pnpm`。可以通过以下命令安装：
   ```bash
   npm install -g pnpm
   ```

2. **克隆项目**：
   克隆项目到本地：
   ```bash
   git clone https://github.com/tnxg/tnxg-homepages.git
   ```

3. **安装项目依赖**：
   进入项目目录，使用 `pnpm` 安装依赖：
   ```bash
   pnpm install
   ```

4. **本地开发**：
   启动本地开发服务器：
   ```bash
   pnpm run dev
   ```

5. **构建项目**：
   构建生产环境的代码：
   ```bash
   pnpm build
   ```

6. **生成静态文件**：
   生成静态文件，可用于部署到静态网站托管服务：
   ```bash
   pnpm generate
   ```

7. **预览生成的静态文件**：
   预览生成的静态文件：
   ```bash
   pnpm preview
   ```

## **技术栈**

- **Nuxt.js**: 用于构建服务器端渲染的 Vue 应用。
- **Vue.js**: 用于构建用户界面的渐进式 JavaScript 框架。
- **Tailwind CSS**: 用于快速构建响应式布局的实用工具类 CSS 框架。
- **DaisyUI**: 用于快速构建美观的 UI 组件。
- **Flowbite**: 基于 Tailwind CSS 的组件库，用于构建现代化的 UI 组件。
- **Autoprefixer**: 自动添加 CSS 前缀的工具。
- **Sass**: CSS 预处理器，用于增强 CSS 的功能。
- **PostCSS**: 用于转换 CSS 代码的工具。
- **Nanostores**: 用于状态管理的轻量级库。
- **Markdown-it**: 用于解析 Markdown 的库。

## **鸣谢**

### 后端构成

- [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)
- [Mix-Space](https://github.com/mx-space)
- [Home Assistant](https://github.com/home-assistant)

## 样式参考

- [ZhiluSite](https://github.com/L33Z22L11/ZhiluSite)

## 联系我们

- 个人博客: [tnxgmoe.com](https://tnxgmoe.com/about-me#:re:%E8%81%94%E7%B3%BB%E6%96%B9%E5%BC%8F)

2024 © TNXG 本项目遵循 AGPL 3.0 license 开源

本 README 部分内容由 Kimi.ai 生成，请注意甄别内容。