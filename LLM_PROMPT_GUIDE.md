# LLM Prompt Guide — FahimDev Portfolio

> A reference guide for any LLM that is asked to **add a new feature** to this
> repository. Read the **Prime Directive** and the **Eight Rules** before
> writing any code. Follow the **Feature Prompt Template** for every new
> feature. Validate against the **Self-Verification Checklist** before opening
> a PR.

---

## 1. The Prime Directive

> **One source of truth per feature, surfaced through typed routes, prerendered
> into static HTML, shipped to Cloudflare Pages.**

Every feature in this codebase obeys this rule. If a proposed change violates
it, redesign the change — never compromise the rule.

---

## 2. The Six Layers (in order of dependency)

| Layer | Path | Responsibility |
| --- | --- | --- |
| **1. Data** | `src/constants/<feature>.tsx` | One file, one typed array. The single source of truth. |
| **2. Routes** | `src/seo/routes.ts` | Derives slug lists, builds `ROUTE_META`, exposes a `useRouteSeoConfig` type. |
| **3. Pages** | `src/pages/<feature>.tsx`, `src/pages/<feature>-view.tsx` | React components for the archive and the detail page. |
| **4. Components** | `src/components/<feature>/*` | Reusable UI pieces scoped to the feature. |
| **5. Layout** | `src/layouts/root.tsx` | React Router registrations. |
| **6. Prerender + Snapshot** | `scripts/prerender.mjs`, `src/seo/snapshot.tsx` | Static HTML emission + crawable SSR snapshot. |

When a feature is fully wired, all six layers change. When it is not, the
feature is incomplete.

---

## 3. The Eight Rules

1. **One source of truth per feature.** Every piece of content for a feature
   lives in exactly one file. No per-slug data files, no JSON sidecars, no
   duplication of the same blurb across components.
2. **Slugs are explicit, derived consumers stay in `routes.ts`.** Each item
   in the constants array declares its own `slug` field. The list of slugs
   consumed by the prerenderer is derived in `src/seo/routes.ts` via
   `array.map((x) => x?.slug).filter(Boolean)`. Never export a parallel
   `SLUGS` tuple from the constants file.
3. **`ROUTE_META` is the home of SEO metadata.** Every route — including
   dynamic ones — has an entry in `ROUTE_META` keyed by the path pattern
   (e.g. `"/projects/:slug"`). The entry is a function that takes the
   resolved meta and returns the meta object mixed with overrides.
4. **Pages read slugs from `useParams()`, data from the constants array.**
   The page does `useParams<{ slug: string }>()` and then
   `PROJECTS.find((p) => p?.slug === slug)`. No router-side data loaders.
5. **The prerender script is the source of truth for the site map.** Every
   route that should appear in `sitemap.xml` and be written to
   `dist/<route>/index.html` must be registered in `scripts/prerender.mjs`.
   The `rendered` Map there is what Cloudflare deploys.
6. **Snapshot plus JSON-LD plus head meta, every page, every time.** Every
   route must have a `renderRouteSnapshot` branch in `src/seo/snapshot.tsx`
   (so crawlers see content even with JS off), a structured-data builder
   in `src/seo/structuredData.ts` (so crawlers see entities), and a
   `ROUTE_META` entry (so crawlers see title/description/og).
7. **Native HTML over JS frameworks.** Use `<dialog>` for modals, `<details>`
   for collapsibles, native carousel for swiping (see `src/components/ui/carousel.tsx`).
   Prefer CSS utilities from `src/utils/style.ts` over inline `style`.
8. **One feature, one PR, one commit per logical layer.** A feature PR
   should touch roughly: constants (`+`), routes (`+`), pages (`+`),
   components (`+`), layout (`+`), prerender (`+`), snapshot (`+`). Each
   of these is a candidate for its own commit, but at minimum the PR
   should be atomic and the build should be green at every commit.

---

## 4. Existing Project Structure (the relevant subset)

