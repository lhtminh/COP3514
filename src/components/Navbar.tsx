"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Workspace" },
  { href: "/exercises", label: "Exercises" },
  { href: "/materials", label: "Materials" },
  { href: "/cheatsheet", label: "Cheatsheet" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-12 items-center px-4 gap-6">
        <Link href="/" className="font-bold text-lg tracking-tight mr-2">
          cgym
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
