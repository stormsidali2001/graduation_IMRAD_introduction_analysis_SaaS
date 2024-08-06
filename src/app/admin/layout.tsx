import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { $Enums } from "@prisma/client";
import { Navbar } from "./_paritals/navbar";

const Layout = async ({ children }) => {
  const session = await auth();
  if (!session) redirect("/login");
  //if (session.user.role !== $Enums.Role.Admin) redirect("/user/dashboard");
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default Layout;
