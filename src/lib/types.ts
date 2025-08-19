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

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type TLoginSchema = z.infer<typeof loginSchema>;

export const professionalRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  profession: z.string().min(1, "Profession is required"),
  location: z.string(),
  description: z
    .string()
    .max(100, "Description must not exceed 100 characters")
    .optional(),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number can only contain numbers"),
});

export type TProfessionalRegisterSchema = z.infer<
  typeof professionalRegisterSchema
>;
