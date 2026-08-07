import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { PROJECT_SLUGS, SPEAKING_SLUGS, resolveRouteMeta, SITE } from "./routes";
import {
    buildJsonLdScript,
    buildPersonJsonLd,
    buildProjectJsonLd,
    buildWebsiteJsonLd,
} from "./structuredData";

const toAbsolute = (path: string): string => {
    if (!path) return SITE.url;
    if (/^https?:\/\//i.test(path)) return path;
    const trimmed = path.startsWith("/") ? path : `/${path}`;
    return `${SITE.url.replace(/\/$/, "")}${trimmed}`;
};

const ensureMeta = (selector: string, attrs: Record<string, string>): HTMLMetaElement => {
    let el = document.head.querySelector<HTMLMetaElement>(selector);
    if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
    }
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    return el;
};

const ensureLink = (rel: string): HTMLLinkElement => {
    let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
    }
    return el;
};

const ensureJsonLd = (id: string): HTMLScriptElement => {
    let el = document.head.querySelector<HTMLScriptElement>(`script[type="application/ld+json"][data-seo="${id}"]`);
    if (!el) {
        // Remove pre-existing default JSON-LD blocks (from index.html) so we can replace per route
        document.head
            .querySelectorAll(`script[type="application/ld+json"]:not([data-seo])`)
            .forEach((n) => n.parentElement?.removeChild(n));
        el = document.createElement("script");
        el.setAttribute("type", "application/ld+json");
        el.setAttribute("data-seo", id);
        document.head.appendChild(el);
    }
    return el;
};

const isProjectPath = (pathname: string): boolean =>
    pathname.startsWith("/projects/") && pathname.length > "/projects/".length;

const isSpeakingPath = (pathname: string): boolean =>
    pathname.startsWith("/speaking/") && pathname.length > "/speaking/".length;

export function useRouteSeo(): void {
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        const pathname = location.pathname;
        const slug = isProjectPath(pathname)
            ? decodeURIComponent(pathname.slice("/projects/".length)).replace(/\/$/, "")
            : isSpeakingPath(pathname)
                ? decodeURIComponent(pathname.slice("/speaking/".length)).replace(/\/$/, "")
                : undefined;

        const meta = resolveRouteMeta(pathname, slug);
        const canonicalPath = meta.path && meta.path !== "/" ? meta.path : pathname;
        const canonicalUrl = toAbsolute(canonicalPath);
        const imageUrl = toAbsolute(meta.image || SITE.image);

        document.title = meta.title;
        document.documentElement.lang = "en";

        ensureMeta('meta[name="description"]', { name: "description", content: meta.description });
        ensureMeta('meta[name="author"]', { name: "author", content: SITE.author });

        const canonical = ensureLink("canonical");
        canonical.setAttribute("href", canonicalUrl);

        // Open Graph
        ensureMeta('meta[property="og:title"]', { property: "og:title", content: meta.title });
        ensureMeta('meta[property="og:description"]', {
            property: "og:description",
            content: meta.description,
        });
        ensureMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
        ensureMeta('meta[property="og:type"]', { property: "og:type", content: meta.type || "website" });
        ensureMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
        ensureMeta('meta[property="og:site_name"]', {
            property: "og:site_name",
            content: SITE.name,
        });
        ensureMeta('meta[property="og:locale"]', {
            property: "og:locale",
            content: "en_US",
        });

        // Twitter
        ensureMeta('meta[name="twitter:card"]', {
            name: "twitter:card",
            content: "summary_large_image",
        });
        ensureMeta('meta[name="twitter:title"]', {
            name: "twitter:title",
            content: meta.title,
        });
        ensureMeta('meta[name="twitter:description"]', {
            name: "twitter:description",
            content: meta.description,
        });
        ensureMeta('meta[name="twitter:image"]', {
            name: "twitter:image",
            content: imageUrl,
        });

        // JSON-LD per route
        let jsonld: Record<string, unknown>;
        if (slug && PROJECT_SLUGS.includes(slug) && isProjectPath(pathname)) {
            const projectLd = buildProjectJsonLd(slug);
            jsonld = projectLd ?? buildPersonJsonLd();
        } else if (slug && SPEAKING_SLUGS.includes(slug) && isSpeakingPath(pathname)) {
            // Speaking JSON-LD builder lands in Commit 6; fall back to the
            // person schema for now so the head still validates.
            jsonld = buildPersonJsonLd();
        } else if (pathname === "/") {
            jsonld = { ...buildPersonJsonLd(), ...buildWebsiteJsonLd() };
        } else {
            jsonld = buildPersonJsonLd();
        }
        const script = ensureJsonLd("route");
        script.textContent = buildJsonLdScript(jsonld);
    }, [location.pathname, params]);
}
