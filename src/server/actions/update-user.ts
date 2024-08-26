"use server";
import { authActionClient } from "@/lib/safe-action";
import { UpdatePasswordDto } from "../validation/UpdatePasswordDto";
import { updatePasswordUseCase } from "../use-cases/update-password-use-case";
import { UpdateUserSchema } from "../validation/UserDto";
import { updateUser } from "../services/user-service";

export const updateUserAction = authActionClient
  .metadata({ actionName: "updateUserAction" })
  .schema(UpdateUserSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await updateUser(ctx.userId, parsedInput);
      return "Updated Successfully";
    } catch (err) {
      console.error(err);
      throw "Failed to Update the User";
    }
  });
