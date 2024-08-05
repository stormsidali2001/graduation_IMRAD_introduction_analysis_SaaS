"use server";

import prismaClient from "@/lib/prisma-client";
import { actionClient } from "@/lib/safe-action";
import { RegisterUserSchema } from "@/schema/validation/register-user.schema";
import { registerUser } from "../services/user-service";
import { UserAlreadyRegistered } from "../errors";
import { signIn } from "@/lib/auth";
import { createStripeCustomer } from "../services/stripe";

export const registerUserAction = actionClient
  .schema(RegisterUserSchema)
  .metadata({ actionName: "registerUser" })
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      await registerUser({ name, email, password });
      await createStripeCustomer(email, name);
      await signIn("credentials", { email, password });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to register the user");
    }
  });

