import { prisma } from "@/lib/db/prisma";
import { CATEGORIES } from "@/data/categories";

export async function getHomepageStats() {
  try {
    const [listingCount, userCount] = await Promise.all([
      prisma.listing.count({ where: { status: "ACTIVE" } }),
      prisma.user.count(),
    ]);

    return {
      listingCount,
      userCount,
      categoryCount: CATEGORIES.length,
    };
  } catch {
    return { listingCount: 0, userCount: 0, categoryCount: CATEGORIES.length };
  }
}
