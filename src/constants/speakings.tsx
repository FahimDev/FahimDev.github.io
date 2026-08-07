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
        cover: "/images/blog/6.png",
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
        slug: "aiub-ai-tools-in-research-workshop",

        type: "workshop",

        title: "Workshop on AI Tools in Research",

        subtitle:
            "A faculty-focused workshop exploring practical AI tools for research, teaching, academic writing, publishing, ethics, and responsible AI use",

        host:
            "Research Cell, Faculty of Business Administration, American International University-Bangladesh (AIUB)",

        role: "Team Member",

        date: "2024-06-12",

        location:
            "Media Studio, Annex-2, Level-2, AIUB Campus",

        cover:
            "/images/event/aiub-ai-workshop/cover.jpg",

        summary:
            "A two-hour workshop organized by the Research Cell of AIUB's Faculty of Business Administration to introduce faculty members to modern AI tools for research and teaching. The session covered AI-assisted literature review, academic writing and editing, citation generation, illustration, data analysis and visualization, alongside AI ethics, detection, publishing policies, and responsible use.",

        tags: [
            "AI in Research",
            "Research Tools",
            "AI Ethics",
            "Academic Publishing",
            "Workshop",
        ],

        topics: [
            "Artificial Intelligence fundamentals and Human vs AI benchmarking",

            "AI tools for literature review and research discovery",

            "AI-assisted academic writing and editing",

            "Citation-generation and illustration tools",

            "AI-supported data analysis and visualization",

            "AI ethics, AI detection, and responsible use",

            "Publishing bodies' perspectives and policies regarding AI",

            "Using AI to augment human creativity and research productivity",
        ],

        interaction: [
            "Faculty-focused workshop",
            "Presentation and practical discussion of AI research tools",
            "Active participation from Faculty of Business Administration members",
        ],

        photos: [
            {
                src:
                    "/images/event/aiub-ai-workshop/1.jpg",

                alt:
                    "Workshop session on AI tools in research at the AIUB Media Studio.",

                caption:
                    "Dr. Khandaker Tabin Hasan - Professor, Associate Dean and Engr. Md Ariful Islam - Web3 Lead, Senior Software Engineer",
            },

            {
                src:
                    "/images/event/aiub-ai-workshop/2.jpg",

                alt:
                    "Workshop session on AI tools in research at the AIUB Media Studio.",

                caption:
                    "Former Tech Lead of Microsoft Engr. MJ Ferdous and Engr. Ariful Islam's Team taking workshop token of memory from AIUB Associate Dean",
            },   
            
            {
                src:
                    "/images/event/aiub-ai-workshop/3.jpg",

                alt:
                    "Workshop session on AI tools in research at the AIUB Media Studio.",

                caption:
                    "Former Tech Lead of Microsoft Engr. MJ Ferdous is presenting and Engr. Ariful Islam and assisting him on the workshop visuals",
            },             
        ],

        evidence: [
            {
                type: "press",

                url:
                    "https://www.aiub.edu/workshop-on-ai-tools-in-research",

                label:
                    "Official AIUB event coverage",
            },
        ],

        related: [],
    },

    {
        slug: "kuet-bitfest-philosophy-of-decentralized-applications",

        type: "industry-talk",

        title: "The Philosophy of Decentralized Applications",

        subtitle:
            "An industry seminar at KUET BitFest exploring why decentralization is more than putting application logic on a blockchain — and how trust, ownership, governance, architecture, and real-world engineering shape meaningful decentralized applications",

        host:
            "KUET BitFest 2.0 · Department of Computer Science and Engineering, Khulna University of Engineering & Technology (KUET)",

        role: "Invited Industry Speaker · Brain Station 23 PLC Representative",

        // KUET lists BitFest 2.0 from 3–5 January 2025.
        // Replace this with the exact seminar date if your invitation/certificate
        // confirms that your speaking slot was on another day.
        date: "2025-01-03",

        location:
            "Khulna University of Engineering & Technology (KUET), Khulna, Bangladesh",

        cover:
            "/images/event/kuet-web3/cover.png",

        summary:
            "Invited to KUET BitFest as an industry speaker representing Brain Station 23 PLC, I presented a seminar on the philosophy behind decentralized applications. Rather than treating blockchain as a technology to add by default, the session focused on the deeper engineering question of what should actually be decentralized, why decentralization matters, and how application architecture changes when trust, ownership, governance, and control are distributed. The engagement concluded with recognition from KUET, where I received a speaker crest from Pro-Vice-Chancellor Professor Dr. Sk. Shariful Alam.",

        tags: [
            "Decentralized Applications",
            "Web3",
            "Blockchain",
            "Software Architecture",
            "Industry–Academia",
        ],

        topics: [
            "The philosophy behind decentralization and why a DApp is more than a blockchain-enabled frontend",

            "Centralized applications versus decentralized applications from an architectural perspective",

            "Removing or reducing dependence on a single trusted authority",

            "Trust, verification, transparency, and ownership in decentralized systems",

            "Understanding what should — and should not — be placed on-chain",

            "Smart contracts as programmable coordination and business-rule infrastructure",

            "The relationship between decentralization, governance, and user control",

            "Engineering trade-offs between decentralization, scalability, usability, cost, and maintainability",

            "Moving from blockchain concepts and prototypes toward production-grade decentralized applications",
        ],

        interaction: [
            "Invited industry seminar",
            "Technical presentation to the KUET BitFest audience",
            "Industry–academia knowledge sharing on Web3 and decentralized application engineering",
            "Recognition ceremony with speaker crest presented by the KUET Pro-Vice-Chancellor",
        ],

        photos: [
            {
                src:
                    "/images/event/kuet-web3/1.jpg",

                alt:
                    "Industry speaker representing Brain Station 23 presenting a seminar on decentralized applications at KUET BitFest.",

                caption:
                    "Presenting “The Philosophy of Decentralized Applications” at KUET BitFest.",
            },

            {
                src:
                    "/images/event/kuet-web3/2.jpg",

                alt:
                    "Speaker presenting decentralized application concepts to participants at KUET BitFest.",

                caption:
                    "Discussing how decentralization changes trust, ownership, governance, and application architecture.",
            },

            {
                src:
                    "/images/event/kuet-web3/3.jpg",

                alt:
                    "Industry speaker receiving a recognition crest from KUET Pro-Vice-Chancellor Professor Dr. Sk. Shariful Alam.",

                caption:
                    "Receiving the industry-speaker crest from KUET Pro-Vice-Chancellor Professor Dr. Sk. Shariful Alam on behalf of Brain Station 23 PLC.",
            },
        ],

        evidence: [
            {
                type: "official",
                url: "https://www.kuet.ac.bd/",
                label: "KUET — BitFest 2.0 event listing",
            },

            {
                type: "press",
                url: "https://www.bdren.net.bd/news/200",
                label: "BdREN coverage of KUET BitFest 2025",
            },
        ],

        related: [
            {
                kind: "project",
                ref: "cross-border-stablecoin-settlement",
            },

            {
                kind: "project",
                ref: "dlt-integrated-healthcare-solution-bangladesh",
            },
        ],
    },   


    {
        slug: "linea-voyage-road-to-dencun-dhaka",

        type: "panel",

        title: "Linea Voyage Waypoint: The Road to Dencun",

        subtitle:
            "A Dhaka panel exploring Ethereum's Dencun upgrade, EIP-4844, Layer 2 scalability, lower transaction costs, and what the next phase of Ethereum infrastructure means for builders and decentralized applications",

        host:
            "Linea Voyage Waypoint · Road to Dencun — Dhaka · Community event with Leveor",

        role:
            "Invited Panel Speaker · Substitute for Prof. Dr. Md Sadek Ferdous",

        date: "2024-02-17",

        location: "Dhaka, Bangladesh",

        cover: 
            "/images/event/linea/cover.jpeg",


        summary:
            "Invited to join the Dhaka edition of Linea Voyage Waypoint: The Road to Dencun as a panel speaker when Prof. Dr. Md Sadek Ferdous was unable to attend. The discussion brought together engineers and Web3 ecosystem contributors to examine Ethereum's upcoming Dencun upgrade, particularly EIP-4844, and its implications for rollup economics, Layer 2 scalability, data availability, transaction costs, and the developer experience of building decentralized applications.",

        tags: [
            "Ethereum",
            "Dencun",
            "EIP-4844",
            "Layer 2",
            "Linea",
            "Panel",
        ],

        topics: [
            "Why Ethereum needed the Dencun network upgrade",

            "EIP-4844 and proto-danksharding as a step toward Ethereum's rollup-centric scaling roadmap",

            "How blob transactions change the way Layer 2 networks publish data to Ethereum",

            "Reducing Layer 2 data-availability costs and transaction fees",

            "The impact of Dencun on rollups such as Linea",

            "Scalability trade-offs between Ethereum Layer 1 and Layer 2 networks",

            "How lower transaction costs can improve the usability and adoption of decentralized applications",

            "What protocol-level improvements mean for application developers and Web3 product teams",

            "The relationship between infrastructure evolution, developer experience, and mainstream Web3 adoption",
        ],

        interaction: [
            "Invited technical panel",
            "Multi-speaker discussion on Ethereum infrastructure and Layer 2 scaling",
            "Community discussion around the upcoming Dencun upgrade",
            "Discussion with engineers and Web3 ecosystem contributors",
            "Audience Q&A and community interaction",
        ],

        panelists: [
            {
                name: "Md. Ariful Islam",
                role: "Invited Panel Speaker",
                note:
                    "Joined the panel in place of Prof. Dr. Md Sadek Ferdous, who was unable to attend",
            },

            {
                name: "Late Engr. Tahlil Abser",
                roleAtEvent: "Founding Blockchain Engineer",
                organizationAtEvent: "Leveor",
            },

            {
                name: "Susmita",
                organizationAtEvent: "Consensys",
            },

            {
                name: "Engr. Saad",
                roleAtEvent: "Founder",
                organizationAtEvent: "Leveor",
            },

            {
                name: "Mohammad Rayed",
                roleAtEvent: "Blockchain Engineer",
                organizationAtEvent: "Tero Labs LLC",
            },

            {
                name: "Mahmudul Alam",
                roleAtEvent: "Software Engineer",
                organizationAtEvent: "Universal Machine",
            },

            {
                name: "Shubho",
                organizationAtEvent: "Red Oracle Lab",
            },
        ],

        photos: [
            {
                src:
                    "/images/event/linea/1.jpeg",

                alt:
                    "Panel speakers discussing Ethereum and Layer 2 scalability during the Linea Voyage Waypoint Road to Dencun event in Dhaka.",

                caption:
                    "Panel discussion at Linea Voyage Waypoint: The Road to Dencun — Dhaka.",
            },

            {
                src:
                    "/images/event/linea/2.jpeg",

                alt:
                    "Technical discussion with Web3 engineers and ecosystem contributors at the Linea Road to Dencun event in Dhaka.",

                caption:
                    "Discussing how Dencun and EIP-4844 could reshape Layer 2 scalability and transaction economics.",
            },

            {
                src:
                    "/images/event/linea/3.jpeg",

                alt:
                    "Panel speakers discussing Ethereum and Layer 2 scalability during the Linea Voyage Waypoint Road to Dencun event in Dhaka.",

                caption:
                    "Panel discussion at Linea Voyage Waypoint: The Road to Dencun — Dhaka.",
            },

            {
                src:
                    "/images/event/linea/5.jpeg",

                alt:
                    "Technical discussion with Web3 engineers and ecosystem contributors at the Linea Road to Dencun event in Dhaka.",

                caption:
                    "Discussing how Dencun and EIP-4844 could reshape Layer 2 scalability and transaction economics.",
            },  

            {
                src:
                    "/images/event/linea/7.jpeg",

                alt:
                    "Panel speakers discussing Ethereum and Layer 2 scalability during the Linea Voyage Waypoint Road to Dencun event in Dhaka.",

                caption:
                    "Panel discussion at Linea Voyage Waypoint: The Road to Dencun — Dhaka.",
            },

            {
                src:
                    "/images/event/linea/8.jpeg",

                alt:
                    "Technical discussion with Web3 engineers and ecosystem contributors at the Linea Road to Dencun event in Dhaka.",

                caption:
                    "Discussing how Dencun and EIP-4844 could reshape Layer 2 scalability and transaction economics.",
            },      
        ],

        evidence: [
            {
                type: "official",

                url:
                    "https://linea.build/blog/linea-voyage-waypoint-road-to-dencun",

                label:
                    "Official Linea — Road to Dencun announcement",
            },

            {
                type: "official",

                url:
                    "https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement",

                label:
                    "Ethereum Foundation — Dencun Mainnet Announcement",
            },
        ],

        related: [
            {
                kind: "project",
                ref: "cross-border-stablecoin-settlement",
            },

            {
                kind: "project",
                ref: "hotel-booking-nft-marketplace",
            },
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
