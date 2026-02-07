import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .nonempty("Name is required"),

  mobile: z
    .string()
    .regex(/^\d{10}$/, "Mobile number must be 10 digits")
    .nonempty("Mobile number is required"),

  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});
