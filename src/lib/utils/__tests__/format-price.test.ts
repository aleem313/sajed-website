import { describe, it, expect } from "vitest";
import { formatPrice, priceToPence, penceToPounds } from "../format-price";

describe("formatPrice", () => {
  it("formats pence to GBP string", () => {
    expect(formatPrice(1050)).toBe("£10.50");
  });

  it("formats small amounts", () => {
    expect(formatPrice(99)).toBe("£0.99");
  });

  it("formats large amounts", () => {
    expect(formatPrice(9999999)).toBe("£99,999.99");
  });

  it("formats exact pounds (no pence)", () => {
    expect(formatPrice(1000)).toBe("£10.00");
  });

  it('returns "Free" for 0', () => {
    expect(formatPrice(0)).toBe("Free");
  });

  it('returns "Free" for null', () => {
    expect(formatPrice(null)).toBe("Free");
  });

  it('returns "Free" for undefined', () => {
    expect(formatPrice(undefined)).toBe("Free");
  });

  it("formats single digit pence correctly", () => {
    expect(formatPrice(1)).toBe("£0.01");
  });
});

describe("priceToPence", () => {
  it("converts number pounds to pence", () => {
    expect(priceToPence(10.5)).toBe(1050);
  });

  it("converts string pounds to pence", () => {
    expect(priceToPence("9.99")).toBe(999);
  });

  it("handles integer input", () => {
    expect(priceToPence(10)).toBe(1000);
  });

  it("handles floating-point precision (19.99)", () => {
    expect(priceToPence(19.99)).toBe(1999);
  });

  it("handles floating-point precision (0.1 + 0.2 style)", () => {
    expect(priceToPence(0.1)).toBe(10);
    expect(priceToPence(0.2)).toBe(20);
  });

  it("returns 0 for negative values", () => {
    expect(priceToPence(-5)).toBe(0);
  });

  it("returns 0 for NaN", () => {
    expect(priceToPence("abc")).toBe(0);
  });

  it("returns 0 for empty string", () => {
    expect(priceToPence("")).toBe(0);
  });
});

describe("penceToPounds", () => {
  it("converts pence to pounds", () => {
    expect(penceToPounds(1050)).toBe(10.5);
  });

  it("converts 0 pence to 0 pounds", () => {
    expect(penceToPounds(0)).toBe(0);
  });

  it("converts single pence", () => {
    expect(penceToPounds(1)).toBe(0.01);
  });
});
