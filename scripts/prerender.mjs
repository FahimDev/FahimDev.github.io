// Build-time prerender for static hosting (e.g. GitHub Pages).
// Uses headless Chrome via the Chrome DevTools Protocol to navigate to each
// route of the built SPA, wait for the React app (via useRouteSeo) to update
// <head>, then persist the rendered <head> + body shell to per-route HTML.
//
// Outputs:
//   dist/<route>/index.html       (one per static + per project route)
//   dist/index.html               (overwritten with /'s rendered head + <main>)
//   dist/sitemap.xml
//   dist/robots.txt
//   dist/cv.json                  (machine-readable profile for LLMs)
//   dist/llms.txt                 (Markdown index following llmstxt.org)
//
// Usage: node scripts/prerender.mjs [--port=9222] [--route=/,/projects,...]
//   Defaults: chrome on a free debug port, all routes inferred from PROJECTS.
//
// Requires: a built `dist/` (run `vite build` first) and `google-chrome`.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn, spawnSync } from "node:child_process";
import { build } from "esbuild";
import { WebSocket } from "ws";

// Polyfill global WebSocket for hosts where the Node runtime doesn't expose
// one (e.g. Cloudflare Pages' build image runs Node 18, which predates
// `globalThis.WebSocket`). CDP clients like puppeteer-core assume a global is
// present; installing the `ws`-backed implementation here means the rest of
// this script can keep using `new WebSocket(...)` unchanged.
if (typeof globalThis.WebSocket === "undefined") {
    globalThis.WebSocket = WebSocket;
}

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const DIST = path.join(ROOT, "dist");

const args = Object.fromEntries(
    process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => {
        const [k, v] = a.replace(/^--/, "").split("=");
        return [k, v ?? "true"];
    })
);
const DEBUG_PORT = Number(args.port ?? 9222);
const ROUTE_FILTER = (args.route ?? "").split(",").map((s) => s.trim()).filter(Boolean);

const escapeHtml = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

// Canonical site URL is sourced from src/constants/site-config.ts via the
// SSR snapshot bundle (loaded in main()). No env-var plumbing.
let SITE_URL = "";

const log = (...m) => console.log("[prerender]", ...m);
const err = (...m) => console.error("[prerender]", ...m);

const writeFile = async (filePath, contents) => {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, contents, "utf8");
};

// ---- Chrome lifecycle ------------------------------------------------------

// Locate a headless Chrome binary. We don't read any site-config env vars
// here (the canonical origin still comes from src/constants/site-config.ts);
// this is purely a build-machine dependency, like the node toolchain.
const CHROME_CANDIDATES = [
    process.env.CHROME_PATH,                       // explicit override (e.g. CI symlink target)
    "google-chrome",
    "google-chrome-stable",
    "chrome",
    "chromium",
    "chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", // macOS default
];

const { existsSync } = await import("node:fs");
const resolveChromeBinary = () => {
    for (const candidate of CHROME_CANDIDATES) {
        if (!candidate) continue;
        // PATH-based names: only accept if `which` finds them.
        if (!candidate.includes("/")) {
            try {
                const whichOut = spawnSync("which", [candidate], { encoding: "utf8" });
                if (whichOut.status === 0 && whichOut.stdout.trim()) {
                    return whichOut.stdout.trim().split("\n")[0];
                }
            } catch {
                // fall through to next candidate
            }
            continue;
        }
        // Absolute path: accept if the file exists and is executable.
        if (existsSync(candidate)) return candidate;
    }
    return null;
};

const CHROME_BIN = resolveChromeBinary();
if (!CHROME_BIN) {
    err(
        "Chrome not found. Tried:",
        CHROME_CANDIDATES.filter(Boolean).join(", ")
    );
    err(
        "Install one of: google-chrome, google-chrome-stable, chromium, " +
            "chromium-browser (or set CHROME_PATH to an absolute binary path)."
    );
    process.exit(1);
}
log("using chrome binary:", CHROME_BIN);

const chromeProc = spawn(
    CHROME_BIN,
    [
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--mute-audio",
        `--remote-debugging-port=${DEBUG_PORT}`,
        "--user-data-dir=/tmp/prerender-chrome-profile",
        "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"], detached: false }
);

chromeProc.stderr.on("data", (d) => {
    const s = d.toString();
    if (/DevTools listening|websocket|ERROR/i.test(s)) err("[chrome]", s.trim());
});

