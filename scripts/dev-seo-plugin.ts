/**
 * Vite dev-server plugin: serve /cv.json, /llms.txt, /sitemap.xml, and
 * /robots.txt with the same content the production prerender emits.
 *
 * Without this, requests for those paths fall through Vite's HTML transform
 * and end up at React Router's catch-all 404 page.
 *
 * Strategy:
 *   1. On server start, configure middleware that intercepts the four SEO
 *      paths before any other middleware runs.
 *   2. On first request, lazily build the SSR snapshot bundle with esbuild
 *      (same approach as scripts/prerender.mjs) and cache the exports.
 *   3. Reuse scripts/prerender-helpers.mjs for sitemap + llms.txt, and
 *      buildCvPayload from the snapshot bundle for cv.json.
 */

import type { Plugin, ViteDevServer } from "vite";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promises as fs } from "node:fs";
import { build } from "esbuild";

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const SNAPSHOT_ENTRY = path.join(ROOT, "src", "seo", "snapshot.tsx");
const SNAPSHOT_BUNDLE = path.join(ROOT, ".dev-seo-snapshot.mjs");
const HELPERS_URL = pathToFileURL(
    path.join(ROOT, "scripts", "prerender-helpers.mjs")
).href;

// Single source of truth: SITE_URL is read from src/constants/site-config.ts
// through the SSR snapshot bundle (same code path the React app uses at
// runtime). No env vars, no .env files — change SITE_URL there to retarget
// the entire deployment.
interface SnapshotBundle {
    SITE_URL: string;
    SITE_CONFIG: { url: string; [k: string]: unknown };
    buildCvPayload: () => unknown;
}

let snapshotPromise: Promise<SnapshotBundle> | null = null;

async function loadSnapshotBundle(): Promise<SnapshotBundle> {
    if (snapshotPromise) return snapshotPromise;
    snapshotPromise = (async () => {
        // No env-var injection: the snapshot bundle imports SITE_URL directly
        // from src/constants/site-config.ts, which is the single source of
        // truth shared by the SPA, the prerender, and this dev middleware.
        await build({
            entryPoints: [SNAPSHOT_ENTRY],
            outfile: SNAPSHOT_BUNDLE,
            bundle: true,
            format: "esm",
            platform: "node",
            target: "node18",
            jsx: "automatic",
            external: [
                "react",
                "react-dom",
                "react-dom/server",
                "react-icons",
                "react-icons/*",
            ],
            logLevel: "warning",
        });
        const mod = (await import(
            pathToFileURL(SNAPSHOT_BUNDLE).href
        )) as SnapshotBundle;
        return mod;
    })();
    return snapshotPromise;
}

const SEO_PATHS = new Set([
    "/cv.json",
    "/llms.txt",
    "/sitemap.xml",
    "/robots.txt",
]);

function isSeoPath(reqUrl: string): string | null {
    // Strip query string and trailing slashes; only exact-match one of the
    // four SEO URLs. Everything else should fall through to Vite normally.
    const pathOnly = (reqUrl.split("?")[0] || "/").replace(/\/$/, "") || "/";
    return SEO_PATHS.has(pathOnly) ? pathOnly : null;
}

export default function devSeoPlugin(): Plugin {
    return {
        name: "dev-seo-endpoints",
        apply: "serve",
        configureServer(server: ViteDevServer) {
            // Register BEFORE Vite's internal middlewares (HTML transform + SPA
            // fallback). Vite's `configureServer` is called before its own
            // middleware chain, so any `server.middlewares.use(...)` we add
            // here runs first.
            server.middlewares.use(async (req, res, next) => {
                const reqUrl = req.url ?? "";
                const matched = isSeoPath(reqUrl);
                if (!matched) return next();
                // eslint-disable-next-line no-console
                console.log("[dev-seo]", req.method, reqUrl);

                try {
                    // Pull SITE_URL from the snapshot bundle (which imports it
                    // from src/constants/site-config.ts — the single source of
                    // truth). Cached after first call.
                    const bundle = await loadSnapshotBundle();
                    const siteUrl = bundle.SITE_URL;

                    if (matched === "/cv.json") {
                        const payload = bundle.buildCvPayload();
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "application/json; charset=utf-8"
                        );
                        res.end(JSON.stringify(payload, null, 2));
                        return;
                    }

                    const helpers = (await import(HELPERS_URL)) as {
                        buildSitemap: (
                            origin: string,
                            entries: { loc: string; lastmod: string }[],
                            date: string
                        ) => string;
                        buildLlmsTxt: (payload: unknown, siteUrl: string) => string;
                    };

                    if (matched === "/llms.txt") {
                        const payload = bundle.buildCvPayload() as Record<string, unknown>;
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "text/markdown; charset=utf-8"
                        );
                        res.end(helpers.buildLlmsTxt(payload, siteUrl));
                        return;
                    }

                    if (matched === "/sitemap.xml") {
                        // Dev sitemap is a minimal entry set; production
                        // prerender enumerates every route + project slug.
                        const today = new Date().toISOString().slice(0, 10);
                        const entries = [
                            { loc: `${siteUrl}/cv.json`, lastmod: today },
                            { loc: `${siteUrl}/llms.txt`, lastmod: today },
                            { loc: `${siteUrl}/`, lastmod: today },
                            { loc: `${siteUrl}/projects`, lastmod: today },
                            { loc: `${siteUrl}/blogs`, lastmod: today },
                        ];
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "application/xml; charset=utf-8"
                        );
                        res.end(helpers.buildSitemap(siteUrl, entries, today));
                        return;
                    }

                    if (matched === "/robots.txt") {
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "text/plain; charset=utf-8"
                        );
                        res.end(
                            `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
                        );
                        return;
                    }
                } catch (err) {
                    // Surface as plain text so the browser shows it
                    // instead of falling back to the 404 page.
                    const msg = err instanceof Error ? err.message : String(err);
                    // eslint-disable-next-line no-console
                    console.error("[dev-seo]", msg);
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "text/plain; charset=utf-8");
                    res.end(`dev-seo-plugin error: ${msg}\n`);
                    return;
                }
            });
        },
    };
}

// Cleanup the temp esbuild output on process exit.
process.on("exit", () => {
    fs.rm(SNAPSHOT_BUNDLE, { force: true }).catch(() => {});
});
