export const CATEGORIES = [
  { name: "Building", slug: "building", description: "General construction materials" },
  { name: "Plumbing", slug: "plumbing", description: "Pipes, fittings, boilers, radiators" },
  { name: "Carpentry", slug: "carpentry", description: "Timber, doors, skirting boards" },
  { name: "Electrical", slug: "electrical", description: "Cable, switches, sockets, lighting" },
  {
    name: "Painting & Decorating",
    slug: "paint-and-decorating",
    description: "Paints, wallpaper, brushes, fillers",
  },
  { name: "Tools", slug: "tools", description: "Hand tools and power tools" },
  { name: "Free", slug: "free", description: "Items listed at no cost" },
  { name: "Other", slug: "other", description: "Miscellaneous items" },
  {
    name: "Wholesalers",
    slug: "wholesalers",
    description: "Bulk trade surplus",
    restricted: true,
    requiredPlan: "PREMIUM_PLUS" as const,
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
