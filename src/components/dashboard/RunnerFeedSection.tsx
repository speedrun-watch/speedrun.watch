import { useState, useEffect, useRef } from "react";
import { X, Loader2, Search, UserPlus, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

interface FeedRunner {
  srcRunnerId: string;
  srcUsername: string | null;
}
interface SearchResult {
  id: string;
  name: string;
  weblink?: string;
}
interface RunnerFeedSectionProps {
  guildId: string;
  channelId: string;
}

// Channel-level config: this channel receives every new verified run by the
// listed runners, from ANY game (the polling service fetches them). Self-managed
// via the /runner-feeds endpoints, mirroring the RunnerRoleCard pattern.
const RunnerFeedSection = ({ guildId, channelId }: RunnerFeedSectionProps) => {
  const [runners, setRunners] = useState<FeedRunner[]>([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await api.get<{ runners: FeedRunner[] }>(
          `/api/guilds/${guildId}/channels/${channelId}/runner-feeds`,
        );
        if (!cancelled) setRunners(res.data.runners || []);
      } catch (e) {
        console.error("Error loading runner feeds:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [guildId, channelId]);

  useEffect(() => {
    if (debounce.current) clearTimeout(debounce.current);
    const q = term.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setSearching(true);
    debounce.current = setTimeout(async () => {
      try {
        const res = await api.get<{ runners: SearchResult[] }>(
          `/api/search/runners/${encodeURIComponent(q)}`,
        );
        setResults(res.data.runners || []);
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
  }, [term]);

  const addRunner = async (r: SearchResult) => {
    if (runners.some((x) => x.srcRunnerId === r.id)) {
      setTerm("");
      setResults([]);
      return;
    }
    setBusyId(r.id);
    try {
      await api.post(`/api/guilds/${guildId}/channels/${channelId}/runner-feeds`, { runnerId: r.id });
      setRunners((prev) => [...prev, { srcRunnerId: r.id, srcUsername: r.name }]);
      setTerm("");
      setResults([]);
    } catch (e) {
      console.error("Error adding runner feed:", e);
    } finally {
      setBusyId(null);
    }
  };

  const removeRunner = async (srcRunnerId: string) => {
    setBusyId(srcRunnerId);
    try {
      await api.delete(`/api/guilds/${guildId}/channels/${channelId}/runner-feeds/${srcRunnerId}`);
      setRunners((prev) => prev.filter((x) => x.srcRunnerId !== srcRunnerId));
    } catch (e) {
      console.error("Error removing runner feed:", e);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-discord-dark/50 rounded-lg p-4 mt-4">
      <h4 className="text-sm font-semibold text-gray-200 mb-1">Personal runner feed</h4>
      <p className="text-xs text-gray-400 leading-relaxed mb-3">
        This channel receives every new verified run by these runners, from any game — no need to
        track their games separately.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : (
        <>
          {runners.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {runners.map((r) => (
                <span
                  key={r.srcRunnerId}
                  className="inline-flex items-center gap-1.5 bg-discord-blurple/15 text-gray-200 text-sm rounded-full pl-3 pr-1.5 py-1"
                >
                  {r.srcUsername || r.srcRunnerId}
                  <button
                    type="button"
                    onClick={() => removeRunner(r.srcRunnerId)}
                    disabled={busyId === r.srcRunnerId}
                    className="rounded-full hover:bg-white/10 p-0.5 disabled:opacity-50"
                    aria-label={`Remove ${r.srcUsername || r.srcRunnerId}`}
                  >
                    {busyId === r.srcRunnerId ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-500 shrink-0" />
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search a speedrun.com runner to add…"
                className="bg-discord-dark border-gray-600 text-white placeholder:text-gray-500"
              />
              {searching && <Loader2 className="w-4 h-4 animate-spin text-gray-500 shrink-0" />}
            </div>

            {results.length > 0 && (
              <div className="mt-2 bg-discord-dark border border-gray-600 rounded-md overflow-hidden">
                {results.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => addRunner(r)}
                    disabled={busyId === r.id}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-200 hover:bg-discord-darker disabled:opacity-50 text-left"
                  >
                    <span className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4 text-discord-blurple" />
                      {r.name}
                    </span>
                    {r.weblink && (
                      <a
                        href={r.weblink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-400 hover:text-blue-300"
                        aria-label="View profile"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default RunnerFeedSection;
