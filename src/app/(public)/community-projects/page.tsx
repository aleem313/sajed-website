import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";
import { getCommunityProjects } from "@/lib/data/community-projects";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = {
  title: "Community Projects",
  description:
    "Discover the charitable building projects supported by Enviromate and our community of tradespeople across the UK.",
};

export default async function CommunityProjectsPage() {
  const projects = await getCommunityProjects();

  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Community Projects" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">Community Projects</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Enviromate supports community building projects by connecting volunteers with donated and
          discounted materials.
        </p>

        {projects.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No community projects yet"
            description="Check back soon — we're always looking for ways to support local communities."
            className="mt-12"
          />
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {projects.map((project) => {
              const images = (project.images as string[]) || [];
              return (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  {images.length > 0 && (
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      <Image
                        src={images[0]}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
                    {project.location && (
                      <div className="mt-2 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                        <Badge variant="secondary">{project.location}</Badge>
                      </div>
                    )}
                    <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                    {images.length > 1 && (
                      <div className="mt-4 flex gap-2">
                        {images.slice(1, 4).map((img, i) => (
                          <div
                            key={i}
                            className="relative h-16 w-16 overflow-hidden rounded-md bg-muted"
                          >
                            <Image
                              src={img}
                              alt=""
                              fill
                              className="object-cover"
                              sizes="64px"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
