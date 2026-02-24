import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPublishedPosts, getPostBySlug } from "../blog";

// Mock Prisma
vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    blogPost: {
      findMany: vi.fn(),
      count: vi.fn(),
      findUnique: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/db/prisma";

const mockPosts = [
  {
    id: "1",
    title: "Test Post",
    slug: "test-post",
    excerpt: "A test post",
    content: "Full content",
    coverImage: null,
    author: "Author",
    publishedAt: new Date("2026-01-15"),
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    id: "2",
    title: "Second Post",
    slug: "second-post",
    excerpt: "Another test",
    content: "More content",
    coverImage: null,
    author: "Author",
    publishedAt: new Date("2026-01-10"),
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-10"),
  },
];

describe("getPublishedPosts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns published posts with pagination", async () => {
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue(mockPosts);
    vi.mocked(prisma.blogPost.count).mockResolvedValue(2);

    const result = await getPublishedPosts(1, 9);
    expect(result.posts).toHaveLength(2);
    expect(result.total).toBe(2);
  });

  it("calls findMany with correct pagination params", async () => {
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue([]);
    vi.mocked(prisma.blogPost.count).mockResolvedValue(0);

    await getPublishedPosts(2, 9);
    expect(prisma.blogPost.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 9,
        take: 9,
        orderBy: { publishedAt: "desc" },
      })
    );
  });

  it("filters by publishedAt not null and lte now", async () => {
    vi.mocked(prisma.blogPost.findMany).mockResolvedValue([]);
    vi.mocked(prisma.blogPost.count).mockResolvedValue(0);

    await getPublishedPosts(1, 9);
    expect(prisma.blogPost.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          publishedAt: expect.objectContaining({ not: null }),
        }),
      })
    );
  });

  it("returns empty array on error", async () => {
    vi.mocked(prisma.blogPost.findMany).mockRejectedValue(new Error("DB error"));

    const result = await getPublishedPosts(1, 9);
    expect(result.posts).toEqual([]);
    expect(result.total).toBe(0);
  });
});

describe("getPostBySlug", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a published post by slug", async () => {
    vi.mocked(prisma.blogPost.findUnique).mockResolvedValue(mockPosts[0]);

    const result = await getPostBySlug("test-post");
    expect(result).not.toBeNull();
    expect(result?.title).toBe("Test Post");
  });

  it("returns null for non-existent slug", async () => {
    vi.mocked(prisma.blogPost.findUnique).mockResolvedValue(null);

    const result = await getPostBySlug("non-existent");
    expect(result).toBeNull();
  });

  it("returns null for unpublished post (draft)", async () => {
    vi.mocked(prisma.blogPost.findUnique).mockResolvedValue({
      ...mockPosts[0],
      publishedAt: null,
    });

    const result = await getPostBySlug("test-post");
    expect(result).toBeNull();
  });

  it("returns null for future-dated post", async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    vi.mocked(prisma.blogPost.findUnique).mockResolvedValue({
      ...mockPosts[0],
      publishedAt: futureDate,
    });

    const result = await getPostBySlug("test-post");
    expect(result).toBeNull();
  });

  it("returns null on error", async () => {
    vi.mocked(prisma.blogPost.findUnique).mockRejectedValue(new Error("DB error"));

    const result = await getPostBySlug("test-post");
    expect(result).toBeNull();
  });
});
