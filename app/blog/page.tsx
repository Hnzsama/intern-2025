import { posts } from "#site/content";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

export default async function Blog() {
    return (
        <div className="grid gap-6">
            {posts.map((post) => (
                <Card key={post.slug}>
                    <CardHeader>
                        <CardTitle>
                            <Link 
                                href={`/blog/${post.slugAsParams}`}
                                className="hover:underline"
                            >
                                {post.title}
                            </Link>
                        </CardTitle>
                        <CardDescription>
                            {post.description}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
