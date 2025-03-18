
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  PlusCircle, 
  Settings, 
  Gamepad, 
  BellRing, 
  MessageSquare,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add Bot to Server",
    description: "Invite GameNotify Bot to your Discord server with just a few clicks, no coding required.",
    icon: <PlusCircle className="w-6 h-6 text-discord-blurple" />,
    buttonText: "Add to Discord",
    buttonIcon: <MessageSquare className="w-4 h-4" />
  },
  {
    number: "02",
    title: "Configure Settings",
    description: "Set up which channels should receive notifications and configure basic preferences.",
    icon: <Settings className="w-6 h-6 text-discord-green" />,
    buttonText: "View Setup Guide",
    buttonIcon: <ArrowRight className="w-4 h-4" />
  },
  {
    number: "03",
    title: "Select Games",
    description: "Choose which games you want to track from our extensive library of supported games.",
    icon: <Gamepad className="w-6 h-6 text-discord-yellow" />,
    buttonText: "Browse Games",
    buttonIcon: <ArrowRight className="w-4 h-4" />
  },
  {
    number: "04",
    title: "Customize Notifications",
    description: "Fine-tune which events trigger notifications for each game and channel.",
    icon: <BellRing className="w-6 h-6 text-discord-fuchsia" />,
    buttonText: "Notification Settings",
    buttonIcon: <ArrowRight className="w-4 h-4" />
  }
];

const Setup = () => {
  return (
    <section id="setup" className="py-20 bg-discord-darker relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiM1ODY1RjIiIG9wYWNpdHk9IjAuMDMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-40"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="inline-block text-3xl md:text-4xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent mb-4">
            Easy Setup in Minutes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get your server set up with game notifications in just a few simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="glass border-0 overflow-hidden bg-discord-dark/50 shadow-xl"
            >
              <div className="relative p-6">
                <div className="absolute top-0 right-0 bg-discord-blurple/80 px-3 py-1 rounded-bl-lg text-white font-mono font-bold">
                  {step.number}
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="bg-discord-darker/80 w-12 h-12 rounded-lg flex items-center justify-center mr-4 border border-discord-blurple/20">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                </div>
                
                <p className="text-gray-200 mb-6 min-h-[80px]">{step.description}</p>
                
                <Button
                  variant={index === 0 ? "default" : "outline"} 
                  className={index === 0 
                    ? "w-full bg-discord-blurple hover:bg-discord-blurple/90 text-white" 
                    : "w-full bg-transparent border-discord-blurple/30 text-discord-blurple hover:bg-discord-blurple/10"
                  }
                >
                  {step.buttonIcon && <span className="mr-2">{step.buttonIcon}</span>}
                  {step.buttonText}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 glass p-6 rounded-lg max-w-3xl mx-auto bg-discord-dark/50 shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 text-discord-green mr-2" />
            Already using our bot?
          </h3>
          <p className="text-gray-200 mb-6">
            Login with your Discord account to manage your settings, view game statistics, and customize your notification preferences.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white">
              Login with Discord
            </Button>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Setup;
