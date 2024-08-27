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
  try {
    const res = await resend.emails.send({
      to:
        process.env.NODE_ENV === "production"
          ? email
          : "assoulsidali@gmail.com",
      from: "delivered@resend.dev",
      subject: "Rest Your password",
      react: (
        <ResetPasswordEmail
          userFirstname={name}
          resetPasswordLink={process.env.BASE_URL + "/reset-password/" + token}
        />
      ),
    });
    if (res.error) {
      throw res.error;
    }
    console.log("Sending email response", JSON.stringify(res));
  } catch (err) {
    console.error("Could not send email" + JSON.stringify(err));
    throw err;
  }
};
