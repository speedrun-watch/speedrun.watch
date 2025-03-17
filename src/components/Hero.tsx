
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Gamepad, 
  MessageSquare, 
  ChevronDown 
} from "lucide-react";

const Hero = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-24 md:pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[#23272A]">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiM1ODY1RjIiIG9wYWNpdHk9IjAuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-60"></div>
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-discord-blurple/30 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-discord-fuchsia/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 mb-12">
          <div className="inline-block animate-float">
            <div className="flex items-center space-x-2 bg-discord-dark/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Bell className="w-5 h-5 text-discord-green" />
              <span className="text-gray-200 font-medium text-sm">Game Notifications for Discord</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
              Level Up
            </span>{" "}
            Your Discord Server
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Notify your Discord community about game events in real-time. Customizable, 
            easy to set up, and designed for gamers by gamers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
            <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white w-full sm:w-auto px-8 py-6 text-lg" size="lg">
              <MessageSquare className="mr-2 h-5 w-5" />
              Add to Discord
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10 w-full sm:w-auto px-8 py-6 text-lg" 
              size="lg"
              onClick={scrollToFeatures}
            >
              <Gamepad className="mr-2 h-5 w-5" />
              See Features
            </Button>
          </div>
        </div>
        
        {/* Bot Preview */}
        <div className="mt-16 max-w-4xl mx-auto glass rounded-lg overflow-hidden animate-scale-in">
          <div className="bg-discord-dark p-3 flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-gray-300 text-sm">Discord - GameNotify Bot</div>
          </div>
          <div className="p-4 bg-discord-darker text-white">
            <div className="flex items-start mb-6">
              <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center mr-3 flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="bg-discord-dark p-3 rounded-lg">
                <div className="text-discord-green font-medium">GameNotify Bot</div>
                <div className="text-gray-300 mt-1">
                  🎮 <span className="text-discord-blurple font-medium">@CoolGamer123</span> just achieved a new high score in <span className="text-discord-yellow font-medium">Rocket League</span>!
                </div>
                <div className="mt-3 bg-discord-dark/50 p-3 rounded border-l-4 border-discord-yellow">
                  <div className="flex items-center">
                    <Gamepad className="w-4 h-4 text-discord-yellow mr-2" />
                    <span className="text-sm text-gray-200">Score: 1,250 | Rank: Diamond III</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-discord-blurple flex items-center justify-center mr-3 flex-shrink-0">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="bg-discord-dark p-3 rounded-lg">
                <div className="text-discord-green font-medium">GameNotify Bot</div>
                <div className="text-gray-300 mt-1">
                  🏆 Tournament starting in <span className="text-discord-fuchsia font-medium">Valorant</span> - <span className="text-discord-yellow font-medium">15 minutes</span> until registration closes!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce opacity-70">
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
