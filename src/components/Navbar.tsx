"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import { CodeIcon, BookOpenIcon, FileTextIcon, TerminalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/", label: "Workspace", icon: TerminalIcon },
  { href: "/exercises", label: "Exercises", icon: BookOpenIcon },
  { href: "/materials", label: "Materials", icon: FileTextIcon },
  { href: "/cheatsheet", label: "Cheatsheet", icon: CodeIcon },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shrink-0">
      <div className="flex h-11 items-center px-4 gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold tracking-tight text-foreground"
        >
          <div className="flex items-center justify-center size-6 rounded-md bg-primary text-primary-foreground text-xs font-black">
            C
          </div>
          <span className="hidden sm:inline">cgym</span>
        </Link>

        <Separator orientation="vertical" className="h-5" />

        <nav className="flex items-center gap-0.5">
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
                  "flex items-center gap-1.5 px-2.5 py-1 text-[13px] rounded-md transition-colors",
                  active
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                <link.icon className="size-3.5" />
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
