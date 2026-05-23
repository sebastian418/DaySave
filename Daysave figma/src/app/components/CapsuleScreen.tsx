import { Calendar, Camera, Video, Mic, FileText, Users, Save } from 'lucide-react';
import { useState } from 'react';

export default function CapsuleScreen() {
  const [capsuleName, setCapsuleName] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [shareWithFamily, setShareWithFamily] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-primary">Create a Capsule</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Save memories for the future
          </p>
        </div>

        {/* Capsule Name Input */}
        <div className="space-y-2">
          <label className="text-lg font-medium">Name this capsule</label>
          <input
            type="text"
            value={capsuleName}
            onChange={(e) => setCapsuleName(e.target.value)}
            placeholder="e.g., Summer 2026 Adventures"
            className="w-full px-5 py-4 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-lg"
          />
        </div>

        {/* Media Upload Area */}
        <div className="space-y-3">
          <label className="text-lg font-medium">Add memories</label>
          <div className="bg-card border-2 border-dashed border-border rounded-3xl p-6">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Camera size={28} className="text-primary" />
                <span className="text-xs font-medium">Photo</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <Video size={28} className="text-secondary" />
                <span className="text-xs font-medium">Video</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Mic size={28} className="text-primary" />
                <span className="text-xs font-medium">Voice</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-accent hover:bg-accent/70 transition-colors">
                <FileText size={28} className="text-primary" />
                <span className="text-xs font-medium">Text</span>
              </button>
            </div>

            {selectedMedia.length > 0 ? (
              <div className="text-center py-3 text-muted-foreground">
                {selectedMedia.length} item(s) added
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-base">
                Tap above to add photos, videos, or notes
              </p>
            )}
          </div>
        </div>

        {/* Unlock Date */}
        <div className="space-y-2">
          <label className="text-lg font-medium flex items-center gap-2">
            <Calendar size={20} className="text-primary" />
            Unlock on...
          </label>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="w-full px-5 py-4 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-lg"
          />
          <p className="text-sm text-muted-foreground pl-1">
            Your capsule will be revealed on this date
          </p>
        </div>

        {/* Share with Family Toggle */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-3 rounded-2xl">
                <Users size={24} className="text-secondary" />
              </div>
              <div>
                <div className="text-lg font-medium">Share with family</div>
                <div className="text-sm text-muted-foreground">
                  Let family members view this capsule
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={shareWithFamily}
                onChange={(e) => setShareWithFamily(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-14 h-8 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm"></div>
            </div>
          </label>
        </div>

        {/* Preview of Existing Capsules */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Your Capsules</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">Winter Memories 2025</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unlocks: December 21, 2026
                  </p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-xl">
                  <span className="text-sm font-medium text-primary">Locked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg">
          <Save size={24} />
          Save Capsule
        </button>
      </div>
    </div>
  );
}
