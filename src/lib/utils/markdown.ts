/**
 * Lightweight markdown-to-HTML converter for simple blog content.
 * Supports: headings (##), paragraphs, bold (**), lists, and line breaks.
 * For complex markdown, consider adding a full parser like `marked`.
 */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";

  // Escape HTML to prevent XSS
  const escaped = markdown.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Split into blocks by double newline
  const blocks = escaped.split(/\n\n+/);

  const rendered = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Headings
    if (trimmed.startsWith("### ")) {
      return `<h3>${applyInline(trimmed.slice(4))}</h3>`;
    }
    if (trimmed.startsWith("## ")) {
      return `<h2>${applyInline(trimmed.slice(3))}</h2>`;
    }
    if (trimmed.startsWith("# ")) {
      return `<h1>${applyInline(trimmed.slice(2))}</h1>`;
    }

    // Unordered list (lines starting with - )
    if (/^- /m.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => line.startsWith("- "))
        .map((line) => `<li>${applyInline(line.slice(2))}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    }

    // Ordered list (lines starting with 1. 2. etc.)
    if (/^\d+\. /m.test(trimmed)) {
      const items = trimmed
        .split("\n")
        .filter((line) => /^\d+\. /.test(line))
        .map((line) => `<li>${applyInline(line.replace(/^\d+\.\s*/, ""))}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    }

    // Paragraph
    return `<p>${applyInline(trimmed)}</p>`;
  });

  return rendered.filter(Boolean).join("\n");
}

/** Apply inline formatting: bold, italic, inline code */
function applyInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br />");
}
