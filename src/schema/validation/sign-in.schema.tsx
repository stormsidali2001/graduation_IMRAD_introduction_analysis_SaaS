import { z } from "zod";
export const SignInSchema = z.object({
  email: z
    .string({
      message: "Email field is required",
      required_error: "Email field is required",
    })
    .email({ message: "Please provide a valide email address" }),
  password: z
    .string({
      message: "password field is required",
      required_error: "password field is required",
    })
    .min(6),
});

export type SigninSchemaType = z.infer<typeof SignInSchema>;
