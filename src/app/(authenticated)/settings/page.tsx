import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import UpdateNameForm from "./_partials/UpdateNameForm";
import UpdatePasswordForm from "./_partials/UpdatePasswordForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Update Name</CardTitle>
          <CardDescription>Change your display name</CardDescription>
        </CardHeader>
        <UpdateNameForm user={user} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <UpdatePasswordForm user={user} />
      </Card>
    </div>
  );
}
