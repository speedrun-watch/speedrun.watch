import { Link } from "react-router-dom";
import {
  Bell,
  ArrowLeft,
  Link2,
  Gamepad2,
  ShieldCheck,
  AtSign,
  Zap,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { getDiscordBotInviteUrl } from "@/lib/discord";

const TITLE = "Runner Role: auto-verify speedrunners in Discord | speedrun.watch";
const DESCRIPTION =
  "speedrun.watch can give a Runner role to Discord members who link their speedrun.com account and run the games your server tracks. Verified on speedrun.com, given right away, no manual work.";
const URL = "https://speedrun.watch/guides/runner-role";

const STEPS = [
  {
    Icon: ShieldCheck,
    title: "Turn it on and pick a role",
    body: "In the dashboard, turn on Runner role. Click Create a Runner role, or pick a role you already have.",
  },
  {
    Icon: Link2,
    title: "Members link their account",
    body: "A runner connects their speedrun.com account to Discord. They only do this once.",
  },
  {
    Icon: Gamepad2,
    title: "We check their games",
    body: "speedrun.watch looks up which games they run on speedrun.com.",
  },
  {
    Icon: Zap,
    title: "They get the role",
    body: "If they run a game your server tracks, they get the role. It happens right away, and again on every new run.",
  },
];

const RUNNER_STEPS = [
  {
    Icon: Link2,
    title: "Link your account",
    body: "Open the dashboard and connect your speedrun.com account. This takes a few seconds.",
  },
  {
    Icon: ShieldCheck,
    title: "Get the Runner role",
    body: "You get it in every server you are in that tracks a game you run. No one has to add you.",
  },
  {
    Icon: AtSign,
    title: "Get tagged in your runs",
    body: "When one of your runs is posted, the bot @mentions you in the message.",
  },
];

const ADMIN_STEPS = [
  <>
    Make sure the bot has the Manage Roles permission.{" "}
    <a
      href={getDiscordBotInviteUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1"
    >
      Add or re-invite speedrun.watch
      <ExternalLink className="w-3 h-3" aria-hidden="true" />
    </a>{" "}
    to your server. Older installs need this before the bot can hand out a role.
  </>,
  "In the dashboard, turn on Runner role.",
  "Click Create a Runner role, or pick one you already have.",
  "Done. Runners get the role when they link and when they post.",
];

const FAQ = [
  {
    q: "Does a runner need to be in my server?",
    a: "Yes. The role only works for members of your server. If they are not in the server, they will not get it. Their runs can still show up as notifications.",
  },
  {
    q: "Is it retroactive?",
    a: "Members get the role as soon as they link their account. Everyone is checked again on every new run. You do not have to wait.",
  },
  {
    q: "What data do you use?",
    a: "Only public speedrun.com data, plus the account link the runner sets up. We never see private info.",
  },
  {
    q: "Why is someone not getting the role?",
    a: "Usually one of three things: they have not linked their account, they do not run a game your server tracks, or the bot is missing the Manage Roles permission. The dashboard shows you the permission problem.",
  },
];

const GuideRunnerRole = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-white flex flex-col">
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={URL} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={TITLE} />
      <meta name="twitter:description" content={DESCRIPTION} />

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
            <p className="text-sm font-semibold uppercase tracking-wider text-discord-blurple mb-3">
              Guide
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              The Runner role
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-3">
              Give a Runner role to the real speedrunners in your server.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              Members link their speedrun.com account once. speedrun.watch checks who runs your
              games and gives them the role. You do not add anyone by hand.
            </p>

            {/* How it works */}
            <h2 className="text-2xl font-semibold mb-5">How it works</h2>
            <ol className="space-y-3 mb-6">
              {STEPS.map(({ Icon, title, body }, i) => (
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
                <span className="font-semibold">It is game-verified.</span> The role only goes to
                people who really run your games on speedrun.com. Not everyone who has a
                speedrun.com account.
              </p>
            </div>

            {/* For runners */}
            <h2 className="text-2xl font-semibold mb-5">For runners: link your account</h2>
            <ol className="space-y-3 mb-6">
              {RUNNER_STEPS.map(({ Icon, title, body }, i) => (
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

            <figure className="mb-12">
              <img
                src="/guides/link-account.png"
                alt="The Link speedrun.com Account screen in the speedrun.watch dashboard, where a runner pastes their speedrun.com API key to connect their account. The key is used once and never stored."
                loading="lazy"
                width={1316}
                height={452}
                className="rounded-lg border border-gray-700 w-full shadow-lg"
              />
              <figcaption className="text-xs text-gray-500 mt-2 text-center">
                Link your account from the dashboard. Your API key is used once and never stored.
              </figcaption>
            </figure>

            {/* For admins */}
            <h2 className="text-2xl font-semibold mb-5">For admins: set it up</h2>
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
            <figure className="mb-12">
              <img
                src="/guides/roles-order.png"
                alt="Discord Server Settings roles list showing the speedrun.watch bot role positioned above the Runner role, which is required for the bot to assign it."
                loading="lazy"
                width={2148}
                height={930}
                className="rounded-lg border border-gray-700 w-full shadow-lg"
              />
              <figcaption className="text-xs text-gray-500 mt-2 text-center">
                The speedrun.watch role must sit above the Runner role. The Create a Runner role
                button handles this for you.
              </figcaption>
            </figure>

            {/* FAQ */}
            <h2 className="text-2xl font-semibold mb-5">FAQ</h2>
            <div className="space-y-4 mb-12">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="bg-discord-dark rounded-lg p-5">
                  <h3 className="font-semibold text-white mb-1">{q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-discord-dark rounded-lg p-6 sm:p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Add speedrun.watch to your server</h2>
              <p className="text-gray-400 mb-5 max-w-md mx-auto">
                It is free. The Runner role is one of many things it does.
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

export default GuideRunnerRole;
