
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
    <footer className="bg-discord-darker text-gray-300 py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Bell className="w-5 h-5 text-discord-blurple" />
            <span className="text-lg font-medium text-white">
              speedrun.bot
            </span>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-discord-blurple transition-colors" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-discord-blurple transition-colors" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="#" className="text-gray-400 hover:text-discord-blurple transition-colors" aria-label="Discord">
              <MessageSquare size={18} />
            </a>
            <a href="mailto:contact@speedrun.bot" className="text-gray-400 hover:text-discord-blurple transition-colors" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-2 md:mb-0">
            &copy; {currentYear} speedrun.bot. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 flex items-center">
            Made with <Heart className="w-3 h-3 text-discord-red mx-1" /> for speedrunners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
