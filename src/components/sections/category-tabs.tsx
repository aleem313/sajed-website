import Link from "next/link";
import { Lock } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function CategoryTabs({ className }: { className?: string }) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <nav
          aria-label="Category navigation"
          className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide"
        >
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/c/${category.slug}`}
              className={cn(
                "inline-flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                "text-muted-foreground hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              )}
            >
              {category.name}
              {"restricted" in category && category.restricted && (
                <>
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  <Badge variant="secondary" className="text-[10px] px-1 py-0">
                    Premium+
                  </Badge>
                </>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
