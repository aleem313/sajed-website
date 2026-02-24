import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroSearch } from "../hero-search";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("HeroSearch", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the search heading", () => {
    render(<HeroSearch />);
    expect(screen.getByText("Buy & Sell Surplus Building Materials")).toBeInTheDocument();
  });

  it("renders keyword input", () => {
    render(<HeroSearch />);
    expect(screen.getByLabelText("Search keywords")).toBeInTheDocument();
  });

  it("renders location input", () => {
    render(<HeroSearch />);
    expect(screen.getByLabelText("Location")).toBeInTheDocument();
  });

  it("renders distance dropdown", () => {
    render(<HeroSearch />);
    expect(screen.getByLabelText("Search distance")).toBeInTheDocument();
  });

  it("renders search button", () => {
    render(<HeroSearch />);
    expect(screen.getByRole("button", { name: "Search marketplace" })).toBeInTheDocument();
  });

  it("navigates to marketplace on search click", () => {
    render(<HeroSearch />);

    const keywordInput = screen.getByLabelText("Search keywords");
    fireEvent.change(keywordInput, { target: { value: "bricks" } });

    const searchButton = screen.getByRole("button", { name: "Search marketplace" });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/marketplace?keyword=bricks");
  });

  it("navigates on Enter key press", () => {
    render(<HeroSearch />);

    const keywordInput = screen.getByLabelText("Search keywords");
    fireEvent.change(keywordInput, { target: { value: "timber" } });
    fireEvent.keyDown(keywordInput, { key: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/marketplace?keyword=timber");
  });

  it("includes location and distance in search params", () => {
    render(<HeroSearch />);

    const keywordInput = screen.getByLabelText("Search keywords");
    const locationInput = screen.getByLabelText("Location");
    const distanceSelect = screen.getByLabelText("Search distance");

    fireEvent.change(keywordInput, { target: { value: "pipes" } });
    fireEvent.change(locationInput, { target: { value: "London" } });
    fireEvent.change(distanceSelect, { target: { value: "25" } });

    const searchButton = screen.getByRole("button", { name: "Search marketplace" });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/marketplace?keyword=pipes&location=London&distance=25");
  });

  it("navigates to marketplace with no params for empty search", () => {
    render(<HeroSearch />);

    const searchButton = screen.getByRole("button", { name: "Search marketplace" });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/marketplace");
  });

  it("does not include distance param when set to 100+", () => {
    render(<HeroSearch />);

    const locationInput = screen.getByLabelText("Location");
    fireEvent.change(locationInput, { target: { value: "Manchester" } });

    const searchButton = screen.getByRole("button", { name: "Search marketplace" });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith("/marketplace?location=Manchester");
  });
});
