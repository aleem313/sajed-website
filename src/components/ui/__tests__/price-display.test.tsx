import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PriceDisplay } from "../price-display";

describe("PriceDisplay", () => {
  it('shows "Free" badge for price 0', () => {
    render(<PriceDisplay pence={0} />);
    expect(screen.getByText("Free")).toBeInTheDocument();
  });

  it("shows formatted price for non-zero pence", () => {
    render(<PriceDisplay pence={1050} />);
    expect(screen.getByText("£10.50")).toBeInTheDocument();
  });

  it("applies size classes", () => {
    render(<PriceDisplay pence={5000} size="lg" />);
    const el = screen.getByText("£50.00");
    expect(el.className).toContain("text-2xl");
  });

  it("applies custom className", () => {
    render(<PriceDisplay pence={100} className="custom" />);
    const el = screen.getByText("£1.00");
    expect(el.className).toContain("custom");
  });
});
