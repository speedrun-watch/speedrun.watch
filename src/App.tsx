
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AddBot from "./pages/dashboard/AddBot";
import ShareBot from "./pages/dashboard/ShareBot";
import UserSettings from "./pages/dashboard/UserSettings";
import GuildDetail from "./pages/dashboard/GuildDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add-bot" element={<AddBot />} />
        <Route path="/dashboard/share-bot" element={<ShareBot />} />
        <Route path="/dashboard/user-settings" element={<UserSettings />} />
        <Route path="/dashboard/guild/:guildId" element={<GuildDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
