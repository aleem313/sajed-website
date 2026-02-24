import Link from "next/link";
import { Recycle } from "lucide-react";

export const metadata = {
  title: "Authentication",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <Recycle className="h-8 w-8 text-primary" />
        <span className="text-2xl font-bold text-foreground">Enviromate</span>
      </Link>
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-md">
        {children}
      </div>
    </div>
  );
}
