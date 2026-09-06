import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GUIDES } from "@/lib/guides";

// Guides teaser on the landing page. Links home -> guides (SEO) and gives new
// visitors a way into the feature walkthroughs. Cards mirror the /guides index.
const GuidesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Guides</h2>
              <p className="text-gray-400 max-w-xl">
                Short, practical walkthroughs of what speedrun.watch can do.
              </p>
            </div>
            <Link
              to="/guides"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300 shrink-0"
            >
              All guides
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-400">
                  Read guide
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuidesSection;
