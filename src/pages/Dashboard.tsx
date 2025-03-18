
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Bell, 
  Gamepad, 
  Settings, 
  LogOut, 
  User,
  Server,
  Home,
  Shield,
  Users,
  X,
  Plus,
  Clock,
  Link as LinkIcon,
  MessageSquare,
  ArrowLeft
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

// Mock data for channels
const mockChannels = {
  "1": [
    { id: "101", name: "half-life", linkedGames: [
      { id: "g1", name: "Half-Life", lastNotification: "2023-10-12T14:30:00Z" },
      { id: "g2", name: "Half-Life 2", lastNotification: "2023-10-15T09:45:00Z" }
    ]},
    { id: "102", name: "half-life-alyx", linkedGames: [
      { id: "g3", name: "Half-Life: Alyx", lastNotification: "2023-10-14T18:20:00Z" }
    ]},
    { id: "103", name: "black-mesa", linkedGames: [] }
  ],
  "2": [
    { id: "201", name: "sm64-16star", linkedGames: [
      { id: "g4", name: "Super Mario 64", lastNotification: "2023-10-16T11:10:00Z" }
    ]},
    { id: "202", name: "sm64-70star", linkedGames: [
      { id: "g4", name: "Super Mario 64", lastNotification: "2023-10-13T16:40:00Z" }
    ]},
    { id: "203", name: "sm64-120star", linkedGames: [
      { id: "g4", name: "Super Mario 64", lastNotification: "2023-10-10T20:15:00Z" }
    ]}
  ],
  "3": [
    { id: "301", name: "gta-san-andreas", linkedGames: [
      { id: "g5", name: "Grand Theft Auto: San Andreas", lastNotification: "2023-10-11T13:25:00Z" }
    ]},
    { id: "302", name: "gta-vice-city", linkedGames: [
      { id: "g6", name: "Grand Theft Auto: Vice City", lastNotification: "2023-10-09T15:50:00Z" }
    ]}
  ],
  "4": [
    { id: "401", name: "worms-armageddon-strategies", linkedGames: [] },
    { id: "402", name: "worms-speedruns", linkedGames: [
      { id: "g7", name: "Worms Armageddon", lastNotification: "2023-10-08T10:30:00Z" }
    ]}
  ],
  "5": [
    { id: "501", name: "minecraft-any-percent", linkedGames: [
      { id: "g8", name: "Minecraft", lastNotification: "2023-10-17T12:00:00Z" }
    ]}
  ],
  "6": [
    { id: "601", name: "portal-inbounds", linkedGames: [
      { id: "g9", name: "Portal", lastNotification: "2023-10-14T09:20:00Z" }
    ]},
    { id: "602", name: "portal-oob", linkedGames: [
      { id: "g9", name: "Portal", lastNotification: "2023-10-16T17:45:00Z" }
    ]}
  ]
};

// Mock data for games that can be linked
const mockAvailableGames = [
  { id: "g1", name: "Half-Life" },
  { id: "g2", name: "Half-Life 2" },
  { id: "g3", name: "Half-Life: Alyx" },
  { id: "g4", name: "Super Mario 64" },
  { id: "g5", name: "Grand Theft Auto: San Andreas" },
  { id: "g6", name: "Grand Theft Auto: Vice City" },
  { id: "g7", name: "Worms Armageddon" },
  { id: "g8", name: "Minecraft" },
  { id: "g9", name: "Portal" },
  { id: "g10", name: "Portal 2" },
  { id: "g11", name: "Doom" },
  { id: "g12", name: "Doom Eternal" },
  { id: "g13", name: "The Legend of Zelda: Ocarina of Time" },
  { id: "g14", name: "The Legend of Zelda: Breath of the Wild" }
];

