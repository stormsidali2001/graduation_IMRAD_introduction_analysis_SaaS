import { adminLinks, userLinks } from "@/common/navbar-links";
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
import { $Enums } from "@prisma/client";
import {
  CircleUserIcon,
  MenuIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";

export const Navbar = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  const { user } = session;
  let customerPortalLink: string = "#";
  const isPremium = user.plan === "premium";
  const isAdmin = user.role === $Enums.Role.Admin;

  if (isPremium && !isAdmin) {
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
  let links = [];

  if (isAdmin) {
    links = adminLinks;
  } else {
    links = userLinks;
  }
  let dropdownItems: JSX.Element = <></>;

  if (!isAdmin) {
    dropdownItems = (
      <>
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
              href="/plans"
              className="flex items-center gap-2"
              prefetch={false}
            >
              <div className="w-4 h-4" />
              <span>Upgrade to Premium</span>
            </Link>
          </DropdownMenuItem>
        )}
      </>
    );
  }
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

        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
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
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
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
            {dropdownItems}
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
