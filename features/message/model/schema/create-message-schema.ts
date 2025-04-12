import { z } from "zod";

export const createMessageSchema = z.object({
  content: z.string().min(1, { message: "" }),
  name: z.string().min(1, { message: "" }),
});

export type CreateMessageFormValue = z.infer<typeof createMessageSchema>;
