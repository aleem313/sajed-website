import { describe, it, expect, vi, afterEach } from "vitest";
import { formatRelativeTime, formatDate, formatMemberSince } from "../date";

describe("formatRelativeTime", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "Just now" for less than 60 seconds ago', () => {
    const date = new Date(Date.now() - 30 * 1000);
    expect(formatRelativeTime(date)).toBe("Just now");
  });

  it('returns "1 minute ago" for 60 seconds ago', () => {
    const date = new Date(Date.now() - 60 * 1000);
    expect(formatRelativeTime(date)).toBe("1 minute ago");
  });

  it('returns "5 minutes ago"', () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(date)).toBe("5 minutes ago");
  });

  it('returns "1 hour ago"', () => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    expect(formatRelativeTime(date)).toBe("1 hour ago");
  });

  it('returns "3 hours ago"', () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(date)).toBe("3 hours ago");
  });

  it('returns "1 day ago"', () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date)).toBe("1 day ago");
  });

  it('returns "7 days ago"', () => {
    const date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date)).toBe("7 days ago");
  });

  it("returns formatted date for 30+ days", () => {
    const date = new Date(Date.now() - 45 * 24 * 60 * 60 * 1000);
    const result = formatRelativeTime(date);
    // Should be a formatted date like "11 Jan 2026"
    expect(result).toMatch(/^\d{1,2}\s\w{3}\s\d{4}$/);
  });
});

describe("formatDate", () => {
  it("formats a date as day month year", () => {
    const date = new Date("2026-02-24T00:00:00.000Z");
    expect(formatDate(date)).toBe("24 Feb 2026");
  });

  it("formats single-digit days", () => {
    const date = new Date("2026-01-05T00:00:00.000Z");
    expect(formatDate(date)).toBe("5 Jan 2026");
  });
});

describe("formatMemberSince", () => {
  it('formats as "Member since Month Year"', () => {
    const date = new Date("2026-02-01T00:00:00.000Z");
    expect(formatMemberSince(date)).toBe("Member since February 2026");
  });

  it("handles different months", () => {
    const date = new Date("2025-07-15T00:00:00.000Z");
    expect(formatMemberSince(date)).toBe("Member since July 2025");
  });
});
