import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date;
}

export function BlogCard({ slug, title, excerpt, coverImage, publishedAt }: BlogCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {coverImage ? (
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={coverImage}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex aspect-video items-center justify-center bg-primary-light">
          <span className="text-3xl font-bold text-primary" aria-hidden="true">
            E
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" aria-hidden="true" />
          <time dateTime={publishedAt.toISOString()}>{formatDate(publishedAt)}</time>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-foreground group-hover:text-primary">
          <Link href={`/blog/${slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        )}

        <p className="mt-4 text-sm font-medium text-primary">
          Read more <span aria-hidden="true">&rarr;</span>
        </p>
      </div>
    </article>
  );
}
