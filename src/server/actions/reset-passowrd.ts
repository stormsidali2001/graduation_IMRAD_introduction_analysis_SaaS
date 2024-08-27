"use server";
import { actionClient } from "@/lib/safe-action";
import { ResetPasswordSchema } from "../validation/ResetPasswordDto";
import { resetPasswordUseCase } from "../use-cases/reset-password-use-case";

export const ResetPasswordAction = actionClient
  .metadata({ actionName: "ResetPasswordAction" })
  .schema(ResetPasswordSchema)
  .action(async ({ parsedInput }) => {
    try {
      await resetPasswordUseCase(parsedInput.newPassword, parsedInput.token);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
