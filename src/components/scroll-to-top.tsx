"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			// 当滚动距离超过 300px 时显示按钮
			if (window.pageYOffset > 300) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		// 节流函数，优化性能
		let timeoutId: NodeJS.Timeout;
		const throttledToggleVisibility = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(toggleVisibility, 100);
		};

		// 添加滚动事件监听器
		window.addEventListener("scroll", throttledToggleVisibility);

		// 清理事件监听器
		return () => {
			window.removeEventListener("scroll", throttledToggleVisibility);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!isVisible) {
		return null;
	}

	return (
		<Button
			onClick={scrollToTop}
			className="bg-primary text-primary-foreground rounded-full h-12 w-12 shadow-lg transition-all duration-300 bottom-8 right-8 fixed z-50 hover:shadow-xl hover:scale-110"
			size="icon"
			variant="default"
			aria-label="回到顶部"
		>
			<ChevronUp className="h-6 w-6" />
			<span className="sr-only">回到顶部</span>
		</Button>
	);
}
