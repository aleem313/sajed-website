import { describe, it, expect } from "vitest";
import { validatePostcode, normalizePostcode, formatPostcode } from "../postcode";

describe("validatePostcode", () => {
  it.each([
    ["M1 1AA", "A1 1AA format"],
    ["M60 1NW", "A11 1AA format"],
    ["CR2 6XH", "AA1 1AA format"],
    ["DN55 1PT", "AA11 1AA format"],
    ["W1A 1HQ", "A1A 1AA format"],
    ["EC1A 1BB", "AA1A 1AA format"],
  ])("accepts valid UK postcode: %s (%s)", (postcode) => {
    expect(validatePostcode(postcode)).toBe(true);
  });

  it("accepts GIR 0AA (special postcode)", () => {
    expect(validatePostcode("GIR 0AA")).toBe(true);
  });

  it("accepts postcodes without spaces", () => {
    expect(validatePostcode("SW1A1AA")).toBe(true);
  });

  it("accepts lowercase postcodes", () => {
    expect(validatePostcode("sw1a 1aa")).toBe(true);
  });

  it("accepts postcodes with leading/trailing spaces", () => {
    expect(validatePostcode("  SW1A 1AA  ")).toBe(true);
  });

  it.each([
    ["", "empty string"],
    ["ABC", "too short"],
    ["12345", "all numbers"],
    ["ABCDE FGH", "all letters"],
    ["SW1A 1AAAA", "too long outward"],
  ])("rejects invalid postcode: %s (%s)", (postcode) => {
    expect(validatePostcode(postcode)).toBe(false);
  });
});

describe("normalizePostcode", () => {
  it("removes spaces and uppercases", () => {
    expect(normalizePostcode("sw1a 1aa")).toBe("SW1A1AA");
  });

  it("handles multiple spaces", () => {
    expect(normalizePostcode("M1  1AA")).toBe("M11AA");
  });

  it("handles already normalized input", () => {
    expect(normalizePostcode("SW1A1AA")).toBe("SW1A1AA");
  });
});

describe("formatPostcode", () => {
  it("formats postcode with space before last 3 chars", () => {
    expect(formatPostcode("sw1a1aa")).toBe("SW1A 1AA");
  });

  it("handles already formatted postcodes", () => {
    expect(formatPostcode("M1 1AA")).toBe("M1 1AA");
  });

  it("handles lowercase input", () => {
    expect(formatPostcode("ec1a1bb")).toBe("EC1A 1BB");
  });

  it("returns short strings as-is (uppercase)", () => {
    expect(formatPostcode("M1")).toBe("M1");
  });
});