// This is a placeholder Dashboard, you'll expand this with actual functionality later
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("guilds");
  const [activeGuildCategory, setActiveGuildCategory] = useState("all");
  const [selectedGuildId, setSelectedGuildId] = useState<string | null>(null);
  const [gameSearchTerm, setGameSearchTerm] = useState("");
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);

  // Combine all guilds for the "all" category
  const allGuilds = [
    ...mockGuilds.owner,
    ...mockGuilds.admin,
    ...mockGuilds.member
  ];

  // Filter games based on search term
  const filteredGames = mockAvailableGames.filter(game => 
    game.name.toLowerCase().includes(gameSearchTerm.toLowerCase())
  );

  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return "Yesterday at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays < 7) {
      return diffInDays + " days ago";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Back to guild selection
  const handleBackToGuilds = () => {
    setSelectedGuildId(null);
    setActiveChannelId(null);
  };

  // Link a game to a channel
  const handleLinkGame = (channelId: string, gameId: string) => {
    console.log(`Linking game ${gameId} to channel ${channelId}`);
    // In a real app, you would update the database here
    setGameSearchTerm("");
    setActiveChannelId(null);
  };

  // Unlink a game from a channel
  const handleUnlinkGame = (channelId: string, gameId: string) => {
    console.log(`Unlinking game ${gameId} from channel ${channelId}`);
    // In a real app, you would update the database here
  };

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
            
            {activeTab === "guilds" && !selectedGuildId && (
              <div>
                <h1 className="text-2xl font-bold mb-6">Discord Guilds</h1>
                
                <Tabs defaultValue={activeGuildCategory} onValueChange={setActiveGuildCategory} className="mb-6">
                  <TabsList className="bg-discord-dark">
                    <TabsTrigger value="all" className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white">
                      All Guilds ({allGuilds.length})
                    </TabsTrigger>
                    <TabsTrigger value="owner" className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white">
                      <Shield className="mr-2 h-4 w-4" />
                      Owner ({mockGuilds.owner.length})
                    </TabsTrigger>
                    <TabsTrigger value="admin" className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin ({mockGuilds.admin.length})
                    </TabsTrigger>
                    <TabsTrigger value="member" className="data-[state=active]:bg-discord-blurple data-[state=active]:text-white">
                      <Users className="mr-2 h-4 w-4" />
                      Member ({mockGuilds.member.length})
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="all" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {allGuilds.map(guild => (
                        <div key={guild.id} className="bg-discord-dark rounded-lg p-4 hover:bg-discord-dark/80 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-discord-blurple/20 flex items-center justify-center text-2xl">
                              {guild.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium truncate">{guild.name}</h3>
                              <p className="text-gray-400 text-sm">{guild.memberCount} members</p>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                              onClick={() => setSelectedGuildId(guild.id)}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                
                  <TabsContent value="owner" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockGuilds.owner.map(guild => (
                        <div key={guild.id} className="bg-discord-dark rounded-lg p-4 hover:bg-discord-dark/80 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-discord-blurple/20 flex items-center justify-center text-2xl">
                              {guild.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium truncate">{guild.name}</h3>
                              <p className="text-gray-400 text-sm">{guild.memberCount} members</p>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                              onClick={() => setSelectedGuildId(guild.id)}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                
                  <TabsContent value="admin" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockGuilds.admin.map(guild => (
                        <div key={guild.id} className="bg-discord-dark rounded-lg p-4 hover:bg-discord-dark/80 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-discord-blurple/20 flex items-center justify-center text-2xl">
                              {guild.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium truncate">{guild.name}</h3>
                              <p className="text-gray-400 text-sm">{guild.memberCount} members</p>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                              onClick={() => setSelectedGuildId(guild.id)}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                
                  <TabsContent value="member" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockGuilds.member.map(guild => (
                        <div key={guild.id} className="bg-discord-dark rounded-lg p-4 hover:bg-discord-dark/80 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-discord-blurple/20 flex items-center justify-center text-2xl">
                              {guild.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-white font-medium truncate">{guild.name}</h3>
                              <p className="text-gray-400 text-sm">{guild.memberCount} members</p>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                              onClick={() => setSelectedGuildId(guild.id)}
                            >
                              Manage
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
            
            {activeTab === "guilds" && selectedGuildId && (
              <div>
                <div className="flex items-center mb-6">
                  <Button 
                    variant="ghost" 
                    className="mr-4 hover:bg-discord-dark/50"
                    onClick={handleBackToGuilds}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  
                  <h1 className="text-2xl font-bold">
                    {allGuilds.find(g => g.id === selectedGuildId)?.name}
                  </h1>
                </div>
                
                <div className="bg-discord-dark rounded-lg p-4 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Channels</h2>
                  <div className="space-y-4">
                    {mockChannels[selectedGuildId as keyof typeof mockChannels]?.map(channel => (
                      <div key={channel.id} className="bg-discord-darker rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-medium flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2 text-discord-blurple" />
                            #{channel.name}
                          </h3>
                          {activeChannelId !== channel.id && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-discord-blurple text-discord-blurple hover:bg-discord-blurple hover:text-white"
                              onClick={() => setActiveChannelId(channel.id)}
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Link Game
                            </Button>
                          )}
                        </div>
                        
                        {activeChannelId === channel.id && (
                          <div className="mb-4 bg-discord-dark/50 p-3 rounded-md">
                            <div className="flex items-center mb-2">
                              <input 
                                type="text" 
                                placeholder="Search speedrun.com games..." 
                                className="bg-discord-darker flex-1 border border-gray-700 rounded-md py-1 px-3 text-white focus:border-discord-blurple focus:outline-none"
                                value={gameSearchTerm}
                                onChange={(e) => setGameSearchTerm(e.target.value)}
                              />
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="ml-2 text-gray-400 hover:text-white"
                                onClick={() => setActiveChannelId(null)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                            {gameSearchTerm && (
                              <div className="max-h-40 overflow-y-auto bg-discord-darker rounded-md mt-2">
                                {filteredGames.length > 0 ? (
                                  filteredGames.map(game => (
                                    <div 
                                      key={game.id} 
                                      className="p-2 hover:bg-discord-dark/70 cursor-pointer text-gray-300 hover:text-white"
                                      onClick={() => handleLinkGame(channel.id, game.id)}
                                    >
                                      {game.name}
                                    </div>
                                  ))
                                ) : (
                                  <div className="p-2 text-gray-400">No games found</div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {channel.linkedGames.length === 0 ? (
                          <p className="text-gray-400 text-sm italic">No games linked to this channel</p>
                        ) : (
                          <div className="space-y-2">
                            {channel.linkedGames.map(game => (
                              <div key={game.id} className="flex items-center justify-between p-2 bg-discord-dark/30 rounded-md">
                                <div className="flex items-center">
                                  <Gamepad className="w-4 h-4 text-discord-green mr-2" />
                                  <span>{game.name}</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center text-xs text-gray-400">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>Last: {formatDate(game.lastNotification)}</span>
                                  </div>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    className="text-gray-400 hover:text-red-500 h-8 w-8 p-0" 
                                    onClick={() => handleUnlinkGame(channel.id, game.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
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
