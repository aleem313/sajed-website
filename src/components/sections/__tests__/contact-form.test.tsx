import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../contact-form";

// Mock fetch
global.fetch = vi.fn();

// Mock use-toast
vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  it("shows validation errors for empty required fields", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });

  it("submits form data successfully", async () => {
    vi.mocked(global.fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response);

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "John Smith" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Subject"), {
      target: { value: "Question" },
    });
    fireEvent.change(screen.getByLabelText("Message"), {
      target: { value: "I have a question about Enviromate." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });

  it("does not submit the form with invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "John");
    await user.type(screen.getByLabelText("Email"), "not-email");
    await user.type(screen.getByLabelText("Subject"), "Test");
    await user.type(screen.getByLabelText("Message"), "This is a test message.");

    await user.click(screen.getByRole("button", { name: "Send Message" }));

    // With an invalid email, the form should not submit (fetch should not be called)
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
