import MacBoxProject from "@/components/layout/MacBoxProject";
// import Gallery from "@/components/project/Gallery";
import MoreAboutProject from "@/components/project/MoreAboutProject";
import { PROJECTS } from "@/constants/projects";
import { findLast } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { PhotoSwipeOptions } from "photoswipe";


export default function ProjectView() {
    const { slug } = useParams();
    const [project, setProject] = useState<any>(null);

    const options: PhotoSwipeOptions = {
        
      }

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
                    <Gallery>
                        {project?.gallery.map((item: any, idx: number) => (
                            <Item
                                key={idx}
                                original={item.url}
                                thumbnail={item.url}
                                width={item.width}
                                height={item.height}
                            >
                                {({ ref, open }) => (
                                    <img
                                        ref={ref}
                                        onClick={open}
                                        src={item.url}
                                        alt={item.alt}
                                        width="500"
                                        height="300"
                                    />
                                )}
                            </Item>
                        ))}
                    </Gallery>
                </div>
            </section>
        </div>
    );
}
