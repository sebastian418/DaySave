import { Calendar, Camera, Video, Mic, FileText, Users, Save, X, Plus } from 'lucide-react';
import { useState, useRef } from 'react';

interface CapsuleMedia {
  type: 'photo' | 'video' | 'voice' | 'text';
  name: string;
  url?: string;
  text?: string;
}

interface Capsule {
  id: string;
  name: string;
  unlockDate: string;
  sharedWithFamily: boolean;
  media: CapsuleMedia[];
  createdAt: string;
}

export default function CapsuleScreen() {
  const [capsuleName, setCapsuleName] = useState('');
  const [unlockDate, setUnlockDate] = useState('');
  const [shareWithFamily, setShareWithFamily] = useState(false);
  const [mediaItems, setMediaItems] = useState<CapsuleMedia[]>([]);
  const [capsules, setCapsules] = useState<Capsule[]>([{ id: '1', name: 'Winter Memories 2025', unlockDate: '2026-12-21', sharedWithFamily: true, media: [], createdAt: 'January 5, 2026' }]);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textNote, setTextNote] = useState('');
  const [showSuccess, setShowSuccess] = useState('');
  const photoRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const voiceRef = useRef<HTMLInputElement>(null);

  const toast = (msg: string) => { setShowSuccess(msg); setTimeout(() => setShowSuccess(''), 3000); };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'video' | 'voice') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setMediaItems(prev => [...prev, { type, name: file.name, url }]);
    toast(`${type} added to capsule!`);
    e.target.value = '';
  };

  const addTextNote = () => {
    if (!textNote.trim()) return;
    setMediaItems(prev => [...prev, { type: 'text', name: textNote.slice(0, 40), text: textNote }]);
    setTextNote('');
    setShowTextInput(false);
    toast('Note added to capsule!');
  };

  const saveCapsule = () => {
    if (!capsuleName.trim()) return;
    const capsule: Capsule = { id: Date.now().toString(), name: capsuleName, unlockDate, sharedWithFamily, media: mediaItems, createdAt: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
    setCapsules(prev => [capsule, ...prev]);
    setCapsuleName(''); setUnlockDate(''); setShareWithFamily(false); setMediaItems([]);
    toast('Capsule saved! 🎉');
  };

  const typeIcon = (type: string) => {
    if (type === 'photo') return <Camera size={14} />;
    if (type === 'video') return <Video size={14} />;
    if (type === 'voice') return <Mic size={14} />;
    return <FileText size={14} />;
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Create a Capsule</h1>
          <p className="text-muted-foreground text-lg mt-1">Save memories for the future</p>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium">Name this capsule</label>
          <input type="text" value={capsuleName} onChange={e => setCapsuleName(e.target.value)} placeholder="e.g., Summer 2026 Adventures" className="w-full px-5 py-4 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-lg" />
        </div>

        <div className="space-y-3">
          <label className="text-lg font-medium">Add memories</label>
          <div className="bg-card border-2 border-dashed border-border rounded-3xl p-6 space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => photoRef.current?.click()} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Camera size={28} className="text-primary" /><span className="text-xs font-medium">Photo</span>
              </button>
              <button onClick={() => videoRef.current?.click()} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <Video size={28} className="text-secondary" /><span className="text-xs font-medium">Video</span>
              </button>
              <button onClick={() => voiceRef.current?.click()} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Mic size={28} className="text-primary" /><span className="text-xs font-medium">Voice</span>
              </button>
              <button onClick={() => setShowTextInput(!showTextInput)} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-accent hover:bg-accent/70 transition-colors">
                <FileText size={28} className="text-primary" /><span className="text-xs font-medium">Text</span>
              </button>
            </div>

            {showTextInput && (
              <div className="space-y-2">
                <textarea value={textNote} onChange={e => setTextNote(e.target.value)} placeholder="Write a note for this capsule..." rows={3} className="w-full px-4 py-3 bg-input-background rounded-2xl border border-border focus:border-primary focus:outline-none text-base resize-none" />
                <button onClick={addTextNote} className="w-full bg-primary text-primary-foreground py-2 rounded-xl text-sm font-medium">Add Note</button>
              </div>
            )}

            {mediaItems.length > 0 ? (
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">{mediaItems.length} item{mediaItems.length > 1 ? 's' : ''} added</p>
                <div className="flex flex-wrap gap-2">
                  {mediaItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      {typeIcon(item.type)}<span className="max-w-24 truncate">{item.name}</span>
                      <button onClick={() => setMediaItems(prev => prev.filter((_, j) => j !== i))} className="ml-1 hover:text-red-500"><X size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground text-base">Tap above to add photos, videos, or notes</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-lg font-medium flex items-center gap-2"><Calendar size={20} className="text-primary" />Unlock on...</label>
          <input type="date" value={unlockDate} onChange={e => setUnlockDate(e.target.value)} className="w-full px-5 py-4 bg-input-background rounded-2xl border-2 border-transparent focus:border-primary focus:outline-none text-lg" />
          <p className="text-sm text-muted-foreground pl-1">Your capsule will be revealed on this date</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <label className="flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-secondary/20 p-3 rounded-2xl"><Users size={24} className="text-secondary" /></div>
              <div>
                <div className="text-lg font-medium">Share with family</div>
                <div className="text-sm text-muted-foreground">Let family members view this capsule</div>
              </div>
            </div>
            <div className="relative">
              <input type="checkbox" checked={shareWithFamily} onChange={e => setShareWithFamily(e.target.checked)} className="sr-only peer" />
              <div className="w-14 h-8 bg-muted rounded-full peer-checked:bg-secondary transition-colors"></div>
              <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-6 shadow-sm"></div>
            </div>
          </label>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Your Capsules ({capsules.length})</h3>
          <div className="space-y-3">
            {capsules.map(c => (
              <div key={c.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{c.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{c.unlockDate ? `Unlocks: ${new Date(c.unlockDate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` : 'No unlock date set'}</p>
                    {c.media.length > 0 && <p className="text-xs text-primary mt-1">{c.media.length} item{c.media.length > 1 ? 's' : ''} inside</p>}
                  </div>
                  <div className="bg-primary/10 px-4 py-2 rounded-xl"><span className="text-sm font-medium text-primary">Locked</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={saveCapsule} disabled={!capsuleName.trim()} className="w-full bg-primary text-primary-foreground py-4 rounded-2xl text-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg disabled:opacity-40">
          <Save size={24} />Save Capsule
        </button>
      </div>

      <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={e => handleFileUpload(e, 'photo')} />
      <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={e => handleFileUpload(e, 'video')} />
      <input ref={voiceRef} type="file" accept="audio/*" className="hidden" onChange={e => handleFileUpload(e, 'voice')} />

      {showSuccess && (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg text-base font-medium">✓ {showSuccess}</div>
        </div>
      )}
    </div>
  );
}
