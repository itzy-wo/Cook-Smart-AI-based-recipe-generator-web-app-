import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const THEME_PALETTES = {
  mint: {
    bg: '#f8fafc',
    sidebar: '#0b1329',
    card: '#ffffff',
    textMain: '#0f172a',
    textMuted: '#64748b',
    accent: '#059669',
    accentHover: '#047857',
    border: '#f1f5f9'
  },
  'desi-spice': {
    bg: '#fffbeb',
    sidebar: '#451a03',
    card: '#ffffff',
    textMain: '#451a03',
    textMuted: '#92400e',
    accent: '#d97706',
    accentHover: '#b45309',
    border: '#fde68a'
  },
  'cyber-dark': {
    bg: '#030712',
    sidebar: '#000000',
    card: '#111827',
    textMain: '#f9fafb',
    textMuted: '#9ca3af',
    accent: '#14b8a6',
    accentHover: '#0d9488',
    border: '#1f2937'
  },
  'royal-berry': {
    bg: '#faf5ff',
    sidebar: '#2e1065',
    card: '#ffffff',
    textMain: '#3b0764',
    textMuted: '#7e22ce',
    accent: '#9333ea',
    accentHover: '#7e22ce',
    border: '#e9d5ff'
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('cooksmart_theme') || 'mint';
  });

  const applyTheme = (themeKey) => {
    const palette = THEME_PALETTES[themeKey] || THEME_PALETTES.mint;
    const root = document.documentElement;

    root.style.setProperty('--bg-app', palette.bg);
    root.style.setProperty('--sidebar-bg', palette.sidebar);
    root.style.setProperty('--bg-card', palette.card);
    root.style.setProperty('--text-main', palette.textMain);
    root.style.setProperty('--text-muted', palette.textMuted);
    root.style.setProperty('--accent-color', palette.accent);
    root.style.setProperty('--accent-hover', palette.accentHover);
    root.style.setProperty('--border-color', palette.border);
    root.setAttribute('data-theme', themeKey);
  };

  useEffect(() => {
    localStorage.setItem('cooksmart_theme', theme);
    applyTheme(theme);
  }, [theme]);

  const selectTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: selectTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);