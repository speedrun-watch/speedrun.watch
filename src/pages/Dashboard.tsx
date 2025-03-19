
import DashboardLayout from "@/components/dashboard/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your speedrun.bot dashboard. Select a guild from the sidebar to manage its settings.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-col items-center text-center space-y-2">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Add a Guild</h3>
              <p className="text-sm text-muted-foreground">
                Add speedrun.bot to your Discord guild or share it with others.
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-col items-center text-center space-y-2">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Manage Guilds</h3>
              <p className="text-sm text-muted-foreground">
                Configure notification preferences and manage tracked games.
              </p>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 flex flex-col items-center text-center space-y-2">
              <div className="mb-4 p-3 bg-primary/10 rounded-full">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">User Settings</h3>
              <p className="text-sm text-muted-foreground">
                Link your speedrun.com account and manage personal preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

import { User, Shield, Globe } from "lucide-react";
