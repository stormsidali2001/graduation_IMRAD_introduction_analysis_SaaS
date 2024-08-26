import { ResetPasswordEmail } from "@/components/emails/reset-password";
import resend from "@/lib/resend";

export const sendResetEmail = async ({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) => {
  await resend.emails.send({
    to: email,
    from: "assoulsidali@gmail.com",
    subject: "Rest Your password",
    react: (
      <ResetPasswordEmail
        userFirstname={name}
        resetPasswordLink={
          process.env.BASE_URL + "/reset-password?token=" + token
        }
      />
    ),
  });
};
