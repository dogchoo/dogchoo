import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().min(1, { message: "" }),
  content: z.string().min(1, { message: "" }),
  startDate: z.string().optional(),
});

export type CreateTopicFormValue = z.infer<typeof createTopicSchema>;
