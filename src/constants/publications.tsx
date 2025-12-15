import { IoDocumentText } from "react-icons/io5";

export const PUBLICATIONS = [
    {
        title: "Journal Articles",
        icon: <IoDocumentText className="size-10 rounded-xl text-cyan-500" />,
        points: [
            {
                title: (
                    <p>
                        M.A.Islam, “Distributed ledger technology based
                        integrated healthcare solution for bangladesh
                        (blockchain)”, IEEE Access, vol. 11, 2022. DOI:{" "}
                        <a
                            href="https://www.doi.org/10.1109/ACCESS.2023.3279724"
                            className="text-cyan-500 hover:underline"
                        >
                            10.1109/ACCESS.2023.3279724
                        </a>
                        .
                       <br/>💰 <b>Funded by the <i>Research Council of Norway</i> 🇳🇴.</b>
                    </p>
                ),
                image: "images/publisher/ieee_access.png",
            },
        ],
    },
    {
        title: "Conference Proceedings",
        icon: <IoDocumentText className="size-10 rounded-xl text-cyan-500" />,
        points: [
            {
                title: (
                    <p>
                        M.A.Islam, “Unlocking defi literacy: Understanding nft market microstructure in the decentralized finance landscape”, in 🇮🇪 ICBC 2024: 
                        2nd IEEE International Workshop on Cryptocurrency Exchanges (CryptoEx 2024), Dublin, Ireland, 2024.
                        DOI:{" "}
                        <a
                            href="https://doi.org/10.1109/ICBC59979.2024.10634338"
                            className="text-cyan-500 hover:underline"
                        >
                            10.1109/ICBC59979.2024.10634338
                        </a>
                    </p>
                ),
                image: "images/publisher/ieee_icbc.png",
            },
            {
                title: (
                    <p>
                        M.A.Islam, “An automated monitoring and environmental control system 
                        for laboratory-scale cultivation of oyster mushrooms using the internet 
                        of agricultural thing (ioat)”, in 🇧🇩 ICCA ’2022: Proceedings of the 
                        2nd International Conference on Computing Advancements, Dhaka, Bangladesh, 2022.
                        DOI:{" "}
                        <a
                            href="https://doi.org/10.1145/3542954.3542985"
                            className="text-cyan-500 hover:underline"
                        >
                            10.1145/3542954.3542985
                        </a>
                    </p>
                ),
                image: "images/publisher/acm.jpg",
            },
            {
                title: (
                    <p>
                        International Conference on Software Engineering® - ICSE 2026 “Beyond Vendor Lock-In: Hybrid EVM-based Event-Driven Architecture for Cross-Organization Collaboration”
                        DOI:{" "}
                        <a
                            href="https://doi.org/#"
                            className="text-cyan-500 hover:underline"
                        >
                            DOI Link
                        </a>
                    </p>
                ),
                image: "images/publisher/icse-2026-logo.png",
            },
            {
                title: (
                    <p>
                        M.A.Islam, “Distributed architecture for decentralized application”, in 🇧🇩 ICCIT 2024: 
                        IEEE 27th International Conference on Computer and Information Technology, Cox’s Bazar, Bangladesh, 2024.
                        DOI:{" "}
                        <a
                            href="https://doi.org/#"
                            className="text-cyan-500 hover:underline"
                        >
                            DOI Link
                        </a>
                    </p>
                ),
                image: "images/publisher/ieee_xplore.png",
            },
        ],
    },

];
