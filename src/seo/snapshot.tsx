// Server-side "snapshot" of the route's content. Renders a semantic HTML
// fragment (<main><section>…</section>…</main>) from the same constants the
// React app uses, via react-dom/server. This is what we splice into <body>
// during the prerender so that crawlers and LLMs that don't execute JS get a
// complete, readable profile instead of an empty <div id="root">.
//
// The same code runs in the browser (when the React app boots) and at build
// time (scripts/prerender.mjs) because it only depends on react-dom/server
// and the flat-data helpers in ./routes.

import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import {
    flattenAwards,
    flattenEducations,
    flattenExperiences,
    flattenProjects,
    flattenPublications,
    flattenSkills,
    flattenSpeakings,
    flattenTrainings,
} from "./routes";
import {
    SITE_AUTHOR,
    SITE_DESCRIPTION,
    SITE_HEADLINE,
    SITE_JOB_TITLE,
    SITE_LOCATION,
    SITE_CURRENT_EMPLOYER,
    SITE_ABOUT,
    SITE_URL,
    absoluteUrl,
} from "@/constants/site-config";

// Sanitize user-supplied strings before they go into the prerendered HTML.
// React's renderToString already escapes < > & " ' for us, but we also strip
// stray control characters and collapse whitespace so the final document
// stays small and easy to scan for an LLM.
const clean = (s: string): string =>
    String(s ?? "")
        // Strip ASCII control chars except tab/newline; collapse to space.
        .replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
        .replace(/\s+/g, " ")
        .trim();

const el = (tag: keyof JSX.IntrinsicElements, attrs: Record<string, string | undefined>, ...children: ReactNode[]) => {
    const filtered: Record<string, string> = {};
    for (const [k, v] of Object.entries(attrs)) if (v != null) filtered[k] = v;
    return createElement(tag, filtered, ...children);
};

const text = (s: string) => clean(s);

// ---- Sections ---------------------------------------------------------------

const headshotSection = () =>
    el(
        "section",
        { "aria-label": "Profile", id: "snap-profile" },
        el("h1", {}, text(SITE_AUTHOR)),
        el("p", { id: "snap-headline" }, text(SITE_HEADLINE)),
        el("p", { id: "snap-summary" }, text(SITE_DESCRIPTION))
    );

const aboutSection = () =>
    el(
        "section",
        { "aria-label": "About", id: "snap-about" },
        el("h2", {}, "About"),
        el("p", {}, text(SITE_ABOUT))
    );

const skillsSection = () => {
    const groups = flattenSkills();
    if (!groups.length) return null;
    return el(
        "section",
        { "aria-label": "Skills", id: "snap-skills" },
        el("h2", {}, "Skills"),
        ...groups.map((g) =>
            el(
                "div",
                { class: "snap-skill-group" },
                el("h3", {}, text(g.category)),
                el("p", {}, text(g.options))
            )
        )
    );
};

const experiencesSection = () => {
    const exps = flattenExperiences();
    if (!exps.length) return null;
    // Dual id (snap-experience + experience) so /#experience fragment links
    // resolve even in the prerendered (no-JS) snapshot, before React hydrates.
    return el(
        "section",
        { "aria-label": "Experience", id: "experience snap-experience" },
        el("h2", {}, "Experience"),
        ...exps.map((e) =>
            el(
                "article",
                { class: "snap-item" },
                el("h3", {}, text(`${e.position} · ${e.company}`)),
                el(
                    "p",
                    { class: "snap-meta" },
                    text(`${e.duration}${e.location ? ` · ${e.location}` : ""}`)
                ),
                e.points.length
                    ? el(
                          "ul",
                          {},
                          ...e.points.map((pt) => el("li", {}, text(pt)))
                      )
                    : null,
                e.link
                    ? el("p", {}, el("a", { href: e.link, rel: "noopener noreferrer" }, text(e.link)))
                    : null
            )
        )
    );
};

