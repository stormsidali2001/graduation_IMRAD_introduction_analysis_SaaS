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
  BookOpenIcon,
  CircleUserIcon,
  MenuIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "./sign-out-button";
import { SearchBar } from "./SearchBar";
import { cn } from "@/lib/utils";
import NavbarLinks from "./NavbarLinks";

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
      className={`${
        isPremium ? "outline-primary outline-2 outline rounded-full" : ""
      }`}
    >
      <Button variant="ghost" className="rounded-full" size="icon">
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
              <span>Billing Portal</span>
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link
              href="/plans"
              className="flex items-start gap-2"
              prefetch={false}
            >
              <span>Upgrade to Premium</span>
            </Link>
          </DropdownMenuItem>
        )}
      </>
    );
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <BookOpenIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              IMRAD Analyzer
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavbarLinks links={links} />
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center" prefetch={false}>
              <BookOpenIcon className="mr-2 h-6 w-6 text-primary" />
              <span className="font-bold">IMRAD Analyzer</span>
            </Link>
            <nav className="mt-6 flex flex-col space-y-4">
              <NavbarLinks links={links} />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <SearchBar />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>{avatar}</DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{user.name}</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center justify-between">
                User Plan:
                <Badge variant={isPremium ? "default" : "secondary"}>
                  {user.plan}
                </Badge>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  Settings
                </Link>
              </DropdownMenuItem>
              {dropdownItems}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
