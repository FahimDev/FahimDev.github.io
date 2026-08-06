/**
 * Pure helpers extracted from scripts/prerender.mjs so they can be unit-tested
 * without spinning up Chrome / a static server. Three exports:
 *
 *   - substituteSiteUrl(html, siteUrl) -> string
 *   - buildSitemap(origin, entries, date) -> string
 *   - buildLlmsTxt(cvPayload, siteUrl) -> string
 *
 * Re-imported by scripts/prerender.mjs for the production prerender and by
 * scripts/dev-seo-plugin.ts for the dev server.
 */

const escapeHtml = (s) =>
    String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

/**
 * Replace every `__SITE_URL__` token in the given HTML with the configured
 * site URL. This is the canonical place where the base URL gets baked into
 * the static HTML emitted by Vite.
 */
export function substituteSiteUrl(html, siteUrl) {
    return html.replace(/__SITE_URL__/g, siteUrl);
}

/**
 * Build the sitemap.xml body. `origin` is the absolute base URL (no trailing
 * slash). `entries` is an array of `{ loc, lastmod }` describing each URL.
 */
export function buildSitemap(origin, entries, date) {
    const urlEntries = entries
        .map(
            (e) =>
                `    <url><loc>${escapeHtml(e.loc)}</loc><lastmod>${e.lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
        )
        .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

/**
 * Build the llms.txt Markdown index following llmstxt.org. The cv payload
 * must expose the fields: name, headline, about, jobTitle, location,
 * currentEmployer, experience, education, publications, projects, trainings,
 * awards.
 */
export function buildLlmsTxt(cvPayload, siteUrl) {
    const cv = cvPayload;
    const sections = [
        `# ${cv.name}`,
        "",
        `> ${cv.headline}`,
        "",
        `## Summary`,
        "",
        `${cv.about}`,
        "",
        `## Machine-readable profile`,
        "",
        `- Full JSON profile: [${siteUrl}/cv.json](${siteUrl}/cv.json)`,
        "- HTML snapshot of every route is embedded inline in the page body.",
        "- Structured data (Schema.org Person): every HTML page includes JSON-LD with name, jobTitle, worksFor, alumniOf, hasCredential, award, knowsAbout, sameAs.",
        "",
        `## Quick facts`,
        "",
        `- **Name:** ${cv.name}`,
        `- **Role:** ${cv.jobTitle}`,
        `- **Location:** ${cv.location}`,
        `- **Current employer:** ${cv.currentEmployer}`,
        `- **Experience entries:** ${cv.experience.length}`,
        `- **Education entries:** ${cv.education.length}`,
        `- **Publications:** ${cv.publications.length}`,
        `- **Projects:** ${cv.projects.length}`,
        `- **Trainings / certifications:** ${cv.trainings.length}`,
        `- **Awards:** ${cv.awards.length}`,
        "",
        `## Experience`,
        "",
        ...cv.experience.flatMap((e) => [
            `### ${e.position} — ${e.company}`,
            "",
            `*${e.duration}${e.location ? ` · ${e.location}` : ""}*`,
            "",
            ...e.points.map((pt) => `- ${pt}`),
            e.link ? `- Link: ${e.link}` : "",
            "",
        ]),
        `## Education`,
        "",
        ...cv.education.flatMap((e) => [
            `### ${e.title}${e.subtitle ? ` — ${e.subtitle}` : ""}`,
            "",
            `*${e.institute} · ${e.duration}${e.location ? ` · ${e.location}` : ""}*`,
            "",
            ...e.points.map((pt) => `- ${pt}`),
            e.link ? `- Link: ${e.link}` : "",
            "",
        ]),
        `## Publications`,
        "",
        ...cv.publications.map((p) => `- [${p.group}] ${p.title}`),
        "",
        `## Projects`,
        "",
        ...cv.projects.flatMap((p) => [
            `### ${p.title}${p.subtitle ? ` — ${p.subtitle}` : ""}`,
            "",
            `Slug: \`${p.slug}\``,
            p.client ? `Client: ${p.client}` : "",
            p.techs && p.techs.length ? `Tech: ${p.techs.join(", ")}` : "",
            "",
            `${p.description}`,
            "",
            `URL: ${p.url}`,
            "",
        ]),
        `## Trainings & certifications`,
        "",
        ...cv.trainings.flatMap((t) => [
            `### ${t.title}`,
            "",
            ...t.points.map((pt) => `- ${pt.title}${pt.link ? ` (${pt.link})` : ""}`),
            t.link ? `- Program: ${t.link}` : "",
            "",
        ]),
        `## Awards`,
        "",
        ...cv.awards.map((a) => `- **${a.title}** — ${a.award}${a.link ? ` ([link](${a.link}))` : ""}`),
        "",
    ];

    return sections.filter((line) => line !== undefined).join("\n");
}
