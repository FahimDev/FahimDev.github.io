import { SOCIAL_LINKS } from "@/constants/social-links";

import Skillset from "./Skillset";
import { KEYWORDS } from "@/constants/keywords";


export default function MoreAboutMe() {
    return (
        <div className="grid lg:grid-cols-2 gap-5">
            <div>
                <h2 className="text-2xl mb-4">About Me</h2>
                <p className="text-base font-light">
                Software engineer with 5+ years of experience delivering backend and decentralize Web3 solutions for government and international clients. 
                Expert in blockchain-based services and Event Driven Microservice Architecture, with research published in ACM, IEEE Access, and ICBC. 
                Led a Norway Government–funded blockchain project and actively foster team growth and collaboration.
                </p>
                <hr className="border border-white my-7" />
                <h2 className="text-2xl mb-4">Top Expertise</h2>
                <p className="text-base font-light mb-4">
                Blockend Engineer with a primary focus on decentralized software and distributed systems. Additionally, a growing tokenomist and stablecoin expert, 
                consulting and managing the development of these dApps.
                    📁:{" "}
                    <a download href="/resume.pdf" className="text-cyan-600 font-bold hover:underline" target="_blank">
                        Download Resume
                    </a>.
                </p>
                <div className="flex flex-wrap gap-2 text-sm font-bold">
                    {KEYWORDS.map((keyword, index) => (
                        <div
                            className="bg-background px-3 py-1 rounded-full border"
                            key={index}
                        >
                            {" "}
                            {keyword}{" "}
                        </div>
                    ))}
                </div>
                <div className="my-7">
                    <Skillset />
                </div>
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
                <h3 className="text-2xl">Find me on</h3>
                <div className="flex gap-3">
                    {Object.keys(SOCIAL_LINKS).map((key, index) => (
                        <div key={index} className="bg-white p-1 rounded-xl">
                            <a
                                href={SOCIAL_LINKS[key].url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-background"
                            >
                                {SOCIAL_LINKS[key].icon}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
