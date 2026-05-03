"use server";

import { isPreviewMode } from "@/lib/preview-mode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setPreviewRole(role: "user" | "admin") {
  if (!isPreviewMode()) return;
  cookies().set("preview_role", role, { path: "/", maxAge: 86400 });
  redirect(role === "admin" ? "/dashboard" : "/generate");
}
