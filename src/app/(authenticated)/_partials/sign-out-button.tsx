"use client";
import { signOut } from "next-auth/react";
export const SignOutButton = () => {
  return (
    <button className="flex items-center gap-2" aria-label="Sign out" onClick={() => signOut()}>
      <span>Sign out</span>
    </button>
  );
};
