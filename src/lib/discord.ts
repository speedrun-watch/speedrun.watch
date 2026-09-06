const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
const DISCORD_SCOPES = import.meta.env.VITE_DISCORD_SCOPES;

// permissions=268454912 = View Channel (1024) + Send Messages (2048) +
// Embed Links (16384) + Manage Roles (268435456). Manage Roles is needed for
// the Runner-role auto-assign feature; servers invited before it was added keep
// the old bitfield until an admin re-invites or grants the permission manually.
export function getDiscordBotInviteUrl(): string {
  return `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=268454912&integration_type=0&scope=bot+applications.commands`;
}

export function getDiscordOAuthUrl(): string {
  const REDIRECT_URI = encodeURIComponent(FRONTEND_URL + "/login/callback");
  const SCOPES = encodeURIComponent(DISCORD_SCOPES);
  return `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
}
