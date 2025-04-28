import { z } from "zod";

export const MAX_MESSAGE_CONTENT_LENGTH = 100;

export const deleteMessageSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  topicId: z.string(),
});

export type DeleteMessageFormValue = z.infer<typeof deleteMessageSchema>;
