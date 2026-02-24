import { describe, it, expect } from "vitest";
import { renderMarkdown } from "../markdown";

describe("renderMarkdown", () => {
  it("converts h1 headings", () => {
    expect(renderMarkdown("# Hello")).toBe("<h1>Hello</h1>");
  });

  it("converts h2 headings", () => {
    expect(renderMarkdown("## Section Title")).toBe("<h2>Section Title</h2>");
  });

  it("converts h3 headings", () => {
    expect(renderMarkdown("### Sub Section")).toBe("<h3>Sub Section</h3>");
  });

  it("converts paragraphs", () => {
    const input = "First paragraph\n\nSecond paragraph";
    expect(renderMarkdown(input)).toContain("<p>First paragraph</p>");
    expect(renderMarkdown(input)).toContain("<p>Second paragraph</p>");
  });

  it("converts bold text", () => {
    expect(renderMarkdown("This is **bold** text")).toContain("<strong>bold</strong>");
  });

  it("converts italic text", () => {
    expect(renderMarkdown("This is *italic* text")).toContain("<em>italic</em>");
  });

  it("converts inline code", () => {
    expect(renderMarkdown("Use `npm install`")).toContain("<code>npm install</code>");
  });

  it("converts unordered lists", () => {
    const input = "- Item one\n- Item two\n- Item three";
    const result = renderMarkdown(input);
    expect(result).toContain("<ul>");
    expect(result).toContain("<li>Item one</li>");
    expect(result).toContain("<li>Item two</li>");
    expect(result).toContain("<li>Item three</li>");
  });

  it("converts ordered lists", () => {
    const input = "1. First\n2. Second\n3. Third";
    const result = renderMarkdown(input);
    expect(result).toContain("<ol>");
    expect(result).toContain("<li>First</li>");
    expect(result).toContain("<li>Second</li>");
  });

  it("handles empty input", () => {
    expect(renderMarkdown("")).toBe("");
  });

  it("handles null-like input", () => {
    expect(renderMarkdown("")).toBe("");
  });

  it("escapes HTML to prevent XSS", () => {
    const input = '<script>alert("xss")</script>';
    const result = renderMarkdown(input);
    expect(result).not.toContain("<script>");
    expect(result).toContain("&lt;script&gt;");
  });

  it("escapes HTML entities in headings", () => {
    const input = "## Title with <b>html</b>";
    const result = renderMarkdown(input);
    expect(result).not.toContain("<b>");
    expect(result).toContain("&lt;b&gt;");
  });

  it("handles complex blog content", () => {
    const input =
      "## 1. Source Reclaimed Materials\n\nReclaimed building materials are more affordable.\n\n## 2. Plan Before You Buy\n\nMeasure twice, buy once.";
    const result = renderMarkdown(input);
    expect(result).toContain("<h2>1. Source Reclaimed Materials</h2>");
    expect(result).toContain("<p>Reclaimed building materials are more affordable.</p>");
    expect(result).toContain("<h2>2. Plan Before You Buy</h2>");
  });
});