const cleanup = () => {
    try {
        chromeProc.kill("SIGTERM");
    } catch {}
    setTimeout(() => {
        try { chromeProc.kill("SIGKILL"); } catch {}
    }, 2000);
};
process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(130); });
process.on("uncaughtException", (e) => { err("uncaught:", e); cleanup(); process.exit(1); });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const fetchJson = async (url, opts = {}) => {
    const res = await fetch(url, opts);
    if (!res.ok) throw new Error(`${url} -> ${res.status}`);
    return res.json();
};

const waitForChrome = async () => {
    const deadline = Date.now() + 30_000;
    let lastErr;
    while (Date.now() < deadline) {
        try {
            const v = await fetchJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
            if (v?.webSocketDebuggerUrl) return v;
        } catch (e) {
            lastErr = e;
        }
        await sleep(250);
    }
    throw new Error(`Chrome did not start on :${DEBUG_PORT}: ${lastErr?.message ?? lastErr}`);
};

const newPage = async (wsBase) => {
    // Open a new target (tab) and connect to it. /json/new uses PUT.
    const newTargetRes = await fetch(`${wsBase}/json/new?about:blank`, { method: "PUT" });
    if (!newTargetRes.ok) throw new Error(`new target -> ${newTargetRes.status}`);
    const target = await newTargetRes.json();
    const targetId = target.id;
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => {
        ws.addEventListener("open", () => res());
        ws.addEventListener("error", (e) => rej(e));
    });

    let nextId = 1;
    const pending = new Map();
    const sessions = new Map(); // sessionId -> listeners (we only use default session)

    ws.addEventListener("message", (ev) => {
        let msg;
        try { msg = JSON.parse(ev.data); } catch { return; }
        if (msg.id != null && pending.has(msg.id)) {
            const { resolve, reject } = pending.get(msg.id);
            pending.delete(msg.id);
            if (msg.error) reject(new Error(JSON.stringify(msg.error)));
            else resolve(msg.result);
        }
    });

    const send = (method, params = {}, sessionId) =>
        new Promise((resolve, reject) => {
            const id = nextId++;
            pending.set(id, { resolve, reject });
            ws.send(JSON.stringify({ id, method, params, sessionId }));
        });

    await send("Page.enable");
    await send("Runtime.enable");
    await send("Network.enable");

    const evalInPage = async (expression) => {
        const res = await send("Runtime.evaluate", {
            expression,
            returnByValue: true,
            awaitPromise: true,
            timeout: 15_000,
        });
        if (res.exceptionDetails) {
            throw new Error(
                "Page eval error: " + JSON.stringify(res.exceptionDetails.exception?.description ?? res.exceptionDetails)
            );
        }
        return res.result?.value;
    };

    const navigateAndWait = async (url, waitForSelectorExpression) => {
        const navP = new Promise((resolve) => {
            const onMsg = (ev) => {
                let msg;
                try { msg = JSON.parse(ev.data); } catch { return; }
                if (msg.method === "Page.loadEventFired") {
                    ws.removeEventListener("message", onMsg);
                    resolve();
                }
            };
            ws.addEventListener("message", onMsg);
        });
        await send("Page.navigate", { url });
        await navP;
        // Wait for React to mount and useRouteSeo to update document.title.
        // We poll until document.title is non-empty AND a description meta exists,
        // capped at 5s.
        await evalInPage(`
            (async () => {
                const deadline = Date.now() + 5000;
                while (Date.now() < deadline) {
                    const t = document.title;
                    const d = document.querySelector('meta[name="description"]');
                    if (t && t.length > 0 && d && d.getAttribute('content')) return true;
                    await new Promise((r) => setTimeout(r, 50));
                }
                return false;
            })()
        `);
        if (waitForSelectorExpression) {
            await evalInPage(waitForSelectorExpression);
        }
    };

    const close = () => {
        try { ws.close(); } catch {}
    };

    return { ws, send, evalInPage, navigateAndWait, close, targetId };
};

// ---- Server-side snapshot bundler ------------------------------------------
// We bundle src/seo/snapshot.tsx (and its TSX/JSX imports of the data
// constants) into a single ESM file at startup with esbuild, then import it.
// This avoids shipping the TypeScript toolchain to Node. Vite guarantees
// esbuild is available transitively.

const SNAPSHOT_ENTRY = path.join(ROOT, "src", "seo", "snapshot.tsx");
const SNAPSHOT_BUNDLE = path.join(ROOT, ".prerender-snapshot.mjs");

