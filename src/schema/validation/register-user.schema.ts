import { z } from "zod";
export const RegisterUserSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    name: z.string().min(3),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
      });
    }
  });

export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
export type RegisterUserParams = Omit<
  RegisterUserInput,
  "passwordConfirmation"
>;
