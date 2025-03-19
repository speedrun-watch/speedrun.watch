
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Plus, Search, Shield, Trash2, Globe, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock data for guilds and related information
const mockGuilds = [
  { 
    id: "1", 
    name: "Half-Life 2 Speedrunners", 
    icon: "https://i.imgur.com/8b4zyOQ.png", 
    memberCount: 2487, 
    role: "owner", 
    games: ["Half-Life 2", "Half-Life 2: Episode One", "Half-Life 2: Episode Two"],
    isOfficial: true,
    channels: [
      { id: "ch1", name: "general", type: "text" },
      { id: "ch2", name: "announcements", type: "text" },
      { id: "ch3", name: "speedruns", type: "text" },
      { id: "ch4", name: "voice-chat", type: "voice" }
    ],
    roles: [
      { id: "r1", name: "Admin", color: "#ff0000" },
      { id: "r2", name: "Moderator", color: "#00ff00" },
      { id: "r3", name: "Speedrunner", color: "#0000ff" },
      { id: "r4", name: "Verified", color: "#ffff00" }
    ],
    moderators: [
      { id: "u1", name: "Jane Doe", avatar: "https://i.imgur.com/6yCHBsS.png", type: "user" },
      { id: "r2", name: "Moderator", color: "#00ff00", type: "role" }
    ],
    owner: { id: "u1", name: "Jane Doe", avatar: "https://i.imgur.com/6yCHBsS.png" }
  },
  { 
    id: "2", 
    name: "Minecraft Any%", 
    icon: "https://i.imgur.com/qgg0Z9i.png", 
    memberCount: 5623, 
    role: "moderator", 
    games: ["Minecraft", "Minecraft Dungeons"],
    channels: [
      { id: "ch1", name: "general", type: "text" },
      { id: "ch2", name: "announcements", type: "text" },
      { id: "ch3", name: "speedruns", type: "text" },
    ],
    roles: [
      { id: "r1", name: "Admin", color: "#ff0000" },
      { id: "r2", name: "Moderator", color: "#00ff00" },
      { id: "r3", name: "Speedrunner", color: "#0000ff" },
    ],
    moderators: [
      { id: "u2", name: "John Smith", avatar: "https://i.imgur.com/UQrQSAI.png", type: "user" },
      { id: "u1", name: "Jane Doe", avatar: "https://i.imgur.com/6yCHBsS.png", type: "user" },
      { id: "r2", name: "Moderator", color: "#00ff00", type: "role" }
    ],
    owner: { id: "u2", name: "John Smith", avatar: "https://i.imgur.com/UQrQSAI.png" }
  },
  { 
    id: "4", 
    name: "Portal Runners", 
    icon: "https://i.imgur.com/mQxxuD6.png", 
    memberCount: 1854, 
    role: "member", 
    games: ["Portal", "Portal 2"],
    channels: [
      { id: "ch1", name: "general", type: "text" },
      { id: "ch2", name: "announcements", type: "text" },
    ],
    roles: [
      { id: "r1", name: "Admin", color: "#ff0000" },
      { id: "r2", name: "Moderator", color: "#00ff00" },
    ],
    owner: { id: "u3", name: "Alex Johnson", avatar: "https://i.imgur.com/dxjHhRi.png" }
  }
];

