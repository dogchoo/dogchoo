import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().min(1, { message: "" }),
});

export type CreateTopicFormValue = z.infer<typeof createTopicSchema>;

export type CreateTopicPayload = CreateTopicFormValue & {
  isDone: boolean;
  created: string;
};
