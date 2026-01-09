/**
 * Form validation schemas and TypeScript types using Zod
 * Defines validation rules for user authentication and professional registration forms
 */
import { z } from "zod";

/** Zod schema for user sign-up form validation */
export const signUpSchema = z.object({
  /** Username: 5-20 characters, alphanumeric and special characters */
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters"),
  /** Email address with standard email format validation */
  email: z.email("Invalid email address"),
  /** Password: 8-30 characters, letters and numbers only */
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters")
    .regex(/^[A-Za-z0-9]+$/, "Password can only contain letters and numbers"),
});

/** TypeScript type inferred from signUpSchema for form data */
export type TSignUpSchema = z.infer<typeof signUpSchema>;

/** Zod schema for user login form validation */
export const loginSchema = z.object({
  /** Username or email address for login */
  identifier: z.string(),
  /** User's password */
  password: z.string(),
});

/** TypeScript type inferred from loginSchema for form data */
export type TLoginSchema = z.infer<typeof loginSchema>;

/** Zod schema for professional registration form validation */
export const professionalRegisterSchema = z.object({
  /** Professional's first name - required field */
  firstName: z.string().min(1, "First name is required"),
  /** Professional's last name - required field */
  lastName: z.string().min(1, "Last name is required"),
  /** Type of profession (e.g., "Electrician", "Plumber") - required */
  profession: z.string().min(1, "Profession is required"),
  /** Geographic location where services are provided */
  location: z.string(),
  /** Professional bio/description - max 100 characters, optional */
  description: z
    .string()
    .max(100, "Description must not exceed 100 characters")
    .optional(),
  /** Contact phone number - exactly 10 digits, numbers only */
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number can only contain numbers"),
  /** Hourly service rate - numbers only, required field */
  hourlyRate: z
    .string()
    .min(1, "Hourly rate is required")
    .regex(/^\d+$/, "Hourly rate can only contain numbers")
});

/** TypeScript type inferred from professionalRegisterSchema for form data */
export type TProfessionalRegisterSchema = z.infer<
  typeof professionalRegisterSchema
>;
