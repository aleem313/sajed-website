import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingSection } from "../pricing-section";

describe("PricingSection", () => {
  it("renders the section heading", () => {
    render(<PricingSection />);
    expect(screen.getByText("Choose Your Plan")).toBeInTheDocument();
  });

  it("renders all 4 plan names", () => {
    render(<PricingSection />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Premium")).toBeInTheDocument();
    expect(screen.getByText("Premium+")).toBeInTheDocument();
    expect(screen.getByText("Wholesaler")).toBeInTheDocument();
  });

  it("renders correct prices", () => {
    render(<PricingSection />);
    expect(screen.getByText("£0.00")).toBeInTheDocument();
    expect(screen.getByText("£2.99")).toBeInTheDocument();
    expect(screen.getByText("£19.99")).toBeInTheDocument();
    expect(screen.getByText("£29.99")).toBeInTheDocument();
  });

  it("shows Most Popular badge on Premium+", () => {
    render(<PricingSection />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });

  it("shows VAT note on Wholesaler plan", () => {
    render(<PricingSection />);
    expect(screen.getByText("+ VAT")).toBeInTheDocument();
  });

  it("renders CTA buttons with correct links", () => {
    render(<PricingSection />);
    const getStartedLink = screen.getByRole("link", { name: "Get Started" });
    expect(getStartedLink).toHaveAttribute("href", "/sign-up?plan=free");

    const subscribeLinks = screen.getAllByRole("link", { name: "Subscribe" });
    expect(subscribeLinks).toHaveLength(3);
  });

  it("renders feature lists for all plans", () => {
    render(<PricingSection />);
    expect(screen.getByText("Post & browse listings")).toBeInTheDocument();
    expect(screen.getByText("3 Ad Bumps per month")).toBeInTheDocument();
    expect(screen.getByText("Wholesale ad access")).toBeInTheDocument();
    expect(screen.getByText("Seller Hub")).toBeInTheDocument();
  });
});
