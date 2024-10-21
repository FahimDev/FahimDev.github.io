import Experience from "@/components/home/Experience";
import MoreAboutMe from "@/components/home/MoreAboutMe";
import MacBox from "@/components/layout/MacBox";
import Projects from "@/components/home/Projects";
import Education from "@/components/home/Education";
import Training from "@/components/home/Training";
import MostProudOf from "@/components/home/MostProudOf";
import Publications from "@/components/home/Publications";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-4xl font-extrabold text-center my-7">
                Hi, I'm Ariful Islam
            </h1>
            <section className="border-b pb-10">
                <div className="container">
                    <MacBox
                        title="Read my blogs"
                        desc={
                            <Button
                                onClick={() => navigate("/blogs")}
                                className="rounded-xl mt-2 bg-border text-white hover:bg-border/75"
                            >
                                From Here
                            </Button>
                        }
                    />
                </div>
            </section>

            <section id="more_about_me" className="bg-secondary py-7 border-b">
                <div className="container">
                    <MoreAboutMe />
                </div>
            </section>

            <section id="exprience" className="bg-background py-7 border-b">
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
                <div className="grid lg:grid-cols-2 grid-cols-1 container">
                    <Training />
                    <MostProudOf />
                </div>
            </section>

            <section id="publications" className="bg-background py-7">
                <Publications />
            </section>
        </>
    );
}
