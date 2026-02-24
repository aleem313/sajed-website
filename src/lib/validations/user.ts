import { z } from "zod";
import { postcodeSchema, emailSchema, passwordSchema, nameSchema } from "./common";

export const quickSignUpSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  postcode: postcodeSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const fullSignUpSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    postcode: postcodeSchema,
    email: emailSchema,
    password: passwordSchema,
    occupation: z.string().min(1, "Please select your occupation"),
    accountType: z.enum(["FREE", "PREMIUM", "PREMIUM_PLUS", "WHOLESALER"]),
    businessName: z.string().trim().max(100).optional().nullable(),
    businessType: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.accountType === "WHOLESALER") {
      if (!data.businessName || data.businessName.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business name is required for Wholesaler accounts",
          path: ["businessName"],
        });
      }
      if (!data.businessType || data.businessType.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Business type is required for Wholesaler accounts",
          path: ["businessType"],
        });
      }
    }
    if (data.accountType !== "WHOLESALER") {
      data.businessName = null;
      data.businessType = null;
    }
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    token: z.string().min(1, "Reset token is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  postcode: postcodeSchema,
  occupation: z.string().optional(),
  businessName: z.string().trim().max(100).optional().nullable(),
  businessType: z.string().optional().nullable(),
});

export type QuickSignUpInput = z.infer<typeof quickSignUpSchema>;
export type FullSignUpInput = z.infer<typeof fullSignUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
