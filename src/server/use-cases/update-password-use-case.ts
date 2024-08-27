import { comparePassword, hashPassword } from "@/lib/server-utils";
import {
  findUserByIdWithCredentials,
  updateUser,
} from "../services/user-service";
import { UpdatePasswordDtoType } from "../validation/UpdatePasswordDto";
import { ActionError } from "@/lib/safe-action";

export const updatePasswordUseCase = async (
  { newPassword, currentPassword }: UpdatePasswordDtoType,
  userId: string,
) => {
  try {
    const user = await findUserByIdWithCredentials(userId);
    if (!user) {
      throw new ActionError("User not Found");
    }
    const match = await comparePassword(user.password, currentPassword);
    if (!match) {
      throw new ActionError("Bad credentials");
    }

    const passwordHash = await hashPassword(newPassword);
    await updateUser(userId, {
      password: passwordHash,
    });
    return "Password Updated Successfully";
  } catch (err) {
    throw err;
  }
};
