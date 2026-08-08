import BlogCard from "@/components/blog/BlogCard";
import { BLOGS } from "@/constants/blogs";
import PageHeader from "@/components/layout/PageHeader";

export default function Blogs() {
    return (
        <div>
            <PageHeader title="My Blogs" backLabel="Back to home" />

            <section className="pb-10">
                <div className="container">
                    <div className="flex flex-col gap-5">
                        {BLOGS.map((item: any, idx: number) => (
                            <BlogCard key={idx} blog={item} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
