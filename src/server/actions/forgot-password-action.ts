"use server";
import { ActionError, actionClient } from "@/lib/safe-action";
import { forgotPasswordUseCase } from "../use-cases/forgot-password-use-case";
import { z } from "zod";

export const forgotPasswordAction = actionClient
  .metadata({ actionName: "forgotPasswordAction" })
  .schema(z.object({ email: z.string().email() }))
  .action(async ({ parsedInput }) => {
    try {
      await forgotPasswordUseCase(parsedInput.email);
    } catch (err) {
      throw new ActionError(err);
    }
  });
