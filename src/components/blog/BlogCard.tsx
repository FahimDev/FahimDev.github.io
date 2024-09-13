import { Card, CardContent } from "../ui/card";

interface Props {
    blog: any;
}

export default function BlogCard({ blog }: Props) {
    return (
        <Card
            className="max-w-5xl bg-secondary cursor-pointer hover:opacity-75"
            onClick={() => (window.location.href = blog.link)}
        >
            <CardContent className="mt-6">
                <div className="grid grid-cols-3 gap-5">
                    <div className="col-span-1">
                        <img
                            className="rounded-xl w-full h-44"
                            src={blog.image}
                            alt={blog.title}
                        />
                    </div>
                    <div className="col-span-2 flex flex-col gap-3">
                        <div className="text-3xl font-bold">{blog.title}</div>
                        <div className="text-base text-muted-foreground">
                            {blog.description}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
