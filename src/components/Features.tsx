
import { 
  Bell, 
  Gamepad, 
  Trophy,
  Medal,
  Flag,
  Zap,
  FileCheck,
  Search,
  AtSign,
  Tag,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: <Search className="w-10 h-10 text-discord-blurple/80" />,
    title: "Game Selection",
    description: "Search and follow any of the thousands of games available on speedrun.com directly from your Discord server."
  },
  {
    icon: <Bell className="w-10 h-10 text-discord-green/80" />,
    title: "Custom Notifications",
    description: "Configure which events you care about - from new and approved runs to world records and personal bests."
  },
  {
    icon: <Trophy className="w-10 h-10 text-yellow-400/90" />,
    title: "World Records",
    description: "Get notified when a new world record is set for your favorite games and categories."
  },
  {
    icon: <Medal className="w-10 h-10 text-blue-400/90" />,
    title: "Top Performers",
    description: "Track top 2nd, 3rd, and 4th place rankings to see who's climbing the leaderboards."
  },
  {
    icon: <FileCheck className="w-10 h-10 text-green-500/80" />,
    title: "Run Approvals",
    description: "Stay updated when speedruns are submitted and when they get approved by moderators."
  },
  {
    icon: <AtSign className="w-10 h-10 text-discord-fuchsia/70" />,
    title: "Runner Identity",
    description: "Link your speedrun.com profile to your Discord account to get tagged when your runs are mentioned."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-discord-dark to-discord-darker relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-discord-blurple/40 to-discord-fuchsia/40"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-discord-blurple/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-discord-fuchsia/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="inline-block text-2xl md:text-3xl font-bold bg-gradient-to-r from-discord-blurple/90 to-discord-fuchsia/80 bg-clip-text text-transparent mb-3">
            Features
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Everything you need to keep your Discord server updated with the latest speedrunning achievements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm p-5 rounded-lg border border-white/5 transition-transform duration-300 hover:scale-102 hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both"
              }}
            >
              <div className="bg-discord-dark/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
