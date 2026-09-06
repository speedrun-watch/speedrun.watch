import { Link } from "react-router-dom";
import {
  Bell,
  ArrowLeft,
  Search,
  ListChecks,
  HelpCircle,
  SlidersHorizontal,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import GuideJsonLd from "@/components/GuideJsonLd";
import { getDiscordBotInviteUrl } from "@/lib/discord";

const TITLE = "Slash commands: /run-search, /mapping, /help | speedrun.watch";
const DESCRIPTION =
  "Use speedrun.watch slash commands in Discord. Look up runs with /run-search, see what a channel tracks with /mapping, and get help with /help. Works right away, no setup.";
const URL = "https://speedrun.watch/guides/commands";

const COMMANDS = [
  {
    Icon: Search,
    name: "/run-search",
    body: "Look up speedruns for a game without leaving Discord. Filter by category, subcategory, platform, or a single runner, and sort by the top of the leaderboard or the most recent runs.",
  },
  {
    Icon: ListChecks,
    name: "/mapping",
    body: "Show which speedrun.com games are being tracked in the current channel. Handy for checking what a channel is set up to notify.",
  },
  {
    Icon: HelpCircle,
    name: "/help",
    body: "List the available commands and a short note on how to use speedrun.watch.",
  },
];

const SEARCH_STEPS = [
  {
    Icon: Search,
    title: "Type /run-search",
    body: "Start typing /run-search in any channel where the bot is present. Discord shows the command and its options.",
  },
  {
    Icon: SlidersHorizontal,
    title: "Pick a game, then narrow it down",
    body: "Choose a game first. Then, if you want, add a category, subcategory, platform, or runner. Each option suggests real values from speedrun.com as you type.",
  },
  {
    Icon: Zap,
    title: "Get the runs",
    body: "Press enter and the matching runs come back in the channel, with times and links. Sort by Top for the leaderboard, or Most recent for the latest runs.",
  },
];

const ADMIN_STEPS = [
  "Make sure speedrun.watch is in your server. The commands come with it.",
  "Type / in a channel and look for the speedrun.watch commands. They show up for everyone who can use slash commands.",
  "If you do not see them, re-invite the bot so Discord refreshes its commands, then try again.",
];

const FAQ = [
  {
    q: "Do I need to turn the commands on?",
    a: "No. They come with the bot. As soon as speedrun.watch is in your server, /run-search, /mapping, and /help are available.",
  },
  {
    q: "The bot runs on Lambda and is not always online. Do commands still work?",
    a: "Yes. Slash commands do not need a bot that stays connected. Discord sends each command straight to speedrun.watch over HTTPS and shows the reply. It answers in a second or two.",
  },
  {
    q: "Who can use them?",
    a: "Anyone in the server who is allowed to use slash commands. You can control that per command in Discord's Server Settings under Integrations.",
  },
  {
    q: "The commands do not show up. What now?",
    a: "Re-invite the bot to your server so Discord refreshes its command list. New commands can also take up to about an hour to appear the first time.",
  },
  {
    q: "Does /run-search need the game to be tracked in the channel?",
    a: "No. /run-search works for any game on speedrun.com, whether or not the channel tracks it. /mapping is the one that shows what the channel tracks.",
  },
];

const GuideCommands = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-white flex flex-col">
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        url={URL}
        type="article"
      />
      <GuideJsonLd
        headline="Slash commands: /run-search, /mapping, /help"
        description={DESCRIPTION}
        url={URL}
        breadcrumbName="Slash commands"
        faq={FAQ}
      />

      <header className="bg-discord-dark py-4 border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Bell className="w-6 h-6 text-discord-blurple" />
            <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
              speedrun.watch
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto py-8">
          <Link to="/guides">
            <Button variant="ghost" className="mb-6 hover:bg-discord-dark/50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              All guides
            </Button>
          </Link>

          <article className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-wider text-discord-blurple mb-3">Guide</p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Slash commands</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-3">
              Look up runs and check your setup straight from Discord.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              speedrun.watch adds a few slash commands to your server. The main one is{" "}
              <span className="font-mono text-gray-200">/run-search</span>, which finds speedruns for
              any game without leaving Discord.
            </p>

            <h2 className="text-2xl font-semibold mb-5">The commands</h2>
            <div className="space-y-3 mb-12">
              {COMMANDS.map(({ Icon, name, body }) => (
                <div key={name} className="bg-discord-dark rounded-lg p-5 flex gap-4">
                  <span className="w-9 h-9 rounded-lg bg-discord-blurple/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-discord-blurple" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-mono font-semibold text-white mb-1">{name}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-5">Using /run-search</h2>
            <ol className="space-y-3 mb-6">
              {SEARCH_STEPS.map(({ Icon, title, body }, i) => (
                <li key={title} className="bg-discord-dark rounded-lg p-5 flex gap-4">
                  <span className="w-9 h-9 rounded-full bg-discord-blurple text-white font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-white flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-discord-blurple" aria-hidden="true" />
                      {title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="bg-discord-blurple/10 border border-discord-blurple/25 rounded-lg p-5 mb-12 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-discord-blurple shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-gray-200 leading-relaxed">
                <span className="font-semibold">The filters are optional.</span> Pick only a game and
                you get the whole leaderboard. Add a category, platform, or runner to narrow it down.
                Leave an option out and it just does not restrict the search.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-5">For admins: getting the commands</h2>
            <ol className="space-y-2 mb-4">
              {ADMIN_STEPS.map((text, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-discord-blurple text-white text-sm font-bold flex items-center justify-center shrink-0 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-gray-300 leading-relaxed pt-0.5">{text}</span>
                </li>
              ))}
            </ol>
            <p className="text-sm text-gray-500 leading-relaxed mb-12">
              There is nothing to switch on. The commands run over Discord's HTTPS interactions, so
              they work even though the bot is not kept online.
            </p>

            <h2 className="text-2xl font-semibold mb-5">FAQ</h2>
            <div className="space-y-4 mb-12">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-discord-dark rounded-lg p-5">
                  <h3 className="font-semibold text-white mb-1">{q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-12">
              Related:{" "}
              <Link to="/guides/personal-feed" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                personal runner feed
              </Link>{" "}
              &middot;{" "}
              <Link to="/guides/runner-role" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                the Runner role
              </Link>{" "}
              &middot;{" "}
              <Link to="/guides" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
                all guides
              </Link>
            </p>

            <div className="bg-discord-dark rounded-lg p-6 sm:p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Add speedrun.watch to your server</h2>
              <p className="text-gray-400 mb-5 max-w-md mx-auto">
                It is free. The slash commands come with it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={getDiscordBotInviteUrl()} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white w-full sm:w-auto">
                    Add to Discord
                  </Button>
                </a>
                <Link to="/dashboard">
                  <Button variant="outline" className="bg-transparent text-gray-100 border-gray-600 hover:bg-discord-darker hover:text-white w-full sm:w-auto">
                    Open dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuideCommands;
