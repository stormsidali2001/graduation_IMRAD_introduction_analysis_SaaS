import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/lib/auth";
import { getCustomerPortalLinkAction } from "@/server/actions/get-customer-bortal-link";
import {
  CircleUserIcon,
  MenuIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

export const Navbar = async () => {
  const session = await auth();
  const { user } = session;
  let customerPortalLink: string;
  const isPremium = user.plan === "premium";

  if (isPremium) {
    customerPortalLink = (await getCustomerPortalLinkAction({})).data;
  }
  const avatar = (
    <div
      className={`${isPremium ? "outline-primary outline-2 outline rounded-full" : ""}`}
    >
      <Button variant="ghost" className="rounded-full  " size="icon">
        <Avatar>
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.name.at(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </div>
  );
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          prefetch={false}
        >
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href="/user/dashboard"
          className="text-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Generate
        </Link>
        <Link
          href="/user/dashboard/introductions/all/1"
          className="text-muted-foreground transition-colors hover:text-foreground"
          prefetch={false}
        >
          Introductions
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
              prefetch={false}
            >
              <Package2Icon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link href="#" className="hover:text-foreground" prefetch={false}>
              Dashboard
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Introductions
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Feedback
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Users
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Subscriptions
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>{avatar}</DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit p-2">
            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted">
              {avatar}
              <div className="grid gap-0.5 leading-none">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.email}
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />
            <div className="flex gap-3 my-2 justify-center">
              <div>User Plan: </div>
              <Badge variant="default">{user.plan}</Badge>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <div className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            {isPremium ? (
              <DropdownMenuItem>
                <Link
                  href={customerPortalLink}
                  target="_blank"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="w-4 h-4" />
                  <span>Billing Portal</span>
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <Link
                  href="/user/dashboard/plans"
                  className="flex items-center gap-2"
                  prefetch={false}
                >
                  <div className="w-4 h-4" />
                  <span>Upgrade to Premium</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
