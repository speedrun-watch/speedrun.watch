// @vitest-environment jsdom
import { useState } from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RunnerFilterSection } from "./ChannelList";

// Mock the app's axios instance. Search returns two users; the by-id resolve
// echoes a deterministic name so chip labels are assertable on reload.
const apiGet = vi.fn();
vi.mock("@/lib/api", () => ({ default: { get: (...args: unknown[]) => apiGet(...args) } }));

beforeEach(() => {
  apiGet.mockReset();
  apiGet.mockImplementation((url: string) => {
    if (url.includes("/api/search/runners/")) {
      return Promise.resolve({
        data: {
          runners: [
            { id: "u1", name: "siglemic", weblink: "https://speedrun.com/users/siglemic" },
            { id: "u2", name: "cheese05", weblink: "https://speedrun.com/users/cheese05" },
          ],
        },
      });
    }
    if (url.includes("/api/runners/")) {
      const id = url.split("/api/runners/")[1];
      return Promise.resolve({ data: { runner: { id, name: `name-of-${id}` } } });
    }
    return Promise.resolve({ data: {} });
  });
});

// Stateful wrapper so onChange actually updates runnerIds (the real parent does).
function Harness({ initial = [] as string[] }) {
  const [ids, setIds] = useState<string[]>(initial);
  return <RunnerFilterSection runnerIds={ids} onChange={setIds} />;
}

describe("RunnerFilterSection", () => {
  it("shows no results dropdown until the user types", () => {
    render(<Harness />);
    expect(screen.queryByText("siglemic")).toBeNull();
    expect(apiGet).not.toHaveBeenCalled();
  });

  it("searches (debounced) and adds a runner as a chip", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(screen.getByPlaceholderText(/search a speedrun\.com username/i), "sig");

    // Debounced search result appears, then click it to add.
    const result = await screen.findByText("siglemic");
    await user.click(result);

    // A chip labelled with the added runner is now shown, and the search cleared.
    const chips = await screen.findAllByText("siglemic");
    expect(chips.length).toBeGreaterThan(0);
    const input = screen.getByPlaceholderText(/search a speedrun\.com username/i) as HTMLInputElement;
    expect(input.value).toBe("");
    // The search endpoint was hit (debounced), not the resolve endpoint.
    expect(apiGet.mock.calls.some(([u]) => String(u).includes("/api/search/runners/"))).toBe(true);
  });

  it("resolves names for ids persisted across reload and removes a chip", async () => {
    const user = userEvent.setup();
    render(<Harness initial={["u9"]} />);

    // Name is resolved via /api/runners/:id on mount.
    const chipLabel = await screen.findByText("name-of-u9");
    expect(apiGet.mock.calls.some(([u]) => String(u).includes("/api/runners/u9"))).toBe(true);

    // Remove it via the chip's X button (the label is an inner span; the
    // button is its sibling under the outer chip span).
    const chip = chipLabel.parentElement as HTMLElement;
    await user.click(within(chip).getByRole("button"));
    expect(screen.queryByText("name-of-u9")).toBeNull();
  });

  it("shows a 'No runners found' row when the search returns nothing", async () => {
    apiGet.mockImplementation((url: string) =>
      url.includes("/api/search/runners/")
        ? Promise.resolve({ data: { runners: [] } })
        : Promise.resolve({ data: {} }),
    );
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(screen.getByPlaceholderText(/search a speedrun\.com username/i), "zzzz");
    expect(await screen.findByText(/no runners found/i)).toBeTruthy();
  });

  it("surfaces an error row when the search request fails", async () => {
    apiGet.mockImplementation((url: string) =>
      url.includes("/api/search/runners/")
        ? Promise.reject(new Error("network"))
        : Promise.resolve({ data: {} }),
    );
    const user = userEvent.setup();
    render(<Harness />);
    await user.type(screen.getByPlaceholderText(/search a speedrun\.com username/i), "sig");
    expect(await screen.findByText(/couldn't reach speedrun\.com/i)).toBeTruthy();
  });

  it("ArrowDown highlights results and Enter adds the highlighted one (not the top)", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText(/search a speedrun\.com username/i);
    await user.type(input, "sig");
    await screen.findByText("siglemic"); // [siglemic (u1), cheese05 (u2)]

    // Arrow down to the SECOND result (cheese05), then Enter.
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    // cheese05 was added (as a chip), not the top result siglemic.
    expect(await screen.findByText("cheese05")).toBeTruthy();
    expect(screen.queryByText("siglemic")).toBeNull();
  });

  it("Enter adds the top result", async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const input = screen.getByPlaceholderText(/search a speedrun\.com username/i);
    await user.type(input, "sig");
    await screen.findByText("siglemic"); // results loaded
    await user.type(input, "{Enter}");
    // top result (u1 / siglemic) added as a chip, query cleared
    expect(await screen.findAllByText("siglemic")).toBeTruthy();
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("marks an already-added runner in the results and prevents re-adding it", async () => {
    const user = userEvent.setup();
    render(<Harness initial={["u1"]} />);
    await screen.findByText("name-of-u1"); // chip resolved

    await user.type(screen.getByPlaceholderText(/search a speedrun\.com username/i), "si");
    // u1 (siglemic) is already added → its result row is disabled and labelled "added".
    const added = await screen.findByText("added");
    expect(added).toBeTruthy();
    const disabledRow = added.closest("button") as HTMLButtonElement;
    expect(disabledRow.disabled).toBe(true);
  });
});
