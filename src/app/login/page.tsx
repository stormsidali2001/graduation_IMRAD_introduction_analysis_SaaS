import Link from "next/link";
import { Form } from "./_partials/form";
import { getSession } from "@/lib/get-session";
import { isPreviewMode } from "@/lib/preview-mode";
import { getUserRedirectUrl } from "@/server/services/user-service";
import { PreviewModeNotice } from "@/components/preview-mode-notice";
import { redirect } from "next/navigation";
import { LockIcon } from "lucide-react";

export default async function Page() {
  if (isPreviewMode()) return <PreviewModeNotice />;
  const session = await getSession();
  if (session) {
    console.log("login page: user -->", session.user);
    const url = getUserRedirectUrl(session.user);
    redirect(url);
  }
  return <Form />;
}
