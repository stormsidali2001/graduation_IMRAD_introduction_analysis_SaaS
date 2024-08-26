"use server";
import { authActionClient } from "@/lib/safe-action";
import { UpdatePasswordDto } from "../validation/UpdatePasswordDto";
import { updatePasswordUseCase } from "../use-cases/update-password-use-case";

export const updatePasswordAction = authActionClient
  .metadata({ actionName: "updatePasswordAction" })
  .schema(UpdatePasswordDto)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await updatePasswordUseCase(parsedInput, ctx.userId);
    } catch (err) {
      throw err;
    }
  });
