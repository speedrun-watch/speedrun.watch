
import { 
  Bell, 
  Server, 
  Gamepad, 
  BellRing,
  UserCircle,
  Settings
} from "lucide-react";

const features = [
  {
    icon: <Server className="w-8 h-8 text-discord-blurple" />,
    title: "Server Configuration",
    description: "Set up which channels receive speedrun notifications"
  },
  {
    icon: <Gamepad className="w-8 h-8 text-discord-green" />,
    title: "Game Selection",
    description: "Choose which speedrun.com games to track in each channel"
  },
  {
    icon: <BellRing className="w-8 h-8 text-discord-yellow" />,
    title: "Custom Notifications",
    description: "Configure notification filters for world records and personal bests"
  },
  {
    icon: <UserCircle className="w-8 h-8 text-discord-fuchsia" />,
    title: "Runner Identity",
    description: "Connect Discord and speedrun.com for proper @mentions"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-16 bg-discord-darker relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Features
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Everything you need to keep your Discord server up-to-date with the latest speedrunning achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-discord-dark/50 p-5 rounded-lg border border-white/5"
            >
              <div className="mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
