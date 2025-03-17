
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  Gamepad, 
  Settings, 
  LogOut, 
  User,
  Server,
  Home,
  Search,
  Shield,
  Users
} from "lucide-react";
import Footer from "@/components/Footer";

// Mock data for guild listings
const mockGuilds = {
  owner: [
    { id: "1", name: "Half-Life Speedrunners", icon: "🔧", memberCount: 350 },
    { id: "2", name: "Super Mario 64 Masters", icon: "🍄", memberCount: 1240 }
  ],
  admin: [
    { id: "3", name: "GTA Speedrun Community", icon: "🚗", memberCount: 870 },
    { id: "4", name: "Worms Armageddon Runners", icon: "🐛", memberCount: 230 }
  ],
  member: [
    { id: "5", name: "Minecraft Any% Guild", icon: "⛏️", memberCount: 1850 },
    { id: "6", name: "Portal Speedrun Hub", icon: "🔵", memberCount: 420 }
  ]
};

// This is a placeholder Dashboard, you'll expand this with actual functionality later
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("guilds");
  const [activeGuildCategory, setActiveGuildCategory] = useState("owner");

  return (
    <div className="min-h-screen bg-discord-darker text-white">
      {/* Header */}
      <header className="bg-discord-dark py-4 border-b border-gray-800">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-discord-blurple" />
            <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
              speedrun.bot
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
                  activeTab === "guilds" 
                    ? "bg-discord-blurple text-white" 
                    : "text-gray-400 hover:text-white hover:bg-discord-dark/50"
                }`}
                onClick={() => setActiveTab("guilds")}
              >
                <Server className="mr-2 h-5 w-5" />
                Discord Guilds
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
            {activeTab === "home" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <div className="glass border-0 p-12 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Gamepad className="w-16 h-16 text-discord-blurple mx-auto mb-4 opacity-40" />
                    <h3 className="text-xl font-semibold mb-2">Welcome to speedrun.bot</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      Manage your Discord guilds and configure speedrun notifications here.
                    </p>
                    <Button 
                      className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                      onClick={() => setActiveTab("guilds")}
                    >
                      <Server className="mr-2 h-4 w-4" />
                      Manage Guilds
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "guilds" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Discord Guilds</h1>
                
                <div className="flex space-x-4 mb-6">
                  <Button 
                    variant={activeGuildCategory === "owner" ? "default" : "outline"}
                    className={activeGuildCategory === "owner" 
                      ? "bg-discord-blurple hover:bg-discord-blurple/90 text-white" 
                      : "bg-transparent text-gray-300 hover:text-white"}
                    onClick={() => setActiveGuildCategory("owner")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Owner ({mockGuilds.owner.length})
                  </Button>
                  <Button 
                    variant={activeGuildCategory === "admin" ? "default" : "outline"}
                    className={activeGuildCategory === "admin" 
                      ? "bg-discord-blurple hover:bg-discord-blurple/90 text-white" 
                      : "bg-transparent text-gray-300 hover:text-white"}
                    onClick={() => setActiveGuildCategory("admin")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin ({mockGuilds.admin.length})
                  </Button>
                  <Button 
                    variant={activeGuildCategory === "member" ? "default" : "outline"}
                    className={activeGuildCategory === "member" 
                      ? "bg-discord-blurple hover:bg-discord-blurple/90 text-white" 
                      : "bg-transparent text-gray-300 hover:text-white"}
                    onClick={() => setActiveGuildCategory("member")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Member ({mockGuilds.member.length})
                  </Button>
                </div>
                
                <div className="mb-6">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search guilds..." 
                      className="bg-discord-dark w-full py-2 px-4 pl-10 rounded-md text-white border border-gray-700 focus:border-discord-blurple focus:outline-none"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockGuilds[activeGuildCategory as keyof typeof mockGuilds].map(guild => (
                    <div key={guild.id} className="bg-discord-dark rounded-lg p-4 hover:bg-discord-dark/80 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-discord-blurple/20 flex items-center justify-center text-2xl">
                          {guild.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{guild.name}</h3>
                          <p className="text-gray-400 text-sm">{guild.memberCount} members</p>
                        </div>
                        <Button size="sm" className="bg-discord-blurple hover:bg-discord-blurple/90 text-white">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Empty state if no guilds */}
                {mockGuilds[activeGuildCategory as keyof typeof mockGuilds].length === 0 && (
                  <div className="text-center p-12">
                    <Server className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No guilds found</h3>
                    <p className="text-gray-400 mb-6">You don't have any Discord guilds in this category.</p>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "games" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Game Tracking</h1>
                <div className="glass border-0 p-12 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Gamepad className="w-16 h-16 text-discord-blurple mx-auto mb-4 opacity-40" />
                    <h3 className="text-xl font-semibold mb-2">Select a Guild First</h3>
                    <p className="text-gray-400 mb-6 max-w-md mx-auto">
                      To configure game tracking, first select a guild from the Discord Guilds section.
                    </p>
                    <Button 
                      className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                      onClick={() => setActiveTab("guilds")}
                    >
                      <Server className="mr-2 h-4 w-4" />
                      Go to Guilds
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="space-y-6">
                  <div className="glass p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">User Settings</h2>
                    <p className="text-gray-300 mb-4">
                      Connect your speedrun.com account to allow the bot to mention you on Discord when your runs are detected.
                    </p>
                    
                    <div className="bg-discord-dark/50 p-4 rounded-md border border-discord-blurple/30 mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 bg-yellow-500/20 rounded p-2">
                          <Bell className="h-5 w-5 text-yellow-400" />
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Privacy Note:</strong> Temporarily pasting your speedrun.com API key will allow the bot to verify your identity and @-mention you on Discord when your runs are detected. Your API key is only used for verification and is not stored on our servers.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          speedrun.com Username
                        </label>
                        <input 
                          type="text" 
                          className="w-full bg-discord-dark border border-gray-700 rounded-md py-2 px-3 text-white focus:border-discord-blurple focus:outline-none"
                          placeholder="Your speedrun.com username"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          speedrun.com API Key (temporary verification only)
                        </label>
                        <input 
                          type="password" 
                          className="w-full bg-discord-dark border border-gray-700 rounded-md py-2 px-3 text-white focus:border-discord-blurple focus:outline-none"
                          placeholder="Paste your API key for verification"
                        />
                        <p className="mt-1 text-sm text-gray-400">
                          Find your API key in your speedrun.com account settings.
                        </p>
                      </div>
                      
                      <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white">
                        Verify Identity
                      </Button>
                    </div>
                  </div>
                  
                  <div className="glass p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-3">Notification Preferences</h2>
                    <p className="text-gray-300 mb-4">
                      Configure your personal notification preferences for the bot.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">New World Records</span>
                        <Button variant="outline" size="sm" className="border-discord-blurple text-discord-blurple hover:bg-discord-blurple hover:text-white">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Personal Best Runs</span>
                        <Button variant="outline" size="sm" className="border-discord-blurple text-discord-blurple hover:bg-discord-blurple hover:text-white">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">All New Runs</span>
                        <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                          Disabled
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
