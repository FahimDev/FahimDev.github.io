import { FaYoutube, FaFilePowerpoint, FaNewspaper } from "react-icons/fa";
import { SiGoogleslides, SiZoom } from "react-icons/si";

// Single source of truth for every speaking engagement: conferences, guest
// lectures, workshops, panels, and live teaching. One exported array, one file.
//
// Field reference (all required unless marked):
//   slug        — URL slug for /speaking/:slug
//   type        — "conference" | "guest-lecture" | "workshop" | "panel" | "live-teaching" | "industry-talk"
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
//   historicalRecord? — Optional archival block (invoice, payment, etc.)
//                       rendered with data-nosnippet on the detail page
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
        slug: "ieee-icbc-2024-gasless-onchain-password-manager",

        type: "conference",

        title: "Gasless On-Chain Password Manager — IEEE ICBC 2024",

        subtitle:
            "Representing Brain Station 23 PLC as an IEEE ICBC 2024 patron coordinator in Dublin, with the special honour of presenting the late Engr. Tahlil Abser's blockchain research at Trinity College Dublin.",

        host:
            "IEEE Communications Society — IEEE International Conference on Blockchain and Cryptocurrency (ICBC 2024)",

        role: "Speaker",

        date: "2024-05-27",

        endDate: "2024-05-31",

        location: "Edmund Burke Theatre, Trinity College Dublin, Dublin, Ireland",

        cover:
            "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/icbc_banner.png",

        summary: (
            <div>
                <p>
                    <strong>IEEE ICBC 2024 at Trinity College Dublin</strong> remains one of the most meaningful
                    international milestones of my professional journey — not only because I participated in the
                    conference as a research author, but because I was entrusted with representing 
                    <strong> Brain Station 23 PLC </strong>during its patron engagement with IEEE.
                </p>

                <p>
                    I served as the <strong> main Brain Station 23 PLC-side coordinator </strong> for the IEEE ICBC 2024
                    sponsorship and patron process. The sponsorship communication was handled with
                    <strong> Rich Jannuzzi </strong>, recorded in our 2024 correspondence as
                    <em>Sr. Director, IEEE MCE Business Operations, IEEE International LLC</em>,
                    while the agreement from Brain Station 23 PLC was signed under the leadership of our
                    Strategic Business Unit Head, <strong> Engr. Raisul Islam </strong>.
                </p>

                <p>
                    After supporting that institutional journey, I had the special honour of presenting
                    <strong> “Gasless On-Chain Password Manager: A Comparative Analysis Across EVM-Based Platforms” </strong>
                    at Trinity College Dublin. I was not an author of this particular work, which made the responsibility
                    even more meaningful: I was carrying forward the research contribution of our beloved and deeply
                    respected late colleague, <strong> Engr. Tahlil Abser</strong>.
                </p>

                <p>
                    The work is indexed by IEEE under
                    <strong> DOI: 10.1109/ICBC59979.2024.10634380 </strong> and explores gasless interaction,
                    decentralized password management, recovery mechanisms, and comparative deployment considerations
                    across EVM-based blockchain platforms.
                </p>

                <p>
                    The Dublin experience was also shaped by the people around us. I remain especially grateful to
                    <strong> Prof. Donal Edward O'Mahony </strong> of Trinity College Dublin for his support throughout
                    the journey, including his personal assistance during my visa processing. I also had the opportunity
                    to interact with <strong> Dr. Yuansong (John) Qiao </strong>, while
                    <strong> Jimmy Le </strong> and the IEEE Communications Society team continuously supported us in
                    making the conference experience smooth and memorable.
                </p>

                <p>
                    During the same IEEE ICBC 2024 conference, I also participated separately as a research author
                    for my own peer-reviewed work,
                    <strong> “Unlocking DeFi Literacy: Understanding NFT Market Microstructure in the Decentralized Finance Landscape.” </strong>
                    That research contribution is documented separately in my portfolio.
                </p>    
            </div>
            
        ),

        tags: [
            "IEEE ICBC 2024",
            "Brain Station 23 PLC",
            "IEEE Patron",
            "Blockchain Research",
            "Gasless Transactions",
            "EVM Blockchain",
            "Web3 Security",
            "Trinity College Dublin",
            "International Research",
            "Research Representation"
        ],

        // Archival admin record (invoice + payment) preserved for the
        // IEEE ICBC 2024 patron coordination journey. Renders below Key
        // Takeaways with data-nosnippet so search engines ignore it.
        historicalRecord: {
            title: "IEEE ICBC 2024 Patron Administration Record",
            summary:
                "Retained as part of the historical record of Brain Station 23 PLC's patron engagement with IEEE ICBC 2024 and my coordination journey.",
            invoice: {
                heading: "Sponsorship & Invoice Record",
                rows: [
                    {
                        label: "Invoice Reference",
                        value: "59979BrainStation",
                    },
                    {
                        label: "Processed By",
                        value: "IEEE Communications Society",
                    },
                    { label: "Attention", value: "Bruce Worthman" },
                    {
                        label: "Address",
                        value: [
                            "3 Park Avenue, 17th Floor",
                            "New York, NY 10016",
                        ],
                        multiline: true,
                    },
                ],
            },
            payment: {
                heading: "Patron Payment Record",
                rows: [
                    { label: "Transaction ID", value: "681986975" },
                    {
                        label: "Payment Date",
                        value: "May 22, 2024 · 12:02 PM",
                    },
                    { label: "Paid To", value: "Wells Fargo (0326)" },
                    {
                        label: "Bank Account Holder",
                        value: "Institute of Electrical and Electronics Engineers",
                    },
                ],
            },
            footnote:
                "This administrative record is preserved as a personal and professional archive of the IEEE ICBC 2024 patron coordination process.",
        },

        topics: [
            "Gasless On-Chain Password Management",
            "Gasless Transaction Design Across EVM-Based Platforms",
            "Decentralized Password and Credential Management",
            "Blockchain-Based Password Recovery Mechanisms",
            "Gas Cost and Web3 User Experience",
            "Comparative Analysis of EVM-Compatible Blockchain Platforms"
        ],

        interaction: [
            <>
                <strong>IEEE Patron Coordination:</strong> Served as the primary
                Brain Station 23 PLC-side coordinator for the organization's
                IEEE ICBC 2024 patron and sponsorship engagement.
            </>,

            <>
                <strong>International Representation:</strong> Represented
                Brain Station 23 PLC in Dublin, Ireland, following the
                sponsorship coordination and conference preparation process.
            </>,

            <>
                <strong>Tribute Research Presentation:</strong> Had the honour
                of presenting the late Engr. Tahlil Abser's work, “Gasless
                On-Chain Password Manager: A Comparative Analysis Across
                EVM-Based Platforms,” despite not being an author of the
                paper.
            </>,

            <>
                <strong>IEEE Business Coordination:</strong> Worked with Rich
                Jannuzzi, whose designation in the 2024 sponsorship
                correspondence was recorded as Sr. Director, IEEE MCE Business
                Operations, IEEE International LLC.
            </>,

            <>
                <strong>BS23 Leadership Coordination:</strong> The sponsorship
                agreement was executed from Brain Station 23 PLC under
                Strategic Business Unit Head Engr. Raisul Islam.
            </>,

            <>
                <strong>Research Community:</strong> Connected with
                international researchers, engineers, academics, blockchain
                foundations, and technology professionals participating in
                IEEE ICBC 2024.
            </>,

            <>
                <strong>Trinity College Dublin:</strong> Received memorable
                support from Prof. Donal Edward O'Mahony, including personal
                assistance surrounding the Ireland visa process.
            </>,

            <>
                <strong>Research Networking:</strong> Had the opportunity to
                interact with Dr. Yuansong (John) Qiao and other members of
                the international blockchain research community.
            </>,

            <>
                <strong>Conference Support:</strong> Jimmy Le and the IEEE
                Communications Society conference team provided continuous
                operational support throughout the event.
            </>,
        ],

    people: [
        {
            name: "Engr. Tahlil Abser",
            relation:
                "Late respected colleague whose Gasless On-Chain Password Manager research I had the honour of presenting.",
            organization: "Brain Station 23 PLC"
        },
        {
            name: "Engr. Raisul Islam",
            relation:
                "Strategic Business Unit Head representing Brain Station 23 PLC during the sponsorship agreement process.",
            organization: "Brain Station 23 PLC"
        },
        {
            name: "Prof. Donal Edward O'Mahony",
            designation:
                "Fellow Emeritus, Computer Science",
            organization: "Trinity College Dublin",
            relation:
                "Research community host and a memorable source of personal support during the Dublin journey."
        },
        {
            name: "Dr. Yuansong (John) Qiao",
            designation:
                "Research Fellow, Software Research Institute",
            organization:
                "Technological University of the Shannon",
            relation:
                "Researcher and connection from the ICBC 2024 experience."
        },
        {
            name: "Jimmy Le",
            designation:
                "IEEE Communications Society Conference Operations / Event Program Manager",
            organization:
                "IEEE Communications Society",
            relation:
                "Provided conference and operational support to participating teams."
        },
        {
            name: "Bruce Worthman",
            designation:
                "Director of Finance and Business Operations",
            organization:
                "IEEE Communications Society",
            relation:
                "IEEE ComSoc finance and business operations function associated with conference contracts and administration."
        },
        {
            name: "Rich Jannuzzi",
            designation:
                "Sr. Director, IEEE MCE Business Operations, IEEE International LLC — title recorded in 2024 sponsorship correspondence",
            organization: "IEEE",
            relation:
                "Primary IEEE-side business operations contact during the Brain Station 23 patron coordination process."
        }
    ],

        keyTakeaways: [
            "The experience extended far beyond speaking at a conference: I was trusted to coordinate an institutional patron relationship between Brain Station 23 PLC and IEEE for an internationally recognized blockchain research event.",

            "Presenting a research work that was not my own carried a unique responsibility — preserving and communicating the technical contribution of our late and deeply respected colleague Engr. Tahlil Abser.",

            "The journey strengthened my experience in cross-border stakeholder coordination involving engineering, research, sponsorship, finance, senior leadership, and international conference operations.",

            "IEEE ICBC 2024 demonstrated how industry organizations can contribute to the global research ecosystem through publication, sponsorship, technical collaboration, and active institutional representation.",

            "The support of people such as Prof. Donal Edward O'Mahony, Dr. Yuansong Qiao, Jimmy Le, and the wider IEEE community remains one of the most memorable parts of the Dublin experience.",

            "Alongside this responsibility, I also attended the conference as an author of my own separate peer-reviewed DeFi and NFT market microstructure research."
        ],

        photos: [
            {
                src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/0.png",
                alt: "Gasless On-Chain Password Manager presentation at IEEE ICBC 2024 Trinity College Dublin",
                caption:
                    "Presenting the late Engr. Tahlil Abser's Gasless On-Chain Password Manager research at IEEE ICBC 2024, Trinity College Dublin."
            },

            {
                src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/1.png",
                alt: "Brain Station 23 PLC IEEE ICBC 2024 patron representation in Dublin Ireland",
                caption:
                    "Representing Brain Station 23 PLC during IEEE ICBC 2024 following the organization's patron and sponsorship engagement."
            },

            {
                src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/5.jpeg",
                alt: "IEEE ICBC 2024 blockchain conference at Trinity College Dublin Ireland",
                caption:
                    "IEEE International Conference on Blockchain and Cryptocurrency 2024 at Trinity College Dublin."
            },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/6.png",
        alt: "Brain Station 23 PLC IEEE ICBC 2024 patron sponsor recognition at Trinity College Dublin with Prof. Donal O'Mahony",
        caption:
            "Brain Station 23 PLC recognized as an IEEE ICBC 2024 patron at Trinity College Dublin, with Prof. Donal O'Mahony acknowledging the organizations supporting the international blockchain and cryptocurrency research community."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/7.png",
        alt: "Brain Station 23 PLC IEEE ICBC 2024 patron alongside Cardano Foundation and Ripple at Trinity College Dublin",
        caption:
            "IEEE ICBC 2024 patron announcement featuring Brain Station 23 PLC alongside globally recognized Web3 and blockchain organizations including Cardano Foundation and Ripple — marking BS23's presence within the international blockchain research ecosystem in Dublin, Ireland."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/11.jpg",
        alt: "Brain Station 23 blockchain engineer Engr. Ariful Islam with NTT Digital engineering leader Hiroshi Matsuura at IEEE ICBC 2024 Dublin",
        caption:
            "Engr. Ariful Islam of Brain Station 23 PLC with Hiroshi Matsuura from Japan's NTT Digital during IEEE ICBC 2024 — connecting blockchain engineering perspectives from Bangladesh and Japan at Trinity College Dublin."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/10.jpg",
        alt: "IEEE CryptoEx steering committee from POSTECH with Brain Station 23 PLC representative at IEEE ICBC 2024",
        caption:
            "Brain Station 23 PLC representation with members of the IEEE CryptoEx steering committee from POSTECH during ICBC 2024, reflecting international academic and industry collaboration around blockchain, cryptocurrency, Web3 security and decentralized systems."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/8.jpg",
        alt: "Engr. Ariful Islam with KodaDot founder at IEEE ICBC 2024 blockchain conference in Dublin Ireland",
        caption:
            "Engr. Ariful Islam connecting with the founder of KodaDot, a Web3 and NFT platform, during IEEE ICBC 2024 in Dublin — exchanging perspectives on NFT infrastructure, decentralized applications, blockchain ecosystems and the future of Web3."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/9.jpg",
        alt: "Engr. Ariful Islam discussing blockchain engineering collaboration with ABC Research Austria at IEEE ICBC 2024 Dublin",
        caption:
            "Engr. Ariful Islam in discussion with ABC Research, Austria, exploring Brain Station 23 PLC's blockchain engineering capabilities, international technology collaboration and potential resource augmentation between European research organizations and BS23."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/12.jpg",
        alt: "Dr. Yuansong Qiao and Engr. Ariful Islam at IEEE ICBC 2024 Trinity College Dublin blockchain conference",
        caption:
            "Dr. Yuansong Qiao and Engr. Ariful Islam during IEEE ICBC 2024 at Trinity College Dublin — a memorable connection within the international blockchain research community spanning distributed systems, Web3, cybersecurity and emerging decentralized technologies."
    },
        {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/14.jpg",
        alt: "Engr. Md. Ariful Islam of Brain Station 23 PLC with zero-knowledge proof researchers Jonathan Heiss, Johannes Sedlmeir and Alvaro Alonso at IEEE ICBC 2024 Dublin",
        caption:
            "Engr. Md. Ariful Islam of Brain Station 23 PLC with leading zero-knowledge proof researchers Dr.-Ing. Jonathan Heiß, Johannes Sedlmeir and Álvaro Alonso Domenech during IEEE ICBC 2024 in Dublin. Their ICBC program brought together programmable cryptography, zk-SNARKs, Circom, ZoKrates, verifiable off-chain computation and decentralized applications through the inaugural ZKDAPPS workshop and the tutorial “Compute Off-chain, Verify On-chain.” A memorable connection with researchers actively advancing practical ZKP and blockchain engineering across TU Berlin and the University of Luxembourg."
    },

    {
        src: "/images/event/ieee-icbc-2024-gasless-onchain-password-manager/13.jpg",
        alt: "Engr. Md. Ariful Islam of Brain Station 23 PLC with Professor Donal O'Mahony at Trinity College Dublin during IEEE ICBC 2024",
        caption:
            "Engr. Md. Ariful Islam with Prof. Donal Edward O'Mahony, Fellow Emeritus in Computer Science at Trinity College Dublin and researcher in cryptography, electronic payments, blockchain, Bitcoin and Ethereum. Beyond IEEE ICBC 2024, this photograph preserves one of the most personal memories of the Dublin journey: Prof. O'Mahony's extraordinary support during a difficult Ireland visa process when Ariful's passport was held for processing in Delhi. His willingness to personally help during that uncertainty transformed a professional conference connection into a gesture of kindness and support that remains unforgettable."
    }

        ],

        evidence: [
            {
                type: "publication",
                url: "https://ieeexplore.ieee.org/document/10634380",
                label:
                    "IEEE Xplore — Gasless On-Chain Password Manager: A Comparative Analysis Across EVM-Based Platforms"
            },

            {
                type: "doi",
                url: "https://doi.org/10.1109/ICBC59979.2024.10634380",
                label:
                    "DOI — 10.1109/ICBC59979.2024.10634380"
            },

            {
                type: "conference",
                url: "https://www.comsoc.org/conferences-events/ieee-international-conference-blockchain-and-cryptocurrency-2024",
                label:
                    "IEEE Communications Society — IEEE ICBC 2024"
            },

            {
                type: "sponsorship-record",
                url: "",
                label:
                    "Brain Station 23 PLC × IEEE ICBC 2024 Patron Agreement — coordinated with Rich Jannuzzi; agreement executed from Brain Station 23 PLC under SBU Head Engr. Raisul Islam"
            },

            {
                type: "invoice-record",
                url: "",
                label:
                    "IEEE Communications Society Sponsorship Invoice — Reference: 59979BrainStation | Attn. Bruce Worthman | 3 Park Avenue, 17th Floor, New York, NY 10016"
            },

            {
                type: "payment-record",
                url: "",
                label:
                    "Patron Payment Record — Transaction ID: 681986975 | Payment Date: May 22 2024, 12:02 PM | Paid to: Wells Fargo (0326) | Bank Account Holder: Institute of Electrical and Electronics Engineers"
            }
        ],

        related: [
            {
                kind: "publication",
                ref: "gasless-on-chain-password-manager"
            },

            {
                kind: "publication",
                ref: "unlocking-defi-literacy-nft-market-microstructure"
            }
        ]
    },    

    {
        slug: "bracu-cse-research-day-frontier-engineering-dhaka",

        type: "guest-lecture",

        title: "Engineering Frontier Technologies from Dhaka",

        subtitle:
            "An industry talk at BRAC University CSE Research Day 2026 on how a Dhaka-based engineering team combined global client delivery, Web3 R&D, research publication, AI-DLC, and Spec-Driven Development instead of accepting the traditional divide between commercial software and academic research",

        host:
            "CSE Research Day 2026 · Department of Computer Science and Engineering, BRAC University",

        role:
            "Invited Guest Speaker · Industry Representative, Brain Station 23 PLC",

        date: "2026-06-19",

        location:
            "Theatre Room (09E-20T), BRAC University, Dhaka, Bangladesh",

        cover:
            "/images/event/bracu/cover.jpeg",

        summary:
            "Invited as an industry guest speaker at BRAC University's CSE Research Day 2026, I presented the engineering and R&D journey of Brain Station 23's Web3 team as a counterexample to the idea that serious frontier-technology work must happen outside Bangladesh. The session explored how one engineering unit can deliver production systems for global clients while continuously investing in research, publishing technical work, adopting AI-assisted development practices, and building engineers capable of working across software architecture, Web3, distributed systems, and emerging technologies.",

        tags: [
            "Web3",
            "Frontier Technologies",
            "AI-DLC",
            "Spec-Driven Development",
            "R&D",
            "Industry–Academia",
        ],

        topics: [
            "Breaking the stereotype that software engineering in Dhaka is limited to CRUD development and API integration",

            "How a production engineering team can serve global clients while maintaining an active research and publication culture",

            "The Web3 engineering journey of Brain Station 23 and the transition from project delivery toward reusable technical capability",

            "Why commercial software development and academic research do not need to operate as separate career tracks",

            "Building a team culture where production incidents, architecture discussions, and engineering problems can become research questions",

            "AI-Driven Development Lifecycle (AI-DLC) and how AI is changing software-development workflows",

            "Spec-Driven Development (SDD) as a way to define architecture, constraints, behavior, and acceptance criteria before generating code",

            "Why strong fundamentals, technical reading, and continuous learning remain essential even when AI can generate code",

            "Prompt quality as an engineering skill: giving AI enough architectural context to generate maintainable, secure, and cost-effective software",

            "Developing frontier-technology capability locally instead of assuming advanced engineering opportunities only exist abroad",

            "Building stronger bridges between academic research and production engineering in Bangladesh",
        ],

        interaction: [
            "Invited industry presentation",

            "Frontier Technologies panel discussion",

            "Industry–academia discussion with researchers working across blockchain, machine learning, cosmology, and quantum computing",

            "Audience interaction in a capacity-filled university auditorium",

            "Discussion on engineering careers, research culture, and emerging software-development practices",
        ],

        panelists: [
            {
                name: "Md. Ariful Islam",
                roleAtEvent: "Invited Guest Speaker · Industry Representative",
                organizationAtEvent: "Brain Station 23 PLC",
                focus:
                    "Web3 engineering, production R&D, AI-DLC, Spec-Driven Development, and industry–academia collaboration",
            },

            {
                name: "Dr. Md. Sadek Ferdous",
                roleAtEvent: "Professor",
                organizationAtEvent:
                    "Department of Computer Science and Engineering, BRAC University",
                additionalAffiliation:
                    "Honorary Research Fellow, Institute for Security Science and Technology, Imperial College London",
                focus:
                    "Blockchain, security, decentralized identity, and cryptographic governance",
            },

            {
                name: "Ipshita Bonhi Upoma",
                roleAtEvent: "Lecturer",
                organizationAtEvent:
                    "Department of Computer Science and Engineering, BRAC University",
                education:
                    "Durham University",
                focus:
                    "Machine learning, interdisciplinary research, and computational science",
            },

            {
                name: "Sowmitra Das",
                roleAtEvent: "Senior Lecturer",
                organizationAtEvent:
                    "Department of Computer Science and Engineering, BRAC University",
                additionalAffiliation:
                    "Visiting Researcher in Theoretical Quantum Information Sciences, Imperial College London",
                focus:
                    "Quantum computing, quantum information theory, and interdisciplinary computing research",
            },
        ],

        photos: [
            {
                src:
                    "/images/event/bracu/1.jpeg",

                alt:
                    "Guest speaker presenting the engineering and research journey of Brain Station 23's Web3 team at BRAC University CSE Research Day 2026.",

                caption:
                    "Presenting how production engineering, Web3 R&D, and research publication can coexist within the same engineering team.",
            },

            {
                src:
                    "/images/event/bracu/2.jpeg",

                alt:
                    "Frontier Technologies panel at BRAC University CSE Research Day 2026 with academic researchers and an industry guest speaker.",

                caption:
                    "Frontier Technologies panel connecting active academic research with industry engineering practice.",
            },

            {
                src:
                    "/images/event/bracu/3.jpeg",

                alt:
                    "Students filling the auditorium during CSE Research Day 2026 at BRAC University.",

                caption:
                    "A packed auditorium during the holiday event reflected strong student interest in research and frontier engineering.",
            },

            {
                src:
                    "/images/event/bracu/4.jpeg",

                alt:
                    "Guest speaker receiving recognition at BRAC University CSE Research Day 2026.",

                caption:
                    "Recognition following the Frontier Technologies session at BRAC University.",
            },

            {
                src:
                    "/images/event/bracu/5.jpeg",

                alt:
                    "Students filling the auditorium during CSE Research Day 2026 at BRAC University.",

                caption:
                    "Building a team culture where production incidents, architecture discussions, and engineering problems can become research questions",
            },

            {
                src:
                    "/images/event/bracu/6.jpeg",

                alt:
                    "Frontier Technologies academic researchers and an industry guest speaker networking session.",

                caption:
                    "Frontier Technologies academic researchers and an industry guest speaker networking session.",
            },
        ],

        evidence: [
            {
                type: "press",

                url:
                    "https://www.tbsnews.net/economy/corporates/brac-university-hosts-cse-research-day-2026-1469566",

                label:
                    "The Business Standard — BRAC University hosts CSE Research Day 2026",
            },

            {
                type: "press",

                url:
                    "https://www.dhakatribune.com/business/413324/brac-university-cse-research-day-2026-explores",

                label:
                    "Dhaka Tribune — CSE Research Day 2026 coverage",
            },

            {
                type: "official",

                url:
                    "https://cse.sds.bracu.ac.bd/",

                label:
                    "BRAC University · Department of Computer Science and Engineering",
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

            {
                kind: "publication",
                ref: "hybrid-evm-event-driven-architecture",
            },
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
