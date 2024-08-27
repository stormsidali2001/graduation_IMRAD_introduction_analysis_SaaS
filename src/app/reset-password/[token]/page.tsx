import React from "react";
import Form from "./_partials/form";
import { auth } from "@/lib/auth";
import {
  getUserRedirectUrl,
  verifyResetRequestToken,
} from "@/server/services/user-service";
import { redirect } from "next/navigation";

const Page = async ({ params: { token } }) => {
  const isValid = await verifyResetRequestToken(token);
  if (!isValid) {
    redirect("/login");
  }
  console.log("token", token);
  const session = await auth();
  if (session) {
    const redirectUrl = getUserRedirectUrl(session.user);
    redirect(redirectUrl);
  }
  if (!token) {
    redirect("/login");
  }
  return <Form token={token} />;
};

export default Page;
