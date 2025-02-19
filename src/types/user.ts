import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password minimun 8 char" })
    .max(16, { message: "Password miximum 20 char" }),
  // .refine((val) => /[A-Z]/.test(val), {
  //   message: "Password must contain at least one uppercase letter",
  // })
  // .refine((val) => /[0-9]/.test(val), {
  //   message: "Password must contain at least one number",
  // })
  // .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
  //   message: "Password must contain at least one special character",
  // }),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type SigninSchemaT = z.infer<typeof signinSchema>;

export type SignupSchemaT = z.infer<typeof signupSchema>;
