"use client";

import { SiteConfig } from "@/config";
import { useEffect } from "react";

export function Favicon() {
	useEffect(() => {
		// 更新默认favicon
		const setFavicon = (href: string) => {
			let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
			if (!link) {
				link = document.createElement("link");
				link.rel = "icon";
				document.head.appendChild(link);
			}
			link.href = href;
		};

		// 设置默认favicon
		setFavicon(SiteConfig.favicon.default);

		// 设置苹果设备图标（如果存在）
		if (SiteConfig.favicon.apple) {
			let appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
			if (!appleLink) {
				appleLink = document.createElement("link");
				appleLink.rel = "apple-touch-icon";
				document.head.appendChild(appleLink);
			}
			appleLink.href = SiteConfig.favicon.apple;
		}

		// 监听暗色模式变化（如果提供了暗色模式图标）
		if (SiteConfig.favicon.dark) {
			const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

			const handleDarkModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
				setFavicon(e.matches ? SiteConfig.favicon.dark : SiteConfig.favicon.default);
			};

			darkModeMediaQuery.addEventListener("change", handleDarkModeChange);
			handleDarkModeChange(darkModeMediaQuery);

			return () => darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
		}
	}, []);

	return null;
}
