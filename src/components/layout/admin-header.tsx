import Link from "next/link";
import { Recycle, Shield } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Recycle className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">Enviromate</span>
          </Link>
          <div className="flex items-center gap-1 rounded-md bg-destructive/10 px-2 py-1">
            <Shield className="h-3.5 w-3.5 text-destructive" />
            <span className="text-xs font-medium text-destructive">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Exit Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
