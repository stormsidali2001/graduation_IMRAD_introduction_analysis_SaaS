"use server";

import prismaClient from "@/lib/prisma-client";
import { actionClient } from "@/lib/safe-action";
import { RegisterUserSchema } from "@/schema/validation/register-user.schema";
import { createUser, findUserByEmail } from "../services/user-service";
import { UserAlreadyRegistered } from "../errors";
import { signIn } from "@/lib/auth";
import { createStripeCustomer } from "../services/stripe";
import { registerUserUseCase } from "../use-cases/register-user";

export const registerUserAction = actionClient
  .schema(RegisterUserSchema)
  .metadata({ actionName: "registerUser" })
  .action(async ({ parsedInput: { name, email, password } }) => {
    try {
      await registerUserUseCase({ name, email, password });
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    } catch (err) {
      console.error(err);
      throw new Error("Failed to register the user");
    }
  });
