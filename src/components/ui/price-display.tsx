import { formatPrice } from "@/lib/utils";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  pence: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceDisplay({ pence, size = "md", className }: PriceDisplayProps) {
  const isFree = pence === 0;

  if (isFree) {
    return <Badge variant="free">Free</Badge>;
  }

  const sizeClasses = {
    sm: "text-sm",
    md: "text-lg font-semibold",
    lg: "text-2xl font-bold",
  };

  return (
    <span className={cn(sizeClasses[size], "text-foreground", className)}>
      {formatPrice(pence)}
    </span>
  );
}
