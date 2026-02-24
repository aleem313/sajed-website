import type { Metadata } from "next";
import Link from "next/link";
import { UserPlus, Search, MessageSquare, Truck, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Learn how Enviromate works — create an account, browse or post surplus building materials, connect with buyers and sellers, and complete transactions.",
};

const STEPS = [
  {
    icon: UserPlus,
    title: "Create a Free Account",
    description:
      "Sign up in seconds with just your name, email, and postcode. No credit card required to get started.",
  },
  {
    icon: Search,
    title: "Browse or Post Materials",
    description:
      "Search thousands of listings for quality building materials, or post your surplus items to find buyers near you.",
  },
  {
    icon: MessageSquare,
    title: "Contact Sellers or Receive Enquiries",
    description:
      "Use our built-in messaging system to negotiate prices, ask questions, and arrange the details of your transaction.",
  },
  {
    icon: Truck,
    title: "Arrange Collection or Delivery",
    description:
      "Collect items locally or arrange affordable delivery through our partner AnyVan for larger items across the UK.",
  },
  {
    icon: CheckCircle,
    title: "Complete the Transaction",
    description:
      "Finalise the deal privately between you and the other party. No middleman fees, no selling commissions.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "How It Works" }]} />

        <h1 className="mt-6 text-3xl font-bold text-foreground sm:text-4xl">How It Works</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Getting started with Enviromate is simple. Follow these five steps to start buying or
          selling surplus building materials.
        </p>

        <div className="mt-12 space-y-8">
          {STEPS.map((step, index) => (
            <div key={step.title} className="flex gap-6">
              <div className="flex shrink-0 flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-lg font-bold">{index + 1}</span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-border" aria-hidden="true" />
                )}
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-3">
                  <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
                </div>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-primary-light p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Ready to Get Started?</h2>
          <p className="mt-2 text-muted-foreground">
            Join thousands of tradespeople and DIY enthusiasts across the UK.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/sign-up">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
