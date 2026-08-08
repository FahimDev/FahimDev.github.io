import Experience from "@/components/home/Experience";
import MoreAboutMe from "@/components/home/MoreAboutMe";
import MacBox from "@/components/layout/MacBox";
import Projects from "@/components/home/Projects";
import Education from "@/components/home/Education";
import Training from "@/components/home/Training";
import MostProudOf from "@/components/home/MostProudOf";
import Publications from "@/components/home/Publications";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <h1 className="text-4xl font-extrabold text-center my-7">
                Hi, I'm Ariful Islam
            </h1>
            <section className="border-b pb-10">
                <div className="container">
                    <MacBox
                        title="Discover My Work"
                        desc={
                            // The four landing-page discovery targets, in
                            // the order recruiters → research → event
                            // organizers scan them. Each control is a real
                            // <a> (rendered via React Router's <Link> for
                            // cross-route links, or a native <a href="#…">
                            // for same-page fragments) so the browser
                            // handles keyboard activation, copy-link,
                            // open-in-new-tab, and back/forward without
                            // any JavaScript click handler.
                            <nav
                                aria-label="Primary discovery"
                                className="grid grid-cols-2 gap-3 h-fit"
                            >
                                <Button
                                    asChild
                                    className="rounded-xl mt-2 bg-border text-white hover:bg-border/75"
                                >
                                    <Link to="/projects">Projects</Link>
                                </Button>
                                <Button
                                    asChild
                                    className="rounded-xl mt-2 bg-border text-white hover:bg-border/75"
                                >
                                    <a href="/#experience">Experience</a>
                                </Button>
                                <Button
                                    asChild
                                    className="rounded-xl mt-2 bg-border text-white hover:bg-border/75"
                                >
                                    <a href="/#research">Research</a>
                                </Button>
                                <Button
                                    asChild
                                    className="rounded-xl mt-2 bg-border text-white hover:bg-border/75"
                                >
                                    <Link to="/speaking">Speaking</Link>
                                </Button>
                            </nav>
                        }
                    />
                </div>
            </section>

            <section id="more_about_me" className="bg-secondary py-7 border-b">
                <div className="container">
                    <MoreAboutMe />
                </div>
            </section>

            <section id="experience" className="bg-background py-7 border-b">
                <div className="container">
                    <Experience />
                </div>
            </section>

            <section id="projects" className="bg-secondary py-7 border-b">
                <div className="container">
                    <Projects />
                </div>
            </section>

            <section id="container" className="bg-background py-7 border-b">
                <div className="container">
                    <Education />
                </div>
            </section>

            <section id="training" className="bg-secondary py-7 border-b">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-10 container">
                    <Training />
                    <MostProudOf />
                </div>
            </section>

            <section id="research" className="bg-background py-7">
                <Publications />
            </section>
        </>
    );
}