const educationSection = () => {
    const eds = flattenEducations();
    if (!eds.length) return null;
    return el(
        "section",
        { "aria-label": "Education", id: "snap-education" },
        el("h2", {}, "Education"),
        ...eds.map((e) =>
            el(
                "article",
                { class: "snap-item" },
                el("h3", {}, text(`${e.title}${e.subtitle ? ` — ${e.subtitle}` : ""}`)),
                el("p", { class: "snap-meta" }, text(`${e.institute} · ${e.duration}${e.location ? ` · ${e.location}` : ""}`)),
                e.points.length
                    ? el(
                          "ul",
                          {},
                          ...e.points.map((pt) => el("li", {}, text(pt)))
                      )
                    : null,
                e.link
                    ? el("p", {}, el("a", { href: e.link, rel: "noopener noreferrer" }, text(e.link)))
                    : null
            )
        )
    );
};

const projectsSection = (limit: number) => {
    const projects = flattenProjects();
    if (!projects.length) return null;
    const shown = typeof limit === "number" && limit > 0 ? projects.slice(0, limit) : projects;
    return el(
        "section",
        { "aria-label": "Projects", id: "snap-projects" },
        el("h2", {}, "Projects"),
        ...shown.map((p) =>
            el(
                "article",
                { class: "snap-item", "data-slug": p.slug },
                el("h3", {}, text(p.title)),
                p.subtitle ? el("p", { class: "snap-subtitle" }, text(p.subtitle)) : null,
                p.client ? el("p", { class: "snap-meta" }, text(`Client: ${p.client}`)) : null,
                el("p", {}, text(p.description)),
                p.techs.length
                    ? el(
                          "p",
                          { class: "snap-techs" },
                          text("Tech: " + p.techs.join(", "))
                      )
                    : null,
                el("p", {}, el("a", { href: `/projects/${p.slug}`, rel: "noopener" }, text(absoluteUrl(`/projects/${p.slug}`))))
            )
        )
    );
};

const publicationsSection = () => {
    const pubs = flattenPublications();
    if (!pubs.length) return null;
    // Group by group name (Journal Articles / Conference Proceedings).
    const groups = new Map<string, typeof pubs>();
    for (const p of pubs) {
        if (!groups.has(p.group)) groups.set(p.group, []);
        groups.get(p.group)!.push(p);
    }
    // Dual id (snap-publications + research) so /#research fragment links
    // resolve even in the prerendered (no-JS) snapshot, before React hydrates.
    return el(
        "section",
        { "aria-label": "Publications", id: "research snap-publications" },
        el("h2", {}, "Publications"),
        ...Array.from(groups.entries()).map(([name, items]) =>
            el(
                "div",
                { class: "snap-pub-group" },
                el("h3", {}, text(name)),
                el(
                    "ul",
                    {},
                    ...items.map((p) => el("li", {}, text(p.title)))
                )
            )
        )
    );
};

const trainingsSection = () => {
    const ts = flattenTrainings();
    if (!ts.length) return null;
    return el(
        "section",
        { "aria-label": "Training & Certifications", id: "snap-training" },
        el("h2", {}, "Training & Certifications"),
        ...ts.map((t) =>
            el(
                "article",
                { class: "snap-item" },
                el("h3", {}, text(t.title)),
                t.points.length
                    ? el(
                          "ul",
                          {},
                          ...t.points.map((p) =>
                              el(
                                  "li",
                                  {},
                                  p.link
                                      ? el("a", { href: p.link, rel: "noopener noreferrer" }, text(p.title))
                                      : text(p.title)
                              )
                          )
                      )
                    : null,
                t.link ? el("p", {}, el("a", { href: t.link, rel: "noopener noreferrer" }, text(t.link))) : null
            )
        )
    );
};

const awardsSection = () => {
    const awards = flattenAwards();
    if (!awards.length) return null;
    return el(
        "section",
        { "aria-label": "Awards & Recognition", id: "snap-awards" },
        el("h2", {}, "Awards & Recognition"),
        ...awards.map((a) =>
            el(
                "article",
                { class: "snap-item" },
                el("h3", {}, text(a.title)),
                a.subtitle ? el("p", { class: "snap-subtitle" }, text(a.subtitle)) : null,
                el("p", { class: "snap-meta" }, text(a.award)),
                a.link ? el("p", {}, el("a", { href: a.link, rel: "noopener noreferrer" }, text(a.link))) : null
            )
        )
    );
};

