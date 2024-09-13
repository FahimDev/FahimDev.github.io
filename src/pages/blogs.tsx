import BlogCard from "@/components/blog/BlogCard";
import { BLOGS } from "@/constants/blogs";
import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blogs() {
    return (
        <div>
            <div className="container">
                <div className="flex gap-5 items-center my-7">
                    <Link to="/">
                        <ChevronsLeft className="size-14" />
                    </Link>
                    <h1 className="text-4xl font-extrabold ">My Blogs</h1>
                </div>
            </div>

            <section className="pb-10">
                <div className="container">
                    <div className="flex flex-col gap-5">
                        {BLOGS.map((item: any, idx: number) => (
                            <BlogCard blog={item} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
