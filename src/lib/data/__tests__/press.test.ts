import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPressArticles } from "../press";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    pressArticle: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/db/prisma";

const mockArticles = [
  {
    id: "1",
    title: "Enviromate in the News",
    url: "https://example.com/article",
    source: "Construction News",
    publishedDate: new Date("2026-01-15"),
    createdAt: new Date("2026-01-15"),
  },
];

describe("getPressArticles", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns press articles sorted by date", async () => {
    vi.mocked(prisma.pressArticle.findMany).mockResolvedValue(mockArticles);

    const result = await getPressArticles();
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Enviromate in the News");
    expect(prisma.pressArticle.findMany).toHaveBeenCalledWith({
      orderBy: { publishedDate: "desc" },
    });
  });

  it("returns empty array on error", async () => {
    vi.mocked(prisma.pressArticle.findMany).mockRejectedValue(new Error("DB error"));

    const result = await getPressArticles();
    expect(result).toEqual([]);
  });
});
