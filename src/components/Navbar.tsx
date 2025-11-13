import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Bell,
  Settings
} from "lucide-react";
import AuthStatus from "./AuthStatus";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-discord-dark/80 backdrop-blur-sm py-2 shadow-md"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Bell className="w-6 h-6 text-discord-blurple/90 animate-pulse-light" />
            <span className="text-xl font-bold bg-gradient-to-r from-discord-blurple/90 to-discord-fuchsia/80 bg-clip-text text-transparent">
              speedrun.watch
            </span>
          </Link>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <AuthStatus />
          </div>
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
