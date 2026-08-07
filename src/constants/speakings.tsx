import { FaYoutube, FaFilePowerpoint, FaNewspaper } from "react-icons/fa";
import { SiGoogleslides, SiZoom } from "react-icons/si";

// Single source of truth for every speaking engagement: conferences, guest
// lectures, workshops, panels, and live teaching. One exported array, one file.
//
// Field reference (all required unless marked):
//   slug        — URL slug for /speaking/:slug
//   type        — "conference" | "guest-lecture" | "workshop" | "panel" | "live-teaching"
//   title       — Talk title
//   subtitle    — One-line summary
//   host        — Hosting organization or event
//   role        — "Speaker" | "Panelist" | "Instructor" | "Moderator" | "Keynote"
//   date        — ISO date (YYYY-MM-DD); used for grouping
//   endDate     — Optional ISO date; defaults to date
//   location    — City, Country (or "Virtual")
//   cover       — Path under /images/speaking/<slug>/cover.*
//   summary     — Short description shown on archive cards and detail meta
//   tags        — Free-form labels for filtering
//   featured?   — If true, the entry is rendered as the hero card on /speaking
//   topics      — Outline bullets (what the talk covered)
//   interaction — How the audience engaged ("Q&A", "Panel", "Live coding", ...)
//   keyTakeaways? — Optional array of memorable outcomes
//   photos      — Array of { src, alt, caption? } for the gallery + lightbox
//   evidence?   — Array of { type, url, label } for slides / recording / press
//   related?    — Array of { kind, ref } pointing to projects / publications
//
// Image paths are absolute (start with `/`) so they survive the prerender's
// head rewrite and resolve correctly when served from the SPA root.

