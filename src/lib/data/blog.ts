import { prisma } from "@/lib/db/prisma";

export async function getPublishedPosts(page: number = 1, perPage: number = 9) {
  try {
    const now = new Date();
    const where = {
      publishedAt: { not: null, lte: now },
    } as const;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return { posts, total };
  } catch {
    return { posts: [], total: 0 };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
    });

    // Only return published posts
    if (!post || !post.publishedAt || post.publishedAt > new Date()) {
      return null;
    }

    return post;
  } catch {
    return null;
  }
}
