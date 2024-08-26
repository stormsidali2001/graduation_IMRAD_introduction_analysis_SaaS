import { ActionError } from "@/lib/safe-action";
import { findUserByEmail, sendResetRequest } from "../services/user-service";
import { sendResetEmail } from "../services/email-service";

export const forgotPasswordUseCase = async (email: string) => {
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      throw new ActionError("User not found");
    }
    const request = await sendResetRequest(user.id);
    await sendResetEmail({
      email: email,
      name: user.name,
      token: request.token,
    });
  } catch (err) {
    throw err;
  }
};
