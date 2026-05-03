import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import SettingsWrapper from "./_partials/SettingsWrapper";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;

  return <SettingsWrapper user={user} />;
}
