import type { Metadata } from "next";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StatsSection } from "@/components/sections/stats-section";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Enviromate's mission to reduce construction waste in the UK by connecting buyers and sellers of surplus building materials.",
};

export default function AboutUsPage() {
  return (
    <div>
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

          <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">About Enviromate</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We&apos;re on a mission to change the way the UK handles construction waste.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section id="mission" className="bg-primary-light px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Mission</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Every year, the UK construction industry generates over 420 million tonnes of waste —
              making it the largest waste-producing sector in the country. Much of this material is
              perfectly reusable, yet it ends up in landfill.
            </p>
            <p>
              Enviromate was founded with a simple idea: connect people who have surplus building
              materials with those who need them. Whether it&apos;s leftover tiles from a bathroom
              renovation, reclaimed timber from a demolition, or brand-new plumbing supplies from an
              over-order — every material reused is one less going to landfill.
            </p>
            <p>
              We believe in the power of the circular economy to transform the construction
              industry. By making it easy to buy, sell, and give away surplus building materials,
              we&apos;re helping to reduce waste, lower costs for tradespeople and DIY enthusiasts,
              and build a more sustainable future.
            </p>
          </div>
        </div>
      </section>

      {/* Facts & Figures */}
      <section id="facts">
        <StatsSection />
      </section>

      {/* Our Story */}
      <section id="story" className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Our Story</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              Enviromate started from a conversation on a building site. A group of tradespeople
              noticed how much good material was being skipped at the end of every project — timber
              offcuts, unused bricks, surplus paint, spare fittings. All perfectly usable, all
              headed for landfill.
            </p>
            <p>
              The idea was straightforward: what if there was a dedicated marketplace where
              construction professionals and DIY enthusiasts could buy and sell these materials
              instead of throwing them away?
            </p>
            <p>
              Today, Enviromate serves a growing community of builders, plumbers, electricians,
              decorators, and DIY enthusiasts across the UK. We&apos;re proud to be making a
              difference — one listing at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="bg-muted px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">See How It Works</h2>
          <div className="relative aspect-video overflow-hidden rounded-lg bg-card shadow-md">
            {/* Placeholder for video embed — replace src with actual video URL */}
            <div className="flex h-full items-center justify-center bg-muted">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                  <svg
                    className="h-8 w-8 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">Video coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">Contact Us</h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
            Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
