import Link from "next/link";
import { Form } from "./_partials/form";
import { auth } from "@/lib/auth";
import { getUserRedirectUrl } from "@/server/services/user-service";
import { redirect } from "next/navigation";
import { LockIcon } from "lucide-react";

export default async function Page() {
  const session = await auth();
  if (session) {
    console.log("login page: user -->", session.user);
    const url = getUserRedirectUrl(session.user);
    redirect(url);
  }
  return <Form />;
}
