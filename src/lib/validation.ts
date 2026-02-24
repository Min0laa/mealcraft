import { z } from "zod";

const profileSchema = z.object({
  weight: z.number().min(30).max(300).nullable(),
  height: z.number().min(100).max(250).nullable(),
  activityLevel: z
    .enum(["sedentary", "moderate", "active", "athlete"])
    .nullable(),
  budget: z.number().min(10).max(500).nullable(),
  supermarket: z.string().max(50).nullable(),
  restrictions: z.string().max(500),
});

export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      })
    )
    .min(1)
    .max(50),
  goal: z.enum(["bulk", "cut", "maintain"]),
  locale: z.enum(["en", "fr"]).default("en"),
  profile: profileSchema,
});

export type ValidatedChatRequest = z.infer<typeof chatRequestSchema>;
