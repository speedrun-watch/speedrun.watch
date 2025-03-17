
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-discord-darker p-4">
      <div className="text-center glass p-8 rounded-lg max-w-md">
        <div className="w-20 h-20 bg-discord-dark/50 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-10 h-10 text-discord-yellow" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! This page doesn't exist in our Discord realm.</p>
        <Button 
          className="bg-discord-blurple hover:bg-discord-blurple/90 text-white"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
