import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders text content", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies default variant classes", () => {
    render(<Badge>Default</Badge>);
    expect(screen.getByText("Default").className).toContain("bg-primary");
  });

  it("applies free variant classes", () => {
    render(<Badge variant="free">Free</Badge>);
    expect(screen.getByText("Free").className).toContain("bg-success");
  });

  it("applies forSale variant classes", () => {
    render(<Badge variant="forSale">For Sale</Badge>);
    expect(screen.getByText("For Sale").className).toContain("bg-info");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText("Outline").className).toContain("text-foreground");
  });

  it("applies custom className", () => {
    render(<Badge className="custom">Custom</Badge>);
    expect(screen.getByText("Custom").className).toContain("custom");
  });
});
