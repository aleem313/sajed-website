import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroSearch } from "@/components/sections/hero-search";
import { CategoryTabs } from "@/components/sections/category-tabs";
import { StatsSection } from "@/components/sections/stats-section";
import { PricingSection } from "@/components/sections/pricing-section";

export default function HomePage() {
  return (
    <>
      {/* Hero with Search */}
      <HeroSearch />

      {/* Category Navigation */}
      <CategoryTabs />

      {/* Statistics / Mission */}
      <StatsSection />

      {/* Pricing / Packages */}
      <PricingSection />

      {/* CTA */}
      <section className="border-t border-border bg-muted px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="mt-3 text-muted-foreground">
            Create your free account today and start buying or selling building materials.
          </p>
          <Link
            href="/sign-up"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-hover"
          >
            Create Free Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
