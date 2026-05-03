import { isPreviewMode } from "./preview-mode";
import { mockUserSession, mockAdminSession } from "@/server/mock/mock-session";

export async function getSession() {
  if (isPreviewMode()) {
    const { cookies } = await import("next/headers");
    const role = cookies().get("preview_role")?.value;
    return role === "admin" ? mockAdminSession : mockUserSession;
  }
  const { auth } = await import("./auth");
  return auth();
}
