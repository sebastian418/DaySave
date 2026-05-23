import { Camera, Mic, PenLine, Sparkles, MapPin, Calendar, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function HomeScreen() {
  const [showDailyMemory, setShowDailyMemory] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Greeting */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl text-foreground mb-1">Good morning,</h1>
            <h2 className="text-3xl font-semibold text-primary">Margaret</h2>
          </div>
          <Link
            to="/profile"
            className="bg-primary/10 p-3 rounded-2xl hover:bg-primary/20 transition-colors"
          >
            <User size={28} className="text-primary" />
          </Link>
        </div>

        {/* Premium Badge */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-3xl text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90">Premium Active</div>
              <div className="text-lg font-medium">$9/month</div>
              <div className="text-xs opacity-75 mt-1">
                Cloud storage + family sharing for 5
              </div>
            </div>
            <Sparkles size={40} className="opacity-80" />
          </div>
        </div>

        {/* Daily Memory Notification */}
        <button
          onClick={() => setShowDailyMemory(true)}
          className="w-full bg-secondary/10 border-2 border-secondary rounded-3xl p-5 text-left hover:bg-secondary/20 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-2 mt-1">
              <Sparkles size={20} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Your Daily Memory</h3>
              <p className="text-muted-foreground text-base">
                Tap to see a special moment from your past
              </p>
            </div>
          </div>
        </button>

        {/* On This Day Card */}
        <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border">
          <div className="p-5">
            <h3 className="text-lg font-semibold text-primary mb-3">On This Day</h3>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl mb-3 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=300&fit=crop"
                alt="Family gathering"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base mb-2">Family gathering at the park</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>May 23, 2022</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>Central Park</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Capture Bar */}
        <div className="fixed bottom-20 left-0 right-0 px-6">
          <div className="max-w-md mx-auto bg-card rounded-3xl shadow-lg border border-border p-4">
            <div className="flex justify-around items-center">
              <button className="flex flex-col items-center gap-2 group">
                <div className="bg-primary/10 group-hover:bg-primary/20 p-4 rounded-2xl transition-colors">
                  <Camera size={28} className="text-primary" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-foreground">Photo</span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="bg-secondary/20 group-hover:bg-secondary/30 p-4 rounded-2xl transition-colors">
                  <Mic size={28} className="text-secondary" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-foreground">Voice</span>
              </button>
              <button className="flex flex-col items-center gap-2 group">
                <div className="bg-accent group-hover:bg-accent/70 p-4 rounded-2xl transition-colors">
                  <PenLine size={28} className="text-primary" strokeWidth={2} />
                </div>
                <span className="text-sm font-medium text-foreground">Text</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Memory Modal */}
      {showDailyMemory && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setShowDailyMemory(false)}
        >
          <div
            className="bg-card rounded-3xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-4">
              <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Sparkles size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-primary">
                Your Daily Memory
              </h3>
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=400&h=400&fit=crop"
                  alt="Beach sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left space-y-2">
                <p className="text-lg">Sunset at the beach with Tom</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>August 15, 2019</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} />
                  <span>Santa Monica Beach, CA</span>
                </div>
              </div>
              <button
                onClick={() => setShowDailyMemory(false)}
                className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
