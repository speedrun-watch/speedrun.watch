
import { 
  Bell, 
  Settings, 
  Server, 
  Users, 
  Gamepad, 
  BellRing,
  MessageSquare,
  UserCircle
} from "lucide-react";

const features = [
  {
    icon: <Server className="w-10 h-10 text-discord-blurple" />,
    title: "Server Configuration",
    description: "Easily set up which channels receive game notifications, with a simple interface for Discord admins."
  },
  {
    icon: <Gamepad className="w-10 h-10 text-discord-green" />,
    title: "Game Selection",
    description: "Choose which games to track and receive notifications for, with support for all major gaming platforms."
  },
  {
    icon: <BellRing className="w-10 h-10 text-discord-yellow" />,
    title: "Custom Notifications",
    description: "Configure which events trigger notifications - from achievements to tournament announcements."
  },
  {
    icon: <UserCircle className="w-10 h-10 text-discord-fuchsia" />,
    title: "Player Identity",
    description: "Connect your Discord account to display your Discord tag in notifications, rather than your in-game name."
  },
  {
    icon: <Settings className="w-10 h-10 text-discord-secondary" />,
    title: "Advanced Settings",
    description: "Fine-tune notification preferences with advanced filtering options for each game and channel."
  },
  {
    icon: <Users className="w-10 h-10 text-discord-red" />,
    title: "Community Integration",
    description: "Engage your community by keeping everyone updated on the latest gaming achievements and events."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-discord-dark to-discord-darker relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-discord-blurple to-discord-fuchsia"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-discord-blurple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-discord-fuchsia/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to keep your Discord server up-to-date with the latest gaming events and achievements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="glass p-6 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-discord-blurple/20"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both"
              }}
            >
              <div className="bg-discord-dark/50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
