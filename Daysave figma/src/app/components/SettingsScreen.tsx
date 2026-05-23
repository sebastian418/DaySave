import { ChevronLeft, Sun, Moon, Type, Check } from 'lucide-react';
import { Link } from 'react-router';
import { useAppContext } from '../context/AppContext';

type FontSize = 'small' | 'medium' | 'large' | 'extra-large';

export default function SettingsScreen() {
  const { theme, setTheme, fontSize, setFontSize } = useAppContext();

  const fontSizes: { value: FontSize; label: string; size: string }[] = [
    { value: 'small', label: 'Small', size: '16px' },
    { value: 'medium', label: 'Medium', size: '18px' },
    { value: 'large', label: 'Large', size: '20px' },
    { value: 'extra-large', label: 'Extra Large', size: '24px' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="bg-card border border-border p-3 rounded-2xl hover:bg-accent transition-colors"
          >
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-3xl font-semibold text-primary">Settings</h1>
        </div>

        {/* Theme Setting */}
        <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-2xl">
              {theme === 'light' ? (
                <Sun size={24} className="text-primary" />
              ) : (
                <Moon size={24} className="text-primary" />
              )}
            </div>
            <h2 className="text-xl font-semibold">Theme</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setTheme('light')}
              className={`p-5 rounded-2xl border-2 transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background hover:bg-accent'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Sun size={32} className={theme === 'light' ? 'text-primary' : 'text-muted-foreground'} />
                <span className="font-medium text-lg">Light</span>
                {theme === 'light' && (
                  <div className="bg-primary text-primary-foreground p-1 rounded-full">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-5 rounded-2xl border-2 transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-background hover:bg-accent'
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <Moon size={32} className={theme === 'dark' ? 'text-primary' : 'text-muted-foreground'} />
                <span className="font-medium text-lg">Dark</span>
                {theme === 'dark' && (
                  <div className="bg-primary text-primary-foreground p-1 rounded-full">
                    <Check size={16} strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Font Size Setting */}
        <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-secondary/20 p-3 rounded-2xl">
              <Type size={24} className="text-secondary" />
            </div>
            <h2 className="text-xl font-semibold">Text Size</h2>
          </div>

          <div className="space-y-3">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setFontSize(size.value)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all ${
                  fontSize === size.value
                    ? 'border-secondary bg-secondary/10'
                    : 'border-border bg-background hover:bg-accent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-semibold text-lg mb-1">{size.label}</div>
                    <div
                      className="text-muted-foreground"
                      style={{ fontSize: size.size }}
                    >
                      The quick brown fox jumps
                    </div>
                  </div>
                  {fontSize === size.value && (
                    <div className="bg-secondary text-primary-foreground p-2 rounded-full ml-3">
                      <Check size={20} strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="bg-secondary/10 border border-secondary/30 rounded-2xl p-4">
            <p className="text-sm text-secondary-foreground">
              Larger text sizes make the app easier to read. Changes apply throughout the entire app.
            </p>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-3xl p-6">
          <h3 className="font-semibold text-lg mb-2">Preview</h3>
          <p className="text-muted-foreground mb-4">
            This is how your text will appear throughout DaySave. Make sure it's comfortable to read.
          </p>
          <div className="bg-card border border-border rounded-2xl p-4">
            <h4 className="font-semibold mb-2">Sample Memory</h4>
            <p className="text-muted-foreground">
              Sunday brunch with Sarah at the new café downtown. The weather was perfect!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
