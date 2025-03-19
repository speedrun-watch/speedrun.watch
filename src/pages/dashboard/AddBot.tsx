
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, RefreshCw } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const AddBot = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Bot to Guild</h1>
          <p className="text-muted-foreground">Add speedrun.bot to your Discord guild to start tracking speedruns.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add to Discord</CardTitle>
            <CardDescription>
              Add speedrun.bot to your Discord guild with just one click.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Clicking the button below will redirect you to Discord where you can select which guild to add the bot to.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-discord-blurple hover:bg-discord-blurple/90 text-white">
                <Bot className="mr-2 h-4 w-4" />
                Add to Discord
              </Button>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh Guilds
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Select the guild where you want to add speedrun.bot.</li>
              <li>Make sure you have the necessary permissions in that guild.</li>
              <li>Once added, the bot will appear in your guild's member list.</li>
              <li>Return to this dashboard to configure notifications and settings.</li>
              <li>Your guild will appear in the sidebar once the bot has been added successfully.</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AddBot;
