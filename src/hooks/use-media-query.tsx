"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);

		// Initial check
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		// Add listener for changes
		const listener = () => setMatches(media.matches);
		media.addEventListener("change", listener);

		// Clean up
		return () => media.removeEventListener("change", listener);
	}, [matches, query]);

	return matches;
}
