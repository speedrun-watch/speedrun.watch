import { Button } from "@/components/ui/button";
import { Bell, Bot } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import AddBotTab from "@/components/dashboard/AddBotTab";

const AddBot = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-discord-darker text-white flex flex-col">
      {/* Header */}
      <header className="bg-discord-dark py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Bell className="w-6 h-6 text-discord-blurple" />
            <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
              speedrun.watch
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button asChild size="sm" variant="outline" className="bg-transparent border-white/10 text-white hover:bg-white/5 font-medium">
              <Link to="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 md:px-6 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-block p-4 bg-discord-dark/50 rounded-full mb-6">
              <Bot className="w-16 h-16 text-discord-blurple" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Add speedrun.watch to Discord</h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Follow these simple steps to bring real-time speedrunning notifications to your Discord server.
            </p>
          </div>

          <AddBotTab onGoToDashboard={() => navigate('/dashboard')} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddBot;
