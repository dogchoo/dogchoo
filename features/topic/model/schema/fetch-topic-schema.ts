import { z } from "zod";

export const fetchTopicSchema = z.object({
  id: z.string(),
});

export type FetchTopicFormValue = z.infer<typeof fetchTopicSchema>;