const buildSnapshotBundle = async () => {
    await build({
        entryPoints: [SNAPSHOT_ENTRY],
        outfile: SNAPSHOT_BUNDLE,
        bundle: true,
        format: "esm",
        platform: "node",
        target: "node18",
        jsx: "automatic",
        // SITE_URL is imported directly from src/constants/site-config.ts —
        // single source of truth, no env-var injection needed.
        // The constants import "react-icons" — we never call icons at SSR time,
        // but the side-effect-free imports still get pulled. Mark the package
        // external so esbuild doesn't try to bundle it (it has no useful
        // SSR surface).
        external: ["react", "react-dom", "react-dom/server", "react-icons", "react-icons/*"],
        logLevel: "warning",
    });
};

const loadSnapshot = async () => {
    await buildSnapshotBundle();
    const mod = await import(pathToFileUrl(SNAPSHOT_BUNDLE));
    return {
        SITE_URL: mod.SITE_URL,
        renderFullSnapshot: mod.renderFullSnapshot,
        renderRouteSnapshot: mod.renderRouteSnapshot,
        buildCvPayload: mod.buildCvPayload,
    };
};

const pathToFileUrl = (p) => {
    // Use URL import + .href for cross-platform safety.
    return new URL("file://" + path.resolve(p).replace(/\\/g, "/")).href;
};

// ---- Extract SEO fragments from the live page -------------------------------

const extractHead = async (pageEval) => {
    const expression = `
        (() => {
            const headInner = document.head.innerHTML;
            const bodyOpenMatch = document.documentElement.outerHTML.match(/<body[^>]*>/i);
            const bodyOpen = bodyOpenMatch ? bodyOpenMatch[0] : '<body>';
            // Strip any Vite client / HMR scripts (none in prod, but defensive).
            const cleanedHead = headInner.replace(/<script[^>]*type="module"[^>]*src="\\/@vite\\/client[^>]*><\\/script>/gi, "");
            return JSON.stringify({
                head: cleanedHead,
                title: document.title,
                canonical: (document.querySelector('link[rel="canonical"]') || {}).href || null,
                ogImage: (document.querySelector('meta[property="og:image"]') || {}).content || null,
                description: (document.querySelector('meta[name="description"]') || {}).content || null,
            });
        })()
    `;
    const json = await pageEval(expression);
    return JSON.parse(json);
};

const extractSlugsFromBuild = async (servedDir, marker, afterPattern) => {
    // The SPA doesn't expose entry slugs to the static shell, so we read the
    // built JS chunk that contains them. Vite names chunks by content hash;
    // we scan the served assets for the right chunk by content match.
    // afterPattern is a regex that must match shortly AFTER the slug field
    // we're extracting — it lets us distinguish project entries (slug
    // followed by client:) from speaking entries (slug followed by type:).
    const assetsDir = path.join(servedDir, "assets");
    const files = await fs.readdir(assetsDir);
    let chunk;
    for (const f of files) {
        if (!f.endsWith(".js")) continue;
        const txt = await fs.readFile(path.join(assetsDir, f), "utf8");
        if (txt.includes(marker)) { chunk = f; break; }
    }
    if (!chunk) return [];
    const txt = await fs.readFile(path.join(assetsDir, chunk), "utf8");
    const slugRe = new RegExp(
        `slug:\\s*"([a-z0-9-]+)"[\\s\\S]{0,40}?${afterPattern}`,
        "g"
    );
    const set = new Set();
    let m;
    while ((m = slugRe.exec(txt)) !== null) set.add(m[1]);
    return [...set];
};

const extractProjectSlugsFromBuild = (servedDir) =>
    extractSlugsFromBuild(servedDir, "cross-border-stablecoin-settlement", "client:");

const extractSpeakingSlugsFromBuild = (servedDir) =>
    // "future-of-fintech-infrastructure" is one of the speaking slugs in
    // src/constants/speakings.tsx. Anchoring on the next field ("type:") is
    // what isolates speaking entries from project entries, since both share
    // the same slug:"..." pattern inside the same JS chunk.
    extractSlugsFromBuild(servedDir, "future-of-fintech-infrastructure", "type:");

// ---- Main -------------------------------------------------------------------

