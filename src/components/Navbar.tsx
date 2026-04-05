"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import {
  CodeIcon,
  TerminalIcon,
} from "lucide-react";

const links = [
  { href: "/", label: "Workspace", icon: TerminalIcon },
  { href: "/cheatsheet", label: "Cheatsheet", icon: CodeIcon },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="shrink-0 border-b bg-card">
      <div className="flex h-12 items-center px-4 gap-2">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-foreground mr-4"
        >
          <div className="flex items-center justify-center size-7 rounded-lg bg-primary text-primary-foreground text-xs font-black">
            C
          </div>
          <span className="text-sm hidden sm:inline">COP3514</span>
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
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <link.icon className="size-4" />
                <span className="hidden md:inline">{link.label}</span>
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
