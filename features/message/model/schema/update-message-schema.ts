import { z } from "zod";

export const MAX_MESSAGE_CONTENT_LENGTH = 100;

export const updateMessageSchema = z.object({
  id: z.string(),
  content: z.string().min(1, { message: "" }).max(MAX_MESSAGE_CONTENT_LENGTH),
  clientId: z.string(),
  topicId: z.string(),
});

export type UpdateMessageFormValue = z.infer<typeof updateMessageSchema>;
