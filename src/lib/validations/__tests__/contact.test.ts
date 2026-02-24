import { describe, it, expect } from "vitest";
import { contactSchema } from "../contact";

describe("contactSchema", () => {
  const validData = {
    name: "John Smith",
    email: "john@example.com",
    subject: "General enquiry",
    message: "I have a question about selling materials on Enviromate.",
  };

  it("accepts valid contact data", () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("requires name", () => {
    const result = contactSchema.safeParse({ ...validData, name: "" });
    expect(result.success).toBe(false);
  });

  it("limits name length to 100 characters", () => {
    const result = contactSchema.safeParse({ ...validData, name: "a".repeat(101) });
    expect(result.success).toBe(false);
  });

  it("requires valid email", () => {
    const result = contactSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("requires subject", () => {
    const result = contactSchema.safeParse({ ...validData, subject: "" });
    expect(result.success).toBe(false);
  });

  it("limits subject length to 200 characters", () => {
    const result = contactSchema.safeParse({ ...validData, subject: "a".repeat(201) });
    expect(result.success).toBe(false);
  });

  it("requires minimum message length of 10 characters", () => {
    const result = contactSchema.safeParse({ ...validData, message: "Short" });
    expect(result.success).toBe(false);
  });

  it("limits message length to 5000 characters", () => {
    const result = contactSchema.safeParse({ ...validData, message: "a".repeat(5001) });
    expect(result.success).toBe(false);
  });

  it("accepts message at exactly 10 characters", () => {
    const result = contactSchema.safeParse({ ...validData, message: "a".repeat(10) });
    expect(result.success).toBe(true);
  });

  it("rejects honeypot with content (bot detection)", () => {
    const result = contactSchema.safeParse({ ...validData, honeypot: "bot-value" });
    expect(result.success).toBe(false);
  });

  it("accepts empty honeypot", () => {
    const result = contactSchema.safeParse({ ...validData, honeypot: "" });
    expect(result.success).toBe(true);
  });

  it("accepts missing honeypot", () => {
    const result = contactSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
