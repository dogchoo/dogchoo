import { z } from "zod";

export const deleteTopicSchema = z.object({
  id: z.string(),
});

export type DeleteTopicFormValue = z.infer<typeof deleteTopicSchema>;
