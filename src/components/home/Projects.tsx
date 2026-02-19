import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { PROJECTS } from "@/constants/projects";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Link } from "react-router-dom";

export default function Projects() {
    return (
        <div className="flex flex-col gap-5 items-center">
            <h1 className="text-2xl">Some of my projects</h1>
            <Carousel
                className="w-full lg:max-w-4xl max-w-72"
                opts={{
                    align: "start",
                }}
            >
                <CarouselContent>
                    {PROJECTS.map((project, idx) => (
                        <CarouselItem
                            className="lg:basis-1/3 md:basis-1/2"
                            key={idx}
                        >
                            <Card className="bg-background rounded-xl h-[22rem] flex flex-col justify-between relative">
                                {project.achievement && (
                                    <div className="absolute top-0 right-0 z-10">
                                        <img 
                                            src={project.achievement.medal} 
                                            alt="Achievement Medal" 
                                            className="w-16 h-16 object-contain"
                                            style={{
                                                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))',
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="relative">
                                    <img
                                        className="w-full h-44 rounded-t-xl"
                                        src={project.cover_img}
                                    />
                                </div>
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
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}
