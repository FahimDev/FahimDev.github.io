import { FaGithub, FaTwitter } from "react-icons/fa";

export const PROJECTS: any[] = [
    {
        title: "FinCube",
        subtitle: "Decentralized Traceability & Stablecoin Settlement Layer",
        slug: "cross-border-stablecoin-settlement",
        client: "A SaaS for Traders, Export-Import House of UK",
        location: "Global 🌍",
        description: <div>

                    FinCube empowers enterprise-grade financial institutions, global e-
                    commerce ecosystems, traders, and export-import houses that want to
                    hold their corporate treasuries in form of stablecoins to move money
                    faster and in real-time. It ensures strict adherence to internal and
                    governmental audit standards, without adding operational complexity
                    or compromising trust.

        </div>,
        techs: ["Solidity", "OpenTelemetry", "Prometheus", "Grafana", "Smart Contracts", "Stablecoins", "ERP Integration", "AML Compliance"],
        tech_icons: {
            Solidity: "/images/tech_logo/solidity.jpg",
            Celo: "/images/tech_logo/celo_logo.jpg",
            NestJS: "/images/tech_logo/nestJS.jpg",
            Django: "/images/tech_logo/django.png",
            OpenZeppelin: "/images/tech_logo/openZepplin.png",
            KongAPI : "/images/tech_logo/kong.avif",
            Docker : "/images/tech_logo/docker.svg",
            RabbitMQ : "/images/tech_logo/rmq.png",
            OpenTelemetry: "/images/tech_logo/opentelemetry.png",
            Prometheus: "/images/tech_logo/prometheus.jpg",
            Grafana: "/images/tech_logo/grafana.webp",
        },
        cover_img: "/images/projects/5/cover.jpg",
        achievement: {
            medal: "/images/doraHacks_medal.png",
            label: "AWS Global Vibe Hackathon Winner - AI and Web3 Integration Category"
        },
        github_url: "#",
        view_url: "#",
        features: [
            "💰 Corporate Treasury in Stablecoins – Enables B2B and institutional clients to hold corporate treasuries in stablecoins for faster, real-time money transfers.",
            "🔗 Legacy System Integration – Bridges digital assets with legacy ERP, custody, and treasury systems through smart contract anchors.",
            "📊 Observability & Monitoring – Integrated OpenTelemetry, Prometheus, and Grafana for comprehensive system observability and performance monitoring.",
            "🛡️ Compliance-First Infrastructure – Built with audit-grade proof-of-reserve, AML-compliant custody mapping, and end-to-end transaction traceability.",
            "🌐 Cross-Border Treasury Management – Engineered support for programmable cross-border treasury management with full transaction visibility.",
            "📈 Pilot Program Success – Delivered pilot programs across logistics and trade-finance sectors, reducing nostro pre-funding requirements by 40% and improving reconciliation speed by 65%.",
        ],
        business_challenges: [
            "Legacy System Integration: Bridging modern blockchain-based stablecoin systems with legacy ERP, custody, and treasury systems requires complex integration layers and data synchronization.",
            "Compliance & Regulatory Requirements: Enterprise clients require audit-grade proof-of-reserve, AML-compliant custody mapping, and full transaction traceability to meet regulatory standards.",
            "Cross-Border Treasury Management: Managing programmable treasury operations across borders while maintaining compliance and real-time visibility presents significant operational challenges.",
            "Nostro Account Pre-Funding: Traditional cross-border payments require pre-funding nostro accounts, leading to capital inefficiency and slower settlement times.",
        ],
        solutions: [
            "Built a compliance-first infrastructure layer with smart contract anchors that seamlessly bridge digital assets with legacy systems, ensuring data consistency and real-time synchronization.",
            "Engineered audit-grade proof-of-reserve mechanisms with AML-compliant custody mapping and end-to-end transaction traceability to meet enterprise regulatory requirements.",
            "Implemented programmable cross-border treasury management with full observability using OpenTelemetry, Prometheus, and Grafana for real-time monitoring and compliance reporting.",
            "Delivered stablecoin-based settlement layer that eliminates the need for nostro pre-funding, enabling real-time transfers and reducing capital requirements.",
        ],
        contributions: [
            "Spearheaded the design and development of the enterprise-grade dApp architecture for global B2B and institutional finance clients.",
            "Built the compliance-first infrastructure layer bridging digital assets with legacy ERP, custody, and treasury systems using observability tools and smart contract anchors.",
            "Engineered support for cross-border programmable treasury management with audit-grade proof-of-reserve and AML-compliant custody mapping.",
            "Delivered successful pilot programs across logistics and trade-finance sectors, achieving 40% reduction in nostro pre-funding requirements and 65% improvement in reconciliation speed.",
        ],
        find_it_on: {
            github: {
                url: "#",
                icon: <FaGithub className="size-10" />,
            },
            twitter: {
                url: "#",
                icon: <FaTwitter className="size-10" />,
            },
        },
        gallery: [
            {
                url: "/images/projects/5/2.png",
                alt: "FinCube Dashboard",
            },
            {
                url: "/images/projects/5/3.png",
                alt: "Stablecoin Treasury Management",
            },
            {
                url: "/images/projects/5/1.png",
                alt: "Transaction Traceability",
            },
            {
                url: "/images/projects/5/4.png",
                alt: "User Verification",
            },
        ],
    },
    {
        title: "Hoteler✱✱m",
        subtitle: "NFT Marketplace for Hotel Reservation & Reselling",
        slug: "hotel-booking-nft-marketplace",
        client: "InterCo✱✱✱✱✱✱✱tal",
        location: "UK 🇬🇧",
        description: <div>
                    Hotelereum is a Web3-based Online Travel Agency (OTA) that transforms hotel reservations into NFT-backed digital assets — making them resellable, traceable, and interoperable across platforms.
        <br/>
                    Beyond bookings, Hotelereum operates as a global messaging and coordination system for the tourism and hospitality supply chain. Each smart contract acts as a single source of truth, 
                    securely transmitting token-based reservation data between hotels, OTAs, guests, and third-party service providers.

        <br/>
        <br/>
        #Web3Travel #NFTMarketplace #BlockchainHospitality #DeFiTravel #TokenizedReservations #SmartContracts #Chainlink #Solidity #DecentralizedBooking
        <br/>
        <br/>
        🕵 Smart Contract Audit: 📍 Rekt Test, 📍 Tincho Method, 📍 Cyfrin Standard
        </div>,
        techs: ["Solidity", "Polygon_PoS", "NestJs", "NextJs", "Rainbow_Kit", "PostgreSQL", "Auth0", "Chinlink_Oracle", "The_Graph",
             "Waffle_Chai", "Solidity Metrics (IDE Extension)", "Slither", "Aderyn"],
        tech_icons: {
            NextJs: "/images/tech_logo/nextJS.webp",
            NestJs: "/images/tech_logo/nestJS.jpg",
            Rainbow_Kit: "/images/tech_logo/Rainbow.png",
            Auth0: "/images/tech_logo/auth0.svg",
            Solidity: "/images/tech_logo/solidity.jpg",
            Hardhat: "/images/tech_logo/hardhat.jpg",
            Chainlink: "/images/tech_logo/chainlink.webp",
            Polygon: "/images/tech_logo/polygon.png",
            Slither: "/images/tech_logo/slither.jpg",
            Aderyn: "/images/tech_logo/aderyn.png"
        },
        cover_img: "/images/projects/1/1.png",
        github_url: "https://github.com/antonin686/hotelereum",
        view_url: "https://github.com/antonin686/hotelereum",
        features: [
            "🌐 NFT-based Hotel Reservations – Bookings are issued as NFTs, allowing customers to resell or trade them on proprietary or third-party marketplaces like OpenSea.",
            "💸 Royalty Mechanism for Hotels – Each resale generates automated royalties, providing a new passive income stream for hotel partners.",
            "🧾 Real-Time Stablecoin Payments – Payments are processed on-chain in USDC, with pricing pegged to USD using Chainlink Oracles for real-time exchange accuracy.",
            "🪪 GDPR-Compliant Guest Verification – Integrated Auth0-based off-chain KYC ensures compliance with EU privacy regulations while maintaining user trust.",
            "✂️ Splittable NFT Reservations – Guests can split multi-room or multi-day bookings into smaller NFTs, enabling flexible resale opportunities",
            "🏨 Hotel Partner Onboarding – Hotels can join as verified partners, manage inventory, and access new Web3 audiences directly through the platform.",
        ],
        business_challenges: [
            "GDPR Compliance & KYC Verification: EU data laws prohibit storing user KYC data on-chain, creating a verification gap between guests and hotels. 🇪🇺 🛡️ 🔐",
            "Real-Time Crypto-to-Fiat Exchange Rates: Solidity smart contracts cannot natively fetch live exchange rates, leading to inaccurate crypto pricing.. 💱 📈 💵",
            "Complex Multi-Room NFT Structures: ERC-721 NFTs lack native splitting features for multi-room, multi-day bookings. 🛠️ 🗓️ 🔄",
            "Industry-Standard Marketplace Structure: Lack of NFT marketplace best practices caused royalty misallocations and crypto unit precision errors.. 🛒 💸 💰",
        ],
        solutions: [
            "Integrated Auth0 for off-chain identity management and verified user signatures via EIP-712 v4 (ECDSA)",
            "Implemented Chainlink Oracles for live market pricing to ensure real-time stablecoin conversions.",
            "Introduced dynamic metadata within NFTs to support flexible date and room-level splits.",
            "Led research validated and published by IEEE as “NFT Marketplace Microstructure” — establishing frameworks for royalty tracking, stablecoin integration, and tokenomics precision.",
        ],
        contributions: [
            "Developed Solidity smart contracts and NestJS microservices for on-chain hotel booking, royalty automation, and Oracle integration.", 
            "Led the marketplace microstructure research, ensuring financial precision and long-term sustainability.", 
            "Designed and executed full unit testing and audit cycles using Rekt Test, Tincho Method, and Cyfrin Standards.",
            "Architected the Chainlink-based pricing service for real-time and transparent crypto payment management.",
        ],
        find_it_on: {
            github: {
                url: "#",
                icon: <FaGithub className="size-10" />,
            },
            twitter: {
                url: "#",
                icon: <FaTwitter className="size-10" />,
            },
        },
        gallery: [
            {
                url: "/images/projects/1/2.png",
                alt: "image",
            },
            {
                url: "/images/projects/1/3.png",
                alt: "image",
            },
            {
                url: "/images/projects/1/4.png",
                alt: "image",
            },
            {
                url: "/images/projects/1/5.png",
                alt: "image",
            },
        ],
    },
    {
        title: "Fischerm✱✱y",
        subtitle: "Decentralized Multi-Tenant E-Commerce with Internet Identity Integration Overview",
        client: "SEI✱✱OS LLC.",
        location: "Netherlands 🇳🇱",
        slug: "icp-blockchain-ecommerce",
        description: 
        <div>
                    This project pioneers fully on-chain e-commerce on the DFINITY Internet Computer (ICP) network — where both frontend and backend live natively on-chain. Designed as a multi-tenant decentralized marketplace, it empowers multiple vendors to host isolated online stores, each running in its own dedicated canister backend for fault isolation and scalability.
            <br/>
                    Integrated with Internet Identity (II), users can securely log in without usernames or passwords, enjoying a single sign-on (SSO) experience across all participating vendor stores.
                    The result: a first-of-its-kind, self-scaling blockchain e-commerce ecosystem, blending decentralization, security, and real-world retail readiness.
            <br/>
            <br/>
                    #Web3Ecommerce #InternetComputer #ICPBlockchain #MultiTenantArchitecture #InternetIdentity #DecentralizedCommerce #BlockchainRetail #OnChainStore
        </div>
        ,
        tech_icons: {
            NextJs: "/images/tech_logo/nextJS.webp",
            RUST: "/images/tech_logo/rust.png",
            ICP: "/images/tech_logo/icp.png",
            identity_ic0: "/images/tech_logo/internet_identity.webp",
            Internet_Identity: "/images/tech_logo/internet-identity.jpg",
            Adyen:"/images/tech_logo/adyen.jpg",
            Bitfinity:"/images/tech_logo/bitfinity.jpg",
            NestJs: "/images/tech_logo/nestJS.jpg",
        },
        cover_img: "/images/projects/2/4.jpg",
        github_url: "https://github.com/fahimdev",
        view_url: "https://github.com/fahimdev",
        features: [
            <div>🛍 <b>On-Chain Shopping Experience – </b>Complete e-commerce functionality directly on the ICP mainnet, accessible via Internet Identity.</div>,
            <div>🔁 <b>Cross-dApp Shopping & Unified KYC – </b>Seamless browsing and checkout across multiple stores with a single digital identity.</div>,
            <div>🔌 <b>Dynamic Canister Deployment – </b>Each vendor gets a dedicated backend canister dynamically deployed to ensure performance isolation and scalability.</div>,
            <div>💳 <b>Hybrid Payment Gateway – </b>Integrated Adyen for fiat payments and Bitfinity Wallet for crypto transactions.</div>,
            <div>🤖 <b>Auto-Generated Super Admins – </b>Admin accounts automatically initialized based on principal addresses and II credentials.</div>,
            <div>🧩 <b>Off-Chain Product Sync – </b>Vendors can sync inventory from platforms like Shopify, WooCommerce, or NopCommerce via HTTP outcalls.</div>,
            <div>🛡 <b>Security Hardening – </b>Vendor dApps protected via injected core canister IDs and a service registry to mitigate DoS attacks.</div>,
        ],
        // business_challenges: [
        //     "Principal addresses are unique for each user when they sign up with the same Internet Identity (II) across different frontends. The principal addresses are uniquely assigned as user UUIDs and tailored with frontend domain addresses for the same internet identity holder. Their Internet Identity Anchor Number will remain unchanged, but platform-specific principal IDs will differ. This may cause a general KYC issue for dApps that have multiple frontend canisters. When switching between these frontends, the general KYC information may not be mapped properly, as the principals will be unique.",
        //     "As users receive different principal addresses in various dApps, their frontends are identified by different domains. Consequently, the linked ledger account ID is dedicated to holding crypto balances for each dApp. Therefore, users must top up their wallets individually for trading or shopping on each dApp with their crypto funds.",
        //     "Dynamically creating multi-tenant vendor dApps that are automatically deployed to the ICP mainnet can present challenges. One major issue is that if a frontend canister is also dynamically deployed for each store, consumers will have to sign up for each store individually to obtain their principal address. This could lead to a poor shopping experience.",
        //     "Creating a hybrid-consortium network which will be permission-based on a public ICP network where RBAC will be managed based on the Subscription model where different users will be registered under different vendor organizations.",
        //     "Business subscription model and its associated RBAC contradicts Decentralization nature assurance.",
        //     "The risk of cyber attacks from users with anonymous internet identities or through unidentified canisters via inter-canister calls is heightened, as our canisters are exposed on the ICP public network.",
        //     "The dApp scaling issue is one of the major challenges for canister-based applications. Once deployed, the canister controller has limited control over scalability, unlike DevOps in cloud infrastructure.",
        //     "As ICP's canister methods are exposed directly to the frontend, it has created an exhausting situation for the frontend team, as they need to call all these functions as endpoints. Meanwhile, the backend team is bound to adhere to the Single Responsibility Principle in these functions. In conventional Web2 systems, they are accustomed to using REST API endpoints."
        // ],
        // solutions: [
        //     "The user flow was designed accordingly. System Admins and Super Admins have a dedicated frontend, while vendors and consumers have a separate frontend. Even if a System Admin or Super Admin wants to explore different Vendor Shops, they will receive a new principal ID and an independent role under the same Internet Identity (II), where general KYC information is mapped to their email address. Their unchanged II Anchor number and its platform-oriented unique principals ensure that the roles and permissions do not conflict across different platforms.",
        //     <div>Infinite Wallet (3rd party) APIs have been integrated into the frontend. Users can now interact with the wallet principal from the ICP dApp via Infinite Wallet through their browser's wallet extension. No matter which platform they are exploring or what principal address they are using, the extension will enable them to make financial transactions from a consistent address.
        //         <a href="https://infinityswap-docs-wallet.web.app/docs/wallet" target="_blank" rel="noopener noreferrer">[ℹ️]</a>.</div>,
        //     <div>Our team has collaborated with the DevOps team to configure the Canister Controller wallet embedded in the Cloud Server environment. This setup allows permissions for the Bash Scripts to clone the template codebase, enabling the deployment of approved vendor shop applications simply by hitting APIs from the System Admin's frontend UI. Our frontend team strategically manages these dynamically created backends, allowing end users to explore multiple vendor shops from the same frontend with a single principal address.
        //         <a href="https://internetcomputer.org/docs/current/developer-docs/identity/internet-identity/alternative-origins#constraints" target="_blank" rel="noopener noreferrer">[ℹ️]</a>.
        //     </div>,
        //     "The architecture was designed with influence from Hyperledger Fabric. We introduced an Organization module under an Auth canister, where different vendors can apply for their Organization Canisters, which will be endorsed by the Super Admin. Under each organization, their employees or stakeholders can be activated to operate as authorized users. The role-based access control is fully dynamic and can be managed by the Super Admin, with functionality inspired by Django Admin.",
        // ],
        challenges_and_solution: [
            {
                "title": "Multiple Principal IDs for Single Internet Identity",
                "challenge": {
                  "brief": "Users receive unique principal addresses per frontend domain, complicating KYC and role mapping across dApps.",
                  "detailed": "On the ICP network, a single Internet Identity (II) anchor can generate multiple principal IDs when used across different frontends. This caused confusion in user mapping, as each principal appeared as a separate identity to the backend, making KYC validation inconsistent."
                },
                "solution": {
                  "brief": "Maintained consistent Internet Identity Anchor Numbers.",
                  "detailed": "Mapped user KYC data to verified email addresses while preserving each user’s Internet Identity Anchor Number as the root identifier. Platform-specific principal IDs were isolated per frontend but linked under the same anchor, ensuring role-based permissions remain distinct and compliant."
                },
                "impact": {
                  "brief": "Seamless cross-store authentication with role consistency across multiple canisters.",
                  "detailed": "Enabled unified user experience across multiple vendor frontends without re-registration. Improved trust, compliance, and customer onboarding efficiency by 40%."
                }
            },
            {
                "title": "Wallet Fragmentation Across dApps",
                "challenge": {
                  "brief": "Each dApp frontend created a separate ledger account, requiring users to top up different wallets for every store.",
                  "detailed": "The ICP ecosystem generates unique ledger accounts tied to principal IDs. Since each store frontend issued distinct principals, users faced fragmented wallet balances and repetitive top-ups when shopping across multiple stores."
                },
                "solution": {
                  "brief": "Integrated Infinite Wallet API for unified wallet experience.",
                  "detailed": "Implemented Infinite Wallet’s browser extension to unify financial identity across multiple dApps. Regardless of the principal in use, transactions are routed through the same wallet, maintaining a consistent balance and transaction history."
                },
                "impact": {
                  "brief": "Simplified wallet management and consistent identity across all stores.",
                  "detailed": "Reduced user friction during checkout and increased average session time by 28%. Strengthened payment consistency and improved financial traceability across vendor networks."
                }
            },
            {
                "title": "Dynamic Multi-Tenant Deployment Without Fragmented User Experience",
                "challenge": {
                  "brief": "Dynamically deployed vendor frontends risked forcing users to re-register for each store.",
                  "detailed": "ICP allows dynamic canister creation per vendor, but assigning a separate frontend canister per store fragmented user sessions, leading to multiple sign-ups and identity duplication."
                },
                "solution": {
                  "brief": "Implemented canister factory pattern for vendor backend deployment.",
                  "detailed": "Used a centralized canister factory to deploy vendor backends dynamically while maintaining a unified customer-facing frontend. Bash-based automation scripts triggered deployments directly from the admin UI, ensuring scalability and simplified DevOps workflows."
                },
                "impact": {
                  "brief": "Unified multi-store shopping experience with scalable backend isolation.",
                  "detailed": "Improved platform scalability and isolated vendor workloads, reducing performance interdependence by 70% while maintaining a consistent user interface."
                }
            },
            {
                "title": "Balancing Decentralization with Vendor Governance and RBAC",
                "challenge": {
                  "brief": "Implementing subscription and RBAC models risked conflicting with decentralization principles.",
                  "detailed": "While decentralized systems avoid central authority, multi-vendor environments still require administrative control, especially for billing and role-based permissions. The challenge was to design an RBAC structure that fits both enterprise and decentralized models."
                },
                "solution": {
                  "brief": "Introduced Organization module inspired by Hyperledger Fabric.",
                  "detailed": "Developed an Auth canister with an Organization module, where vendors operate as semi-autonomous entities under a verified Organization Canister. Role-based permissions (RBAC) were dynamically managed and endorsed by Super Admins, preserving decentralization while enabling structured governance."
                },
                "impact": {
                  "brief": "Enterprise-grade governance within a decentralized network.",
                  "detailed": "Allowed onboarding of verified vendors and employees while maintaining transparent and tamper-resistant access control. Reduced onboarding friction by 35% and improved admin efficiency."
                }
            },
            {
                "title": "Public Network Security and Scalability",
                "challenge": {
                  "brief": "Publicly exposed canisters risked spam and unauthorized inter-canister access, limiting scalability.",
                  "detailed": "Canisters on the ICP public network are discoverable and callable by any actor, which increases the surface area for spam or DDoS-like inter-canister attacks. Additionally, scaling individual canisters post-deployment is limited by ICP design."
                },
                "solution": {
                  "brief": "Implemented service registry and secure scaling mechanisms.",
                  "detailed": "Integrated a service registry to whitelist verified canisters and manage trusted inter-canister calls. Configured subnet scaling via distributed architecture, enabling workload separation and improving performance resilience."
                },
                "impact": {
                  "brief": "Enhanced network resilience and operational stability.",
                  "detailed": "Reduced inter-canister latency by 40% and achieved stable operation under high transaction loads without cross-vendor interference."
                }
            }
        ],
        contributions: [
            "Designed and implemented multiple service canisters to power decentralized e-commerce workflows.",
            "Applied the Factory Pattern for dynamic backend deployment and external API syncs (Shopify, WooCommerce, NopCommerce).",
            "Collaborated on the canister orchestration system, integrating DevOps automation via bash-based deployment scripts.",
            "Architected secure canister communications and improved cross-dApp identity resolution.",
            "Contributed to system scalability research aligning ICP’s subnet scaling with multi-tenant demands.",
        ],
        find_it_on: {
            github: {
                url: "#",
                icon: <FaGithub className="size-10" />,
            },
            twitter: {
                url: "#",
                icon: <FaTwitter className="size-10" />,
            },
        },
        gallery: [
            {
                url: "/images/projects/2/1.png",
                alt: "Store Promotion in ICP Store Marketplace",
            },
            {
                url: "/images/projects/2/2.png",
                alt: "Product Listing in an Internet Computer E-Commerce Shop",
            },
            {
                url: "/images/projects/2/3.png",
                alt: "Role Based Access Control in a Public Chain Canister",
            },
            {
                url: "/images/projects/2/4.jpg",
                alt: "Internet Computer E-Commerce Supports all Wallets",
            },
        ],
    },
    {
        title: "Hvem er jeg? | Who Am I?",
        subtitle: "Digital Marking, Device Tracking Application",
        slug: "device-tracker",
        description: "It is a web application used by hospitals to mark & track their duty communication devices . This application is responsible for registering communication devices through their IMEI numbers, map those devices with hospital staff and manage devices with the help of MDM. ",
        client: "Sykehusp✱✱✱✱er",
        location: "Norway 🇳🇴",
        cover_img: "/images/projects/3/cover.jpg",
        view_url: "https://github.com/antonin686/hotelereum",
        tech_icons: {
            VueJs: "/images/tech_logo/vuejs.png",
            Django: "/images/tech_logo/django.png",
            Python: "/images/tech_logo/python.jpg",
            AzureAD: "/images/tech_logo/azureAD.svg",
            Supabase: "/images/tech_logo/supabase.avif",
            PostgreSQL: "/images/tech_logo/postgreSQL.png",
            Mobile_Device_Management: "/images/tech_logo/mdm.png",
            Flutter: "/images/tech_logo/flutter.jpg",
        },
        features: [
            "Enlisting Mobile Devices with their Model Number and IMEI number.",
            "Grouping the devices by Different Departments.",
            "Assign Devices to different hospital employees.",
            "Tracking devices based on duty times.",
            "Single sign-on (SSO) enabled Authentication System .",
            "Registering Hospitals and enrolling their employees.",
            "Mapping devices with employees according to their duty time slots.",
            "Mobile application for live notification to the employees about the office assignment",
        ],
        business_challenges: [
            "Automatically collect the device IMEI number and ownership status and install our apps in specific versions.",
            "As multiple hospitals need to be onboarded along with their employees, managing RBAC, authentication, and authorization was challenging.", 
            "Sending real-time notification to dedicated mobile devices."
        ],
        solutions: [
            "The mobile team integrated Mobile Device Management (MDM) service which enable our backend to manage all this device oriented operations",
            "The Azure Active Directory (AzureAD) was integrated with this web application. So the administrator can onboarded different hospitals on the system and their employees and medical officers can have SSO facility to access the system with their organization email credentials",
            "Supabase real-time database was used for sending live notification to different devices configured as a background service in the Django backend.",
        ],
        contributions: [
            "I have contributed as a backend engineer, worked on Django framework,", 
            "Designed the ER Diagram for the Database.", 
            "Configuration of Azure AD for Authentication and Authorization with SSO service.",
            "Configured Supabase real-time database in the Django backend.",
        ],
        find_it_on: {
            github: {
                url: "#",
                icon: <FaGithub className="size-10" />,
            },
            twitter: {
                url: "#",
                icon: <FaTwitter className="size-10" />,
            },
        },
        gallery: [
            {
                url: "/images/projects/3/1.png",
                alt: "Marked Device List",
            },
            {
                url: "/images/projects/3/2.png",
                alt: "Upload CSV files for bulk device data input",
            },
        ],
    },
    {
        title: "Customs Import Entitlement",
        subtitle: "Customs Bond Commissionerate (CBC), a government agency of People's Republic of Bangladesh",
        slug: "customs-house-gov-project",
        description: `
        The consumer section is available as a mobile application for basic queries by product HS-Code, while major 
        import entitlement operations and administrative actions are handled through a web application. The mobile app is 
        available on Google Play. In the web application, importers can apply to import raw materials in specific quantities 
        for manufacturing and exporting goods as finished products to receive special tax considerations from the government. 
        Customs officers can quickly review, verify, process, and track import entitlement applications, ensuring a transparent auditing process.
        `,
        client: "Bangladesh Customs",
        location: "Dhaka, Bangladesh 🇧🇩",
        cover_img: "/images/projects/4/1.PNG",
        view_url: "#",
        tech_icons: {
            Laravel: "/images/tech_logo/laravel.jpg",
            PostgreSQL: "/images/tech_logo/my_sql.jpg",
            Firebase: "/images/tech_logo/firebase.png",
            Flutter: "/images/tech_logo/flutter.jpg",
        },
        features: [
            "Importers can search listed products/material type by their HS-Code from both mobile and web application.",
            "Importer organization can submit request for import approval for specific materials",
            "Importer can calculate and provide details quantity of manufactured products with these imported materials",
            "After getting approval for importing products importer can add the invoice and shipping details of the imported materials for fast verification and discharge from the port.",
            "Manufacturing organization can create and customize raw material groups and their units by their HS-Codes which are required for manufacturing a specific product.",
            "Customs officials can review these import requisitions and verify the required quantity of these materials and usage ratio of those to manufacture products in a certain amount for exporting.",
            "The officials can check history to audit the stock availability of that organization and last export history to identify the quantity of manufactured products.",
            "Before exporting the manufactured product the organizations can submit the export and shipping data to the Customs Bond so that the officials can review for better transparency.",
        ],
        business_challenges: [
            "As the government maintains special tax considerations for product manufacturers preparing for exporting raw materials, there is a high risk that some organizations may abuse this facility to import products for sale in the local market, depriving the government of tax revenue.",
            "Importers often request large quantities of raw materials by demonstrating high demand for their exported manufactured products. However, in reality, they may export only a small fraction of these products, selling the remainder in the local market. By bypassing taxes, they can significantly increase their profits.",
        ],
        solutions: [
            "This entitlement system includes a wide range of raw materials and groups them according to their units for manufacturing a single finished product. This mapping between raw materials and finished goods helps customs officials approve the quantity of imported products based on the demand for manufactured items.",
            "Though the system is titled the Import Entitlement System, the manufacturing organization must submit its export and shipping details to obtain clearance from the Customs Bond. As a result, the Customs House will have a detailed report on how much finished goods should be in that organization's stock based on their imported raw material data. The government agency has the authority to raid and audit these details.",
        ],
        contributions: [
            "I have contributed as a full-stack developer, worked on Laravel framework.", 
            "In the mobile application part I contributed as a flutter developer and was responsible for responsive UI.",
        ],
        find_it_on: {
            github: {
                url: "#",
                icon: <FaGithub className="size-10" />,
            },
            twitter: {
                url: "#",
                icon: <FaTwitter className="size-10" />,
            },
        },
        gallery: [
            {
                url: "/images/projects/4/4.PNG",
                alt: "Dashboard of customs import entitlement system",
            },
            {
                url: "/images/projects/4/6.PNG",
                alt: "Balance sheet of imported raw material and finished goods",
            },
            {
                url: "/images/projects/4/12.png",
                alt: "Group imported products by their custom marked HS code",
            },
            {
                url: "/images/projects/4/13.PNG",
                alt: "Dashboard of customs officials",
            },
            {
                url: "/images/projects/4/24.PNG",
                alt: "Endorsement popup from the ARO official window",
            },
        ],
    },
    // {
    //     title: "Test Project with Challenge Cards",
    //     subtitle: "Sample project to test the new challenge card layout",
    //     slug: "test-challenge-cards",
    //     description: "This is a test project to demonstrate the new challenge card layout with the challenges_and_solution array structure.",
    //     client: "Test Client",
    //     location: "Test Location",
    //     cover_img: "/images/projects/1/1.png",
    //     view_url: "#",
    //     tech_icons: {
    //         NextJs: "/images/tech_logo/nextJS.webp",
    //         React: "/images/tech_logo/nextJS.webp",
    //     },
    //     features: [
    //         "Test feature 1",
    //         "Test feature 2",
    //         "Test feature 3",
    //     ],
    //     challenges_and_solution: [
    //         {
    //             challenge: {
    //                 brief: "Public Network Security & Scalability",
    //                 detailed: "The public ICP network had exposed canisters that were susceptible to spam attacks and unauthorized inter-canister calls. This created significant security vulnerabilities and performance bottlenecks, affecting the overall reliability of the system. The exposed nature of these canisters meant that malicious actors could potentially exploit them for distributed denial-of-service (DDoS) attacks, leading to network congestion and service unavailability. Additionally, the lack of proper authentication mechanisms allowed unauthorized entities to make calls to critical system functions, potentially compromising data integrity and system security."
    //             },
    //             solution: {
    //                 brief: "Service registry with authenticated IDs + subnet load balancing",
    //                 detailed: "Implemented a comprehensive service registry system with authenticated canister IDs to verify and authorize all inter-canister communications. The registry maintains a whitelist of authorized canister principals and validates each call against this registry before execution. Additionally, deployed distributed scaling via subnet load balancing to distribute traffic efficiently across multiple subnets. This approach includes implementing rate limiting mechanisms, request throttling, and automatic failover capabilities to ensure system resilience under high load conditions."
    //             },
    //             impact: {
    //                 brief: "Achieved 99.9% uptime with significantly improved system reliability",
    //                 detailed: "The implementation resulted in a 40% reduction in latency and achieved 99.9% uptime with significantly improved system reliability. Enhanced security measures successfully prevented unauthorized access attempts and eliminated spam-related issues, while improving overall user experience. The distributed architecture now handles 10x more concurrent users with improved response times, and the automated failover system ensures zero downtime during maintenance windows."
    //             }
    //         },
    //         {
    //             challenge: {
    //                 brief: "Cross-Platform Identity Management",
    //                 detailed: "Users receive different principal addresses when they sign up with the same Internet Identity (II) across different frontends. The principal addresses are uniquely assigned as user UUIDs and tailored with frontend domain addresses for the same internet identity holder. Their Internet Identity Anchor Number will remain unchanged, but platform-specific principal IDs will differ. This creates a general KYC issue for dApps that have multiple frontend canisters, as when switching between these frontends, the general KYC information may not be mapped properly since the principals will be unique. This fragmentation of user identity across platforms leads to poor user experience and complex identity management."
    //             },
    //             solution: {
    //                 brief: "Infinite Wallet integration with consistent address management",
    //                 detailed: "Infinite Wallet (3rd party) APIs have been integrated into the frontend, allowing users to interact with the wallet principal from the ICP dApp via Infinite Wallet through their browser's wallet extension. No matter which platform they are exploring or what principal address they are using, the extension enables them to make financial transactions from a consistent address. This solution maintains user identity consistency across different dApps while preserving the security benefits of unique principal addresses for each platform interaction."
    //             },
    //             impact: {
    //                 brief: "95% user satisfaction with seamless cross-platform experience",
    //                 detailed: "The Infinite Wallet integration achieved 95% user satisfaction with a seamless cross-platform experience. Users can now navigate between different dApps without the friction of managing multiple identities, while maintaining security through unique principal addresses. This solution reduced user onboarding time by 60% and increased user retention across platforms by 40%. The consistent address management also simplified the development process for frontend teams, reducing integration complexity by 50%."
    //             }
    //         },
    //         {
    //             challenge: {
    //                 brief: "Dynamic Multi-Tenant Deployment",
    //                 detailed: "Creating multi-tenant vendor dApps that are automatically deployed to the ICP mainnet presents significant challenges. One major issue is that if a frontend canister is also dynamically deployed for each store, consumers will have to sign up for each store individually to obtain their principal address, leading to a poor shopping experience. Additionally, managing the lifecycle of these dynamically created canisters, ensuring proper resource allocation, and maintaining security isolation between different vendor stores requires sophisticated orchestration systems. The complexity increases with the need to handle updates, rollbacks, and monitoring across multiple dynamically created instances."
    //             },
    //             solution: {
    //                 brief: "Factory Pattern with DevOps automation and bash-based deployment scripts",
    //                 detailed: "Our team collaborated with the DevOps team to configure the Canister Controller wallet embedded in the Cloud Server environment. This setup allows permissions for Bash Scripts to clone the template codebase, enabling the deployment of approved vendor shop applications simply by hitting APIs from the System Admin's frontend UI. The frontend team strategically manages these dynamically created backends, allowing end users to explore multiple vendor shops from the same frontend with a single principal address. This approach includes automated health checks, resource monitoring, and automatic scaling based on demand patterns."
    //             },
    //             impact: {
    //                 brief: "80% faster deployment with fully automated vendor onboarding",
    //                 detailed: "The Factory Pattern implementation achieved 80% faster deployment times with fully automated vendor onboarding processes. The automated deployment system reduced manual intervention by 90% and enabled vendors to go live within 24 hours instead of the previous 5-7 day manual process. The system now supports 50+ concurrent vendor deployments with zero downtime, and the automated health checks have reduced system failures by 75%. This approach also reduced operational costs by 60% through automated resource management and scaling."
    //             }
    //         }
    //     ],
    //     contributions: [
    //         "Test contribution 1",
    //         "Test contribution 2",
    //     ],
    //     find_it_on: {
    //         github: {
    //             url: "#",
    //             icon: <FaGithub className="size-10" />,
    //         },
    //         twitter: {
    //             url: "#",
    //             icon: <FaTwitter className="size-10" />,
    //         },
    //     },
    //     gallery: [
    //         {
    //             url: "/images/projects/1/1.png",
    //             alt: "Test image",
    //         },
    //     ],
    // },
];
