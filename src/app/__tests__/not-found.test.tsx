import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "../not-found";

describe("NotFound (404) page", () => {
  it("renders the 404 heading", () => {
    render(<NotFound />);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  });

  it("renders a helpful description", () => {
    render(<NotFound />);
    expect(screen.getByText(/The page you're looking for doesn't exist/)).toBeInTheDocument();
  });

  it("renders a link to the homepage", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Go to Homepage" });
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders a link to the marketplace", () => {
    render(<NotFound />);
    const link = screen.getByRole("link", { name: "Browse Marketplace" });
    expect(link).toHaveAttribute("href", "/marketplace");
  });
});
