
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";

const UserSettings = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
          <p className="text-muted-foreground">Manage your account and linked profiles.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your personal information and linked accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://i.imgur.com/6yCHBsS.png" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Jane Doe</div>
                <div className="text-sm text-muted-foreground">jane@example.com</div>
                <div className="text-sm mt-1">Connected via Discord</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Speedrun.com Integration</CardTitle>
            <CardDescription>
              Link your speedrun.com account to receive notifications for your runs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="speedrun-username">Speedrun.com Username</Label>
                <div className="flex gap-2">
                  <Input
                    id="speedrun-username"
                    placeholder="Enter your speedrun.com username"
                    defaultValue="janespeedruns"
                  />
                  <Button>Verify</Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="notifications" defaultChecked />
                <Label htmlFor="notifications">
                  Receive Discord notifications for my runs
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Control which notifications you receive for your personal runs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Run Submissions</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when your runs are submitted
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Run Verifications</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when your runs are verified
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Run Rejections</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when your runs are rejected
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>World Records</Label>
                <div className="text-sm text-muted-foreground">
                  Notify when you achieve a world record
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserSettings;
