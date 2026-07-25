// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock the auth helpers the interceptors depend on.
const getToken = vi.fn();
const logout = vi.fn();
vi.mock("./auth", () => ({
  getToken: () => getToken(),
  logout: () => logout(),
}));

import api from "./api";

// The interceptor handlers axios registered, reached directly so we can drive
// the request/response paths without a live HTTP call.
type Handler = { fulfilled: (v: unknown) => unknown; rejected: (e: unknown) => unknown };
const requestHandler = () => (api.interceptors.request as unknown as { handlers: Handler[] }).handlers[0];
const responseHandler = () => (api.interceptors.response as unknown as { handlers: Handler[] }).handlers[0];

beforeEach(() => {
  getToken.mockReset();
  logout.mockReset();
  // Stub navigation so the 401 redirect doesn't try to navigate jsdom.
  Object.defineProperty(window, "location", { value: { href: "" }, writable: true });
});

describe("request interceptor", () => {
  it("attaches a Bearer token when one is stored", () => {
    getToken.mockReturnValue("tok123");
    const config = requestHandler().fulfilled({ headers: {} }) as { headers: Record<string, string> };
    expect(config.headers.Authorization).toBe("Bearer tok123");
  });

  it("leaves the request unauthenticated when there is no token", () => {
    getToken.mockReturnValue(null);
    const config = requestHandler().fulfilled({ headers: {} }) as { headers: Record<string, string> };
    expect(config.headers.Authorization).toBeUndefined();
  });
});

describe("response interceptor", () => {
  it("logs out and redirects to login on a 401", async () => {
    const err = { response: { status: 401 } };
    await expect(responseHandler().rejected(err)).rejects.toBe(err);
    expect(logout).toHaveBeenCalledTimes(1);
    expect(window.location.href).toBe("/login?error=auth_failed");
  });

  it("does not log out on a non-401 error", async () => {
    const err = { response: { status: 500 } };
    await expect(responseHandler().rejected(err)).rejects.toBe(err);
    expect(logout).not.toHaveBeenCalled();
    expect(window.location.href).toBe("");
  });

  it("passes successful responses through untouched", () => {
    const res = { data: 1 };
    expect(responseHandler().fulfilled(res)).toBe(res);
  });
});
