import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, Loader2, ExternalLink } from "lucide-react";
import api from "@/lib/api";
import { getDiscordBotInviteUrl } from "@/lib/discord";

interface GuildRole {
  id: string;
  name: string;
  position: number;
  color: number;
}

interface RunnerRoleCardProps {
  selectedGuildId: string;
}

// Self-contained guild-settings card for the Runner-role auto-assign feature.
// Fetches the guild's current setting + assignable roles, then lets an admin
// pick the role that linked speedrunners are granted when their run is posted
// in this server. Warns about the two ways assignment can fail: a role that
// sits above the bot in the hierarchy (pre-check), and a missing Manage Roles
// permission (surfaced from the failure signal the bot records at runtime).
const RunnerRoleCard = ({ selectedGuildId }: RunnerRoleCardProps) => {
  const [roles, setRoles] = useState<GuildRole[]>([]);
  const [botRolePosition, setBotRolePosition] = useState<number | null>(null);
  const [runnerRoleId, setRunnerRoleId] = useState<string | null>(null);
  const [runnerRoleErrorAt, setRunnerRoleErrorAt] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rolesError, setRolesError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!selectedGuildId) return;
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      setRolesError(false);
      try {
        const [settings, rolesResp] = await Promise.all([
          api.get<{
            runnerRoleId: string | null;
            runnerRoleErrorAt: string | null;
          }>(`/api/guilds/${selectedGuildId}/settings`),
          api
            .get<{ roles: GuildRole[]; botRolePosition: number | null }>(
              `/api/guilds/${selectedGuildId}/roles`,
            )
            .catch(() => null),
        ]);
        if (cancelled) return;
        setRunnerRoleId(settings.data.runnerRoleId);
        setEnabled(!!settings.data.runnerRoleId);
        setRunnerRoleErrorAt(settings.data.runnerRoleErrorAt);
        if (rolesResp) {
          setRoles(rolesResp.data.roles || []);
          setBotRolePosition(rolesResp.data.botRolePosition);
        } else {
          setRolesError(true);
        }
      } catch (error) {
        console.error("Error loading runner-role settings:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [selectedGuildId]);

  const save = async (nextRoleId: string | null) => {
    const prevRoleId = runnerRoleId;
    setRunnerRoleId(nextRoleId); // optimistic
    setIsSaving(true);
    try {
      await api.patch(`/api/guilds/${selectedGuildId}/settings`, {
        runnerRoleId: nextRoleId,
      });
      // A successful save clears any stale failure signal server-side.
      setRunnerRoleErrorAt(null);
    } catch (error) {
      console.error("Error saving runner role:", error);
      setRunnerRoleId(prevRoleId); // revert
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggle = (next: boolean) => {
    setEnabled(next);
    if (!next) save(null); // opt-out clears the role immediately
    // opting in reveals the picker; nothing is saved until a role is chosen
  };

  const selectedRole = roles.find((r) => r.id === runnerRoleId);
  const hierarchyWarning =
    selectedRole != null &&
    botRolePosition != null &&
    selectedRole.position >= botRolePosition;

  return (
    <div className="bg-discord-dark/50 rounded-lg p-4 mb-6">
      <div className="flex items-start gap-4">
        <div className="flex items-center gap-3 pt-0.5">
          <Switch
            id="runner-role-enabled"
            checked={enabled}
            onCheckedChange={handleToggle}
            disabled={isLoading || isSaving}
          />
          <Label
            htmlFor="runner-role-enabled"
            className="text-sm font-medium text-gray-200 cursor-pointer whitespace-nowrap"
          >
            Runner role
          </Label>
        </div>
        <div className="text-xs text-gray-400 flex-1 leading-relaxed">
          Automatically give a role to members who have linked their
          speedrun.com account, when one of their runs is posted in this server.
          Great for a visible “verified runner” badge.
        </div>
      </div>

      {enabled && (
        <div className="mt-4 pl-1">
          {isLoading ? (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading roles…
            </div>
          ) : rolesError ? (
            <div className="flex items-start gap-2 text-sm text-yellow-500">
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>
                Couldn’t load this server’s roles. Make sure the bot is still in
                the server.
              </span>
            </div>
          ) : (
            <>
              <Select
                value={runnerRoleId ?? undefined}
                onValueChange={(value) => save(value)}
                disabled={isSaving}
              >
                <SelectTrigger className="w-full lg:w-[280px] bg-discord-dark border-gray-600 text-gray-200">
                  <SelectValue placeholder="Choose a role…" />
                </SelectTrigger>
                <SelectContent className="bg-discord-dark border-gray-600">
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      <span className="flex items-center gap-2">
                        <span
                          className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                          style={{
                            backgroundColor: role.color
                              ? `#${role.color.toString(16).padStart(6, "0")}`
                              : "#99aab5",
                          }}
                        />
                        {role.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hierarchyWarning && (
                <div className="mt-3 flex items-start gap-2 text-xs text-yellow-500">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    This role sits above speedrun.watch in the role list, so
                    Discord won’t let the bot assign it. In{" "}
                    <span className="text-gray-200">Server Settings → Roles</span>
                    , drag the <span className="text-gray-200">speedrun.watch</span>{" "}
                    role above <span className="text-gray-200">{selectedRole?.name}</span>.
                  </span>
                </div>
              )}

              {runnerRoleErrorAt && (
                <div className="mt-3 flex items-start gap-2 text-xs text-yellow-500">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>
                    A recent role assignment failed — speedrun.watch is likely
                    missing the <span className="text-gray-200">Manage Roles</span>{" "}
                    permission. Re-invite the bot to grant it, or enable it on the
                    bot’s role in Server Settings.{" "}
                    <a
                      href={getDiscordBotInviteUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-discord-blurple hover:underline"
                    >
                      Re-invite <ExternalLink className="w-3 h-3" />
                    </a>
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RunnerRoleCard;
