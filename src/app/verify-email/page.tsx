import React from "react";
import Form from "./_partials/form";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getUserRedirectUrl } from "@/server/services/user-service";

const Page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (session.user.emailVerified) {
    const url = getUserRedirectUrl(session.user);
    redirect(url);
  }
  return <Form />;
};

export default Page;
