import { describe, it, expect } from "vitest";
import {
  mapSrcRunToSample,
  runMatchesFilter,
  type RunFilter,
  type SrcRunSample,
} from "./runFilter";

// Real ids captured from speedrun.com (GoW Category Extensions game j1nej091):
const CAT = "wkp3elw2";
const VAR_A = "yn25z0en";
const VAL_A = "5lmk9x8q";
const VAR_B = "38dmmm08";
const VAL_B = "81p95xgq";
const PLATFORM = "8gej2n93";
const RUNNER = "81ml21p8";
// A genuine 2-player co-op run's ids, and a genuine guest (no id):
const COOP = ["v810225x", "j5273pgj"];

const emptyFilter = (): RunFilter => ({
  categoryIds: [],
  categoryValueFilters: {},
  globalValueFilters: {},
  platformIds: [],
  runnerIds: [],
});

// A realistic sample matching the real GoW CE run above.
const sampleRun = (): SrcRunSample => ({
  category: CAT,
  values: { [VAR_A]: VAL_A, [VAR_B]: VAL_B },
  platform: PLATFORM,
  runners: [RUNNER],
});

describe("mapSrcRunToSample (real SRC run shapes)", () => {
  it("maps a real GoW CE run (category id, values, platform, single runner)", () => {
    const raw = {
      category: CAT,
      values: { [VAR_A]: VAL_A, [VAR_B]: VAL_B },
      system: { platform: PLATFORM },
      players: [{ rel: "user", id: RUNNER }],
    };
    expect(mapSrcRunToSample(raw)).toEqual({
      category: CAT,
      values: { [VAR_A]: VAL_A, [VAR_B]: VAL_B },
      platform: PLATFORM,
      runners: [RUNNER],
    });
  });

  it("keeps both ids for a real co-op run", () => {
    const raw = { players: [{ rel: "user", id: COOP[0] }, { rel: "user", id: COOP[1] }] };
    expect(mapSrcRunToSample(raw).runners).toEqual(COOP);
  });

  it("drops guest players (no id) from runners", () => {
    const raw = { players: [{ rel: "guest", name: "FullRinse" }, { rel: "user", id: RUNNER }] };
    expect(mapSrcRunToSample(raw).runners).toEqual([RUNNER]);
  });

  it("defaults missing fields safely", () => {
    expect(mapSrcRunToSample({})).toEqual({
      category: null,
      values: {},
      platform: null,
      runners: [],
    });
  });
});

describe("runMatchesFilter (mirrors the bot's gates, incl. runner)", () => {
  it("no filters → every run matches", () => {
    expect(runMatchesFilter(sampleRun(), emptyFilter())).toBe(true);
  });

  it("category gate", () => {
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), categoryIds: [CAT] })).toBe(true);
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), categoryIds: ["other"] })).toBe(false);
  });

  it("per-branch subcategory gate: AND across variables, only for the run's own branch", () => {
    // both variables match → passes
    expect(runMatchesFilter(sampleRun(), {
      ...emptyFilter(),
      categoryValueFilters: { [CAT]: { [VAR_A]: [VAL_A], [VAR_B]: [VAL_B] } },
    })).toBe(true);
    // one wrong value → AND fails
    expect(runMatchesFilter(sampleRun(), {
      ...emptyFilter(),
      categoryValueFilters: { [CAT]: { [VAR_A]: [VAL_A], [VAR_B]: ["wrong"] } },
    })).toBe(false);
    // a constraint scoped to a DIFFERENT branch never touches this run
    expect(runMatchesFilter(sampleRun(), {
      ...emptyFilter(),
      categoryValueFilters: { "other-cat": { [VAR_A]: ["wrong"] } },
    })).toBe(true);
  });

  it("global subcategory gate applies regardless of branch", () => {
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), globalValueFilters: { [VAR_A]: [VAL_A] } })).toBe(true);
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), globalValueFilters: { [VAR_A]: ["wrong"] } })).toBe(false);
  });

  it("platform gate", () => {
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), platformIds: [PLATFORM] })).toBe(true);
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), platformIds: ["ps2"] })).toBe(false);
  });

  it("runner gate: solo / co-op OR / multiple runners OR / miss", () => {
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), runnerIds: [RUNNER] })).toBe(true);
    expect(runMatchesFilter(sampleRun(), { ...emptyFilter(), runnerIds: ["nobody"] })).toBe(false);
    // co-op run matches on either member
    const coop = { ...sampleRun(), runners: COOP };
    expect(runMatchesFilter(coop, { ...emptyFilter(), runnerIds: [COOP[1]] })).toBe(true);
    expect(runMatchesFilter(coop, { ...emptyFilter(), runnerIds: ["nobody", COOP[0]] })).toBe(true);
    // guest run (no runners) can never satisfy a runner filter
    const guest = { ...sampleRun(), runners: [] };
    expect(runMatchesFilter(guest, { ...emptyFilter(), runnerIds: [RUNNER] })).toBe(false);
    expect(runMatchesFilter(guest, emptyFilter())).toBe(true);
  });

  it("AND across all axes: every gate must pass; an impossible combo matches nothing", () => {
    const full: RunFilter = {
      categoryIds: [CAT],
      categoryValueFilters: { [CAT]: { [VAR_A]: [VAL_A] } },
      globalValueFilters: {},
      platformIds: [PLATFORM],
      runnerIds: [RUNNER],
    };
    expect(runMatchesFilter(sampleRun(), full)).toBe(true);
    // right runner + right category, but a platform the run never used → excluded
    expect(runMatchesFilter(sampleRun(), { ...full, platformIds: ["ps2-only"] })).toBe(false);
  });
});
