import { Plus, Image as ImageIcon, Mic, FileText, Smile, Heart, Star, X, Camera, Video, Play } from 'lucide-react';
import { useState, useRef } from 'react';
import { useAppContext, Memory } from '../context/AppContext';

type FilterType = 'all' | 'photos' | 'voice' | 'text' | 'video';
type MoodType = 'all' | 'happy' | 'peaceful' | 'grateful';

export default function MemoryBoxScreen() {
  const { memories, addMemory } = useAppContext();
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [moodFilter, setMoodFilter] = useState<MoodType>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [textCaption, setTextCaption] = useState('');
  const [textBody, setTextBody] = useState('');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'peaceful' | 'grateful'>('happy');
  const photoRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const voiceRef = useRef<HTMLInputElement>(null);

  const toast = (msg: string) => {
    setShowSuccessToast(msg);
    setTimeout(() => setShowSuccessToast(''), 3000);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    addMemory({ id: Date.now().toString(), type: 'photo', caption: file.name.replace(/\.[^.]+$/, ''), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), mood: selectedMood, fileUrl: url, image: url, fileName: file.name });
    toast('Photo added!');
    setShowAddModal(false);
    e.target.value = '';
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    addMemory({ id: Date.now().toString(), type: 'video', caption: file.name.replace(/\.[^.]+$/, ''), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), mood: selectedMood, fileUrl: url, fileName: file.name });
    toast('Video added!');
    setShowAddModal(false);
    e.target.value = '';
  };

  const handleVoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    addMemory({ id: Date.now().toString(), type: 'voice', caption: file.name.replace(/\.[^.]+$/, ''), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), mood: selectedMood, fileUrl: url, fileName: file.name, duration: '0:00' });
    toast('Voice note added!');
    setShowAddModal(false);
    e.target.value = '';
  };

  const handleSaveText = () => {
    if (!textCaption.trim()) return;
    addMemory({ id: Date.now().toString(), type: 'text', caption: textCaption, date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }), mood: selectedMood });
    setTextCaption(''); setTextBody('');
    toast('Note added!');
    setShowAddModal(false);
  };

  const filteredMemories = memories.filter(m => {
    const typeMatch = filterType === 'all' || m.type === filterType || (filterType === 'photos' && m.type === 'photo');
    const moodMatch = moodFilter === 'all' || m.mood === moodFilter;
    return typeMatch && moodMatch;
  });

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-primary">Memory Box</h1>
          <p className="text-muted-foreground text-lg mt-1">{memories.length} precious moments</p>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {[{ value: 'all', label: 'All', icon: null }, { value: 'photos', label: 'Photos', icon: ImageIcon }, { value: 'video', label: 'Video', icon: Video }, { value: 'voice', label: 'Voice', icon: Mic }, { value: 'text', label: 'Text', icon: FileText }].map(({ value, label, icon: Icon }) => (
            <button key={value} onClick={() => setFilterType(value as FilterType)} className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-medium whitespace-nowrap transition-colors ${filterType === value ? 'bg-primary text-white' : 'bg-card text-foreground border border-border hover:bg-accent'}`}>
              {Icon && <Icon size={18} />}<span>{label}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-center">
          {[{ value: 'all', label: 'All', icon: Star }, { value: 'happy', label: 'Happy', icon: Smile }, { value: 'peaceful', label: 'Peaceful', icon: Heart }, { value: 'grateful', label: 'Grateful', icon: Star }].map(({ value, label, icon: Icon }) => (
            <button key={value} onClick={() => setMoodFilter(value as MoodType)} className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-colors ${moodFilter === value ? 'bg-secondary/20 text-secondary' : 'text-muted-foreground hover:bg-accent'}`}>
              <Icon size={24} strokeWidth={2} /><span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 pb-4">
          {filteredMemories.map(memory => (
            <div key={memory.id} onClick={() => setSelectedMemory(memory)} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer">
              <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/10 flex items-center justify-center">
                {memory.type === 'photo' && memory.image ? (
                  <img src={memory.image} alt={memory.caption} className="w-full h-full object-cover" />
                ) : memory.type === 'video' ? (
                  memory.fileUrl ? (
                    <video src={memory.fileUrl} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2"><Play size={40} className="text-secondary" /></div>
                  )
                ) : memory.type === 'voice' ? (
                  <div className="flex flex-col items-center gap-2"><Mic size={40} className="text-secondary" />{memory.duration && <span className="text-sm font-medium">{memory.duration}</span>}</div>
                ) : (
                  <FileText size={40} className="text-primary" />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2 mb-1">{memory.caption}</p>
                <p className="text-xs text-muted-foreground">{memory.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB */}
      <button onClick={() => setShowAddModal(true)} className="fixed bottom-24 right-6 bg-primary text-primary-foreground p-5 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-10">
        <Plus size={32} strokeWidth={2.5} />
      </button>

      {/* Hidden inputs */}
      <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
      <input ref={videoRef} type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
      <input ref={voiceRef} type="file" accept="audio/*" className="hidden" onChange={handleVoiceUpload} />

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6">
          <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-lg text-base font-medium">✓ {showSuccessToast}</div>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
          <div className="bg-card rounded-t-3xl p-6 w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-primary">Add a Memory</h3>
              <button onClick={() => setShowAddModal(false)}><X size={24} className="text-muted-foreground" /></button>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Mood</p>
              <div className="flex gap-2">
                {(['happy', 'peaceful', 'grateful'] as const).map(m => (
                  <button key={m} onClick={() => setSelectedMood(m)} className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${selectedMood === m ? 'bg-primary text-white border-primary' : 'border-border'}`}>{m}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => photoRef.current?.click()} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Camera size={32} className="text-primary" /><span className="text-sm font-medium">Photo</span>
              </button>
              <button onClick={() => videoRef.current?.click()} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                <Video size={32} className="text-secondary" /><span className="text-sm font-medium">Video</span>
              </button>
              <button onClick={() => voiceRef.current?.click()} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-primary/10 hover:bg-primary/20 transition-colors">
                <Mic size={32} className="text-primary" /><span className="text-sm font-medium">Voice</span>
              </button>
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-accent">
                <div className="flex items-center gap-2"><FileText size={24} className="text-primary" /><span className="text-sm font-medium">Text Note</span></div>
                <input type="text" placeholder="Title..." value={textCaption} onChange={e => setTextCaption(e.target.value)} className="w-full px-3 py-2 bg-background rounded-xl border border-border text-sm focus:outline-none focus:border-primary" />
                <button onClick={handleSaveText} disabled={!textCaption.trim()} className="w-full bg-primary text-white py-2 rounded-xl text-sm font-medium disabled:opacity-40">Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50" onClick={() => setSelectedMemory(null)}>
          <div className="bg-card rounded-3xl p-5 max-w-sm w-full space-y-3" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-primary flex-1 pr-4">{selectedMemory.caption}</h3>
              <button onClick={() => setSelectedMemory(null)}><X size={22} className="text-muted-foreground" /></button>
            </div>
            {selectedMemory.type === 'photo' && selectedMemory.image && (
              <img src={selectedMemory.image} alt={selectedMemory.caption} className="w-full rounded-2xl object-cover max-h-64" />
            )}
            {selectedMemory.type === 'video' && selectedMemory.fileUrl && (
              <video src={selectedMemory.fileUrl} controls className="w-full rounded-2xl max-h-64" />
            )}
            {selectedMemory.type === 'voice' && selectedMemory.fileUrl && (
              <div className="bg-secondary/10 rounded-2xl p-4">
                <audio src={selectedMemory.fileUrl} controls className="w-full" />
              </div>
            )}
            {selectedMemory.type === 'text' && (
              <div className="bg-accent rounded-2xl p-4">
                <FileText size={32} className="text-primary mx-auto mb-2" />
                <p className="text-center text-muted-foreground text-sm">Text note</p>
              </div>
            )}
            <p className="text-sm text-muted-foreground">{selectedMemory.date} · {selectedMemory.mood}</p>
          </div>
        </div>
      )}
    </div>
  );
}
