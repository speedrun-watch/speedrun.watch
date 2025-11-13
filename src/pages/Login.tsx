
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case 'auth_failed':
        return 'Authentication failed. Please try again.';
      case 'no_code':
        return 'Authorization was cancelled or failed.';
      default:
        return 'An error occurred during login.';
    }
  };

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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center text-red-400">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{getErrorMessage(error)}</p>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <Button
              className="w-full bg-discord-blurple hover:bg-discord-blurple/90 text-white py-6"
              size="lg"
              onClick={() => {
                const DISCORD_CLIENT_ID = import.meta.env.VITE_DISCORD_CLIENT_ID;
                const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;
                const DISCORD_SCOPES = import.meta.env.VITE_DISCORD_SCOPES;
                const REDIRECT_URI = encodeURIComponent(FRONTEND_URL + "/login/callback");
                const SCOPES = encodeURIComponent(DISCORD_SCOPES);
                const signInUrl = `https://discord.com/oauth2/authorize?response_type=code&client_id=${DISCORD_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;
                window.location.href = signInUrl;
              }}
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Login with Discord
            </Button>

            <div className="text-center">
              {/* <p className="text-sm text-gray-400 mb-4">
                By logging in, you agree to our Terms of Service and Privacy Policy
              </p> */}

              <Link to="/" className="text-discord-blurple hover:underline inline-flex items-center">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-discord-dark p-4 text-center">
          <p className="text-sm text-gray-400">
            Need help? Join our <a href="https://discord.gg/6FskUx7qv7" className="text-discord-blurple hover:underline">Support Server</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
