
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share, Copy, Check } from "lucide-react";
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const ShareBot = () => {
  const [copied, setCopied] = useState(false);
  
  const shareText = `Check out speedrun.bot, a Discord bot that tracks speedruns and notifies your community about new records! Add it to your server: https://speedrun.bot/invite`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Share Bot</h1>
          <p className="text-muted-foreground">Share speedrun.bot with other Discord communities.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share with Friends</CardTitle>
            <CardDescription>
              Copy a pre-written message to share speedrun.bot with others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="rounded-md border bg-muted p-4 text-sm">
                {shareText}
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-4 top-3"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="sr-only">Copy</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={handleCopy} className="gap-2">
                <Copy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy to Clipboard"}
              </Button>
              
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText), "_blank")}
              >
                <Share className="h-4 w-4" />
                Share on Twitter
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Share?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Sharing speedrun.bot helps:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Connect more speedrunning communities</li>
              <li>Give more visibility to speedruns across different games</li>
              <li>Build a larger network of speedrunners and enthusiasts</li>
              <li>Improve the bot through increased usage and feedback</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ShareBot;
