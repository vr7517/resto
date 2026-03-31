import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Name is required"),

  description: z.string().optional(),

  price: z
    .string()
    .min(1, "Price is required")
    .refine(val => !isNaN(val), "Must be a number"),

  selling_price: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(val), "Must be a number"),

  discount: z
    .string()
    .optional()
    .refine(val => !val || !isNaN(val), "Must be a number"),

  category_id: z.string().min(1, "Category is required"),

  image: z.any().optional(),

  // is_available: z.boolean().optional(),
});