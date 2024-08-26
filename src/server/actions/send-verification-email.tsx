import { ResetPasswordEmail } from "@/components/emails/reset-password";
import resend from "@/lib/resend";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { findUserByEmail } from "../services/user-service";

export const sendVerificationEmailAction = actionClient
  .metadata({ actionName: "sendVerificationEmailAction" })
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput: { email } }) => {
    const user = await findUserByEmail(email);
    resend.emails.send({
      react: <ResetPasswordEmail userFirstname={} resetPasswordLink={} />,
    });
  });
