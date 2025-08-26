import { posts } from "@/.velite"
import { MDXContent } from "@/components/mdx-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from "lucide-react"
import { TableOfContents } from "@/components/table-of-contents"
import { notFound } from "next/navigation"
import Link from "next/link"

interface PostPageProps {
    params: {
        slug: string[]
    }
}

export default async function PostPage({ params }: PostPageProps) {
    const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug || ''
    const post = posts.find((post) => post.slugAsParams === slug)

    if (!post) {
        notFound()
    }

    const wordsCount = post.body?.split(/\s+/).length || 0
    const readingTime = Math.ceil(wordsCount / 200)

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    {/* Main Content */}
                    <div className="lg:col-span-8 xl:col-span-9">
                        <article className="max-w-none">
                            {/* Article Header */}
                            <header className="mb-10 space-y-6">
                                {/* Category/Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <Badge 
                                                key={tag} 
                                                variant="secondary"
                                                className="text-xs font-medium"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                
                                {/* Title */}
                                <h1 className="scroll-m-20 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
                                    {post.title}
                                </h1>
                                
                                {/* Description */}
                                {post.description && (
                                    <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl">
                                        {post.description}
                                    </p>
                                )}
                                
                                {/* Author & Meta Info */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 ring-2 ring-border">
                                            <AvatarImage src="/avatar.jpg" alt="Author" />
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                AU
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1">
                                            <div className="font-semibold text-foreground">Author Name</div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <CalendarIcon className="h-3.5 w-3.5" />
                                                    <time dateTime={post.date}>
                                                        {new Date(post.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </time>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <ClockIcon className="h-3.5 w-3.5" />
                                                    <span>{readingTime} min read</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Status Badge */}
                                    {post.published !== undefined && (
                                        <Badge 
                                            variant={post.published ? "default" : "secondary"}
                                            className="self-start sm:self-center"
                                        >
                                            {post.published ? "Published" : "Draft"}
                                        </Badge>
                                    )}
                                </div>
                                
                                <Separator className="mt-8" />
                            </header>

                            {/* Article Content */}
                            <main className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                                         prose-headings:scroll-mt-28 prose-headings:font-bold
                                         prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                                         prose-p:text-foreground prose-p:leading-relaxed
                                         prose-li:text-foreground prose-blockquote:border-primary/20
                                         prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                                         prose-pre:bg-muted prose-pre:border
                                         prose-img:rounded-lg prose-img:shadow-md
                                         prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                                <MDXContent code={post.body} />
                            </main>

                            {/* Article Footer */}
                            <footer className="mt-16 pt-8 border-t space-y-8">
                                {/* Tags */}
                                {post.tags && post.tags.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                            Tagged with:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <Badge 
                                                    key={tag} 
                                                    variant="outline"
                                                    className="hover:bg-accent transition-colors cursor-pointer"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Share & Navigation */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
                                    <div className="text-sm text-muted-foreground">
                                        Published on {new Date(post.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    
                                    <Link href="/blog">
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="hover:bg-accent transition-colors"
                                        >
                                            <ArrowLeftIcon className="h-4 w-4 mr-2" />
                                            Back to Blog
                                        </Button>
                                    </Link>
                                </div>
                            </footer>
                        </article>
                    </div>

                    {/* Right Sidebar - Dynamic Table of Contents */}
                    <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Dynamic Table of Contents */}
                            <TableOfContents />

                            {/* About the Author */}
                            <div className="bg-card/30 backdrop-blur-sm rounded-lg border p-6 shadow-sm">
                                <h3 className="font-semibold mb-3">About the Author</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Web developer passionate about creating modern, accessible, and performant applications.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}