import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "" }),
  passwordQuestion: z.string().min(1, { message: "" }),
  passwordAnswer: z.string().min(1, { message: "" }),
});

export type CreateUserFormValue = z.infer<typeof createUserSchema>;
