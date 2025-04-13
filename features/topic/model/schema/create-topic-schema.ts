import { z } from "zod";

export const createTopicSchema = z.object({
  title: z.string().min(1, { message: "" }),
  isDone: z.string().min(1, { message: "" }),
});

export type CreateUserFormValue = z.infer<typeof createTopicSchema>;
