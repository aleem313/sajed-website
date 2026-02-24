import { prisma } from "@/lib/db/prisma";

export async function getPartners() {
  try {
    return await prisma.partner.findMany({
      orderBy: { order: "asc" },
    });
  } catch {
    return [];
  }
}
