import { prisma } from "@/lib/db/prisma";

export async function getPressArticles() {
  try {
    return await prisma.pressArticle.findMany({
      orderBy: { publishedDate: "desc" },
    });
  } catch {
    return [];
  }
}
