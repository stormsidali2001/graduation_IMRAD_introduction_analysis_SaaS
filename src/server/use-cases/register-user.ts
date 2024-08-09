import { RegisterUserParams } from "@/schema/validation/register-user.schema";
import { createStripeCustomer } from "../services/stripe";
import { createUser, findUserByEmail } from "../services/user-service";
import { $Enums } from "@prisma/client";

export const registerUserUseCase = async (
  { email, name, password }: RegisterUserParams,
  role: $Enums.Role = $Enums.Role.User,
) => {
  try {
    const user = await findUserByEmail(email);
    if (user) throw new Error("Email Already Exist");
    const customer = await createStripeCustomer(email, name);
    console.log("stripe customer succesfully created");
    console.log(JSON.stringify(customer));
    await createUser({ name, email, password, customerId: customer.id }, role);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to register the user");
  }
};
