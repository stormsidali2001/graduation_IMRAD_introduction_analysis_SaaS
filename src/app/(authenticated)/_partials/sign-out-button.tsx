"use client";
import { signOut } from "next-auth/react";
export const SignOutButton = () => {
  return (
    <button className="flex items-center gap-2" onClick={() => signOut()}>
      <div className="w-4 h-4" />
      <span>Sign out</span>
    </button>
  );
};
