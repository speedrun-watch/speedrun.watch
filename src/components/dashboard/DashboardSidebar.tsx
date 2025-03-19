
import { useNavigate, Link } from "react-router-dom";
import { 
  PlusCircle, 
  Shield, 
  ShieldCheck, 
  Users, 
  User, 
  Share, 
  Bot,
  ChevronDown,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Guild {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  role: "owner" | "moderator" | "member";
  games: string[];
  isOfficial?: boolean;
}

// Mock data for guilds
const mockGuilds: Guild[] = [
  { 
    id: "1", 
    name: "Half-Life 2 Speedrunners", 
    icon: "https://i.imgur.com/8b4zyOQ.png", 
    memberCount: 2487, 
    role: "owner", 
    games: ["Half-Life 2", "Half-Life 2: Episode One", "Half-Life 2: Episode Two"],
    isOfficial: true
  },
  { 
    id: "2", 
    name: "Minecraft Any%", 
    icon: "https://i.imgur.com/qgg0Z9i.png", 
    memberCount: 5623, 
    role: "moderator", 
    games: ["Minecraft", "Minecraft Dungeons"] 
  },
  { 
    id: "3", 
    name: "Elden Ring Speedrunning", 
    icon: "https://i.imgur.com/WX8AoGB.png", 
    memberCount: 3192, 
    role: "owner", 
    games: ["Elden Ring"] 
  },
  { 
    id: "4", 
    name: "Portal Runners", 
    icon: "https://i.imgur.com/mQxxuD6.png", 
    memberCount: 1854, 
    role: "member", 
    games: ["Portal", "Portal 2"] 
  },
  { 
    id: "5", 
    name: "Zelda Speedrunners", 
    icon: "https://i.imgur.com/OqEXQiE.png", 
    memberCount: 4265, 
    role: "moderator", 
    games: ["The Legend of Zelda: Breath of the Wild", "The Legend of Zelda: Tears of the Kingdom"] 
  },
  { 
    id: "6", 
    name: "Dark Souls Community", 
    icon: "https://i.imgur.com/1bXWyG8.png", 
    memberCount: 2731, 
    role: "member", 
    games: ["Dark Souls", "Dark Souls II", "Dark Souls III"] 
  },
  { 
    id: "7", 
    name: "Super Mario Odyssey", 
    icon: "https://i.imgur.com/D7JhBVf.png", 
    memberCount: 3517, 
    role: "owner", 
    games: ["Super Mario Odyssey"],
    isOfficial: true
  },
  { 
    id: "8", 
    name: "Hollow Knight Speedruns", 
    icon: "https://i.imgur.com/XUwP1ys.png", 
    memberCount: 1983, 
    role: "moderator", 
    games: ["Hollow Knight"] 
  },
  { 
    id: "9", 
    name: "Celeste Runners", 
    icon: "https://i.imgur.com/l7JqgJ7.png", 
    memberCount: 2145, 
    role: "member", 
    games: ["Celeste"] 
  },
  { 
    id: "10", 
    name: "Hades Speedrunning", 
    icon: "https://i.imgur.com/J1AxD5S.png", 
    memberCount: 1765, 
    role: "owner", 
    games: ["Hades"] 
  },
];

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const ownerGuilds = mockGuilds.filter(guild => guild.role === "owner");
  const moderatorGuilds = mockGuilds.filter(guild => guild.role === "moderator");
  const memberGuilds = mockGuilds.filter(guild => guild.role === "member");

  return (
    <Sidebar className="border-r border-border bg-background" collapsible="icon">
      <SidebarContent className="pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-semibold text-base mb-1">
            <div className="flex items-center gap-2">
              Add Guild
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Share Bot"
                  onClick={() => navigate("/dashboard/share-bot")}
                >
                  <Share className="text-primary" />
                  <span>Share Bot</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Add Bot to Guild"
                  onClick={() => navigate("/dashboard/add-bot")}
                >
                  <Bot className="text-primary" />
                  <span>Add Bot to Guild</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {ownerGuilds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 font-semibold text-base mb-1">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Owner Guilds
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {ownerGuilds.map(guild => (
                  <SidebarMenuItem key={guild.id}>
                    <SidebarMenuButton
                      tooltip={guild.name}
                      onClick={() => navigate(`/dashboard/guild/${guild.id}`)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={guild.icon} alt={guild.name} />
                          <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <span className="truncate">{guild.name}</span>
                            {guild.isOfficial && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Globe className="ml-1.5 h-3.5 w-3.5 text-primary/80" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Official Guild
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> 
                            <span>{guild.memberCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {moderatorGuilds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 font-semibold text-base mb-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Moderator Guilds
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {moderatorGuilds.map(guild => (
                  <SidebarMenuItem key={guild.id}>
                    <SidebarMenuButton
                      tooltip={guild.name}
                      onClick={() => navigate(`/dashboard/guild/${guild.id}`)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={guild.icon} alt={guild.name} />
                          <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <span className="truncate">{guild.name}</span>
                            {guild.isOfficial && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Globe className="ml-1.5 h-3.5 w-3.5 text-primary/80" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Official Guild
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> 
                            <span>{guild.memberCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {memberGuilds.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="px-3 font-semibold text-base mb-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Member Guilds
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {memberGuilds.map(guild => (
                  <SidebarMenuItem key={guild.id}>
                    <SidebarMenuButton
                      tooltip={guild.name}
                      onClick={() => navigate(`/dashboard/guild/${guild.id}`)}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={guild.icon} alt={guild.name} />
                          <AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center">
                            <span className="truncate">{guild.name}</span>
                            {guild.isOfficial && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Globe className="ml-1.5 h-3.5 w-3.5 text-primary/80" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Official Guild
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" /> 
                            <span>{guild.memberCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-semibold text-base mb-1">
            Settings
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="User Settings"
                  onClick={() => navigate("/dashboard/user-settings")}
                >
                  <User className="text-primary" />
                  <span>User Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
