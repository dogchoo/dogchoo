import { z } from "zod";

// service까지만
// 한글이문제제
export const updateTopicSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "" }).optional(),
  content: z.string().min(1, { message: "" }).optional(),
  isDone: z.boolean().optional(),
});

export type UpdateTopicFormValue = z.infer<typeof updateTopicSchema>;
