import { limitContent } from "@/config/thread";
import { z } from "zod";

const replyThreadSchema = z.object({
  content: z
    .string()
    .max(
      limitContent,
      `Content max length must be ${limitContent} characters long`
    ),
});

const createThreadSchema = z.object({
  title: z.string()
    .trim()
    .min(5, "Title must be at least 5 characters long")
    .refine((value) => value.trim().length >= 5, {
      message: "Title cannot be just whitespace and must be at least 5 characters"
    }),
  topic: z.string({
    required_error: "Please select a topics.",
  }),
  content: z
    .string()
    .min(5, "Content must be at least 5 characters long")
    .max(
      limitContent,
      `Content max length must be ${limitContent} characters long`
    ),
});

export type CreatedThreadSchemaT = z.infer<typeof createThreadSchema>;

export type ReplyThreadSchemaT = z.infer<typeof replyThreadSchema>;

export { replyThreadSchema, createThreadSchema };
