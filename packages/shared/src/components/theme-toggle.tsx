'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Laptop } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export function ThemeToggle({ showLabel = false, className = '' }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-pulse ${className}`} />
    );
  }

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={cycleTheme}
      className={`p-2 rounded-xl border transition flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        isDark
          ? 'bg-slate-900/90 text-amber-300 border-slate-700 hover:bg-slate-800 hover:text-amber-200 shadow-sm'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-blue-600 shadow-sm'
      } ${className}`}
      title={`Current theme: ${theme} (Click to toggle)`}
      aria-label="Toggle Theme"
    >
      {theme === 'system' ? (
        <Laptop className="w-4 h-4 text-blue-500 dark:text-blue-400" />
      ) : isDark ? (
        <Moon className="w-4 h-4 fill-amber-300 text-amber-300" />
      ) : (
        <Sun className="w-4 h-4 fill-amber-400 text-amber-500" />
      )}

      {showLabel && (
        <span className="text-xs font-semibold capitalize hidden sm:inline">
          {theme === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </button>
  );
}

