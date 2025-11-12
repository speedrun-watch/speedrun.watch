
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-discord-darker p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-discord-blurple/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-discord-fuchsia/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md glass rounded-lg overflow-hidden shadow-xl animate-scale-in">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-discord-blurple to-discord-fuchsia bg-clip-text text-transparent mb-2">
              Login to speedrun.watch
            </h2>
            <p className="text-gray-300">
              Manage your servers, games, and notification preferences
            </p>
          </div>

          <div className="space-y-6">
            <Button
              className="w-full bg-discord-blurple hover:bg-discord-blurple/90 text-white py-6"
              size="lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Login with Discord
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-400 mb-4">
                By logging in, you agree to our Terms of Service and Privacy Policy
              </p>

              <Link to="/" className="text-discord-blurple hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-discord-dark p-4 text-center">
          <p className="text-sm text-gray-400">
            Need help? Join our <a href="#" className="text-discord-blurple hover:underline">Support Server</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
