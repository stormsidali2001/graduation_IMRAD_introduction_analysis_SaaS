import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { $Enums } from "@prisma/client";
const Layout = async ({ children }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;
  if (user.role !== $Enums.Role.Admin) {
    redirect("/login");
  }

  return <>{children}</>;
};
export default Layout;
