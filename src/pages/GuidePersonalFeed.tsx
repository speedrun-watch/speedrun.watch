import { Link } from "react-router-dom";
import { Bell, ArrowLeft, UserSearch, Radio, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import GuideJsonLd from "@/components/GuideJsonLd";
import { getDiscordBotInviteUrl } from "@/lib/discord";

const TITLE = "Personal runner feed: a runner's runs from any game | speedrun.watch";
const DESCRIPTION =
  "speedrun.watch can post every new verified run by a runner to a Discord channel, from any game. Set up a personal feed for yourself or any runner in a few clicks.";
const URL = "https://speedrun.watch/guides/personal-feed";

const STEPS = [
  {
    Icon: UserSearch,
    title: "Add a runner to a channel",
    body: "In the dashboard, open a channel and search for a runner by their speedrun.com name.",
  },
  {
    Icon: Radio,
    title: "We watch their runs",
    body: "speedrun.watch checks speedrun.com for that runner's new verified runs, across every game they play.",
  },
  {
    Icon: Send,
    title: "New runs get posted",
    body: "Each new run shows up in your channel with the time and a link. Any game counts.",
  },
];

const ADMIN_STEPS = [
  "Open your server in the dashboard and click a channel.",
  "Under Personal runner feed, search a runner and add them.",
  "Done. Their new runs post in that channel from now on. Add more runners any time.",
];

const FAQ = [
  {
    q: "Does the runner need to do anything?",
    a: "No. You add them by their speedrun.com name. They do not need a speedrun.watch account, and they do not need to be in your server.",
  },
  {
    q: "Which games does it cover?",
    a: "All of them. If the runner gets a verified run in any game on speedrun.com, it shows up. You do not have to track those games separately.",
  },
  {
    q: "Can one channel follow several runners?",
    a: "Yes. Add as many runners as you want to a channel. You can also add the same runner to more than one channel.",
  },
  {
    q: "Is it only their personal bests?",
    a: "Right now it posts all of their new verified runs. A personal-bests-only option may come later.",
  },
  {
    q: "Will it flood my channel with old runs?",
    a: "No. It only posts runs from the moment you add the runner, not their back catalogue.",
  },
];

const GuidePersonalFeed = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-white flex flex-col">
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        url={URL}
        type="article"
        image="https://speedrun.watch/guides/og-personal-feed.png"
        imageHeight={630}
      />
      <GuideJsonLd
        headline="Personal runner feed: a runner's runs from any game"
        description={DESCRIPTION}
        url={URL}
        breadcrumbName="Personal runner feed"
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Personal runner feed</h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-3">
              Send a runner's new runs to one channel, no matter what game they play.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              Pick a runner, and every new verified run they get on speedrun.com shows up in your channel.
              Great for your own runs, the server owner's runs, or a few runners your community follows.
            </p>

            <h2 className="text-2xl font-semibold mb-5">How it works</h2>
            <ol className="space-y-3 mb-12">
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
            <p className="text-sm text-gray-500 leading-relaxed mb-12">
              It works alongside your normal game tracking. A channel can track games and follow runners at
              the same time.
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

            <div className="bg-discord-dark rounded-lg p-6 sm:p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Add speedrun.watch to your server</h2>
              <p className="text-gray-400 mb-5 max-w-md mx-auto">
                It is free. Personal feeds are one of many things it does.
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

export default GuidePersonalFeed;
