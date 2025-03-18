
import { 
  Twitter, 
  Github, 
  MessageSquare, 
  Mail, 
  Heart,
  Bell
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-discord-darker text-gray-300 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-6 h-6 text-discord-blurple" />
              <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">
                speedrun.bot
              </span>
            </div>
            <p className="mb-4 text-gray-400">
              Real-time speedrun notifications for your Discord server.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-discord-blurple transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-discord-blurple transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-discord-blurple transition-colors"
                aria-label="Discord"
              >
                <MessageSquare size={20} />
              </a>
              <a 
                href="mailto:contact@speedrun.bot" 
                className="text-gray-400 hover:text-discord-blurple transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#setup" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Setup Guide
                </a>
              </li>
              <li>
                <a href="https://speedrun.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  speedrun.com
                </a>
              </li>
              <li>
                <a href="https://discord.com/developers/docs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-discord-blurple transition-colors">
                  Discord API
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} speedrun.bot. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-discord-red mx-1" /> for speedrunners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
