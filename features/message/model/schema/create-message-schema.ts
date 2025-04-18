import { z } from "zod";

export const MAX_MESSAGE_CONTENT_LENGTH = 100;

export const createMessageSchema = z.object({
  content: z.string().min(1, { message: "" }).max(MAX_MESSAGE_CONTENT_LENGTH),
  name: z.string().min(1, { message: "" }),
  clientId: z.string(),
});

export type CreateMessageFormValue = z.infer<typeof createMessageSchema>;

export type MessageEntity = CreateMessageFormValue & {
  created: string;
};
