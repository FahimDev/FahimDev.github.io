import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Generic hash-scroll handler.
 *
 * Browsers do not natively scroll to a hash when a client-side route
 * navigation changes `location.hash` without a full page load. React Router
 * updates the URL but not the scroll position. This component bridges that
 * gap for any `#fragment` target — `#contact`, `#experience`, `#research`,
 * and any future anchor — using a single generic mechanism.
 *
 * Why a single rAF instead of a setTimeout?
 *   The router effect runs during the commit phase, after React has rendered
 *   the new route's DOM. The target element already exists by then (the
 *   project's route components are synchronous; no Suspense / lazy boundary
 *   gates them). One `requestAnimationFrame` defers the scroll one frame
 *   so layout has flushed, which is the documented pattern for scrolling
 *   to a freshly-rendered element. No polling, no arbitrary delays.
 *
 * Reduced-motion behavior is delegated to CSS (`html { scroll-behavior: smooth }`
 * + `prefers-reduced-motion: reduce { scroll-behavior: auto }` in index.css).
 * Calling `scrollIntoView()` with no options lets the CSS rule decide, so
 * JavaScript and CSS cannot fight each other.
 *
 * This component renders nothing.
 */
export default function HashScrollHandler() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) return;
        // Trim the leading '#' and decode safely. decodeURIComponent throws
        // on malformed escapes; guard so a stray hash doesn't break nav.
        const raw = hash.slice(1);
        let id = "";
        try {
            id = decodeURIComponent(raw);
        } catch {
            id = raw;
        }
        if (!id) return;

        // Defer one frame so the route's DOM has been committed before we
        // measure. The target is mounted synchronously by the route, so a
        // single rAF is sufficient — no polling, no observer.
        const raf = requestAnimationFrame(() => {
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView();
            }
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname, hash]);

    return null;
}
