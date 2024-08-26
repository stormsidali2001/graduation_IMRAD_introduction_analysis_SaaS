import { ActionError } from "@/lib/safe-action";
import {
  getResetRequest,
  updatePasswordAfterReset,
} from "../services/user-service";
import { hashPassword } from "@/lib/server-utils";

export const resetPasswordUseCase = async (password: string, token: string) => {
  try {
    const resetRequest = await getResetRequest(token);

    if (!resetRequest) {
      throw new ActionError("Bad Credentials.");
    }
    if (resetRequest.expires >= new Date()) {
      throw new ActionError("Reset Link already Expired");
    }
    const passwordHash = await hashPassword(password);
    await updatePasswordAfterReset({
      userId: resetRequest.userId,
      passwordHash,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
