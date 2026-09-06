
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Setup from "@/components/Setup";
import CtaSection from "@/components/CtaSection";
import GuidesSection from "@/components/GuidesSection";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const TITLE = "speedrun.watch - Speedrun Discord Bot";
const DESCRIPTION =
  "Free Discord bot that notifies your server about new verified speedruns from speedrun.com. Track world records, top placements, and new runs for any game automatically.";
const URL = "https://speedrun.watch/";

const Index = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      const sections = document.querySelectorAll("section > div > div");
      sections.forEach((section) => {
        observer.observe(section);
      });

      return observer;
    };

    const observer = animateOnScroll();
    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-discord-darker text-white overflow-x-hidden flex flex-col">
      <Seo title={TITLE} description={DESCRIPTION} url={URL} />

      <Navbar />
      <div className="flex-1">
        <Hero />
        <Setup />
        <GuidesSection />
        <CtaSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
