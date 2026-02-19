import MacBoxProject from "@/components/layout/MacBoxProject";
import MoreAboutProject from "@/components/project/MoreAboutProject";
import { PROJECTS } from "@/constants/projects";
import { findLast } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";

export default function ProjectView() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);

    useEffect(() => {
        const projectData = findLast(
            PROJECTS,
            (project) => project.slug === slug
        );
        setProject(projectData);
    }, [slug]);

    return (
        <div>
            <div className="container">
                <h1 className="text-4xl font-extrabold my-7">
                    Project Overview of {project?.title}
                </h1>
            </div>

            <section className="border-b pb-10">
                <div className="container">
                    <MacBoxProject
                        title={project?.title}
                        desc={project?.description}
                        image={project?.cover_img}
                        tech_icons={project?.tech_icons}
                        subtitle={project?.subtitle}
                        client={project?.client}
                        location={project?.location}
                        find_it_on={project?.find_it_on}
                        achievement={project?.achievement}
                    />
                </div>
            </section>

            <section className="bg-secondary py-7 border-b">
                <div className="container">
                    <MoreAboutProject project={project} />
                </div>
            </section>

            <section className="bg-background py-7 border-b">
                <div className="container">
                    <h1 className="text-2xl text-center mb-6">Gallery</h1>
                    <Gallery>
                        <div className="flex justify-center flex-wrap gap-6">
                            {project?.gallery.map((item: any, idx: number) => (
                                <Item
                                    key={idx}
                                    original={item.url}
                                    thumbnail={item.url}
                                    width="1280"
                                    height="960"
                                >
                                    {({ ref, open }) => (
                                        <img
                                            ref={ref}
                                            onClick={open}
                                            src={item.url}
                                            alt={item.alt}
                                            className="w-96 hover:cursor-pointer"
                                        />
                                    )}
                                </Item>
                            ))}
                        </div>
                    </Gallery>
                </div>
            </section>
        </div>
    );
}
