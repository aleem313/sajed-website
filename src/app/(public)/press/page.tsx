import type { Metadata } from "next";
import { ExternalLink, Newspaper } from "lucide-react";
import { getPressArticles } from "@/lib/data/press";
import { formatDate } from "@/lib/utils/date";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "In the Press",
  description:
    "Read about Enviromate in the media — press coverage, features, and industry recognition.",
};

export default async function PressPage() {
  const articles = await getPressArticles();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "In the Press" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">In the Press</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Media coverage and press mentions of Enviromate.
        </p>

        {articles.length === 0 ? (
          <EmptyState
            icon={Newspaper}
            title="No press articles yet"
            description="Check back soon for media coverage and press mentions."
            className="mt-12"
          />
        ) : (
          <div className="mt-12 space-y-4">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-lg border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light">
                  <Newspaper className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground group-hover:text-primary">
                    {article.title}
                  </h2>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{article.source}</span>
                    <span aria-hidden="true">&middot;</span>
                    <time dateTime={article.publishedDate.toISOString()}>
                      {formatDate(article.publishedDate)}
                    </time>
                  </div>
                </div>
                <ExternalLink
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary"
                  aria-hidden="true"
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
