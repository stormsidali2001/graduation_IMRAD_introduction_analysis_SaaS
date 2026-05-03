import { ResetPasswordEmail } from "@/components/emails/reset-password";
import resend from "@/lib/resend";
import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { findUserByEmail } from "../services/user-service";
import { isPreviewMode } from "@/lib/preview-mode";

export const sendVerificationEmailAction = actionClient
  .metadata({ actionName: "sendVerificationEmailAction" })
  .schema(
    z.object({
      email: z.string().email(),
    }),
  )
  .action(async ({ parsedInput: { email } }) => {
    if (isPreviewMode()) return;
    const user = await findUserByEmail(email);
    resend.emails.send({
      from: process.env.EMAIL_FROM ?? "",
      to: email,
      subject: "Reset your password",
      react: <ResetPasswordEmail userFirstname={user?.name ?? ""} resetPasswordLink={""} />,
    });
  });
