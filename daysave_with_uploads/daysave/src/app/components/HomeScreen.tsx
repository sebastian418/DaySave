import { Camera, Mic, PenLine, Sparkles, MapPin, Calendar, User, X } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router';
import { useAppContext, Memory } from '../context/AppContext';

export default function HomeScreen() {
  const { addMemory } = useAppContext();
  const [showDailyMemory, setShowDailyMemory] = useState(false);
  const [showTextModal, setShowTextModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState('');
  const [textCaption, setTextCaption] = useState('');
  const [textBody, setTextBody] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);
  const voiceRef = useRef<HTMLInputElement>(null);

  const toast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const memory: Memory = {
      id: Date.now().toString(),
      type: file.type.startsWith('video') ? 'video' : 'photo',
      caption: file.name.replace(/\.[^.]+$/, ''),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      mood: 'happy',
      fileUrl: url,
      fileName: file.name,
      image: file.type.startsWith('image') ? url : undefined,
    };
    addMemory(memory);
    toast(`${file.type.startsWith('video') ? 'Video' : 'Photo'} saved to Memory Box!`);
    e.target.value = '';
  };

  const handleVoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const memory: Memory = {
      id: Date.now().toString(),
      type: 'voice',
      caption: file.name.replace(/\.[^.]+$/, ''),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      mood: 'peaceful',
      fileUrl: url,
      fileName: file.name,
      duration: '0:00',
    };
    addMemory(memory);
    toast('Voice note saved to Memory Box!');
    e.target.value = '';
  };

  const handleSaveText = () => {
    if (!textCaption.trim()) return;
    const memory: Memory = {
      id: Date.now().toString(),
      type: 'text',
      caption: textCaption,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      mood: 'grateful',
    };
    addMemory(memory);
    setTextCaption('');
    setTextBody('');
    setShowTextModal(false);
    toast('Note saved to Memory Box!');
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl text-foreground mb-1">Good morning,</h1>
            <h2 className="text-3xl font-semibold text-primary">Margaret</h2>
          </div>
          <Link to="/profile" className="bg-primary/10 p-3 rounded-2xl hover:bg-primary/20 transition-colors">
            <User size={28} className="text-primary" />
          </Link>
        </div>

        <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-3xl text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm opacity-90">Premium Active</div>
              <div className="text-lg font-medium">$9/month</div>
              <div className="text-xs opacity-75 mt-1">Cloud storage + family sharing for 5</div>
            </div>
            <Sparkles size={40} className="opacity-80" />
          </div>
        </div>

        <button onClick={() => setShowDailyMemory(true)} className="w-full bg-secondary/10 border-2 border-secondary rounded-3xl p-5 text-left hover:bg-secondary/20 transition-colors">
          <div className="flex items-start gap-3">
            <div className="bg-secondary rounded-full p-2 mt-1"><Sparkles size={20} className="text-primary-foreground" /></div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Your Daily Memory</h3>
              <p className="text-muted-foreground text-base">Tap to see a special moment from your past</p>
            </div>
          </div>
        </button>

        <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border">
          <div className="p-5">
            <h3 className="text-lg font-semibold text-primary mb-3">On This Day</h3>
            <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl mb-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&h=300&fit=crop" alt="Family gathering" className="w-full h-full object-cover" />
            </div>
            <p className="text-base mb-2">Family gathering at the park</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1"><Calendar size={16} /><span>May 23, 2022</span></div>
              <div className="flex items-center gap-1"><MapPin size={16} /><span>Central Park</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={photoRef} type="file" accept="image/*,video/*" className="hidden" onChange={handlePhotoUpload} />
      <input ref={voiceRef} type="file" accept="audio/*" className="hidden" onChange={handleVoiceUpload} />

      {/* Quick Capture Bar */}
      <div className="fixed bottom-20 left-0 right-0 px-6">
        <div className="max-w-md mx-auto bg-card rounded-3xl shadow-lg border border-border p-4">
          <div className="flex justify-around items-center">
            <button onClick={() => photoRef.current?.click()} className="flex flex-col items-center gap-2 group">
              <div className="bg-primary/10 group-hover:bg-primary/20 p-4 rounded-2xl transition-colors">
                <Camera size={28} className="text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">Photo</span>
            </button>
            <button onClick={() => voiceRef.current?.click()} className="flex flex-col items-center gap-2 group">
              <div className="bg-secondary/20 group-hover:bg-secondary/30 p-4 rounded-2xl transition-colors">
                <Mic size={28} className="text-secondary" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">Voice</span>
            </button>
            <button onClick={() => setShowTextModal(true)} className="flex flex-col items-center gap-2 group">
              <div className="bg-accent group-hover:bg-accent/70 p-4 rounded-2xl transition-colors">
                <PenLine size={28} className="text-primary" strokeWidth={2} />
              </div>
              <span className="text-sm font-medium text-foreground">Text</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg text-base font-medium">
            ✓ {showSuccessToast}
          </div>
        </div>
      )}

      {/* Text Note Modal */}
      {showTextModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-card rounded-t-3xl p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">Write a Note</h3>
              <button onClick={() => setShowTextModal(false)}><X size={24} className="text-muted-foreground" /></button>
            </div>
            <input
              type="text"
              placeholder="Title (e.g. 'Grandma's recipe')"
              value={textCaption}
              onChange={e => setTextCaption(e.target.value)}
              className="w-full px-4 py-3 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-base"
            />
            <textarea
              placeholder="Write your memory here..."
              value={textBody}
              onChange={e => setTextBody(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-base resize-none"
            />
            <button onClick={handleSaveText} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-lg font-medium">
              Save Memory
            </button>
          </div>
        </div>
      )}

      {/* Daily Memory Modal */}
      {showDailyMemory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50" onClick={() => setShowDailyMemory(false)}>
          <div className="bg-card rounded-3xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <div className="text-center space-y-4">
              <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Sparkles size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-semibold text-primary">Your Daily Memory</h3>
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=400&h=400&fit=crop" alt="Beach sunset" className="w-full h-full object-cover" />
              </div>
              <div className="text-left space-y-2">
                <p className="text-lg">Sunset at the beach with Tom</p>
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar size={16} /><span>August 15, 2019</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin size={16} /><span>Santa Monica Beach, CA</span></div>
              </div>
              <button onClick={() => setShowDailyMemory(false)} className="w-full bg-primary text-primary-foreground py-3 rounded-2xl text-lg font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
