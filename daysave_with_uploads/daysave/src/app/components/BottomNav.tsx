import { Home, Box, Archive, Users, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/memory-box', icon: Box, label: 'Memories' },
    { path: '/capsules', icon: Archive, label: 'Capsules' },
    { path: '/family', icon: Users, label: 'Family' },
    { path: '/chat', icon: MessageCircle, label: 'Chat' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border pb-safe">
      <div className="max-w-md mx-auto px-2 py-3">
        <div className="flex justify-around items-center">
          {navItems.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center gap-1 min-w-[64px] group"
              >
                <div
                  className={`p-2 rounded-2xl transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground group-hover:bg-accent'
                  }`}
                >
                  <Icon size={24} strokeWidth={2} />
                </div>
                <span
                  className={`text-xs ${
                    isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