const main = async () => {
    try { await fs.access(path.join(DIST, "index.html")); }
    catch { err("dist/index.html missing. Run `vite build` first."); process.exit(1); }

    // Bundle the SSR snapshot once, up front, so we can read SITE_URL out of
    // src/constants/site-config.ts via the bundle before any output is written.
    log("bundling server-side snapshot module…");
    const snapshot = await loadSnapshot();
    SITE_URL = snapshot.SITE_URL;
    log("snapshot module ready; SITE_URL =", SITE_URL);

    // Make a pristine copy of dist/ to serve from. The prerender writes its
    // output (per-route index.html files, sitemap, robots) directly into DIST,
    // so we cannot serve from DIST during prerender or those empty outputs
    // would shadow the real built files.
    const SERVED = path.join(ROOT, ".dist-prerender-input");
    await fs.rm(SERVED, { recursive: true, force: true });
    await fs.cp(DIST, SERVED, { recursive: true });
    log("copied dist/ -> .dist-prerender-input/");

    await waitForChrome();
    const wsBase = `http://127.0.0.1:${DEBUG_PORT}`;
    const targetList = await fetchJson(`${wsBase}/json/list`);
    const pageTarget = targetList.find((t) => t.type === "page") ?? targetList[0];

    // Open a separate tab (so we can use about:blank + Page.navigate freely).
    const page = await newPage(wsBase);

    const indexHtml = await fs.readFile(path.join(SERVED, "index.html"), "utf8");
    // Substitute the __SITE_URL__ token baked into index.html so the inline
    // canonical / OG / JSON-LD URLs match the configured site. This is the
    // default head written to every prerendered route.
    const indexHtmlWithSite = indexHtml.replace(/__SITE_URL__/g, SITE_URL);

    // Bundle the server-side snapshot module (already loaded above).
    // Serve the COPY over a tiny static server so relative asset paths resolve.
    const { createServer } = await import("node:http");
    const mime = (p) => {
        if (p.endsWith(".html")) return "text/html; charset=utf-8";
        if (p.endsWith(".js") || p.endsWith(".mjs")) return "application/javascript";
        if (p.endsWith(".css")) return "text/css";
        if (p.endsWith(".json")) return "application/json";
        if (p.endsWith(".webmanifest")) return "application/manifest+json";
        if (p.endsWith(".xml")) return "application/xml";
        if (p.endsWith(".txt")) return "text/plain; charset=utf-8";
        if (p.endsWith(".svg")) return "image/svg+xml";
        if (/\.(png|jpe?g|webp|avif|gif)$/i.test(p)) return "image/" + p.split(".").pop().toLowerCase().replace("jpg", "jpeg");
        return "application/octet-stream";
    };
    const server = createServer(async (req, res) => {
        try {
            const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0]);
            // SPA fallback: any path that doesn't map to a file -> index.html
            let filePath = path.join(SERVED, urlPath === "/" ? "/index.html" : urlPath);
            let stat;
            try { stat = await fs.stat(filePath); } catch {
                filePath = path.join(SERVED, "index.html");
                try { stat = await fs.stat(filePath); } catch { res.statusCode = 404; res.end("404"); return; }
            }
            if (stat.isDirectory()) filePath = path.join(filePath, "index.html");
            const body = await fs.readFile(filePath);
            res.setHeader("Content-Type", mime(filePath));
            res.end(body);
        } catch (e) {
            res.statusCode = 500; res.end(String(e));
        }
    });
    await new Promise((r) => server.listen(0, "127.0.0.1", r));
    const port = server.address().port;
    const siteOrigin = `http://127.0.0.1:${port}`;
    log("serving dist/ on", siteOrigin);

    const projectSlugs = await extractProjectSlugsFromBuild(SERVED);
    log("detected project slugs:", projectSlugs.length);
    const speakingSlugs = await extractSpeakingSlugsFromBuild(SERVED);
    log("detected speaking slugs:", speakingSlugs.length);

    const staticRoutes = ROUTE_FILTER.length
        ? ROUTE_FILTER.filter((r) => !r.startsWith("/projects/") && !r.startsWith("/speaking/"))
        : ["/", "/blogs", "/projects", "/speaking"];
    const projectRoutes = ROUTE_FILTER.length
        ? ROUTE_FILTER.filter((r) => r.startsWith("/projects/"))
        : projectSlugs.map((s) => `/projects/${s}`);
    const speakingRoutes = ROUTE_FILTER.length
        ? ROUTE_FILTER.filter((r) => r.startsWith("/speaking/"))
        : speakingSlugs.map((s) => `/speaking/${s}`);

    const allRoutes = [...staticRoutes, ...projectRoutes, ...speakingRoutes];
    log("routes to prerender:", allRoutes);

    const rendered = new Map();
    for (const route of allRoutes) {
        const url = `${siteOrigin}${route === "/" ? "/" : route}`;
        log("navigating to", url);
        await page.navigateAndWait(url);
        const head = await extractHead(page.evalInPage);
        // Server-side snapshot for this route (semantic <main>…</main>).
        let slug;
        if (route.startsWith("/projects/")) {
            slug = route.replace(/^\/projects\//, "").replace(/\/$/, "");
        } else if (route.startsWith("/speaking/")) {
            slug = route.replace(/^\/speaking\//, "").replace(/\/$/, "");
        }
        const mainHtml = snapshot.renderRouteSnapshot(route, slug);
        rendered.set(route, { head, mainHtml });
        log("  ok title=", JSON.stringify(head.title), "main=", mainHtml.length, "chars");
    }

    // ---- Full profile snapshot (cv.json + llms.txt) ------------------------
    const fullCvHtml = snapshot.renderFullSnapshot();
    const cvPayload = snapshot.buildCvPayload();
    log("generated cv.json with",
        cvPayload.experience.length, "experiences,",
        cvPayload.education.length, "educations,",
        cvPayload.publications.length, "publications,",
        cvPayload.projects.length, "projects,",
        cvPayload.trainings.length, "trainings,",
        cvPayload.awards.length, "awards,",
        (cvPayload.speakings?.length ?? 0), "speakings");

    page.close();
    try { server.close(); } catch {}

    // --- Persist per-route HTML --------------------------------------------
    const writePromises = [];
    for (const [route, { head, mainHtml }] of rendered) {
        // Replace the original head block with the rendered one.
        let newHtml = indexHtmlWithSite.replace(
            /<head>[\s\S]*?<\/head>/i,
            `<head>\n${head.head}\n</head>`
        );
        // Inject the semantic <main> snapshot before <div id="root"> so LLMs
        // and noscript readers see the full profile without executing JS.
        // We also add a <noscript> hint at the top of <body>.
        const noscriptHint =
            '<noscript data-seo="snapshot-notice">' +
            "This page renders an interactive React app. " +
            "A semantic HTML snapshot is provided below for crawlers and screen readers. " +
            'For a machine-readable profile see <a href="/cv.json">/cv.json</a>.' +
            "</noscript>";
        newHtml = newHtml.replace(
            /<div id="root"><\/div>/i,
            `${noscriptHint}\n${mainHtml}\n<div id="root"></div>`
        );
        const outPath = route === "/"
            ? path.join(DIST, "index.html")
            : path.join(DIST, route.replace(/^\//, ""), "index.html");
        writePromises.push(writeFile(outPath, newHtml));
    }

    // --- sitemap.xml --------------------------------------------------------
    const today = new Date().toISOString().slice(0, 10);
    // Prefer the rendered canonical head (it's already been built from the
    // configured SITE_URL via __SITE_URL__ substitution); fall back to the
    // configured value directly.
    const homeCanonical = rendered.get("/")?.canonical ?? `${SITE_URL}/`;
    const siteUrl = (() => {
        try { return new URL(homeCanonical).origin + "/"; }
        catch { return SITE_URL + "/"; }
    })();

    const sitemapEntries = [...rendered.keys()].map((route) => ({
        loc: route === "/" ? siteUrl : `${siteUrl}${route.replace(/^\//, "")}/`,
        lastmod: today,
    }));
    // Add the machine-readable profile files as priority 1.0 entries so any
    // crawler (Googlebot, GPTBot, etc.) finds them first.
    sitemapEntries.unshift({ loc: `${siteUrl}cv.json`, lastmod: today });
    sitemapEntries.unshift({ loc: `${siteUrl}llms.txt`, lastmod: today });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((e) => `    <url><loc>${escapeHtml(e.loc)}</loc><lastmod>${e.lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join("\n")}
</urlset>
`;
    writePromises.push(writeFile(path.join(DIST, "sitemap.xml"), sitemap));

    const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`;
    writePromises.push(writeFile(path.join(DIST, "robots.txt"), robots));

    // --- cv.json (machine-readable profile) -------------------------------
    writePromises.push(
        writeFile(path.join(DIST, "cv.json"), JSON.stringify(cvPayload, null, 2))
    );

    // --- llms.txt (Markdown index following llmstxt.org) -------------------
    const llmsTxt = [
        `# ${cvPayload.name}`,
        ``,
        `> ${cvPayload.headline}`,
        ``,
        `## Summary`,
        ``,
        `${cvPayload.about}`,
        ``,
        `## Machine-readable profile`,
        ``,
        `- Full JSON profile: [${siteUrl}cv.json](${siteUrl}cv.json)`,
        `- HTML snapshot of every route is embedded inline in the page body.`,
        `- Structured data (Schema.org Person): every HTML page includes JSON-LD with name, jobTitle, worksFor, alumniOf, hasCredential, award, knowsAbout, sameAs.`,
        ``,
        `## Quick facts`,
        ``,
        `- **Name:** ${cvPayload.name}`,
        `- **Role:** ${cvPayload.jobTitle}`,
        `- **Location:** ${cvPayload.location}`,
        `- **Current employer:** ${cvPayload.currentEmployer}`,
        `- **Experience entries:** ${cvPayload.experience.length}`,
        `- **Education entries:** ${cvPayload.education.length}`,
        `- **Publications:** ${cvPayload.publications.length}`,
        `- **Projects:** ${cvPayload.projects.length}`,
        `- **Trainings / certifications:** ${cvPayload.trainings.length}`,
        `- **Awards:** ${cvPayload.awards.length}`,
        `- **Speaking engagements:** ${cvPayload.speakings?.length ?? 0}`,
        ``,
        `## Experience`,
        ``,
        ...cvPayload.experience.flatMap((e) => [
            `### ${e.position} — ${e.company}`,
            ``,
            `*${e.duration}${e.location ? ` · ${e.location}` : ""}*`,
            ``,
            ...e.points.map((pt) => `- ${pt}`),
            e.link ? `- Link: ${e.link}` : "",
            ``,
        ]),
        `## Education`,
        ``,
        ...cvPayload.education.flatMap((e) => [
            `### ${e.title}${e.subtitle ? ` — ${e.subtitle}` : ""}`,
            ``,
            `*${e.institute} · ${e.duration}${e.location ? ` · ${e.location}` : ""}*`,
            ``,
            ...e.points.map((pt) => `- ${pt}`),
            e.link ? `- Link: ${e.link}` : "",
            ``,
        ]),
        `## Publications`,
        ``,
        ...cvPayload.publications.map((p) => `- [${p.group}] ${p.title}`),
        ``,
        `## Projects`,
        ``,
        ...cvPayload.projects.flatMap((p) => [
            `### ${p.title}${p.subtitle ? ` — ${p.subtitle}` : ""}`,
            ``,
            `Slug: \`${p.slug}\``,
            p.client ? `Client: ${p.client}` : "",
            p.techs.length ? `Tech: ${p.techs.join(", ")}` : "",
            ``,
            `${p.description}`,
            ``,
            `URL: ${p.url}`,
            ``,
        ]),
        `## Trainings & certifications`,
        ``,
        ...cvPayload.trainings.flatMap((t) => [
            `### ${t.title}`,
            ``,
            ...t.points.map((pt) => `- ${pt.title}${pt.link ? ` (${pt.link})` : ""}`),
            t.link ? `- Program: ${t.link}` : "",
            ``,
        ]),
        `## Speaking`,
        ``,
        ...(cvPayload.speakings ?? []).flatMap((s) => [
            `### ${s.title}${s.role ? ` — ${s.role}` : ""}`,
            ``,
            `*${s.host} · ${s.date}${s.endDate && s.endDate !== s.date ? ` – ${s.endDate}` : ""}${s.location ? ` · ${s.location}` : ""}*`,
            ``,
            s.summary ? `${s.summary}` : "",
            s.url ? `URL: ${s.url}` : "",
            ``,
        ]),
        `## Awards`,
        ``,
        ...cvPayload.awards.map((a) => `- **${a.title}** — ${a.award}${a.link ? ` ([link](${a.link}))` : ""}`),
        ``,
    ].filter((line) => line !== undefined).join("\n");
    writePromises.push(writeFile(path.join(DIST, "llms.txt"), llmsTxt));

    await Promise.all(writePromises);
    log(`wrote ${rendered.size} routes + cv.json + llms.txt + sitemap.xml + robots.txt`);

    // Clean up temp bundle + temp served copy.
    try { await fs.rm(SNAPSHOT_BUNDLE, { force: true }); } catch {}

    // Clean up temp served copy.
    try { await fs.rm(SERVED, { recursive: true, force: true }); } catch {}

    cleanup();
    process.exit(0);
};

main().catch((e) => {
    err("fatal:", e);
    cleanup();
    try { require("node:fs").rmSync?.(path.join(ROOT, ".dist-prerender-input"), { recursive: true, force: true }); } catch {}
    process.exit(1);
});
