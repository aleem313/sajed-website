import { prisma } from "@/lib/db/prisma";

export async function getCommunityProjects() {
  try {
    return await prisma.communityProject.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}
