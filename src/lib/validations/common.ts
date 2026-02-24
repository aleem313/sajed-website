import { z } from "zod";
import { validatePostcode, formatPostcode } from "@/lib/utils/postcode";

export const postcodeSchema = z
  .string()
  .trim()
  .min(5, "Postcode is required")
  .max(8, "Invalid UK postcode")
  .refine(validatePostcode, "Please enter a valid UK postcode")
  .transform(formatPostcode);

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email address")
  .transform((val) => val.toLowerCase());

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password is too long");

export const nameSchema = z
  .string()
  .trim()
  .min(1, "This field is required")
  .max(50, "Must be 50 characters or fewer");