```
src/
  constants/
    blogs.tsx                  # BLOGS: any[]  (single source of truth)
    educations.tsx             # EDUCATIONS: any[]
    expriences.tsx             # EXPERIENCES: any[]
    keywords.tsx               # KEYWORDS: string[]
    most-proud-ofs.tsx
    projects.tsx               # PROJECTS: any[]  (single source of truth)
    publications.tsx
    site-config.ts             # SITE_URL, SITE_AUTHOR, SITE_IMAGE, etc.
    skills.ts
    social-links.tsx
    trainings.tsx
  pages/
    blogs.tsx                  # archive page
    blog-view.tsx              # detail page
    home.tsx
    projects.tsx               # archive page
    project-view.tsx           # detail page
  components/
    blog/
      BlogCard.tsx
    home/
      Projects.tsx
    project/
      ChallengeCard.tsx
      Gallery.tsx
      MoreAboutProject.tsx
    ui/
      button.tsx               # shadcn-style primitive
      card.tsx
      carousel.tsx
      collapsible.tsx
      tooltip.tsx
  layouts/
    root.tsx                   # <Routes> for the whole app
  seo/
    routes.ts                  # ROUTE_META, slug derivations, types
    snapshot.tsx               # renderFullSnapshot, renderRouteSnapshot
    structuredData.ts          # buildPersonJsonLd, etc.
    useRouteSeo.ts             # runtime <head> tag injection
scripts/
  prerender.mjs                # headless Chrome prerender + sitemap
  prerender-helpers.mjs
public/
  images/
    projects/<slug>/cover.jpg  # featured image for a project
    projects/<slug>/...        # gallery images
```

There is **no** `src/data/` directory. There are **no** per-slug data files.
Do not invent them.

---

## 5. Feature Prompt Template

Give this template to any LLM (or human) when adding a feature. The expected
input is the `<feature>` name and a precise description of the data shape
the user wants.

### Step 1 — Define the data shape

Write a single sentence that names:
- the array name (UPPER_SNAKE_CASE, plural),
- the eight or so fields every item must have,
- any optional fields.

Example: *"`SPEAKINGS: any[]` where each item has `slug`, `type`, `title`,
`subtitle`, `host`, `role`, `date`, `location`, `cover`, `summary`, `tags`,
`featured`, `topics`, `interaction`, `keyTakeaways`, `photos`, `evidence`,
`related`."*

### Step 2 — Create `src/constants/<feature>.tsx`

One file. One exported array. Each item has all required fields populated.
Rich text (`description`, `summary`) is JSX when the feature needs inline
formatting; otherwise a plain string. Images use absolute paths under
`/images/<feature>/<slug>/...` so they survive the prerender rewrite.

### Step 3 — Extend `src/seo/routes.ts`

Three additions, in this order:

1. Import the array.
2. Derive the slug list:
   ```ts
   export const SPEAKING_SLUGS: string[] = SPEAKINGS
     .map((s) => s?.slug)
     .filter((s): s is string => Boolean(s));
   ```
3. Add two `ROUTE_META` entries: one for the archive (`"/speaking"`) and
   one for the detail (`"/speaking/:slug"`). Mirror the existing
   `"/projects"` and `"/projects/:slug"` entries. Extend `TYPE_CARDS_MAPPING`
   if the feature has a per-item type that drives the card layout.

### Step 4 — Create `src/pages/<feature>.tsx` (archive)

Hero with H1, supporting copy, image. (Optional) chip filter if there are
more than four items. Year-grouped grid of cards. Featured card on top if
any item has `featured: true`. Modeled on `src/pages/projects.tsx`.

### Step 5 — Create `src/pages/<feature>-view.tsx` (detail)

`useParams<{ slug: string }>()` + `find` in the constants array. Breadcrumb,
title block, right-side metadata table, hero image, About, Gallery,
Key Takeaways, Evidence, Related, CTA. Modeled on `src/pages/project-view.tsx`.

### Step 6 — Create `src/components/<feature>/*`

One component per visual concept. **Do not put JSX for the archive or
detail page in `pages/<feature>.tsx` directly** — pages compose components
exactly the way `src/pages/projects.tsx` composes `ProjectCard` and
`src/pages/project-view.tsx` composes `Gallery`, `ChallengeCard`, and
`MoreAboutProject`.

### Step 7 — Wire routes in `src/layouts/root.tsx`

Add two `<Route>` entries next to the existing `/projects` and
`/projects/:slug` entries. No new router file. No lazy-loaded chunk unless
the feature is genuinely heavy.

### Step 8 — Add structured data in `src/seo/structuredData.ts`

Add a `build<Feature>JsonLd(item)` builder. Apply it via `useRouteSeo` in
the detail page. The archive page optionally emits an `ItemList` if there
are many entries.

### Step 9 — Extend `src/seo/snapshot.tsx`

