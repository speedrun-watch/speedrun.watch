
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Gamepad, 
  MessageSquare, 
  Timer,
  Trophy,
  Flag
} from "lucide-react";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-16 overflow-hidden">
      {/* Background Elements - Simplified */}
      <div className="absolute inset-0 -z-10 bg-discord-darker">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-discord-blurple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-6 mb-10">
          <div className="inline-block">
            <div className="flex items-center space-x-2 bg-discord-dark/80 px-3 py-1.5 rounded-full">
              <Bell className="w-4 h-4 text-discord-blurple" />
              <span className="text-gray-200 text-sm">speedrun.com Notifications</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            <span className="text-discord-blurple">
              Speedrun Alerts
            </span>{" "}
            for Discord
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Notify your Discord community about new speedruns in real-time from speedrun.com
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
            <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white w-full sm:w-auto" size="default">
              <MessageSquare className="mr-2 h-4 w-4" />
              Add bot to Discord
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 text-white hover:bg-white/5 w-full sm:w-auto" 
              size="default"
              onClick={scrollToFeatures}
            >
              <Gamepad className="mr-2 h-4 w-4" />
              See Features
            </Button>
          </div>
        </div>
        
        {/* Bot Preview - Simplified */}
        <div className="mt-12 max-w-3xl mx-auto bg-discord-dark/80 rounded-lg overflow-hidden border border-white/10">
          <div className="bg-discord-darker/80 p-2 flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-1.5"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <div className="ml-3 text-gray-400 text-xs">Discord - speedrun.bot</div>
          </div>
          <div className="p-4 text-white">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center mr-3 flex-shrink-0">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div className="bg-discord-darker p-3 rounded-md">
                <div className="text-discord-green text-sm font-medium">speedrun.bot</div>
                <div className="text-gray-300 mt-1 text-sm">
                  🏆 <span className="text-discord-blurple">@SpeedyRunner</span> just set a new <span className="text-discord-yellow">World Record</span> in <span className="text-discord-fuchsia">Portal</span>!
                </div>
                <div className="mt-2 bg-discord-dark/50 p-2 rounded border-l-2 border-discord-yellow text-xs">
                  <div className="flex flex-col space-y-1.5">
                    <div className="flex items-center">
                      <Trophy className="w-3.5 h-3.5 text-discord-yellow mr-1.5" />
                      <span className="text-gray-200">Category: Out of Bounds</span>
                    </div>
                    <div className="flex items-center">
                      <Timer className="w-3.5 h-3.5 text-discord-green mr-1.5" />
                      <span className="text-gray-200">Time: 7:13.52 (Previous: 7:28.19)</span>
                    </div>
                    <div className="flex items-center">
                      <Flag className="w-3.5 h-3.5 text-discord-blurple mr-1.5" />
                      <span className="text-gray-200">Verified on speedrun.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
