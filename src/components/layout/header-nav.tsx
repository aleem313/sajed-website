"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@/data/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export function HeaderNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Placeholder — will be replaced with useSession() in Phase 3
  const session = null;
  const isAuthenticated = session !== null;

  const ctaHref = isAuthenticated ? NAV_LINKS.cta.href : "/sign-up";

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
        {NAV_LINKS.main.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
              pathname === link.href ? "bg-muted text-foreground" : "text-muted-foreground"
            )}
          >
            {link.label}
          </Link>
        ))}

        <Link
          href={ctaHref}
          className="ml-2 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
        >
          {NAV_LINKS.cta.label}
        </Link>

        <div className="ml-2 flex items-center gap-1">
          <ThemeToggle />
        </div>

        {/* Auth Section */}
        <div className="ml-2 flex min-w-[200px] items-center justify-end gap-1">
          {isAuthenticated
            ? NAV_LINKS.user.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    pathname.startsWith(link.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))
            : NAV_LINKS.guest.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                    pathname === link.href ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
        </div>
      </nav>

      {/* Mobile Toggle */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAuthenticated={isAuthenticated}
        pathname={pathname}
        ctaHref={ctaHref}
      />
    </>
  );
}
