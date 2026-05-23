import { Plus, Image as ImageIcon, Mic, FileText, Smile, Heart, Star } from 'lucide-react';
import { useState } from 'react';

type FilterType = 'all' | 'photos' | 'voice' | 'text';
type MoodType = 'all' | 'happy' | 'peaceful' | 'grateful';

const memories = [
  {
    id: 1,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=300&fit=crop',
    caption: 'Sunday brunch with Sarah',
    date: 'May 20, 2026',
    mood: 'happy',
  },
  {
    id: 2,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop',
    caption: 'Morning walk in the garden',
    date: 'May 18, 2026',
    mood: 'peaceful',
  },
  {
    id: 3,
    type: 'voice',
    caption: 'Story about my first job',
    date: 'May 15, 2026',
    mood: 'grateful',
    duration: '2:45',
  },
  {
    id: 4,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=300&h=300&fit=crop',
    caption: "Grandson's birthday party",
    date: 'May 12, 2026',
    mood: 'happy',
  },
  {
    id: 5,
    type: 'text',
    caption: 'Recipe for apple pie',
    date: 'May 10, 2026',
    mood: 'grateful',
  },
  {
    id: 6,
    type: 'photo',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop',
    caption: 'Beautiful sunset view',
    date: 'May 8, 2026',
    mood: 'peaceful',
  },
];

export default function MemoryBoxScreen() {
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [moodFilter, setMoodFilter] = useState<MoodType>('all');

  const filteredMemories = memories.filter((memory) => {
    const typeMatch = filterType === 'all' || memory.type === filterType + 's' || memory.type === filterType;
    const moodMatch = moodFilter === 'all' || memory.mood === moodFilter;
    return typeMatch && moodMatch;
  });

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-primary">Memory Box</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Your precious moments
          </p>
        </div>

        {/* Type Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All', icon: null },
            { value: 'photos', label: 'Photos', icon: ImageIcon },
            { value: 'voice', label: 'Voice', icon: Mic },
            { value: 'text', label: 'Text', icon: FileText },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilterType(value as FilterType)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium whitespace-nowrap transition-colors ${
                filterType === value
                  ? 'bg-primary text-white'
                  : 'bg-card text-foreground border border-border hover:bg-accent'
              }`}
            >
              {Icon && <Icon size={18} />}
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Mood Filter */}
        <div className="flex gap-3 justify-center">
          {[
            { value: 'all', label: 'All', icon: Star },
            { value: 'happy', label: 'Happy', icon: Smile },
            { value: 'peaceful', label: 'Peaceful', icon: Heart },
            { value: 'grateful', label: 'Grateful', icon: Star },
          ].map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setMoodFilter(value as MoodType)}
              className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${
                moodFilter === value
                  ? 'bg-secondary/20 text-secondary'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Icon size={24} strokeWidth={2} />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Memory Grid */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
                {memory.type === 'photo' && memory.image ? (
                  <img
                    src={memory.image}
                    alt={memory.caption}
                    className="w-full h-full object-cover"
                  />
                ) : memory.type === 'voice' ? (
                  <div className="flex flex-col items-center gap-2">
                    <Mic size={40} className="text-secondary" />
                    {memory.duration && (
                      <span className="text-sm font-medium">{memory.duration}</span>
                    )}
                  </div>
                ) : (
                  <FileText size={40} className="text-primary" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 mb-1">
                  {memory.caption}
                </p>
                <p className="text-xs text-muted-foreground">{memory.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Button */}
        <button className="fixed bottom-24 right-6 bg-primary text-primary-foreground p-5 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
          <Plus size={32} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
