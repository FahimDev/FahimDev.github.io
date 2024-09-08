import { Link } from "react-router-dom";
import ContactButton from "./ContactButton";

interface Props {
    title: string;
    desc?: any;
}

export default function MacBox({ title, desc }: Props) {
    return (
        <div className="border rounded-xl min-h-[32rem]">
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
            <div className="bg-secondary py-3 px-5 rounded-xl h-[32rem]">
                <div className="grid lg:grid-cols-2 grid-cols-1  lg:gap-44 h-full">
                    <div className="h-full flex lg:justify-end justify-center items-center">
                        <img className="size-52 rounded-xl" src="/images/profile.jpg" />
                    </div>
                    <div className="h-full flex justify-start items-center">
                        <div id="preview-shadow" className="w-60 h-[11.5rem]">
                            <div id="preview" className="w-60">
                                <div id="corner-tl" className="corner"></div>
                                <div id="corner-tr" className="corner"></div>
                                <h3 className="my-4 text-2xl">{title}</h3>
                                <p className="min-h-20 text-base">{desc}</p>
                                <div id="corner-br" className="corner"></div>
                                <div id="corner-bl" className="corner"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