const GuildDetail = () => {
  const { guildId } = useParams<{ guildId: string }>();
  const guild = mockGuilds.find(g => g.id === guildId);
  
  const [selectedTab, setSelectedTab] = useState("overview");
  const [newModerator, setNewModerator] = useState("");
  const [moderatorType, setModeratorType] = useState("user");

  if (!guild) {
    return (
      <DashboardLayout>
        <div className="flex-1 p-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Guild not found. Please select a valid guild from the sidebar.
            </AlertDescription>
          </Alert>
        </div>
      </DashboardLayout>
    );
  }

  const isReadOnly = guild.role === "member";
  const isOwner = guild.role === "owner";

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={guild.icon} alt={guild.name} />
            <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl font-bold tracking-tight">{guild.name}</h1>
              {guild.isOfficial && (
                <Globe className="ml-2 h-5 w-5 text-primary" title="Official Guild" />
              )}
            </div>
            <div className="text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" /> 
              <span>{guild.memberCount.toLocaleString()} members</span>
            </div>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 lg:w-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="moderators">Moderators</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guild Information</CardTitle>
                <CardDescription>
                  Basic information about the Discord guild.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Guild Name</Label>
                      <Input value={guild.name} readOnly className="mt-1" />
                    </div>
                    <div>
                      <Label>Guild ID</Label>
                      <Input value={guild.id} readOnly className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Owner</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={guild.owner.avatar} alt={guild.owner.name} />
                        <AvatarFallback>{guild.owner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{guild.owner.name}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Official Status</Label>
                    <div className="flex items-center mt-2">
                      <Switch 
                        checked={guild.isOfficial || false} 
                        disabled={!isOwner || !guild.isOfficial} 
                      />
                      <span className="ml-2">
                        {guild.isOfficial 
                          ? "This is an official guild for the game on speedrun.com" 
                          : "Not an official guild"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bot Status</CardTitle>
                <CardDescription>
                  Status of the speedrun.bot in this guild.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                    <span>Bot is active and responding</span>
                  </div>
                  <div>
                    <Label>Added on</Label>
                    <div className="text-sm mt-1">June 15, 2023</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="games" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tracked Games</CardTitle>
                <CardDescription>
                  Games currently being tracked in this guild.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {guild.games.map((game, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>{game}</div>
                    {!isReadOnly && (
                      <Button variant="ghost" size="sm" disabled={isReadOnly}>
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    )}
                  </div>
                ))}
                {!isReadOnly && (
                  <div className="flex gap-2 mt-4">
                    <Input placeholder="Search for games..." />
                    <Button size="sm">
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>
                  Configure which channels receive notifications for each game.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {guild.games.map((game, index) => (
                  <div key={index} className="py-2 border-b last:border-b-0">
                    <Label>{game}</Label>
                    <div className="grid gap-4 mt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`channel-${index}`} className="text-sm">Notification Channel</Label>
                          <Select disabled={isReadOnly} defaultValue="ch3">
                            <SelectTrigger id={`channel-${index}`} className="mt-1">
                              <SelectValue placeholder="Select a channel" />
                            </SelectTrigger>
                            <SelectContent>
                              {guild.channels
                                .filter(ch => ch.type === "text")
                                .map(channel => (
                                  <SelectItem key={channel.id} value={channel.id}>
                                    # {channel.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id={`wr-${index}`} defaultChecked disabled={isReadOnly} />
                          <Label htmlFor={`wr-${index}`}>World Records</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id={`top3-${index}`} defaultChecked disabled={isReadOnly} />
                          <Label htmlFor={`top3-${index}`}>Top 3 Runs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id={`verified-${index}`} defaultChecked disabled={isReadOnly} />
                          <Label htmlFor={`verified-${index}`}>Verified Runs</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id={`submitted-${index}`} disabled={isReadOnly} />
                          <Label htmlFor={`submitted-${index}`}>Submitted Runs</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="moderators" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Guild Moderators</CardTitle>
                <CardDescription>
                  {isReadOnly 
                    ? "Users and roles that have moderator access." 
                    : "Manage users and roles that can configure the bot."}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!isReadOnly && (
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertTitle>Moderator Permissions</AlertTitle>
                    <AlertDescription>
                      Moderators can configure bot settings, add/remove games, and manage notification channels. 
                      They cannot remove the guild owner or the bot from the guild.
                    </AlertDescription>
                  </Alert>
                )}
                
                <div className="space-y-2">
                  <Label className="font-medium">Guild Owner</Label>
                  <div className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={guild.owner.avatar} alt={guild.owner.name} />
                      <AvatarFallback>{guild.owner.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{guild.owner.name}</span>
                  </div>
                </div>
                
                {!isReadOnly && (
                  <>
                    <div className="space-y-2">
                      <Label className="font-medium">Current Moderators</Label>
                      {guild.moderators?.map((mod, index) => (
                        <div 
                          key={index} 
                          className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                        >
                          <div className="flex items-center gap-2">
                            {mod.type === "user" ? (
                              <>
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={mod.avatar} alt={mod.name} />
                                  <AvatarFallback>{mod.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span>{mod.name}</span>
                              </>
                            ) : (
                              <>
                                <div 
                                  className="h-3 w-3 rounded-full mr-1" 
                                  style={{ backgroundColor: mod.color }}
                                ></div>
                                <span>{mod.name} (Role)</span>
                              </>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled={mod.id === guild.owner.id}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-medium">Add New Moderator</Label>
                      <div className="flex items-center gap-2">
                        <Select value={moderatorType} onValueChange={setModeratorType}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="role">Role</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select className="flex-1">
                          <SelectTrigger>
                            <SelectValue placeholder={`Select a ${moderatorType}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {moderatorType === "user" ? (
                              <>
                                <SelectItem value="u3">Alex Johnson</SelectItem>
                                <SelectItem value="u4">Michael Williams</SelectItem>
                              </>
                            ) : (
                              guild.roles.map(role => (
                                <SelectItem key={role.id} value={role.id}>
                                  <div className="flex items-center gap-2">
                                    <div 
                                      className="h-3 w-3 rounded-full" 
                                      style={{ backgroundColor: role.color }}
                                    ></div>
                                    <span>{role.name}</span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <Button>
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GuildDetail;
