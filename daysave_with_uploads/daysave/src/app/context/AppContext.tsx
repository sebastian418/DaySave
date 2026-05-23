import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

export interface Memory {
  id: string;
  type: 'photo' | 'video' | 'voice' | 'text';
  caption: string;
  date: string;
  mood: 'happy' | 'peaceful' | 'grateful';
  fileUrl?: string;
  fileName?: string;
  duration?: string;
  image?: string;
}

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  memories: Memory[];
  addMemory: (memory: Memory) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const fontSizeMap = {
  small: '16px',
  medium: '18px',
  large: '20px',
  'extra-large': '24px',
};

const defaultMemories: Memory[] = [
  { id: '1', type: 'photo', image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=300&h=300&fit=crop', caption: 'Sunday brunch with Sarah', date: 'May 20, 2026', mood: 'happy' },
  { id: '2', type: 'photo', image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&h=300&fit=crop', caption: 'Morning walk in the garden', date: 'May 18, 2026', mood: 'peaceful' },
  { id: '3', type: 'voice', caption: 'Story about my first job', date: 'May 15, 2026', mood: 'grateful', duration: '2:45' },
  { id: '4', type: 'photo', image: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=300&h=300&fit=crop', caption: "Grandson's birthday party", date: 'May 12, 2026', mood: 'happy' },
  { id: '5', type: 'text', caption: 'Recipe for apple pie', date: 'May 10, 2026', mood: 'grateful' },
  { id: '6', type: 'photo', image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=300&fit=crop', caption: 'Beautiful sunset view', date: 'May 8, 2026', mood: 'peaceful' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('daysave-theme') as Theme) || 'light');
  const [fontSize, setFontSizeState] = useState<FontSize>(() => (localStorage.getItem('daysave-font-size') as FontSize) || 'medium');
  const [memories, setMemories] = useState<Memory[]>(defaultMemories);

  useEffect(() => {
    const root = document.documentElement;
    theme === 'dark' ? root.classList.add('dark') : root.classList.remove('dark');
    localStorage.setItem('daysave-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', fontSizeMap[fontSize]);
    localStorage.setItem('daysave-font-size', fontSize);
  }, [fontSize]);

  const addMemory = (memory: Memory) => setMemories(prev => [memory, ...prev]);

  return (
    <AppContext.Provider value={{ theme, setTheme: setThemeState, fontSize, setFontSize: setFontSizeState, memories, addMemory }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
