import { getSession } from "@/lib/get-session";
import { isPreviewMode } from "@/lib/preview-mode";
import { redirect } from "next/navigation";
import { $Enums } from "@prisma/client";
const Layout = async ({ children }) => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;
  if (!isPreviewMode() && user.role !== $Enums.Role.Admin) {
    redirect("/login");
  }

  return <>{children}</>;
};
export default Layout;
