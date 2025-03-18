
import { Button } from "@/components/ui/button";
import { MessageSquare, Gamepad } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-12 relative bg-discord-dark">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Track Speedruns in Your Discord
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join speedrunning communities using speedrun.bot to keep members informed about the latest records
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button 
              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Add bot to Discord
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/10 text-white hover:bg-white/5"
            >
              <Gamepad className="mr-2 h-4 w-4" />
              Browse Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
