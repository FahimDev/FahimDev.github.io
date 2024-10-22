import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PROJECTS } from "@/constants/projects";
import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <div>
            <div className="container">
                <div className="flex gap-5 items-center my-7">
                    <Link to="/">
                        <ChevronsLeft className="size-14" />
                    </Link>
                    <h1 className="text-4xl font-extrabold ">My Projects</h1>
                </div>
            </div>

            <section className="pb-10">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-5">
                        {PROJECTS.map((project, idx) => (
                            <Card key={idx} className="bg-background rounded-xl h-[22rem] flex flex-col justify-between w-80">
                                <img
                                    className="w-full h-44 rounded-t-xl"
                                    src={project.cover_img}
                                />
                                <CardContent className="flex flex-col gap-1 pt-6">
                                    <h2>{project.title}</h2>
                                    <p className="text-sm line-clamp-3">
                                        {project.description}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Link
                                        to={`/projects/${project.slug}`}
                                        className="text-sm text-cyan-500 font-bold hover:underline"
                                    >
                                        Read more
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
