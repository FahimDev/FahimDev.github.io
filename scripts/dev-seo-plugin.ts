/**
 * Vite dev-server plugin: serve the AI-CV contract endpoints (and the
 * existing SEO files) with the same content the production prerender
 * emits.
 *
 * Endpoints handled (all five live AI-CV endpoints, plus the existing
 * SEO helpers):
 *   - /cv.json
 *   - /llms.txt
 *   - /sitemap.xml
 *   - /robots.txt
 *   - /ai/cv-agent-instructions.md
 *   - /ai/ats-audience-blueprint.md
 *   - /ai/ats-audience-guardrails.schema.json
 *
 * Without this, requests for those paths fall through Vite's HTML transform
 * and end up at React Router's catch-all 404 page.
 *
 * Strategy:
 *   1. On server start, configure middleware that intercepts the SEO/AI
 *      paths before any other middleware runs.
 *   2. On first request, lazily build the SSR snapshot bundle with esbuild
 *      (same approach as scripts/prerender.mjs) and cache the exports.
 *   3. Reuse scripts/prerender-helpers.mjs for sitemap, llms.txt, and
 *      the three /ai/* resources, and buildCvPayload from the snapshot
 *      bundle for cv.json.
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
    "/ai/cv-agent-instructions.md",
    "/ai/ats-audience-blueprint.md",
    "/ai/ats-audience-guardrails.schema.json",
]);

function isSeoPath(reqUrl: string): string | null {
    // Strip query string and trailing slashes; only exact-match one of the
    // known SEO/AI URLs. Everything else falls through to Vite normally.
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
                        // Legacy builder retained for tests/imports.
                        buildLlmsTxt?: (payload: unknown, siteUrl: string) => string;
                        // New concise AI-CV contract builder.
                        buildLlmsTxtV2: (siteUrl: string) => string;
                        materializeAiDocsSync: (
                            siteUrl: string,
                            sourceDir: string
                        ) => { blueprint: string; schema: string; instructions: string };
                    };

                    if (matched === "/llms.txt") {
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "text/markdown; charset=utf-8"
                        );
                        res.end(helpers.buildLlmsTxtV2(siteUrl));
                        return;
                    }

                    if (matched === "/sitemap.xml") {
                        // Dev sitemap is a minimal entry set; production
                        // prerender enumerates every route + project slug.
                        const today = new Date().toISOString().slice(0, 10);
                        const entries = [
                            { loc: `${siteUrl}/ai/cv-agent-instructions.md`, lastmod: today },
                            { loc: `${siteUrl}/ai/ats-audience-guardrails.schema.json`, lastmod: today },
                            { loc: `${siteUrl}/ai/ats-audience-blueprint.md`, lastmod: today },
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

                    // --- /ai/* AI-readable resources ----------------------------
                    // Same single-source-of-truth as production: every body is
                    // read from docs/ai-cv/*. The guardrail schema has its live
                    // `$id` forced to the production URL by
                    // materializeAiDocsSync so the dev schema is identical to
                    // the deployed one for parsing purposes.
                    const aiDocs = helpers.materializeAiDocsSync(
                        siteUrl,
                        path.join(ROOT, "docs", "ai-cv")
                    );

                    if (matched === "/ai/cv-agent-instructions.md") {
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "text/markdown; charset=utf-8"
                        );
                        res.end(aiDocs.instructions);
                        return;
                    }
                    if (matched === "/ai/ats-audience-blueprint.md") {
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "text/markdown; charset=utf-8"
                        );
                        res.end(aiDocs.blueprint);
                        return;
                    }
                    if (matched === "/ai/ats-audience-guardrails.schema.json") {
                        res.statusCode = 200;
                        res.setHeader(
                            "Content-Type",
                            "application/schema+json; charset=utf-8"
                        );
                        res.end(aiDocs.schema);
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