Add a `renderRouteSnapshot` branch for `<feature>` and `<feature>/:slug`.
Include the new feature in `renderFullSnapshot` if it is part of the
profile. Extend `buildCvPayload` if the feature belongs in the CV payload.

### Step 10 — Extend `scripts/prerender.mjs`

Add the archive route to the static-route list and the detail route to the
dynamic-route loop (the same pattern that already handles `/projects/:slug`).
Extend the sitemap emission to include the new archive URL and every
detail URL.

---

## 6. Worked Example — Speaking

This is the worked example for adding a `/speaking` and `/speaking/:slug`
feature. Read it once end-to-end before starting your own feature.

### Step 1 — Data shape

> `SPEAKINGS: any[]` where each item has `slug`, `type`, `title`, `subtitle`,
> `host`, `role`, `date`, `location`, `cover`, `summary`, `tags`,
> `featured?`, `topics`, `interaction`, `keyTakeaways?`, `photos`,
> `evidence?`, `related?`.

### Step 2 — `src/constants/speakings.tsx`

```tsx
export const SPEAKINGS: any[] = [
  {
    slug: "future-of-fintech-2024",
    type: "conference",
    title: "The Future of Fintech Infrastructure",
    host: "BD Finance Summit",
    role: "Speaker",
    date: "2024-11-12",
    location: "Dhaka, BD",
    cover: "/images/speaking/future-of-fintech-2024/cover.jpg",
    summary: "...",
    tags: ["Fintech", "Engineering"],
    featured: true,
    topics: ["Payments", "Ledgers"],
    interaction: ["Q&A", "Panel"],
    // ...
  },
  // ...3 more
];
```

### Step 3 — `src/seo/routes.ts`

Add:

```ts
import { SPEAKINGS } from "../constants/speakings";

export const SPEAKING_SLUGS: string[] = SPEAKINGS
  .map((s) => s?.slug)
  .filter((s): s is string => Boolean(s));

// In ROUTE_META:
"/speaking": (meta) => ({
  ...meta,
  title: `Speaking — ${SITE_AUTHOR}`,
  description: "Talks, panels, and workshops.",
  ogImage: DEFAULT_IMAGE,
}),
"/speaking/:slug": (meta) => {
  const s = SPEAKINGS.find((x) => x?.slug === meta.params?.slug);
  return {
    ...meta,
    title: s ? `${s.title} — ${SITE_AUTHOR}` : meta.title,
    description: s?.summary ?? meta.description,
    ogImage: s?.cover ?? DEFAULT_IMAGE,
  };
},
```

### Step 4 — `src/pages/speakings.tsx`

Mirror `src/pages/projects.tsx`. Hero, optional chip filter, featured card,
year-grouped grid.

### Step 5 — `src/pages/speaking-view.tsx`

Mirror `src/pages/project-view.tsx`. Breadcrumb, title, metadata table,
hero image, About, Gallery, Key Takeaways, Evidence, Related, CTA.

### Step 6 — `src/components/speaking/*`

`SpeakingCard.tsx`, `SpeakingGallery.tsx`, `SpeakingEvidence.tsx`.

### Step 7 — `src/layouts/root.tsx`

Add:

```tsx
<Route path="/speaking" element={<Speakings />} />
<Route path="/speaking/:slug" element={<SpeakingView />} />
```

### Step 8 — `src/seo/structuredData.ts`

Add `buildSpeakingEventJsonLd(item)` with `schema.org/Event`, `Performer`
(`Person`), `location` (`Place`), `startDate`, `description`, `image`.

### Step 9 — `src/seo/snapshot.tsx`

Add `renderRouteSnapshot` branches for `/speaking` and `/speaking/:slug`,
and include `SPEAKINGS` in `buildCvPayload` under the `speakings` key.

### Step 10 — `scripts/prerender.mjs`

Add `/speaking` to the static routes and
`/speaking/${SPEAKING_SLUGS.map(s => encodeURIComponent(s)).join("|")}`
to the dynamic-route pattern. Confirm both URLs appear in the sitemap.

### Verification

```bash
npx tsc --noEmit
npm run build
npm run build:seo
# Inspect dist/speaking/index.html
# Inspect dist/speaking/future-of-fintech-2024/index.html
# Inspect dist/sitemap.xml
grep -c "speaking" dist/sitemap.xml
grep -c "schema.org/Event" dist/speaking/future-of-fintech-2024/index.html
```

---

## 7. Self-Verification Checklist (run before opening a PR)

- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` passes.
- [ ] `npm run build:seo` passes.
- [ ] `dist/<archive>/index.html` exists and contains the H1.
- [ ] `dist/<archive>/<slug>/index.html` exists for every slug.
- [ ] `dist/sitemap.xml` includes every new URL.
- [ ] `dist/cv.json` reflects the new feature.
- [ ] `dist/llms.txt` reflects the new feature (it lists every page).
- [ ] The detail page returns 200 with content when JS is disabled.
- [ ] The detail page returns 200 with content when JS is enabled.
- [ ] New nav link routes to the right page on both desktop and mobile.
- [ ] No new dependency was added without justification.
- [ ] No `useEffect` was used where a derived value would do.
- [ ] No `useState` was used where a URL param would do.

---

## 8. Anti-Patterns (do not do any of these)

- **Per-slug data files.** `src/data/projects/<slug>.ts` does not exist and
  must not be invented. The constants file is the source of truth.
- **A parallel `SLUGS` tuple.** Slugs are derived in `routes.ts`, not
  exported from constants.
- **A separate router file.** Routing lives in `src/layouts/root.tsx`.
- **Building a JSON sidecar for the snapshot.** Snapshot is built by
  `snapshot.tsx` from the same constants array — never from a generated
  JSON.
- **Per-feature prerender script.** All routes go through the same
  `scripts/prerender.mjs`.
- **Adding a new top-level `package.json` dependency** for a feature that
  could be implemented with what's already in `node_modules`. Tailwind,
  shadcn primitives, React Router, and the existing `src/components/ui/*`
  primitives are usually enough.
- **Adding a state library.** None of the features need one. URL params
  plus local state are sufficient.
- **Inline `style={{ ... }}`.** Use Tailwind classes or utilities from
  `src/utils/style.ts`.
- **Modal libraries.** Use native `<dialog>`.
- **Logging inside React components.** Production builds should not log.
  If you need to debug prerender, log in `scripts/prerender.mjs` only.

---

## 9. Verification Commands (most useful, in order)

```bash
# Type-check only
npx tsc --noEmit

# Build the SPA
npm run build

# Build SEO artefacts (sitemap, snapshot HTML, llms.txt, cv.json)
npm run build:seo

# Inspect what the prerender wrote
ls -la dist/projects/        # archive
ls -la dist/projects/fahim-portfolio/  # detail
cat dist/sitemap.xml | grep -c '<url>'
cat dist/cv.json | head -60

# Inspect the rendered HTML for a single page
grep -E "<h1|og:title|application/ld\+json" \
  dist/projects/fahim-portfolio/index.html
```

---

## 10. Adapting the Template for Smaller Features

For a feature that touches only one or two layers (e.g. a new element on
the home page that does not need per-item data), keep the same six-layer
discipline but collapse steps:

- If you add a constant — also add the slug derivation and `ROUTE_META`
  entry.
- If you add a page — also add the route, the snapshot branch, and the
  prerender entry.
- If you add a component — also wire it into the page that uses it.
- Never add a piece of UI that is not reachable from a registered route.

---

## 11. Files This Guide Touches

When you follow the template, expect to create/modify roughly:

| File | Change |
| --- | --- |
| `src/constants/<feature>.tsx` | Create |
| `src/seo/routes.ts` | Extend (`ROUTE_META`, slug list, `TYPE_CARDS_MAPPING`) |
| `src/pages/<feature>.{tsx,view.tsx}` | Create |
| `src/components/<feature>/*` | Create |
| `src/layouts/root.tsx` | Extend (two `<Route>` entries) |
| `src/seo/structuredData.ts` | Extend (builder) |
| `src/seo/snapshot.tsx` | Extend (`renderRouteSnapshot`, `buildCvPayload`) |
| `scripts/prerender.mjs` | Extend (static + dynamic route handling, sitemap) |
| `src/components/Navbar.tsx` | Extend (one nav item) |

---

## 12. References

- `SEO_LEARNING.md` — the SEO subsystem's design notes, including the
  WebSocket polyfill, the snapshot-hiding trick, and the OG image fix.
- `src/seo/snapshot.tsx` — the SSR snapshot server.
- `src/seo/routes.ts` — `ROUTE_META` and slug derivations.
- `scripts/prerender.mjs` — the prerender pipeline.
- `src/constants/projects.tsx` — the canonical example of a single-file
  source of truth. Mirror its shape for every new feature.
