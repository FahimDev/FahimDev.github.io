import { Card, CardContent } from "../ui/card";

interface Props {
    blog: any;
}

export default function BlogCard({ blog }: Props) {
    return (
        <Card
            className="max-w-5xl bg-secondary cursor-pointer hover:opacity-75"
            onClick={() => window.open(blog.link, '_blank', 'noopener,noreferrer')}
        >
            <CardContent className="mt-6">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                    <div className="md:col-span-1">
                        <img
                            className="rounded-xl w-full h-44"
                            src={blog.image}
                            alt={blog.title}
                        />
                    </div>
                    <div className="md:col-span-2 flex flex-col gap-3">
                        <div className="text-3xl font-bold">{blog.title}</div>
                        <div className="text-base text-muted-foreground max-w-sm">
                            {blog.description}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
