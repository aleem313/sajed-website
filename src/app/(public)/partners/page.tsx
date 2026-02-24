import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink, Building2 } from "lucide-react";
import { getPartners } from "@/lib/data/partners";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Meet the organisations partnering with Enviromate to promote sustainable building practices and the circular economy in the UK construction industry.",
};

export default async function PartnersPage() {
  const partners = await getPartners();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Partners" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">Our Partners</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          We&apos;re proud to work with organisations that share our commitment to sustainability
          and the circular economy.
        </p>

        {partners.length === 0 ? (
          <EmptyState
            icon={Building2}
            title="No partners yet"
            description="Check back soon — we're building partnerships with organisations across the UK."
            className="mt-12"
          />
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
                  )}
                </div>
                <h2 className="mt-4 text-lg font-semibold text-foreground">{partner.name}</h2>
                {partner.description && (
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{partner.description}</p>
                )}
                {partner.url && (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
                  >
                    Visit website
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
