import { createElement, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { PROJECTS } from "@/constants/projects";
import { SOCIAL_LINKS } from "@/constants/social-links";
import {
    SITE_URL,
    SITE_NAME,
    SITE_AUTHOR,
    SITE_DESCRIPTION,
    SITE_IMAGE,
    SITE_LOCATION,
    SITE_JOB_TITLE,
    SITE_CURRENT_EMPLOYER,
    SITE_SAME_AS,
    absoluteUrl,
} from "@/constants/site-config";

const toAbsoluteUrl = (path: string): string => absoluteUrl(path);

// Local SITE alias kept so the rest of the file reads naturally. All values
// ultimately come from @/constants/site-config.
const SITE = {
    name: SITE_NAME,
    author: SITE_AUTHOR,
    description: SITE_DESCRIPTION,
    image: SITE_IMAGE,
    url: SITE_URL,
} as const;

const isReactElement = (v: unknown): boolean =>
    typeof v === "object" && v !== null && "type" in (v as Record<string, unknown>);

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

const collectSocialUrls = (): string[] => {
    // Prefer the central mirror from site-config so URLs stay in lockstep with
    // the JSX-bearing social-links constants. Fall back to the raw constants
    // only if a key is missing in the config.
    const out = [...SITE_SAME_AS];
    const has = new Set(out);
    if (!has.has(SOCIAL_LINKS?.github?.url) && typeof SOCIAL_LINKS?.github?.url === "string") {
        out.push(SOCIAL_LINKS.github.url);
    }
    if (!has.has(SOCIAL_LINKS?.linkedin?.url) && typeof SOCIAL_LINKS?.linkedin?.url === "string") {
        out.push(SOCIAL_LINKS.linkedin.url);
    }
    if (!has.has(SOCIAL_LINKS?.twitter?.url) && typeof SOCIAL_LINKS?.twitter?.url === "string") {
        out.push(SOCIAL_LINKS.twitter.url);
    }
    if (!has.has(SOCIAL_LINKS?.facebook?.url) && typeof SOCIAL_LINKS?.facebook?.url === "string") {
        out.push(SOCIAL_LINKS.facebook.url);
    }
    return out;
};

export const buildPersonJsonLd = (): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.author,
    alternateName: "Md. Ariful Islam, Ariful Islam, Md Ariful Islam, M.A. Islam",
    url: SITE.url,
    description: SITE.description,
    image: toAbsoluteUrl(SITE.image),
    jobTitle: SITE_JOB_TITLE,
    worksFor: {
        "@type": "Organization",
        name: SITE_CURRENT_EMPLOYER,
        url: "https://brainstation-23.com/",
        address: { "@type": "PostalAddress", addressLocality: SITE_LOCATION.split(",")[0].trim(), addressCountry: "BD" },
    },
    affiliation: [
        {
            "@type": "Organization",
            name: "University of Stavanger",
            url: "https://www.uis.no/",
            description: "Research collaboration under the 5G-MODaNeI project, funded by the Research Council of Norway (Grant No. 308909).",
        },
        {
            "@type": "Organization",
            name: "Ostad | EdTech Platform",
            url: "https://ostad.app/",
            description: "Instructor and mentor — 695+ students across 5 batches.",
        },
    ],
    alumniOf: [
        {
            "@type": "EducationalOrganization",
            name: "American International University-Bangladesh (AIUB)",
            url: "https://www.aiub.edu/",
            description: "Bachelor of Science in Software Engineering, 2016–2020.",
        },
        {
            "@type": "EducationalOrganization",
            name: "Institute of Business Administration, University of Dhaka",
            url: "https://www.du.ac.bd/",
            description: "ACMP 4.0 — Advance Certificate for Management Professionals, Jul–Dec 2023.",
        },
    ],
    hasCredential: [
        {
            "@type": "EducationalOccupationalCredential",
            name: "Cisco Certified Network Associate (CCNA)",
            credentialCategory: "certificate",
            recognizedBy: { "@type": "Organization", name: "Cisco" },
            url: "https://www.credly.com/users/md-ariful-islam.08336332/badges",
        },
        {
            "@type": "EducationalOccupationalCredential",
            name: "B-TopSE Program: Software Architecture Course",
            credentialCategory: "certificate",
            recognizedBy: { "@type": "Organization", name: "Japan International Cooperation Agency (JICA)" },
            url: "https://wallet.openbadge.net/public/credential/7bcdf08f-1db3-8c26-870b-019c18bb8a1d",
        },
        {
            "@type": "EducationalOccupationalCredential",
            name: "ACMP 4.0 — Advance Certificate for Management Professionals",
            credentialCategory: "certificate",
            recognizedBy: { "@type": "Organization", name: "Institute of Business Administration, University of Dhaka" },
            url: "https://www.du.ac.bd/",
        },
    ],
    award: [
        "Winner — AI and Web3 Integration Category, AWS Global Vibe: AI Coding Hackathon (Slalom, 2025)",
        "Merit Award — International Blockchain Olympiad (IBCOL 2021)",
        "Finalist — National Blockchain Olympiad Bangladesh (BCOLBD 2021)",
    ],
    knowsAbout: [
        "Web3",
        "Blockchain",
        "Distributed Systems",
        "Smart Contracts",
        "Microservice Architecture",
        "Stablecoin Settlement",
        "DeFi",
        "NFT Marketplace Microstructure",
        "Zero-Knowledge Proofs",
        "Hyperledger Fabric",
        "Internet Computer Protocol (ICP)",
        "EVM (Ethereum Virtual Machine)",
        "Rust",
        "Solidity",
        "TypeScript",
        "Python",
        "NestJS",
        "Django",
        "Hardhat",
        "DAO Governance",
        "Decentralized Application (dApp)",
        "Decentralized Exchange (DEX)",
        "GraphQL",
        "Event-Driven Architecture",
        "Microservices",
        "Docker",
        "GitHub Actions",
        "Kong API Gateway",
        "Grafana",
        "OpenTelemetry",
        "Prometheus",
        "ICONIX methodology",
        "UML",
        "Object-Oriented Design",
        "SOLID Principles",
        "Financial Data Exchange (FDX)",
    ],
    sameAs: collectSocialUrls(),
});

export const buildWebsiteJsonLd = (): Record<string, unknown> => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "en",
    author: {
        "@type": "Person",
        name: SITE.author,
        url: SITE.url,
    },
});

export const buildProjectJsonLd = (slug: string): Record<string, unknown> | null => {
    const project = PROJECTS.find((p) => p?.slug === slug);
    if (!project) return null;
    const description = stripHtml(project.description) || project.subtitle || "";
    const imageUrl = project.cover_img ? toAbsoluteUrl(project.cover_img) : toAbsoluteUrl(SITE.image);
    const detail: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        headline: project.subtitle || project.title,
        description: description.slice(0, 500),
        url: toAbsoluteUrl(`/projects/${project.slug}`),
        image: imageUrl,
        author: {
            "@type": "Person",
            name: SITE.author,
            url: SITE.url,
        },
        inLanguage: "en",
    };
    if (project.client) detail["publisher"] = { "@type": "Organization", name: project.client };
    if (Array.isArray(project.techs)) detail["keywords"] = project.techs.join(", ");
    return detail;
};

export const buildJsonLdScript = (data: Record<string, unknown>): string =>
    JSON.stringify(data).replace(/</g, "\\u003c");