// ---- Entry points -----------------------------------------------------------

// Full snapshot: every section. Used on the home page (/) and as the body of
// cv.json. Safe to call at build time and in the browser.
export const renderFullSnapshot = (): string => {
    // Top-of-page discovery nav so crawlers and JS-disabled visitors can
    // reach the four primary destinations (/projects, /speaking, plus the
    // in-page #experience and #research fragments) from the homepage
    // snapshot. Order matches the React-side <nav> in src/pages/home.tsx.
    const discoveryNav = el(
        "nav",
        { "aria-label": "Primary discovery" },
        el("h2", {}, text("Discover My Work")),
        el(
            "ul",
            {},
            el(
                "li",
                {},
                el("a", { href: "/projects" }, text("Projects"))
            ),
            el(
                "li",
                {},
                el("a", { href: "/#experience" }, text("Experience"))
            ),
            el(
                "li",
                {},
                el("a", { href: "/#research" }, text("Research"))
            ),
            el(
                "li",
                {},
                el("a", { href: "/speaking" }, text("Speaking"))
            )
        )
    );
    const tree = el(
        "main",
        { id: "seo-snapshot", role: "main", "aria-label": "Profile snapshot" },
        discoveryNav,
        headshotSection(),
        aboutSection(),
        skillsSection(),
        experiencesSection(),
        educationSection(),
        projectsSection(0),
        publicationsSection(),
        trainingsSection(),
        awardsSection()
    );
    return renderToString(tree);
};

// Per-page snapshot: only the sections that are relevant for the given route.
export const renderRouteSnapshot = (pathname: string, slug?: string): string => {
    if (pathname.startsWith("/projects/") && slug) {
        const all = flattenProjects();
        const p = all.find((x) => x.slug === slug);
        if (p) {
            const tree = el(
                "main",
                { id: "seo-snapshot", role: "main", "aria-label": `Project: ${p.title}` },
                el(
                    "article",
                    {},
                    el("h1", {}, text(p.title)),
                    p.subtitle ? el("p", { class: "snap-subtitle" }, text(p.subtitle)) : null,
                    p.client ? el("p", { class: "snap-meta" }, text(`Client: ${p.client}`)) : null,
                    el("p", {}, text(p.description)),
                    p.techs.length
                        ? el("p", { class: "snap-techs" }, text("Tech: " + p.techs.join(", ")))
                        : null
                ),
                experiencesSection(),
                skillsSection()
            );
            return renderToString(tree);
        }
    }
    if (pathname === "/blogs") {
        const tree = el(
            "main",
            { id: "seo-snapshot", role: "main", "aria-label": "Blogs index" },
            publicationsSection(),
            trainingsSection()
        );
        return renderToString(tree);
    }
    if (pathname === "/projects") {
        const tree = el(
            "main",
            { id: "seo-snapshot", role: "main", "aria-label": "Projects index" },
            projectsSection(0)
        );
        return renderToString(tree);
    }
    if (pathname.startsWith("/speaking/") && slug) {
        const all = flattenSpeakings();
        const s = all.find((x) => x.slug === slug);
        if (s) {
            const tree = el(
                "main",
                { id: "seo-snapshot", role: "main", "aria-label": `Speaking: ${s.title}` },
                el(
                    "article",
                    {},
                    el("h1", {}, text(s.title)),
                    s.subtitle ? el("p", { class: "snap-subtitle" }, text(s.subtitle)) : null,
                    el(
                        "p",
                        { class: "snap-meta" },
                        text(
                            `${s.host}${s.role ? " · " + s.role : ""} · ${s.date}${s.endDate ? " – " + s.endDate : ""} · ${s.location}`
                        )
                    ),
                    s.summary ? el("p", {}, text(s.summary)) : null,
                    s.topics.length
                        ? el("p", { class: "snap-techs" }, text("Topics: " + s.topics.join(", ")))
                        : null,
                    el(
                        "p",
                        {},
                        el("a", { href: `/speaking/${s.slug}`, rel: "noopener" }, text(absoluteUrl(`/speaking/${s.slug}`)))
                    )
                ),
                experiencesSection(),
                skillsSection()
            );
            return renderToString(tree);
        }
    }
    if (pathname === "/speaking") {
        const all = flattenSpeakings();
        const tree = el(
            "main",
            { id: "seo-snapshot", role: "main", "aria-label": "Speaking index" },
            el(
                "section",
                {},
                el("h1", {}, text("Speaking engagements")),
                all.length === 0
                    ? el("p", {}, text("No speaking engagements on file yet."))
                    : el(
                          "ul",
                          {},
                          ...all.map((s) =>
                              el(
                                  "li",
                                  {},
                                  el(
                                      "a",
                                      { href: `/speaking/${s.slug}` },
                                      text(`${s.title} — ${s.host} · ${s.date}`)
                                  )
                              )
                          )
                      )
            ),
            experiencesSection(),
            skillsSection()
        );
        return renderToString(tree);
    }
    // Fallback: home / unknown -> full snapshot.
    return renderFullSnapshot();
};

