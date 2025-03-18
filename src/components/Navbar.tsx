
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Menu, 
  X, 
  Bell, 
  LogIn
} from "lucide-react";

interface NavbarProps {
  showAddBot?: boolean;
}

const Navbar = ({ showAddBot = true }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-discord-dark/90 backdrop-blur-md py-2 shadow-md" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-discord-blurple" />
            <span className="text-lg font-semibold text-white">
              speedrun.bot
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-5">
            <a 
              href="#features" 
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Features
            </a>
            <a 
              href="#setup" 
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Setup
            </a>
            <Link
              to="/dashboard" 
              className="text-gray-300 hover:text-white transition-colors text-sm"
            >
              Dashboard
            </Link>
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-transparent border-discord-blurple/50 text-discord-blurple hover:bg-discord-blurple/10 hover:text-white"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
            {showAddBot && (
              <Button 
                size="sm"
                className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Add bot to Discord
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-discord-darker/90 backdrop-blur-lg rounded-md animate-fade-in">
            <div className="flex flex-col space-y-4">
              <a 
                href="#features" 
                className="text-gray-300 hover:text-white transition-colors py-2 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#setup" 
                className="text-gray-300 hover:text-white transition-colors py-2 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Setup
              </a>
              <Link
                to="/dashboard"
                className="text-gray-300 hover:text-white transition-colors py-2 text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="w-full bg-transparent border-discord-blurple/50 text-discord-blurple hover:bg-discord-blurple/10 hover:text-white"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
              {showAddBot && (
                <Button 
                  size="sm"
                  className="w-full bg-discord-blurple hover:bg-discord-blurple/90 text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Add bot to Discord
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
