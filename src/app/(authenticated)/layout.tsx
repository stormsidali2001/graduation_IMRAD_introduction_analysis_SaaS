import { auth } from "@/lib/auth";
import { Navbar } from "./_partials/navbar";

export default async function Layout({ children }: any) {
  const session = await auth();
  console.log("dashboard ---------", session);
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 px-4 py-6 md:px-6 md:py-12">{children}</main>
    </div>
  );
}
