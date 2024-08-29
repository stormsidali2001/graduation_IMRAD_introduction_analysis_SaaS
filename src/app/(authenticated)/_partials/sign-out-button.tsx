"use client";
import { signOut } from "next-auth/react";
export const SignOutButton = () => {
  return (
    <button className="flex items-center gap-2" onClick={() => signOut()}>
      <span>Sign out</span>
    </button>
  );
};
