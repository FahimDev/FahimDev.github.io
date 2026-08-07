import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { PROJECTS } from "@/constants/projects";
import { SPEAKINGS } from "@/constants/speakings";
import { EXPERIENCES } from "@/constants/expriences";
import { EDUCATIONS } from "@/constants/educations";
import { SKILLS } from "@/constants/skills";
import { PUBLICATIONS } from "@/constants/publications";
import { TRAININGS } from "@/constants/trainings";
import { MOST_PRODUCT_OFS } from "@/constants/most-proud-ofs";
import {
    SITE_NAME,
    SITE_DESCRIPTION,
    SITE_IMAGE,
    SITE_URL,
} from "@/constants/site-config";

export type RouteMeta = {
    title: string;
    description: string;
    image?: string;
    type?: "website" | "article";
    path: string;
};

// All metadata fields are now sourced from @/constants/site-config. Keep these
// aliases so the rest of this file reads naturally.
const DEFAULT_DESCRIPTION = SITE_DESCRIPTION;
const DEFAULT_IMAGE = SITE_IMAGE;

const isReactElement = (v: unknown): boolean =>
    typeof v === "object" &&
    v !== null &&
    // React elements have $$typeof (symbol) and a type. JSX-as-value gets these too.
    // The constants use JSX expressions like `<div>...</div>`, which evaluate to
    // React elements when imported as JS in a non-JSX context. We detect them
    // defensively so the same code works in both environments.
    "type" in (v as Record<string, unknown>);

const jsxToPlainText = (input: unknown): string => {
    if (input == null) return "";
    if (typeof input === "string") return input;
    if (typeof input === "number" || typeof input === "boolean") return String(input);
    if (Array.isArray(input)) return input.map(jsxToPlainText).filter(Boolean).join(" ");
    if (isReactElement(input)) {
        try {
            // Render to an HTML string and strip tags. This works in both
            // browser and node SSR contexts.
            const html = renderToString(createElement("div", null, input as ReactNode));
            return html
                .replace(/<[^>]*>/g, " ")
                .replace(/\s+/g, " ")
                .trim();
        } catch {
            return "";
        }
    }
    return "";
};

const stripHtml = (input: unknown): string => jsxToPlainText(input);

const truncate = (text: string, max = 160): string => {
    if (text.length <= max) return text;
    const trimmed = text.slice(0, max);
    const lastSpace = trimmed.lastIndexOf(" ");
    return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed).trimEnd() + "...";
};

const buildProjectMeta = (projectSlug: string): RouteMeta => {
    const project = PROJECTS.find((p) => p?.slug === projectSlug);
    const title = project?.title ? `${project.title} — Project` : "Project";
    const rawDescription = stripHtml(project?.description) || project?.subtitle || "";
    const description = truncate(rawDescription || "Project case study by Md. Ariful Islam.");
    return {
        path: `/projects/${projectSlug}`,
        title: `${title} | ${SITE_NAME}`,
        description,
        image: project?.cover_img || DEFAULT_IMAGE,
        type: "article",
    };
};

const buildSpeakingMeta = (speakingSlug: string): RouteMeta => {
    const talk = SPEAKINGS.find((s) => s?.slug === speakingSlug);
    const title = talk?.title ? `${talk.title} — Speaking` : "Speaking";
    const rawDescription = talk?.summary || talk?.subtitle || "";
    const description = truncate(
        rawDescription ||
            "Speaking engagement, lecture, or workshop by Md. Ariful Islam."
    );
    return {
        path: `/speaking/${speakingSlug}`,
        title: `${title} | ${SITE_NAME}`,
        description,
        image: talk?.cover || DEFAULT_IMAGE,
        type: "article",
    };
};

export const ROUTE_META: Record<string, RouteMeta> = {
    "/": {
        path: "/",
        title: `${SITE_NAME} — Software Engineer · Web3 · Blockchain`,
        description: DEFAULT_DESCRIPTION,
        image: DEFAULT_IMAGE,
        type: "website",
    },
    "/blogs": {
        path: "/blogs",
        title: `Blogs | ${SITE_NAME}`,
        description:
            "Engineering blogs by Md. Ariful Islam covering Web3, blockchain, fintech infrastructure, and software architecture.",
        image: DEFAULT_IMAGE,
        type: "website",
    },
    "/projects": {
        path: "/projects",
        title: `Projects | ${SITE_NAME}`,
        description:
            "Selected production projects by Md. Ariful Islam — Web3, blockchain, fintech, and enterprise systems with case studies and outcomes.",
        image: DEFAULT_IMAGE,
        type: "website",
    },
    "/speaking": {
        path: "/speaking",
        title: `Speaking | ${SITE_NAME}`,
        description:
            "Conferences, guest lectures, workshops, panels, and live teaching engagements by Md. Ariful Islam on Web3, blockchain, fintech, and software architecture.",
        image: DEFAULT_IMAGE,
        type: "website",
    },
};

export const PROJECT_SLUGS: string[] = PROJECTS.map((p) => p?.slug).filter(
    (s): s is string => typeof s === "string" && s.length > 0
);

export const SPEAKING_SLUGS: string[] = SPEAKINGS.map((s) => s?.slug).filter(
    (s): s is string => typeof s === "string" && s.length > 0
);

