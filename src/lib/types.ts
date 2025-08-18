import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .regex(/^[A-Za-z0-9]+$/, "Password can only contain letters and numbers"),
});

export type TSignUpScema = z.infer<typeof signUpSchema>;