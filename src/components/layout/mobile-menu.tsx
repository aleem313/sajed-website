"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  pathname: string;
  ctaHref: string;
}

export function MobileMenu({ open, onClose, isAuthenticated, pathname, ctaHref }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus trap: focus close button on open
  useEffect(() => {
    if (open && panelRef.current) {
      const closeBtn = panelRef.current.querySelector<HTMLButtonElement>("[data-close-btn]");
      closeBtn?.focus();
    }
  }, [open]);

  if (!open) return null;

  const authLinks = isAuthenticated ? NAV_LINKS.user : NAV_LINKS.guest;

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed inset-y-0 right-0 w-full max-w-xs bg-background p-6 shadow-xl animate-in slide-in-from-right"
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-foreground">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            data-close-btn
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
          {NAV_LINKS.main.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href ? "bg-muted text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={ctaHref}
            onClick={onClose}
            className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
          >
            {NAV_LINKS.cta.label}
          </Link>

          <div className="my-3 h-px bg-border" />

          {authLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted",
                pathname === link.href || pathname.startsWith(link.href + "/")
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
