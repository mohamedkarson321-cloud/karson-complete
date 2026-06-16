import { z } from "zod";

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and a number"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and a number"
      ),
    confirmPassword: z.string(),
    token: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// ─── Contact ─────────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100)
    .trim(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .toLowerCase(),
  phone: z.string().optional(),
  company: z.string().max(100).optional(),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(200)
    .trim(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(5000)
    .trim(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

// ─── Newsletter ───────────────────────────────────────────────────────────────

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email").toLowerCase(),
  name: z.string().optional(),
});

// ─── Career Application ───────────────────────────────────────────────────────

export const careerApplicationSchema = z.object({
  jobId: z.string().min(1),
  firstName: z.string().min(2, "First name required").max(50).trim(),
  lastName: z.string().min(2, "Last name required").max(50).trim(),
  email: z.string().email("Valid email required").toLowerCase(),
  phone: z.string().optional(),
  linkedinUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  githubUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters").max(5000),
  experience: z.string().optional(),
  skills: z.array(z.string()).optional(),
});

// ─── Profile ─────────────────────────────────────────────────────────────────

export const profileSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  bio: z.string().max(500).optional(),
  company: z.string().max(100).optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  location: z.string().max(100).optional(),
  phone: z.string().optional(),
  timezone: z.string().optional(),
});

// ─── Blog Post ────────────────────────────────────────────────────────────────

export const blogPostSchema = z.object({
  title: z.string().min(5, "Title is too short").max(200).trim(),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(50, "Excerpt too short").max(500).trim(),
  content: z.string().min(100, "Content too short").trim(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().url().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
});

// ─── Project ──────────────────────────────────────────────────────────────────

export const projectSchema = z.object({
  name: z.string().min(3, "Project name too short").max(200).trim(),
  description: z.string().min(20, "Description too short").max(5000).trim(),
  serviceId: z.string().optional(),
  budget: z.number().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  technologies: z.array(z.string()).default([]),
  status: z.enum(["PLANNING", "IN_PROGRESS", "REVIEW", "ON_HOLD", "COMPLETED", "CANCELLED"]).default("PLANNING"),
});

// ─── Message ──────────────────────────────────────────────────────────────────

export const messageSchema = z.object({
  receiverId: z.string().min(1, "Recipient required"),
  subject: z.string().max(200).optional(),
  content: z.string().min(1, "Message cannot be empty").max(10000).trim(),
});

// ─── Type exports ─────────────────────────────────────────────────────────────

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type CareerApplicationInput = z.infer<typeof careerApplicationSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type BlogPostInput = z.infer<typeof blogPostSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