// JSON-safe profile payload used to write /cv.json. This is the most reliable
// surface for any LLM that doesn't render HTML.
export const buildCvPayload = () => {
    const exps = flattenExperiences();
    const eds = flattenEducations();
    const skills = flattenSkills();
    const pubs = flattenPublications();
    const trainings = flattenTrainings();
    const awards = flattenAwards();
    const projects = flattenProjects();
    return {
        schemaVersion: 1,
        name: SITE_AUTHOR,
        url: SITE_URL,
        jobTitle: SITE_JOB_TITLE,
        headline: SITE_HEADLINE,
        summary: SITE_DESCRIPTION,
        about: SITE_ABOUT,
        location: SITE_LOCATION,
        currentEmployer: SITE_CURRENT_EMPLOYER,
        skills: skills.map((s) => ({ category: s.category, options: s.options })),
        experience: exps.map((e) => ({
            company: e.company,
            position: e.position,
            duration: e.duration,
            location: e.location,
            points: e.points,
            link: e.link ?? null,
        })),
        education: eds.map((e) => ({
            institute: e.institute,
            title: e.title,
            subtitle: e.subtitle ?? null,
            duration: e.duration,
            location: e.location,
            points: e.points,
            link: e.link ?? null,
        })),
        publications: pubs.map((p) => ({
            group: p.group,
            title: p.title,
            image: p.image ?? null,
        })),
        trainings: trainings.map((t) => ({
            title: t.title,
            link: t.link ?? null,
            points: t.points.map((p) => ({ title: p.title, link: p.link ?? null })),
        })),
        awards: awards.map((a) => ({
            title: a.title,
            subtitle: a.subtitle ?? null,
            award: a.award,
            link: a.link ?? null,
        })),
        projects: projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle ?? null,
            client: p.client ?? null,
            description: p.description,
            techs: p.techs,
            url: absoluteUrl(`/projects/${p.slug}`),
        })),
        speakings: flattenSpeakings().map((s) => ({
            slug: s.slug,
            type: s.type,
            title: s.title,
            subtitle: s.subtitle ?? null,
            host: s.host,
            role: s.role ?? null,
            date: s.date,
            endDate: s.endDate ?? null,
            location: s.location,
            summary: s.summary ?? null,
            topics: s.topics,
            tags: s.tags,
            featured: s.featured ?? false,
            url: absoluteUrl(`/speaking/${s.slug}`),
        })),
    };
};

// Re-export SITE_URL so the prerender script and the dev plugin can read the
// canonical origin directly from the snapshot bundle — without needing any
// env-var plumbing. SITE_CONFIG is exported as the entire config object for
// callers that want richer metadata.
export { SITE_URL };
export { SITE_CONFIG } from "@/constants/site-config";
