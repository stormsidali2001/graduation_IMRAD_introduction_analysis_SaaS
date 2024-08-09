import { comparePassword } from "@/lib/server-utils";
import { findUserByEmailWithCredentials } from "../services/user-service";
import { UserDto } from "../validation/UserDto";

export const authenticateWithPasswordUsecase = async (
  email: string,
  password: string,
) => {
  console.log("authorization running");
  try {
    const user = await findUserByEmailWithCredentials(email);
    if (!user) return null;
    const match = await comparePassword(user.password, password);
    if (!match) return null;
    console.log("user loged in", user);
    return UserDto.parse(user);
  } catch (err) {
    console.error("Failed to authenticate the user");
    throw new Error(err);
  }
};
