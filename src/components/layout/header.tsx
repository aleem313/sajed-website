import Link from "next/link";
import { Recycle } from "lucide-react";
import { HeaderNav } from "./header-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Recycle className="h-7 w-7 text-primary" />
          <span className="text-xl font-bold text-foreground">Enviromate</span>
        </Link>
        <HeaderNav />
      </div>
    </header>
  );
}
