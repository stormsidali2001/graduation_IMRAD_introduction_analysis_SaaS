"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavbarLinks = ({ links }: { links: any[] }) => {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={cn(
            "text-foreground/60 transition-colors hover:text-foreground/80",
            {
              "text-foreground": link.href === pathname,
            },
          )}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
