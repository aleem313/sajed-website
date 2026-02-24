"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackClassName?: string;
}

const OptimizedImage = React.forwardRef<HTMLDivElement, OptimizedImageProps>(
  ({ className, fallbackClassName, alt, ...props }, ref) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center justify-center bg-muted text-muted-foreground",
            fallbackClassName || className
          )}
          role="img"
          aria-label={alt}
        >
          <ImageOff className="h-8 w-8" aria-hidden="true" />
        </div>
      );
    }

    return (
      <div ref={ref} className={cn("relative overflow-hidden", className)}>
        {isLoading && <Skeleton className="absolute inset-0" />}
        <Image
          alt={alt}
          className={cn("object-cover transition-opacity", isLoading ? "opacity-0" : "opacity-100")}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      </div>
    );
  }
);
OptimizedImage.displayName = "OptimizedImage";

export { OptimizedImage };
