import { useEffect } from "react";

export function useLayoutHeights() {
    useEffect(() => {
        const updateLayoutHeights = () => {
            const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
            const footerHeight = document.querySelector("footer")?.getBoundingClientRect().height ?? 0;

            document.documentElement.style.setProperty("--layout-header-height", `${headerHeight}px`);
            document.documentElement.style.setProperty("--layout-footer-height", `${footerHeight}px`);
        };

        updateLayoutHeights();
        window.addEventListener("resize", updateLayoutHeights);

        return () => {
            window.removeEventListener("resize", updateLayoutHeights);
        };
    }, []);
}