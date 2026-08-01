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
  levelValueFilters: Record<string, Record<string, string[]>>;
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

// Level-variable groups: OR within a group (a run carries only its own
// level's copy of a duplicated single-level variable, so ANY of the group's
// (variableId, valueId) pairs matching passes), AND across groups. A run
// carrying none of a constrained group's variables (e.g. a full-game run) is
// excluded. Mirrors the bot's matchesLevelValueFilter.
export function runMatchesLevelGroups(
  runValues: Record<string, string>,
  groups: Record<string, Record<string, string[]>>,
): boolean {
  for (const group of Object.values(groups || {})) {
    const entries = Object.entries(group || {}).filter(([, allowed]) => allowed && allowed.length > 0);
    if (entries.length === 0) continue;
    const hit = entries.some(([variableId, allowed]) => {
      const value = runValues?.[variableId];
      return !!value && allowed.includes(value);
    });
    if (!hit) return false;
  }
  return true;
}

// Mirror of the bot's fan-out gates (category → per-branch → global → level →
// platform → runner), so the preview count matches what would actually be posted.
export function runMatchesFilter(run: SrcRunSample, f: RunFilter): boolean {
  if (f.categoryIds.length > 0 && (!run.category || !f.categoryIds.includes(run.category))) {
    return false;
  }
  if (run.category) {
    const branch = f.categoryValueFilters[run.category];
    if (branch && !runMatchesVariables(run.values, branch)) return false;
  }
  if (!runMatchesVariables(run.values, f.globalValueFilters)) return false;
  if (!runMatchesLevelGroups(run.values, f.levelValueFilters)) return false;
  if (f.platformIds.length > 0 && (!run.platform || !f.platformIds.includes(run.platform))) {
    return false;
  }
  if (f.runnerIds.length > 0 && !run.runners.some(id => f.runnerIds.includes(id))) {
    return false;
  }
  return true;
}
