import { FaGithub, FaTwitter } from "react-icons/fa";

export const PROJECTS: any[] = [
    {
        title: "Hoteler✱✱m",
        subtitle: "NFT Marketplace for Hotel Reservation & Reselling",
        slug: "hotel-booking-nft-marketplace",
        client: "InterCo✱✱✱✱✱✱✱tal",
        location: "UK 🇬🇧",
        description: <div>
            It is a dApp of Marketplace where people can book hotels and resell them in proprietary or 3rd party marketplaces. 
        Different hotels can join here as a partner to enable their services in Web3 networks. Reservations are identified as NFT digital objects. 
        So the reservation owner can actually own their bookings and can resell those. So refund claiming will not  an issue anymore.
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
            "🌐 Primary Marketplace for hotel booking, enabling reservations to be visible in 3rd party (secondary) marketplaces as NFTs. This unlocks business interoperability in the online hotel booking industry.",
            "🫱🏿‍🫲🏽 Proprietary marketplace for reselling reservation NFT. 3rd party marketplace consumers can verify the NFT's reservation validity form this Proprietary marketplace as a complementary service. 𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃",
            <div>💰 Reselling reservations in secondary marketplaces<sup>(third-party or proprietary)</sup> while guaranteeing <i>royalties</i> for the hotel partners.</div>,
            "🏘 Register hotels as Partners in the primary market.",
            "🖼 Minting NFTs as a Digital Twin ensures supply by keeping it synced with the inventory of hotel room availability.",
            "📊 Purchase and reselling reservations are made on-chain. The reservation price is calculated in real-time using the Chainlink Oracle to determine the Matic/ETH exchange rate to USD. Payments made on-chain are accepted in USDC Stable Coin.",
            "✂️ An NFT owner can resell reservations by splitting reservation dates and rooms from a single NFT into multiple NFTs.",
            "💸 Royalty/commission collection from third-party marketplaces on each split NFT resale transaction.",
        ],
        business_challenges: [
            "As the product was mainly focused on European Union countries, contradictions have arisen regarding the use of user KYC data in public blockchain networks due to the GDPR law. 🇪🇺 🛡️ 🔐",
            "As user KYC was not allowed to be stored on-chain, the dApp faced a challenge in verifying the validity and authenticity of hotel guests to our hotel partners. 🕵️‍♀️ 🪪 ✅",
            "Solidity based smart contracts can't call external APIs, so they can't fetch real-time exchange rates. This creates a challenge when a customer wants to pay in a different cryptocurrency or stablecoin, as the contract can't accurately calculate the correct amount without live price feed. 💱 📈 💵",
            "As guests can make a single booking for multiple rooms over several days, a single NFT is minted following OpenZeppelin's ERC standards to digitally represent that reservation. However, there is no provision for splitting these ERC standard NFTs when a guest wishes to resell them for separate rooms with flexible dates. 🛠️ 🗓️ 🔄",
            "In the NFT marketplace, microstructures are poorly defined, leading developers to common mistakes and missed best practices in token distribution. Trusted guidelines are lacking, and most available articles aren't peer-reviewed. This results in issues like incorrect royalty distribution and missing micro units (e.g., wei, gwei). 🛒 💸 💰",
        ],
        solutions: [
            "To ensure compliance with GDPR law in our system, we have integrated Auth0 into our architecture to deal with the user's KYC.",
            <div><i>EIP-712</i> <sup>v4</sup> was implemented to store the hotel guest's KYC in the form of an <code>Elliptic Curve Digital Signature (ECDSA)</code>, allowing the hotel partner to collect and verify the KYC data directly from the Auth0 service provider.</div>,
            "To obtain on-chain real-time exchange and swap rates of different currencies, Chainlink Oracle has been integrated.",
            <div>The <code>"From"</code> and <code>"To"</code> dates were designed as dynamic metadata, enabling ERC721 NFTs to function as splittable reservations. This feature helps guests customize their resale deals based on the buyer's flexibility.</div>,
            <div>To establish the blueprint for our proprietary hotel-based NFT marketplace, my team and I conducted research to address issues such as royalty collection for hotel partners from third-party marketplaces, stablecoin payment integration, and sustainable tokenomics to prevent fractional crypto units. Our approach has been validated, peer-reviewed, and published by IEEE under the title "NFT Marketplace Microstructure," ensuring compatibility with major platforms like OpenSea. <br/> <a href="https://doi.org/10.1109/icbc59979.2024.10634338" target="_blank" rel="noopener noreferrer" title="Unlocking DeFi Literacy: Understanding NFT Market Microstructure in the Decentralized Finance Landscape">🔗 Research DOI</a></div>,
        ],
        contributions: [
            "Here I have contributed as a blockend engineer. Worked on NestJs microservices and Smart Contract development in Solidity.", 
            "On-chain payment service and oracle integration are some of the major contributions of mine.", 
            "To ensure the best practices of the Proprietary Marketplace, I led research on marketplace microstructure and prevention of fractional crypto units loss.",
            "I also covered full unit test for my Smart Contract and prepared a full internal audit report before product release.",
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
        title: "ANAHATA R✱✱✱S",
        subtitle: "An on-chain e-commerce platform at DFINITY's ICP blockchain network",
        client: "SEI✱✱OS LLC.",
        location: "Netherlands 🇳🇱",
        slug: "icp-blockchain-ecommerce",
        description: `This project is an on-chain e-commerce shop on the ICP network. 
        The frontend and backend are both deployed directly on the ICP network. 
        The super-admin frontend and the vendor store manager frontend are deployed in different canisters. 
        The core application’s backend is designed as a distributed system so that the ICP network can scale 
        the subnets properly based on the loads of different service canisters. Its architecture includes an innovative contribution: 
        the dynamic deployment of different vendor's backends on the ICP network as a multi-tenant system, which is rarely seen in 
        the blockchain ecosystem. For authentication and authorization, they use Internet Identity.`,
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
        cover_img: "/images/projects/2/1.jpg",
        github_url: "https://github.com/fahimdev",
        view_url: "https://github.com/fahimdev",
        features: [
            "🛍 Shopping experience from the ICP main-net by signing up with Internet Identity.",
            "🚀 Cross dApp shopping with fluid KYC authentication by a single internet identity.",
            "🔁 Sync off-chain products with on-chain dApps to align inventory with 3rd parties like Shopify, WooCommerce, and NopCommerce etc.",
            "🤖 Automatic initialization of Super-admin accounts by their principal addresses and internet identity.",
            "💳 Vendor registration and subscription model integrated with the Adyen payment gateway for fiat and Bitfinity Wallet for crypto.",
            "🛡️ Injected core canister ids into vendor’s dApps and service registry module to secure canisters from DoS Attack.",
            "🔌 Dynamic canister deployment in form of Vendor’s dApp as a multi-tenant system.",
        ],
        business_challenges: [
            "Principal addresses are unique for each user when they sign up with the same Internet Identity (II) across different frontends. The principal addresses are uniquely assigned as user UUIDs and tailored with frontend domain addresses for the same internet identity holder. Their Internet Identity Anchor Number will remain unchanged, but platform-specific principal IDs will differ. This may cause a general KYC issue for dApps that have multiple frontend canisters. When switching between these frontends, the general KYC information may not be mapped properly, as the principals will be unique.",
            "As users receive different principal addresses in various dApps, their frontends are identified by different domains. Consequently, the linked ledger account ID is dedicated to holding crypto balances for each dApp. Therefore, users must top up their wallets individually for trading or shopping on each dApp with their crypto funds.",
            "Dynamically creating multi-tenant vendor dApps that are automatically deployed to the ICP mainnet can present challenges. One major issue is that if a frontend canister is also dynamically deployed for each store, consumers will have to sign up for each store individually to obtain their principal address. This could lead to a poor shopping experience.",
            "Creating a hybrid-consortium network which will be permission-based on a public ICP network where RBAC will be managed based on the Subscription model where different users will be registered under different vendor organizations.",
            "Business subscription model and its associated RBAC contradicts Decentralization nature assurance.",
            "The risk of cyber attacks from users with anonymous internet identities or through unidentified canisters via inter-canister calls is heightened, as our canisters are exposed on the ICP public network.",
            "The dApp scaling issue is one of the major challenges for canister-based applications. Once deployed, the canister controller has limited control over scalability, unlike DevOps in cloud infrastructure.",
            "As ICP's canister methods are exposed directly to the frontend, it has created an exhausting situation for the frontend team, as they need to call all these functions as endpoints. Meanwhile, the backend team is bound to adhere to the Single Responsibility Principle in these functions. In conventional Web2 systems, they are accustomed to using REST API endpoints."
        ],
        solutions: [
            "The user flow was designed accordingly. System Admins and Super Admins have a dedicated frontend, while vendors and consumers have a separate frontend. Even if a System Admin or Super Admin wants to explore different Vendor Shops, they will receive a new principal ID and an independent role under the same Internet Identity (II), where general KYC information is mapped to their email address. Their unchanged II Anchor number and its platform-oriented unique principals ensure that the roles and permissions do not conflict across different platforms.",
            <div>Infinite Wallet (3rd party) APIs have been integrated into the frontend. Users can now interact with the wallet principal from the ICP dApp via Infinite Wallet through their browser's wallet extension. No matter which platform they are exploring or what principal address they are using, the extension will enable them to make financial transactions from a consistent address.
                <a href="https://infinityswap-docs-wallet.web.app/docs/wallet" target="_blank" rel="noopener noreferrer">[ℹ️]</a>.</div>,
            <div>Our team has collaborated with the DevOps team to configure the Canister Controller wallet embedded in the Cloud Server environment. This setup allows permissions for the Bash Scripts to clone the template codebase, enabling the deployment of approved vendor shop applications simply by hitting APIs from the System Admin's frontend UI. Our frontend team strategically manages these dynamically created backends, allowing end users to explore multiple vendor shops from the same frontend with a single principal address.
                <a href="https://internetcomputer.org/docs/current/developer-docs/identity/internet-identity/alternative-origins#constraints" target="_blank" rel="noopener noreferrer">[ℹ️]</a>.
            </div>,
            "The architecture was designed with influence from Hyperledger Fabric. We introduced an Organization module under an Auth canister, where different vendors can apply for their Organization Canisters, which will be endorsed by the Super Admin. Under each organization, their employees or stakeholders can be activated to operate as authorized users. The role-based access control is fully dynamic and can be managed by the Super Admin, with functionality inspired by Django Admin.",
        ],
        contributions: [
            "Here I have contributed as a backend canister developer, worked on different service canisters in Rust.",
            "Factory pattern to implement various integrations for syncing products through HTTP outcalls from different platform APIs, such as Shopify.",
            "",
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
                url: "https://picsum.photos/200",
                alt: "image",
            },
            {
                url: "https://picsum.photos/200",
                alt: "image",
            },
            {
                url: "https://picsum.photos/200",
                alt: "image",
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
            PostgreSQL: "/images/tech_logo/postgreSQL.png",
            Flutter: "/images/tech_logo/flutter.jpg",
        },
        features: [
            "Loading....",
        ],
        business_challenges: [
            "Loading...",
        ],
        solutions: [
            "Loading...",
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
];
