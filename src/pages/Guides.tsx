import { Link } from "react-router-dom";
import { Bell, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";

const TITLE = "Guides - speedrun.watch";
const DESCRIPTION =
  "Guides for speedrun.watch, the free Discord bot for speedrun.com notifications. Learn how features like the automatic Runner role work.";
const URL = "https://speedrun.watch/guides";

// A guide entry drives both the card here and (manually) the prerender route
// list in scripts/prerender.mjs.
const GUIDES = [
  {
    slug: "runner-role",
    title: "The Runner role",
    blurb:
      "Give a Runner role to members who link their speedrun.com account and run the games your server tracks. Verified on speedrun.com, no manual work.",
    Icon: ShieldCheck,
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen bg-discord-darker text-white flex flex-col">
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      <link rel="canonical" href={URL} />
      <meta property="og:type" content="website" />
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
          <Link to="/">
            <Button variant="ghost" className="mb-6 hover:bg-discord-dark/50">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Guides</h1>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Short, practical guides to getting the most out of speedrun.watch.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {GUIDES.map(({ slug, title, blurb, Icon }) => (
                <Link
                  key={slug}
                  to={`/guides/${slug}`}
                  className="group bg-discord-dark rounded-lg p-6 border border-transparent hover:border-discord-blurple/40 transition-colors flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-lg bg-discord-blurple/15 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-discord-blurple" />
                    </span>
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed flex-1">{blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-discord-blurple">
                    Read guide
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Guides;
