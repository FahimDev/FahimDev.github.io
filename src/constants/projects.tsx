import { FaGithub, FaTwitter } from "react-icons/fa";

export const PROJECTS: any[] = [
    {
        title: "Hotelereum",
        subtitle: "NFT Marketplace for Hotel Reservation & Reselling",
        slug: "hotelereum",
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
            NextJs: "/images/tech_logo/nestJS.jpg",
            NestJs: "/images/tech_logo/nextJS.webp",
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
        title: "Hotelereum2",
        slug: "hotelereum2",
        description: "a hotel booking platform incorporating NFT technology",
        techs: "JavaScript, Python, Solidity",
        cover_img: "https://picsum.photos/200",
        github_url: "https://github.com/antonin686/hotelereum",
        view_url: "https://github.com/antonin686/hotelereum",
        business_challenges: [
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
        ],
        solutions: [
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
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
        title: "Hotelereum3",
        slug: "hotelereum3",
        description: "a hotel booking platform incorporating NFT technology",
        techs: "JavaScript, Python, Solidity",
        cover_img: "https://picsum.photos/200",
        github_url: "https://github.com/antonin686/hotelereum",
        view_url: "https://github.com/antonin686/hotelereum",
        business_challenges: [
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
        ],
        solutions: [
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
            "Designing user interactions in Web3 for public services on blockchain posed significant challenges for the public",
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
];
