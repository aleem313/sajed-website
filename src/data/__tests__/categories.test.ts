import { describe, it, expect } from "vitest";
import { CATEGORIES, CATEGORY_SLUGS, getCategoryBySlug } from "../categories";

describe("CATEGORIES", () => {
  it("has 9 categories", () => {
    expect(CATEGORIES).toHaveLength(9);
  });

  it("has no duplicate slugs", () => {
    const slugs = CATEGORIES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("each category has name, slug, and description", () => {
    for (const cat of CATEGORIES) {
      expect(cat.name).toBeTruthy();
      expect(cat.slug).toBeTruthy();
      expect(cat.description).toBeTruthy();
    }
  });

  it("slugs contain only lowercase letters and hyphens", () => {
    for (const cat of CATEGORIES) {
      expect(cat.slug).toMatch(/^[a-z][a-z-]*[a-z]$/);
    }
  });

  it("wholesalers category is restricted", () => {
    const wholesalers = CATEGORIES.find((c) => c.slug === "wholesalers");
    expect(wholesalers).toBeDefined();
    expect((wholesalers as (typeof CATEGORIES)[number] & { restricted?: boolean }).restricted).toBe(
      true
    );
  });
});

describe("CATEGORY_SLUGS", () => {
  it("returns an array of all slugs", () => {
    expect(CATEGORY_SLUGS).toHaveLength(9);
    expect(CATEGORY_SLUGS).toContain("building");
    expect(CATEGORY_SLUGS).toContain("wholesalers");
  });
});

describe("getCategoryBySlug", () => {
  it("returns the category for a valid slug", () => {
    const cat = getCategoryBySlug("building");
    expect(cat).toBeDefined();
    expect(cat!.name).toBe("Building");
  });

  it("returns undefined for an invalid slug", () => {
    expect(getCategoryBySlug("nonexistent")).toBeUndefined();
  });
});
