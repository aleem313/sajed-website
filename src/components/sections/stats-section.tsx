import { Recycle, Building2, PoundSterling, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  {
    icon: Building2,
    figure: "420M+",
    unit: "tonnes",
    description: "Construction waste generated in the UK annually",
  },
  {
    icon: Recycle,
    figure: "32%",
    unit: "",
    description: "Of all UK waste comes from construction & demolition",
  },
  {
    icon: PoundSterling,
    figure: "£1B+",
    unit: "",
    description: "Worth of reusable materials sent to landfill each year",
  },
  {
    icon: TrendingUp,
    figure: "13M",
    unit: "tonnes",
    description: "Of materials that could be reclaimed and reused",
  },
];

export function StatsSection({ className }: { className?: string }) {
  return (
    <section className={cn("px-4 py-16", className)}>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          Why It Matters
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          The UK construction industry is one of the largest contributors to waste. Together, we can
          change that.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div
              key={stat.figure}
              className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <p className="mt-4 text-3xl font-bold text-foreground">
                {stat.figure}
                {stat.unit && (
                  <span className="ml-1 text-base font-normal text-muted-foreground">
                    {stat.unit}
                  </span>
                )}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
