// Single source of truth for site-wide metadata.
//
// Every place that needs your name, bio, base URL, employer, default image,
// social URLs, etc. must import from this file. Change one value here and it
// propagates to:
//   - the React app (via Vite's import)
//   - the prerendered HTML head (via the snapshot bundle)
//   - /cv.json and /llms.txt (via the prerender script)
//   - the inline JSON-LD in index.html (via Vite's index.html transform)
//
// To deploy to a different domain, change SITE_URL below. No environment
// variables, no .env files, no build flags — just this one constant.

const trimTrailingSlash = (s: string): string => s.replace(/\/+$/, "");

// Canonical base URL for the deployed application. Override per-deployment
// by editing this single line.
const SITE_URL_RAW = "https://ariful-islam.pages.dev/";

export const SITE_URL: string = trimTrailingSlash(SITE_URL_RAW);

// ---- Identity ---------------------------------------------------------------

export const SITE_AUTHOR = "Md. Ariful Islam";
export const SITE_NAME = "Md. Ariful Islam";
export const SITE_JOB_TITLE = "Software Engineer";
export const SITE_HEADLINE = "Software Engineer · Web3 · Blockchain · Distributed Systems";
export const SITE_LOCATION = "Dhaka, Bangladesh";
export const SITE_CURRENT_EMPLOYER = "BrainStation 23 PLC.";

export const SITE_DESCRIPTION =
    "Portfolio of Md. Ariful Islam — software engineer building production Web3, blockchain, and enterprise systems. Projects, publications, training, and engineering writing.";

// Long-form bio used in the snapshot, llms.txt, and JSON-LD `about` field.
// Keep this up to date as you ship new work.
export const SITE_ABOUT =
    "Md. Ariful Islam is a software engineer specializing in production Web3, blockchain, and enterprise systems. He has authored IEEE Access and ICBC publications, led a Research Council of Norway–funded healthcare DLT project, and shipped commercial Web3 products (FinCube, Hoteler××m, Fischerm××y, HK Sevens NFT). He currently teaches 695+ students on Ostad and works as Senior Software Engineer at Brain Station 23 PLC.";

// Default share image (relative to site root).
export const SITE_IMAGE = "/images/OpenGraph-metadata.png";

// ---- Social URLs ------------------------------------------------------------
// Used in JSON-LD `sameAs` and the snapshot. Components that need icons (JSX)
// still import from @/constants/social-links — this is the URL-only mirror.

export const SITE_SOCIAL_URLS = {
    github: "https://github.com/fahimdev",
    twitter: "https://x.com/FahimDev0373",
    facebook: "https://www.facebook.com/arif.fahim0373",
    linkedin: "https://www.linkedin.com/in/engr-arif/",
} as const;

export const SITE_SAME_AS: readonly string[] = [
    SITE_SOCIAL_URLS.github,
    SITE_SOCIAL_URLS.twitter,
    SITE_SOCIAL_URLS.facebook,
    SITE_SOCIAL_URLS.linkedin,
];

// ---- Helpers ----------------------------------------------------------------

/**
 * Convert any path-or-URL into an absolute URL using SITE_URL.
 * - If `path` already starts with http(s)://, return it unchanged.
 * - If `path` is empty, return SITE_URL.
 * - Otherwise join with a single slash between origin and path.
 */
export const absoluteUrl = (path: string | undefined | null): string => {
    if (!path) return SITE_URL;
    if (/^https?:\/\//i.test(path)) return path;
    const trimmed = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${trimmed}`;
};

// ---- Convenience bundle -----------------------------------------------------

export const SITE_CONFIG = {
    url: SITE_URL,
    author: SITE_AUTHOR,
    name: SITE_NAME,
    jobTitle: SITE_JOB_TITLE,
    headline: SITE_HEADLINE,
    location: SITE_LOCATION,
    currentEmployer: SITE_CURRENT_EMPLOYER,
    description: SITE_DESCRIPTION,
    about: SITE_ABOUT,
    image: SITE_IMAGE,
    socialUrls: SITE_SOCIAL_URLS,
    sameAs: SITE_SAME_AS,
    absoluteUrl,
} as const;

export default SITE_CONFIG;
