import Link from "next/link";
import { Check } from "lucide-react";
import { SUBSCRIPTION_PLANS } from "@/data/plans";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const plans = Object.values(SUBSCRIPTION_PLANS);

export function PricingSection({ className }: { className?: string }) {
  return (
    <section className={cn("bg-muted px-4 py-16", className)}>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
          Choose Your Plan
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          Start for free and upgrade as you grow. No hidden fees, no selling commissions.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const isPopular = "popular" in plan && plan.popular;
            const hasVat = "vatApplicable" in plan && plan.vatApplicable;

            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-lg border bg-card p-6 shadow-sm",
                  isPopular ? "border-primary ring-2 ring-primary" : "border-border"
                )}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}

                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>

                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">{plan.priceDisplay}</span>
                  {plan.interval && (
                    <span className="text-sm text-muted-foreground">/{plan.interval}</span>
                  )}
                  {hasVat && <span className="ml-1 text-xs text-muted-foreground">+ VAT</span>}
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button asChild variant={isPopular ? "primary" : "outline"} className="w-full">
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
