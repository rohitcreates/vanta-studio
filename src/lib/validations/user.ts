import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(3),

  username: z.string().min(3),

  email: z.string().email(),

  password: z.string().min(8),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;