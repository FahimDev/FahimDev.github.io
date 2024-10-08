import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
    title: string;
    desc: string;
    image: string;
    techs?: string[];
    tech_icons: any;
}

export default function MacBoxProject({
    title,
    desc,
    image,
    techs,
    tech_icons,
}: Props) {
    return (
        <div className="border rounded-xl">
            <div className="border-b flex justify-between items-center px-5 py-3">
                <div className="flex gap-2">
                    <div className="size-4 rounded-full bg-red-500"></div>
                    <div className="size-4 rounded-full bg-yellow-500"></div>
                    <div className="size-4 rounded-full bg-green-500"></div>
                </div>
                <div className="flex gap-2 font-bold text-base">
                    <Link to="/">Home</Link>
                    <div>|</div>
                    <ContactButton />
                </div>
            </div>
            <div className="bg-secondary py-3 px-5 rounded-xl lg:py-20">
                <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-20 gap-5 h-full">
                    <div className="h-full flex justify-end items-center">
                        <img
                            className="lg:w-96 w-72 h-52 rounded-xl"
                            src={image}
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-4xl">{title}</h3>
                            <p className="text-base">{desc}</p>
                            <div className="flex flex-wrap gap-2 text-sm font-bold">
                                {techs &&
                                    techs.map((tech, index) => (
                                        <div
                                            className="bg-background px-3 py-1 rounded-full border"
                                            key={index}
                                        >
                                            {tech}
                                        </div>
                                    ))}
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm font-bold">
                                {tech_icons &&
                                    Object.keys(tech_icons).map(
                                        (key: any, index) => (
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <img
                                                            className="size-14 rounded-full"
                                                            src={
                                                                tech_icons[key]
                                                            }
                                                            alt={key}
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{key}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
