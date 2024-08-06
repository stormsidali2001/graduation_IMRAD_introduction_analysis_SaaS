import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { $Enums } from "@prisma/client";

const Layout = async ({ children }) => {
  const session = await auth();
  if (!session) redirect("/login");
  //if (session.user.role !== $Enums.Role.Admin) redirect("/user/dashboard");
  return <>{children}</>;
};
export default Layout;
