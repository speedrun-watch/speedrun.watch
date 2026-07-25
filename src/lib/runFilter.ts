// Pure logic for the dashboard's "how many recent runs match this filter?"
// preview. Kept free of React/DOM so it can be unit-tested directly. These
// functions MIRROR the bot's fan-out gates (see backend/bot/src/helpers.js) so
// the previewed count matches what would actually be posted.

// A recent verified run, reduced to the fields the filters care about.
export interface SrcRunSample {
  category: string | null;
  values: Record<string, string>;
  platform: string | null;
  runners: string[]; // speedrun.com user ids of registered players (guests dropped)
}

// The raw (non-embedded) /runs shape we map from.
export interface RawSrcRun {
  category?: string | null;
  values?: Record<string, string>;
  system?: { platform?: string | null };
  players?: Array<{ id?: string }>;
}

// Reduce a raw speedrun.com run to the sample shape. Guest players (no id) are
// dropped from `runners`, matching the bot's runner filter.
export function mapSrcRunToSample(r: RawSrcRun): SrcRunSample {
  return {
    category: r.category ?? null,
    values: r.values || {},
    platform: r.system?.platform ?? null,
    runners: (r.players || []).map(p => p.id).filter((id): id is string => !!id),
  };
}

export interface RunFilter {
  categoryIds: string[];
  categoryValueFilters: Record<string, Record<string, string[]>>;
  globalValueFilters: Record<string, string[]>;
  platformIds: string[];
  runnerIds: string[];
}

// AND across constrained variables; a run must carry an allowed value for each.
// Mirrors the bot's matchesVariableConstraints.
export function runMatchesVariables(
  runValues: Record<string, string>,
  constraints: Record<string, string[]>,
): boolean {
  for (const [variableId, allowed] of Object.entries(constraints || {})) {
    if (!allowed || allowed.length === 0) continue;
    const value = runValues?.[variableId];
    if (!value || !allowed.includes(value)) return false;
  }
  return true;
}

// Mirror of the bot's fan-out gates (category → per-branch → global → platform
// → runner), so the preview count matches what would actually be posted.
export function runMatchesFilter(run: SrcRunSample, f: RunFilter): boolean {
  if (f.categoryIds.length > 0 && (!run.category || !f.categoryIds.includes(run.category))) {
    return false;
  }
  if (run.category) {
    const branch = f.categoryValueFilters[run.category];
    if (branch && !runMatchesVariables(run.values, branch)) return false;
  }
  if (!runMatchesVariables(run.values, f.globalValueFilters)) return false;
  if (f.platformIds.length > 0 && (!run.platform || !f.platformIds.includes(run.platform))) {
    return false;
  }
  if (f.runnerIds.length > 0 && !run.runners.some(id => f.runnerIds.includes(id))) {
    return false;
  }
  return true;
}
