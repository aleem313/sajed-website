import { describe, it, expect } from "vitest";
import { quickSignUpSchema, fullSignUpSchema, signInSchema, resetPasswordSchema } from "../user";

describe("quickSignUpSchema", () => {
  const validData = {
    firstName: "Sarah",
    lastName: "Mitchell",
    postcode: "M1 1AE",
    email: "SARAH@example.com",
    password: "Password123!",
  };

  it("validates correct data", () => {
    const result = quickSignUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("lowercases email", () => {
    const result = quickSignUpSchema.parse(validData);
    expect(result.email).toBe("sarah@example.com");
  });

  it("formats postcode", () => {
    const result = quickSignUpSchema.parse({ ...validData, postcode: "m11ae" });
    expect(result.postcode).toBe("M1 1AE");
  });

  it("rejects empty first name", () => {
    const result = quickSignUpSchema.safeParse({ ...validData, firstName: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = quickSignUpSchema.safeParse({ ...validData, email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = quickSignUpSchema.safeParse({ ...validData, password: "short" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid postcode", () => {
    const result = quickSignUpSchema.safeParse({ ...validData, postcode: "12345" });
    expect(result.success).toBe(false);
  });
});

describe("fullSignUpSchema", () => {
  const validData = {
    firstName: "James",
    lastName: "Carter",
    postcode: "LS1 1BA",
    email: "james@example.com",
    password: "Password123!",
    occupation: "Plumber",
    accountType: "WHOLESALER" as const,
    businessName: "Carter Supplies",
    businessType: "Building Materials Supplier",
  };

  it("validates wholesaler with all fields", () => {
    const result = fullSignUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("requires businessName for wholesaler", () => {
    const result = fullSignUpSchema.safeParse({ ...validData, businessName: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths).toContain("businessName");
    }
  });

  it("requires businessType for wholesaler", () => {
    const result = fullSignUpSchema.safeParse({ ...validData, businessType: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join("."));
      expect(paths).toContain("businessType");
    }
  });

  it("clears business fields for non-wholesaler", () => {
    const result = fullSignUpSchema.parse({
      ...validData,
      accountType: "FREE",
      businessName: "Should be cleared",
      businessType: "Should be cleared",
    });
    expect(result.businessName).toBeNull();
    expect(result.businessType).toBeNull();
  });

  it("validates individual without business fields", () => {
    const result = fullSignUpSchema.safeParse({
      ...validData,
      accountType: "PREMIUM",
      businessName: null,
      businessType: null,
    });
    expect(result.success).toBe(true);
  });
});

describe("signInSchema", () => {
  it("validates correct credentials", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "password",
    });
    expect(result.success).toBe(true);
  });

  it("lowercases email", () => {
    const result = signInSchema.parse({ email: "USER@Example.com", password: "password" });
    expect(result.email).toBe("user@example.com");
  });

  it("rejects empty password", () => {
    const result = signInSchema.safeParse({ email: "user@example.com", password: "" });
    expect(result.success).toBe(false);
  });
});

describe("resetPasswordSchema", () => {
  it("validates matching passwords", () => {
    const result = resetPasswordSchema.safeParse({
      password: "NewPassword1!",
      confirmPassword: "NewPassword1!",
      token: "valid-token",
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-matching passwords", () => {
    const result = resetPasswordSchema.safeParse({
      password: "NewPassword1!",
      confirmPassword: "DifferentPassword",
      token: "valid-token",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Passwords do not match");
    }
  });
});
