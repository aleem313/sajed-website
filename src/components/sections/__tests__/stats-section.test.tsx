import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsSection } from "../stats-section";

describe("StatsSection", () => {
  it("renders the section heading", () => {
    render(<StatsSection />);
    expect(screen.getByText("Why It Matters")).toBeInTheDocument();
  });

  it("renders all 4 stat tiles", () => {
    render(<StatsSection />);
    expect(screen.getByText("420M+")).toBeInTheDocument();
    expect(screen.getByText("32%")).toBeInTheDocument();
    expect(screen.getByText("£1B+")).toBeInTheDocument();
    expect(screen.getByText("13M")).toBeInTheDocument();
  });

  it("renders descriptions for each stat", () => {
    render(<StatsSection />);
    expect(screen.getByText("Construction waste generated in the UK annually")).toBeInTheDocument();
    expect(
      screen.getByText("Of all UK waste comes from construction & demolition")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Worth of reusable materials sent to landfill each year")
    ).toBeInTheDocument();
    expect(screen.getByText("Of materials that could be reclaimed and reused")).toBeInTheDocument();
  });

  it("accepts a custom className", () => {
    const { container } = render(<StatsSection className="mt-8" />);
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
