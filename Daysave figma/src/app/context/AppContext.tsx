import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const fontSizeMap = {
  small: '16px',
  medium: '18px',
  large: '20px',
  'extra-large': '24px',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('daysave-theme');
    return (saved as Theme) || 'light';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    const saved = localStorage.getItem('daysave-font-size');
    return (saved as FontSize) || 'medium';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('daysave-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--font-size', fontSizeMap[fontSize]);
    localStorage.setItem('daysave-font-size', fontSize);
  }, [fontSize]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setFontSize = (newSize: FontSize) => {
    setFontSizeState(newSize);
  };

  return (
    <AppContext.Provider value={{ theme, setTheme, fontSize, setFontSize }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
