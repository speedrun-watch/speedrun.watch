import { ShieldCheck, Radio, Terminal, type LucideIcon } from "lucide-react";

// Single source of truth for the guide cards. Consumed by the /guides index
// page and the guides section on the landing page, so both stay in sync when a
// guide is added. New public guides also need a route in App.tsx and an entry
// in scripts/public-routes.mjs (sitemap + prerender).
export interface GuideMeta {
  slug: string;
  title: string;
  blurb: string;
  Icon: LucideIcon;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: "runner-role",
    title: "The Runner role",
    blurb:
      "Give a Runner role to members who link their speedrun.com account and run the games your server tracks. Verified on speedrun.com, no manual work.",
    Icon: ShieldCheck,
  },
  {
    slug: "personal-feed",
    title: "Personal runner feed",
    blurb:
      "Send a runner's new runs to one channel, from any game they play. Great for your own runs or the runners your community follows.",
    Icon: Radio,
  },
  {
    slug: "commands",
    title: "Slash commands",
    blurb:
      "Look up runs with /run-search, check what a channel tracks with /mapping, and get help with /help. They work right away, no setup.",
    Icon: Terminal,
  },
];
