import React from "react";
import { getSession } from "@/lib/get-session";
import { isPreviewMode } from "@/lib/preview-mode";
import { Navbar } from "./_partials/navbar";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!isPreviewMode()) {
    if (!session) {
      redirect("/login");
    }
    if (!session.user.emailVerified) {
      redirect("/verify-email");
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
      {isPreviewMode() && session && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-2 px-4 text-sm font-semibold flex items-center justify-center gap-4 flex-wrap">
          <span>
            Preview Mode — Viewing as{" "}
            <span className="font-bold">{session.user.name}</span>
            {" "}
            <span className="opacity-75">({session.user.role})</span>
          </span>
          <a
            href="/login"
            className="underline underline-offset-2 text-white/90 hover:text-white font-semibold"
          >
            Switch Role
          </a>
        </div>
      )}
      <Navbar />
      <main className="flex-1 px-4 py-6 md:px-6 md:py-12">{children}</main>
    </div>
  );
}
