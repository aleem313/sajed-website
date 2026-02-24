import { z } from "zod";
import { postcodeSchema } from "./common";

const LISTING_CATEGORIES = [
  "BUILDING",
  "PLUMBING",
  "CARPENTRY",
  "ELECTRICAL",
  "PAINT_AND_DECORATING",
  "TOOLS",
  "FREE",
  "OTHER",
  "WHOLESALERS",
] as const;

const baseListingSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be 100 characters or fewer"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be 2000 characters or fewer"),
  price: z
    .number()
    .int("Price must be a whole number (in pence)")
    .min(0, "Price cannot be negative")
    .max(99999999, "Price cannot exceed £999,999.99"),
  listingType: z.enum(["FOR_SALE", "FREE"]),
  category: z.enum(LISTING_CATEGORIES),
  postcode: postcodeSchema,
  location: z.string().trim().min(1, "Location is required"),
  imageKeys: z.array(z.string().min(1)).min(0).max(20, "Maximum 20 images allowed"),
});

export const createListingSchema = baseListingSchema.superRefine((data, ctx) => {
  if (data.listingType === "FREE" && data.price !== 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Price must be 0 for free listings",
      path: ["price"],
    });
  }
  if (data.listingType === "FOR_SALE" && data.price <= 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Price must be greater than 0 for items for sale",
      path: ["price"],
    });
  }
});

export const updateListingSchema = baseListingSchema.partial().extend({
  id: z.string().min(1),
});

export const priceInputSchema = z
  .string()
  .regex(/^\d+(\.\d{0,2})?$/, "Enter a valid price (e.g. 10.50)")
  .transform((val) => Math.round(parseFloat(val) * 100));

export type CreateListingInput = z.infer<typeof createListingSchema>;
export type UpdateListingInput = z.infer<typeof updateListingSchema>;
