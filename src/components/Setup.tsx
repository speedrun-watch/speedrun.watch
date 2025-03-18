
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  PlusCircle, 
  Settings, 
  Gamepad, 
  BellRing
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add Bot to Server",
    description: "Invite speedrun.bot to your Discord server",
    icon: <PlusCircle className="w-5 h-5 text-discord-blurple" />,
    buttonText: "Add to Discord"
  },
  {
    number: "02",
    title: "Configure Settings",
    description: "Set up which channels should receive notifications",
    icon: <Settings className="w-5 h-5 text-discord-green" />,
    buttonText: "View Guide"
  },
  {
    number: "03",
    title: "Select Games",
    description: "Choose which speedrun.com games to track",
    icon: <Gamepad className="w-5 h-5 text-discord-yellow" />,
    buttonText: "Browse Games"
  },
  {
    number: "04",
    title: "Customize Notifications",
    description: "Fine-tune which events trigger notifications",
    icon: <BellRing className="w-5 h-5 text-discord-fuchsia" />,
    buttonText: "Settings"
  }
];

const Setup = () => {
  return (
    <section id="setup" className="py-16 bg-discord-dark relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Easy Setup
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get your server set up with speedrun notifications in just a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-discord-darker border border-white/5 rounded-lg overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center mb-3">
                  <div className="bg-discord-dark w-8 h-8 rounded-md flex items-center justify-center mr-3">
                    {step.icon}
                  </div>
                  <h3 className="text-white font-medium">{step.title}</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{step.description}</p>
                
                <Button
                  variant={index === 0 ? "default" : "outline"} 
                  size="sm"
                  className={index === 0 
                    ? "w-full bg-discord-blurple hover:bg-discord-blurple/90 text-white" 
                    : "w-full bg-transparent border-white/10 text-white hover:bg-white/5"
                  }
                >
                  {step.buttonText}
                  {index !== 0 && <ArrowRight className="ml-1 h-4 w-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Setup;
