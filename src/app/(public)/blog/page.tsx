import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/blog";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";
import { BlogCard } from "@/components/sections/blog-card";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tips, guides, and industry news about buying and selling surplus building materials, sustainability in construction, and the circular economy.",
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || "1", 10) || 1);
  const { posts, total } = await getPublishedPosts(page, POSTS_PER_PAGE);
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">Our Blog</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Tips, guides, and industry news from the world of sustainable construction.
        </p>

        {posts.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No blog posts yet"
            description="Check back soon — we're working on great content for you."
            className="mt-12"
          />
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  slug={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  publishedAt={post.publishedAt!}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label="Blog pagination" className="mt-12 flex justify-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/blog?page=${page - 1}`}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}`}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium ${
                      p === page
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-background text-foreground hover:bg-muted"
                    }`}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </Link>
                ))}

                {page < totalPages && (
                  <Link
                    href={`/blog?page=${page + 1}`}
                    className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground hover:bg-muted"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </div>
    </div>
  );
}
