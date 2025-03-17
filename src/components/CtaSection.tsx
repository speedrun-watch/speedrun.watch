
import { Button } from "@/components/ui/button";
import { MessageSquare, Gamepad } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-discord-blurple/20 to-discord-fuchsia/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-discord-blurple to-discord-fuchsia"></div>
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-discord-blurple/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-discord-fuchsia/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Level Up Your Discord Server?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join speedrunning communities using speedrun.bot to keep their members informed about the latest records and achievements.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white py-6 px-8 text-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Add bot to Discord
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10 py-6 px-8 text-lg"
            >
              <Gamepad className="mr-2 h-5 w-5" />
              Browse Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
