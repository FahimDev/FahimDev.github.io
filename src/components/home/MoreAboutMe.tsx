import { SOCIAL_LINKS } from "@/constants/social-links";

import Skillset from "./Skillset";
import { KEYWORDS } from "@/constants/keywords";


export default function MoreAboutMe() {
    return (
        <div className="grid lg:grid-cols-2 gap-5">
            <div>
                <h2 className="text-2xl mb-4">About Me</h2>
                <p className="text-base font-light">
                    Hi, I’m Ariful! With a background in software engineering I’ve been contributing to both local government projects 
                    and international client ventures over the past three years. I specialize in crafting robust backend architectures 
                    and Web3 services. I’ve combined my backend development expertise with blockchain technologies, earning me the well-deserved 
                    title of ‘Blockend’. My expertise extends to NFT marketplace microstructures, and I’ve contributed to research published in ACM, 
                    IEEE Access, and ICBC. Notably, I led a Norway Government-funded research project on Blockchain-based National Health Service.

                    𝘐𝘯 𝘢𝘥𝘥𝘪𝘵𝘪𝘰𝘯 𝘵𝘰 𝘮𝘺 𝘵𝘦𝘤𝘩𝘯𝘪𝘤𝘢𝘭 𝘴𝘬𝘪𝘭𝘭𝘴, 𝘐 𝘧𝘰𝘴𝘵𝘦𝘳 𝘨𝘳𝘰𝘸𝘵𝘩 𝘮𝘪𝘯𝘥𝘴𝘦𝘵𝘴 𝘸𝘪𝘵𝘩𝘪𝘯 𝘵𝘦𝘢𝘮𝘴 𝘢𝘯𝘥 𝘥𝘳𝘪𝘷𝘦 𝘦𝘹𝘤𝘦𝘭𝘭𝘦𝘯𝘤𝘦. 𝘓𝘦𝘵’𝘴 𝘤𝘰𝘭𝘭𝘢𝘣𝘰𝘳𝘢𝘵𝘦 𝘰𝘯 𝘦𝘹𝘤𝘪𝘵𝘪𝘯𝘨 𝘱𝘳𝘰𝘫𝘦𝘤𝘵𝘴—𝘐’𝘮 𝘳𝘦𝘢𝘥𝘺 𝘵𝘰 𝘮𝘢𝘬𝘦 𝘢𝘯 𝘪𝘮𝘱𝘢𝘤𝘵!
                </p>
                <hr className="border border-white my-7" />
                <h2 className="text-2xl mb-4">Top Expertise</h2>
                <p className="text-base font-light mb-4">
                Blockend Engineer with a primary focus on decentralized software and distributed systems. Additionally, a growing tokenomist and stablecoin expert, 
                consulting and managing the development of these dApps.
                    📁:{" "}
                    <a download href="#" className="text-cyan-600 font-bold hover:underline">
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
