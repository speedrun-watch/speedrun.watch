import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bot,
  ExternalLink,
  Check,
  Server,
  ShieldAlert,
  MessageSquare,
} from "lucide-react";
import { getDiscordBotInviteUrl } from "@/lib/discord";

interface AddBotTabProps {
  onGoToDashboard: () => void;
}

const AddBotTab = ({ onGoToDashboard }: AddBotTabProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add speedrun.watch to Discord</h1>

      <div className="space-y-10">
        {/* Step 1 */}
        <div className="glass rounded-lg p-6 relative">
          <div className="absolute -left-3 -top-3 bg-discord-blurple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
          <h2 className="text-2xl font-bold mb-4">Authorize the Bot</h2>
          <p className="mb-5 text-gray-300">
            Click the button below to authorize speedrun.watch with your Discord account. You'll be redirected to Discord's authorization page.
          </p>
          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-discord-blurple hover:bg-discord-blurple/90"
              onClick={() => window.open(getDiscordBotInviteUrl(), '_blank')}
            >
              <Bot className="mr-2 h-5 w-5" />
              Add to Discord
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Step 2 */}
        <div className="glass rounded-lg p-6 relative">
          <div className="absolute -left-3 -top-3 bg-discord-blurple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
          <h2 className="text-2xl font-bold mb-4">Select Your Server</h2>
          <p className="mb-5 text-gray-300">
            Choose which Discord server you want to add the bot to. You need to have <Badge variant="outline" className="ml-1 font-mono">Manage Server</Badge> permissions to add bots.
          </p>
          <div className="bg-discord-dark/50 rounded-lg p-4 mb-5">
            <div className="flex items-center text-sm text-yellow-300">
              <ShieldAlert className="mr-2 h-4 w-4" />
              <p>Only add bots to servers you trust. This bot will have the permissions listed below.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-discord-dark/30 p-3 rounded-md flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-400" />
              <span>Read Messages</span>
            </div>
            <div className="bg-discord-dark/30 p-3 rounded-md flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-400" />
              <span>Send Messages</span>
            </div>
            <div className="bg-discord-dark/30 p-3 rounded-md flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-400" />
              <span>Embed Links</span>
            </div>
            <div className="bg-discord-dark/30 p-3 rounded-md flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-400" />
              <span>Read Message History</span>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="glass rounded-lg p-6 relative">
          <div className="absolute -left-3 -top-3 bg-discord-blurple text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
          <h2 className="text-2xl font-bold mb-4">Set Up Notifications</h2>
          <p className="mb-5 text-gray-300">
            After adding the bot, return to the dashboard to configure which speedrunning events you want to track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="glass p-4 flex-1 flex flex-col items-center">
              <Server className="h-8 w-8 text-discord-blurple mb-2" />
              <h3 className="font-medium">Link Channels</h3>
              <p className="text-sm text-center text-gray-400">Connect channels to specific games</p>
            </div>
            <div className="glass p-4 flex-1 flex flex-col items-center">
              <MessageSquare className="h-8 w-8 text-discord-green mb-2" />
              <h3 className="font-medium">Configure Events</h3>
              <p className="text-sm text-center text-gray-400">Choose which events trigger notifications</p>
            </div>
          </div>
          <div className="mt-6 text-center">
            <Button
              className="bg-discord-blurple hover:bg-discord-blurple/90"
              onClick={onGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-400">
          Need help? Join our <a href="https://discord.gg/6FskUx7qv7" className="text-discord-blurple hover:underline">support server</a>.
        </p>
      </div>
    </div>
  );
};

export default AddBotTab;
