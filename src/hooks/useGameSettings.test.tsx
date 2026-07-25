// @vitest-environment jsdom
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRef } from "react";
import { useGameSettings } from "./useGameSettings";
import type { DiscordChannel } from "@/types/dashboard";

// Mock the app's axios instance and the toast helper. The arrow indirection
// defers the reference so the hoisted vi.mock factory doesn't touch these
// bindings before they're initialised (same pattern as the other frontend test).
const patch = vi.fn();
vi.mock("@/lib/api", () => ({ default: { patch: (...a: unknown[]) => patch(...a) } }));
const toastMock = vi.fn();
vi.mock("@/hooks/use-toast", () => ({ toast: (...a: unknown[]) => toastMock(...a) }));

// A channel with a single tracked game, using the default (empty) filter state.
const makeChannels = (): DiscordChannel[] => [
  {
    id: "chan1",
    name: "general",
    type: 0,
    guild_id: "guild1",
    position: 0,
    parent_id: null,
    games: [
      {
        id: "game1",
        notificationType: "any",
        categoryIds: [],
        categoryValueFilters: {},
        globalValueFilters: {},
        platformIds: [],
        runnerIds: [],
      },
    ],
  } as unknown as DiscordChannel,
];

// Drive the hook with a live `channels` state so setChannels updates are
// observable, mirroring how the Dashboard wires it.
function renderGameSettings(initial: DiscordChannel[]) {
  const state = { channels: initial };
  const setChannels = vi.fn((updater: unknown) => {
    state.channels =
      typeof updater === "function"
        ? (updater as (c: DiscordChannel[]) => DiscordChannel[])(state.channels)
        : (updater as DiscordChannel[]);
  });
  const view = renderHook(() => {
    const guildRef = useRef<string | undefined>("guild1");
    return useGameSettings(guildRef, setChannels as never, state.channels);
  });
  return { view, state, setChannels };
}

const gameOf = (state: { channels: DiscordChannel[] }) => state.channels[0].games![0];

beforeEach(() => {
  vi.useFakeTimers();
  patch.mockReset().mockResolvedValue({});
  toastMock.mockReset();
});
afterEach(() => vi.useRealTimers());

describe("useGameSettings", () => {
  it("optimistically updates channel state immediately, before any request", async () => {
    const { view, state } = renderGameSettings(makeChannels());
    act(() => {
      view.result.current.handleUpdateNotificationSettings("chan1", "game1", "world-records");
    });
    // State reflects the change right away; the debounced save hasn't fired.
    expect(gameOf(state).notificationType).toBe("world-records");
    expect(patch).not.toHaveBeenCalled();
  });

  it("debounces to a single PATCH carrying the latest value after 600ms", async () => {
    const { view } = renderGameSettings(makeChannels());
    act(() => {
      view.result.current.handleUpdateNotificationSettings("chan1", "game1", "top-3");
      view.result.current.handleUpdateNotificationSettings("chan1", "game1", "world-records");
    });
    expect(patch).not.toHaveBeenCalled(); // still within the debounce window

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    expect(patch).toHaveBeenCalledTimes(1);
    const [url, body] = patch.mock.calls[0];
    expect(url).toBe("/api/guilds/guild1/channels/chan1/games/game1/notifications");
    expect((body as { notificationType: string }).notificationType).toBe("world-records");
  });

  it("merges multiple filter fields into one saved payload", async () => {
    const { view } = renderGameSettings(makeChannels());
    act(() => {
      view.result.current.handleUpdateCategoryFilter("chan1", "game1", ["cat1"]);
      view.result.current.handleUpdatePlatformFilter("chan1", "game1", ["p1"]);
      view.result.current.handleUpdateRunnerFilter("chan1", "game1", ["r1"]);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });
    const [, body] = patch.mock.calls[0];
    expect(body).toMatchObject({ categoryIds: ["cat1"], platformIds: ["p1"], runnerIds: ["r1"] });
  });

  it("reverts optimistic state and toasts when the save fails", async () => {
    patch.mockRejectedValue(new Error("network"));
    const { view, state } = renderGameSettings(makeChannels());

    act(() => {
      view.result.current.handleUpdateNotificationSettings("chan1", "game1", "world-records");
    });
    expect(gameOf(state).notificationType).toBe("world-records"); // optimistic

    await act(async () => {
      await vi.advanceTimersByTimeAsync(600);
    });

    // Reverted to the last-confirmed value (the initial "any") and a toast fired.
    expect(gameOf(state).notificationType).toBe("any");
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ variant: "destructive" }),
    );
  });

  it("cleanup clears pending debounce timers so no save fires afterwards", async () => {
    const { view } = renderGameSettings(makeChannels());
    act(() => {
      view.result.current.handleUpdateNotificationSettings("chan1", "game1", "top-3");
      view.result.current.cleanup();
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(patch).not.toHaveBeenCalled();
  });
});
