import { describe, it, expect } from "vitest";
import { createListingSchema, priceInputSchema } from "../listing";

describe("createListingSchema", () => {
  const validListing = {
    title: "Victorian Bricks",
    description: "Beautiful reclaimed Victorian bricks from a demolition site.",
    price: 7500,
    listingType: "FOR_SALE" as const,
    category: "BUILDING" as const,
    postcode: "M1 1AE",
    location: "Manchester",
    imageKeys: ["key1.jpg"],
  };

  it("validates a correct for-sale listing", () => {
    const result = createListingSchema.safeParse(validListing);
    expect(result.success).toBe(true);
  });

  it("validates a free listing with price 0", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      listingType: "FREE",
      price: 0,
    });
    expect(result.success).toBe(true);
  });

  it("rejects free listing with non-zero price", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      listingType: "FREE",
      price: 500,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Price must be 0 for free listings");
    }
  });

  it("rejects for-sale listing with zero price", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      listingType: "FOR_SALE",
      price: 0,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Price must be greater than 0 for items for sale"
      );
    }
  });

  it("rejects negative price", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      price: -100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects title shorter than 3 chars", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      title: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description shorter than 10 chars", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      description: "Short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects more than 20 images", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      imageKeys: Array.from({ length: 21 }, (_, i) => `key${i}.jpg`),
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty imageKeys array", () => {
    const result = createListingSchema.safeParse({
      ...validListing,
      imageKeys: [],
    });
    expect(result.success).toBe(true);
  });
});

describe("priceInputSchema", () => {
  it("converts valid price string to pence", () => {
    const result = priceInputSchema.parse("10.50");
    expect(result).toBe(1050);
  });

  it("converts integer string to pence", () => {
    const result = priceInputSchema.parse("25");
    expect(result).toBe(2500);
  });

  it("converts price with single decimal to pence", () => {
    const result = priceInputSchema.parse("9.5");
    expect(result).toBe(950);
  });

  it("rejects invalid price format", () => {
    const result = priceInputSchema.safeParse("abc");
    expect(result.success).toBe(false);
  });

  it("rejects price with too many decimals", () => {
    const result = priceInputSchema.safeParse("10.999");
    expect(result.success).toBe(false);
  });
});
