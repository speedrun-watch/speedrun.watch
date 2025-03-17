
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Gamepad, 
  Settings, 
  LogOut, 
  User,
  Server,
  Home
} from "lucide-react";
import Footer from "@/components/Footer";

// This is a placeholder Dashboard, you'll expand this with actual functionality later
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("games");

  return (
    <div className="min-h-screen bg-discord-darker text-white">
      {/* Header */}
      <header className="bg-discord-dark py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-discord-blurple" />
            <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
              GameNotify
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-discord-blurple flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-300 text-sm hidden md:inline-block">User#1234</span>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 glass rounded-lg p-4">
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "home" 
                    ? "bg-discord-blurple text-white" 
                    : "text-gray-400 hover:text-white hover:bg-discord-dark/50"
                }`}
                onClick={() => setActiveTab("home")}
              >
                <Home className="mr-2 h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "games" 
                    ? "bg-discord-blurple text-white" 
                    : "text-gray-400 hover:text-white hover:bg-discord-dark/50"
                }`}
                onClick={() => setActiveTab("games")}
              >
                <Gamepad className="mr-2 h-5 w-5" />
                Games
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "servers" 
                    ? "bg-discord-blurple text-white" 
                    : "text-gray-400 hover:text-white hover:bg-discord-dark/50"
                }`}
                onClick={() => setActiveTab("servers")}
              >
                <Server className="mr-2 h-5 w-5" />
                Servers
              </Button>
              <Button
                variant="ghost"
                className={`w-full justify-start ${
                  activeTab === "settings" 
                    ? "bg-discord-blurple text-white" 
                    : "text-gray-400 hover:text-white hover:bg-discord-dark/50"
                }`}
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="mr-2 h-5 w-5" />
                Settings
              </Button>
            </nav>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 glass rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">
              {activeTab === "home" && "Dashboard"}
              {activeTab === "games" && "Game Notifications"}
              {activeTab === "servers" && "Connected Servers"}
              {activeTab === "settings" && "Settings"}
            </h1>
            
            <div className="glass border-0 p-12 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Gamepad className="w-16 h-16 text-discord-blurple mx-auto mb-4 opacity-40" />
                <h3 className="text-xl font-semibold mb-2">Dashboard Coming Soon</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  The full dashboard functionality is under development. Check back soon!
                </p>
                <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white">
                  Return to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