// ---- Flat (JSON-safe) projections -------------------------------------------
// These take the JSX-bearing constants and project them into plain strings and
// arrays so the same data can be re-emitted from the Node prerender (where
// importing the JSX files would require a full TS toolchain). They are also
// what the runtime hook and the server-side snapshot generator share.

export type FlatExperience = {
    company: string;
    position: string;
    duration: string;
    location: string;
    points: string[];
    link?: string;
};

export type FlatEducation = {
    institute: string;
    title: string;
    subtitle?: string;
    duration: string;
    location: string;
    points: string[];
    link?: string;
};

export type FlatSkillGroup = { category: string; options: string };

export type FlatPublication = {
    group: string;
    title: string;
    image?: string;
};

export type FlatTraining = {
    title: string;
    link?: string;
    points: { title: string; link?: string }[];
};

export type FlatAward = {
    title: string;
    subtitle?: string;
    award: string;
    link?: string;
};

export type FlatProject = {
    slug: string;
    title: string;
    subtitle?: string;
    client?: string;
    description: string;
    techs: string[];
};

export const flattenSkills = (): FlatSkillGroup[] =>
    (SKILLS ?? []).map((s: any) => ({
        category: String(s?.category ?? "").trim(),
        options: String(s?.options ?? "").trim(),
    })).filter((s) => s.category);

export const flattenExperiences = (): FlatExperience[] =>
    (EXPERIENCES ?? []).map((e: any) => ({
        company: String(e?.company ?? "").trim(),
        position: String(e?.position ?? "").trim(),
        duration: String(e?.duration ?? "").trim(),
        location: String(e?.location ?? "").trim(),
        points: Array.isArray(e?.points)
            ? e.points.map((p: unknown) => jsxToPlainText(p)).filter(Boolean)
            : [],
        link: typeof e?.link === "string" ? e.link : undefined,
    })).filter((e) => e.company);

export const flattenEducations = (): FlatEducation[] =>
    (EDUCATIONS ?? []).map((e: any) => ({
        institute: String(e?.institute ?? "").trim(),
        title: String(e?.title ?? "").trim(),
        subtitle: String(e?.subtitle ?? "").trim() || undefined,
        duration: String(e?.duration ?? "").trim(),
        location: String(e?.location ?? "").trim(),
        points: Array.isArray(e?.points)
            ? e.points.map((p: unknown) => jsxToPlainText(p)).filter(Boolean)
            : [],
        link: typeof e?.link === "string" ? e.link : undefined,
    })).filter((e) => e.institute);

export const flattenPublications = (): FlatPublication[] => {
    const out: FlatPublication[] = [];
    for (const group of (PUBLICATIONS ?? []) as any[]) {
        const groupTitle = String(group?.title ?? "").trim() || "Publications";
        for (const p of (group?.points ?? []) as any[]) {
            out.push({
                group: groupTitle,
                title: jsxToPlainText(p?.title) || "",
                image: typeof p?.image === "string" ? p.image : undefined,
            });
        }
    }
    return out.filter((p) => p.title);
};

export const flattenTrainings = (): FlatTraining[] =>
    (TRAININGS ?? []).map((t: any) => ({
        title: String(t?.title ?? "").trim(),
        link: typeof t?.link === "string" ? t.link : undefined,
        points: Array.isArray(t?.points)
            ? t.points.map((p: any) => ({
                  title: jsxToPlainText(p?.title) || String(p?.title ?? ""),
                  link: typeof p?.link === "string" ? p.link : undefined,
              })).filter((p: { title: string }) => p.title)
            : [],
    })).filter((t) => t.title);

export const flattenAwards = (): FlatAward[] =>
    (MOST_PRODUCT_OFS ?? []).map((a: any) => ({
        title: String(a?.title ?? "").trim(),
        subtitle: String(a?.subtitle ?? "").trim() || undefined,
        award: String(a?.award ?? "").trim(),
        link: typeof a?.link === "string" ? a.link : undefined,
    })).filter((a) => a.title);

export const flattenProjects = (): FlatProject[] =>
    (PROJECTS ?? [])
        .map((p: any) => {
            const slug = String(p?.slug ?? "").trim();
            if (!slug) return null;
            return {
                slug,
                title: String(p?.title ?? "").trim(),
                subtitle: String(p?.subtitle ?? "").trim() || undefined,
                client: String(p?.client ?? "").trim() || undefined,
                description: jsxToPlainText(p?.description) || String(p?.subtitle ?? ""),
                techs: Array.isArray(p?.techs)
                    ? p.techs.map((t: unknown) => jsxToPlainText(t)).filter(Boolean)
                    : [],
            } as FlatProject;
        })
        .filter((p): p is FlatProject => p !== null);

export const resolveRouteMeta = (pathname: string, slug?: string): RouteMeta => {
    if (pathname.startsWith("/projects/") && slug) {
        return buildProjectMeta(slug);
    }
    if (pathname.startsWith("/speaking/") && slug) {
        return buildSpeakingMeta(slug);
    }
    return (
        ROUTE_META[pathname] ?? {
            ...ROUTE_META["/"],
            path: pathname,
        }
    );
};

export const SITE = {
    name: SITE_NAME,
    author: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    image: DEFAULT_IMAGE,
    url: SITE_URL,
};
