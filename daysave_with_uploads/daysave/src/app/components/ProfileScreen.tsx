import { User, Settings, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export default function ProfileScreen() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto text-primary-foreground text-4xl font-semibold">
            M
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Margaret Johnson</h1>
            <p className="text-muted-foreground text-lg">margaret@email.com</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-semibold text-primary">247</div>
            <div className="text-sm text-muted-foreground mt-1">Memories</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-semibold text-secondary">3</div>
            <div className="text-sm text-muted-foreground mt-1">Capsules</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4 text-center">
            <div className="text-2xl font-semibold text-primary">4</div>
            <div className="text-sm text-muted-foreground mt-1">Family</div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <button className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-accent transition-colors">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <User size={24} className="text-primary" />
            </div>
            <span className="flex-1 text-left text-lg font-medium">Edit Profile</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <Link to="/settings" className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-accent transition-colors">
            <div className="bg-secondary/20 p-3 rounded-2xl">
              <Settings size={24} className="text-secondary" />
            </div>
            <span className="flex-1 text-left text-lg font-medium">Settings</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>

          <button className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-accent transition-colors">
            <div className="bg-primary/10 p-3 rounded-2xl">
              <Bell size={24} className="text-primary" />
            </div>
            <span className="flex-1 text-left text-lg font-medium">Notifications</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-accent transition-colors">
            <div className="bg-secondary/20 p-3 rounded-2xl">
              <HelpCircle size={24} className="text-secondary" />
            </div>
            <span className="flex-1 text-left text-lg font-medium">Help & Support</span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button className="w-full bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex items-center gap-4 hover:bg-destructive/20 transition-colors">
            <div className="bg-destructive/20 p-3 rounded-2xl">
              <LogOut size={24} className="text-destructive" />
            </div>
            <span className="flex-1 text-left text-lg font-medium text-destructive">
              Log Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