export const SPEAKINGS: any[] = [
    {
        slug: "ostad-software-architecture-live",
        type: "live-teaching",
        title: "Software Architecture & System Design — Live Cohort",
        subtitle:
            "A 12-week live cohort for 120+ learners covering architecture patterns, trade-offs, and a capstone distributed-system design",
        host: "Ostad · EdTech Platform",
        role: "Instructor",
        date: "2024-09-01",
        endDate: "2024-11-30",
        location: "Dhaka, Bangladesh",
        cover: "/images/speaking/ostad-software-architecture-live/cover.jpg",
        summary:
            "Twelve weeks of live, project-based instruction in software architecture and system design, taught to 120+ working engineers across four cohorts. Each cohort ships a distributed-system capstone.",
        tags: ["Live Teaching", "Architecture", "Distributed Systems"],
        featured: true,
        topics: [
            "Architectural drivers, quality attributes, and trade-off analysis",
            "Monoliths, modular monoliths, and microservices in practice",
            "Event-driven systems, sagas, and outbox patterns",
            "Caching, consistency models, and read/write scaling",
            "Observability, SLOs, and on-call readiness",
            "Capstone: design review of a multi-tenant SaaS backend",
        ],
        interaction: [
            "Live lectures (3 hours/week)",
            "Weekly office hours",
            "Capstone design review",
            "Code-review on student PRs",
        ],
        keyTakeaways: [
            "120+ active learners across 4 cohorts",
            "Average capstone grade 4.6/5 from peer review",
            "75% of graduates moved into architecture or staff-engineer roles within 6 months",
        ],
        photos: [
            {
                src: "/images/speaking/ostad-software-architecture-live/01-cohort.jpg",
                alt: "Live cohort session — 3rd batch kickoff",
                caption: "Cohort 3 kickoff — 36 learners, 3 time zones",
            },
            {
                src: "/images/speaking/ostad-software-architecture-live/02-whiteboard.jpg",
                alt: "Whiteboard walkthrough of the saga pattern",
                caption: "Saga pattern walkthrough on the virtual whiteboard",
            },
            {
                src: "/images/speaking/ostad-software-architecture-live/03-capstone.jpg",
                alt: "Capstone design review in progress",
                caption: "Final-week capstone design review",
            },
        ],
        evidence: [
            {
                type: "platform",
                url: "https://ostad.app/courses/software-architecture-and-system-design",
                label: "Course page on Ostad",
            },
            {
                type: "press",
                url: "https://ostad.app/blog/spotlight-ariful-islam",
                label: "Instructor spotlight",
            },
        ],
        related: [
            { kind: "project", ref: "workforce-management-rota-compliance" },
        ],
    },
    {
        slug: "future-of-fintech-infrastructure",
        type: "conference",
        title: "The Future of Fintech Infrastructure — Stablecoin Settlement & Compliance",
        subtitle:
            "How programmable cross-border settlement and audit-grade observability are reshaping treasury operations for trade and escrow flows",
        host: "BD Finance Summit 2024",
        role: "Speaker",
        date: "2024-11-12",
        location: "Dhaka, Bangladesh",
        cover: "/images/speaking/future-of-fintech-infrastructure/cover.jpg",
        summary:
            "A 35-minute keynote at the BD Finance Summit on production stablecoin settlement, AML compliance, and the observability stack required to operate it.",
        tags: ["Fintech", "Web3", "Conference", "Keynote"],
        topics: [
            "Why nostro pre-funding is the wrong default for cross-border B2B",
            "Programmable settlement with stablecoins and audit-grade proof-of-reserve",
            "Bridging digital assets with legacy ERP / custody / treasury systems",
            "Observability as a compliance primitive: OpenTelemetry, Prometheus, Grafana",
            "Pilot results: 40% reduction in nostro pre-funding, 65% faster reconciliation",
        ],
        interaction: [
            "Q&A with the audience",
            "Panel discussion with central-bank and treasury representatives",
        ],
        keyTakeaways: [
            "Standing-room audience of 280+",
            "Coverage in two fintech trade publications the following week",
            "Two pilot follow-ups with trade-finance partners",
        ],
        photos: [
            {
                src: "/images/speaking/future-of-fintech-infrastructure/01-stage.jpg",
                alt: "On stage at BD Finance Summit 2024",
                caption: "Main hall — BD Finance Summit 2024",
            },
            {
                src: "/images/speaking/future-of-fintech-infrastructure/02-panel.jpg",
                alt: "Panel discussion with central-bank representatives",
                caption: "Panel: programmable money and central-bank oversight",
            },
            {
                src: "/images/speaking/future-of-fintech-infrastructure/03-qa.jpg",
                alt: "Q&A session after the keynote",
                caption: "Q&A with the audience after the keynote",
            },
            {
                src: "/images/speaking/future-of-fintech-infrastructure/04-slides.jpg",
                alt: "Slide deck on the projector",
                caption: "Pilot results slide — 40% reduction in nostro pre-funding",
            },
        ],
        evidence: [
            {
                type: "slides",
                url: "https://github.com/fahimdev/talks/fintech-infrastructure-2024",
                label: "Slide deck on GitHub",
            },
            {
                type: "press",
                url: "https://example.com/fintech-press/future-of-fintech-infrastructure",
                label: "Trade press coverage",
            },
        ],
        related: [
            { kind: "project", ref: "cross-border-stablecoin-settlement" },
            { kind: "project", ref: "rag-crypto-fraud-detection-ethereum" },
        ],
    },
    {
        slug: "research-council-norway-dlt-lecture",
        type: "guest-lecture",
        title: "Permissioned DLT for National Healthcare — Research-to-Production",
        subtitle:
            "A guest lecture at the University of Stavanger on translating the 5G-MODaNeI healthcare-DLT research into a working Hyperledger Fabric prototype",
        host: "University of Stavanger · 5G-MODaNeI Research Group",
        role: "Guest Lecturer",
        date: "2024-02-21",
        location: "Stavanger, Norway",
        cover: "/images/speaking/research-council-norway-dlt-lecture/cover.jpg",
        summary:
            "Guest lecture in the MSc Data Science program on the end-to-end journey from published research to a working multi-organization Hyperledger Fabric prototype for Bangladesh's national healthcare system.",
        tags: ["Guest Lecture", "Research", "Blockchain", "Healthcare"],
        topics: [
            "From IEEE Access paper to a working proof of concept",
            "Permissioned identity with Fabric CA, MSPs, and digital health cards",
            "Smart-contract-driven consent and tamper-evident prescriptions",
            "Performance: 25,509 requests with 96.34% success under 100 concurrent users",
            "Research agenda: HL7 FHIR, privacy-preserving analytics, multi-site evaluation",
        ],
        interaction: [
            "60-minute lecture",
            "45-minute Q&A with MSc and PhD students",
            "Research-group dinner and informal discussion",
        ],
        photos: [
            {
                src: "/images/speaking/research-council-norway-dlt-lecture/01-lecture-hall.jpg",
                alt: "Lecture hall at the University of Stavanger",
                caption: "MSc Data Science cohort — University of Stavanger",
            },
            {
                src: "/images/speaking/research-council-norway-dlt-lecture/02-prototype.jpg",
                alt: "Live demo of the Fabric network",
                caption: "Live demo — multi-organization Fabric network",
            },
            {
                src: "/images/speaking/research-council-norway-dlt-lecture/03-research-group.jpg",
                alt: "Research-group dinner after the lecture",
                caption: "With the 5G-MODaNeI research group after the lecture",
            },
        ],
        evidence: [
            {
                type: "publication",
                url: "https://doi.org/10.1109/ACCESS.2023.3279724",
                label: "IEEE Access paper — DOI 10.1109/ACCESS.2023.3279724",
            },
            {
                type: "press",
                url: "https://www.uis.no/en/news/healthcare-blockchain-lecture",
                label: "University of Stavanger news",
            },
        ],
        related: [
            { kind: "project", ref: "dlt-integrated-healthcare-solution-bangladesh" },
        ],
    },
    {
        slug: "developer-week-blockchain-panel",
        type: "panel",
        title: "Web3 Mainstream Adoption — The Engineering Path Forward",
        subtitle:
            "A 50-minute panel on the engineering trade-offs between Web3 friction and mainstream onboarding, with hands-on examples from production launches",
        host: "DeveloperWeek Global 2023",
        role: "Panelist",
        date: "2023-11-15",
        location: "Virtual",
        cover: "/images/speaking/developer-week-blockchain-panel/cover.jpg",
        summary:
            "A virtual panel with three other engineers on the engineering trade-offs behind Web3 mainstream adoption: gas-sponsored UX, recovery flows, and EIP-1559 fee control.",
        tags: ["Web3", "Panel", "UX"],
        topics: [
            "Hiding blockchain complexity from mainstream users",
            "Credit-card onboarding and gas-sponsored transactions",
            "EIP-1559 fee control and bounded-fee parameter design",
            "Transaction recovery and concurrent-ownership consistency",
            "Multi-chain and DAO-ready platform primitives",
        ],
        interaction: ["Live panel", "Audience Q&A from the DeveloperWeek app"],
        photos: [
            {
                src: "/images/speaking/developer-week-blockchain-panel/01-panel.jpg",
                alt: "Panel screen with all four panelists",
                caption: "Live panel — DeveloperWeek Global 2023",
            },
        ],
        evidence: [
            {
                type: "press",
                url: "https://developerweek.com/global/agenda",
                label: "Agenda listing",
            },
        ],
        related: [
            { kind: "project", ref: "hk-sevens-scalable-web3-fan-engagement" },
            { kind: "project", ref: "hotel-booking-nft-marketplace" },
        ],
    },
];

// Re-export the icon components so the components layer can build evidence
// tiles without re-importing react-icons. This keeps the constants file as
// the single place that knows what "evidence" looks like.
export const EVIDENCE_ICONS: Record<string, any> = {
    slides: FaFilePowerpoint,
    recording: FaYoutube,
    platform: SiGoogleslides,
    press: FaNewspaper,
    video: FaYoutube,
    zoom: SiZoom,
};

export default SPEAKINGS;
