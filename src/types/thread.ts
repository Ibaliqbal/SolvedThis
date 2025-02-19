import { limitContent } from "@/config/thread";
import { z } from "zod";

const commentThreadSchema = z.object({
  content: z
    .string()
    .max(
      limitContent,
      `Content max length must be ${limitContent} characters long`
    ),
});

const createThreadSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
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

export type CommentThreadSchemaT = z.infer<typeof commentThreadSchema>;

export { commentThreadSchema, createThreadSchema };
