import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPartners } from "../partners";

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    partner: {
      findMany: vi.fn(),
    },
  },
}));

import { prisma } from "@/lib/db/prisma";

const mockPartners = [
  {
    id: "1",
    name: "Green Building Council",
    logo: null,
    url: "https://example.com",
    description: "Supporting sustainable building",
    order: 0,
  },
  {
    id: "2",
    name: "Circular Economy Alliance",
    logo: null,
    url: null,
    description: "Promoting circular economy",
    order: 1,
  },
];

describe("getPartners", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns partners sorted by order", async () => {
    vi.mocked(prisma.partner.findMany).mockResolvedValue(mockPartners);

    const result = await getPartners();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("Green Building Council");
    expect(prisma.partner.findMany).toHaveBeenCalledWith({
      orderBy: { order: "asc" },
    });
  });

  it("returns empty array on error", async () => {
    vi.mocked(prisma.partner.findMany).mockRejectedValue(new Error("DB error"));

    const result = await getPartners();
    expect(result).toEqual([]);
  });
});
