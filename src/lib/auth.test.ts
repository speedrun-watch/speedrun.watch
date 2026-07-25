// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { logout, isTokenValid, getToken } from "./auth";

beforeEach(() => localStorage.clear());
afterEach(() => vi.useRealTimers());

describe("isTokenValid", () => {
  it("returns false when there is no stored exp", () => {
    expect(isTokenValid()).toBe(false);
  });

  it("treats a seconds-epoch exp in the future as valid", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const inOneHourSeconds = Math.floor(Date.parse("2026-01-01T01:00:00Z") / 1000);
    localStorage.setItem("exp", String(inOneHourSeconds));
    expect(isTokenValid()).toBe(true);
  });

  it("treats a seconds-epoch exp in the past as invalid", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const oneHourAgoSeconds = Math.floor(Date.parse("2025-12-31T23:00:00Z") / 1000);
    localStorage.setItem("exp", String(oneHourAgoSeconds));
    expect(isTokenValid()).toBe(false);
  });

  it("also accepts an exp already stored in milliseconds (>= 1e11)", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
    const inOneHourMs = Date.parse("2026-01-01T01:00:00Z"); // ~1.7e12 → left as ms
    localStorage.setItem("exp", String(inOneHourMs));
    expect(isTokenValid()).toBe(true);
  });
});

describe("getToken", () => {
  it("returns the stored jwt or null", () => {
    expect(getToken()).toBeNull();
    localStorage.setItem("jwt", "tok");
    expect(getToken()).toBe("tok");
  });
});

describe("logout", () => {
  it("clears jwt, user and exp", () => {
    localStorage.setItem("jwt", "tok");
    localStorage.setItem("user", "{}");
    localStorage.setItem("exp", "123");
    logout();
    expect(localStorage.getItem("jwt")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();
    expect(localStorage.getItem("exp")).toBeNull();
  });
});
