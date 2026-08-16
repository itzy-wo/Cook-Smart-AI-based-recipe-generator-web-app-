import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Palette, 
  Utensils, 
  Sparkles, 
  Check, 
  Save 
} from 'lucide-react';

const THEMES = [
  {
    id: 'mint',
    name: 'Fresh Mint',
    desc: 'Crisp emerald & herb garden tones',
    preview: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500'
  },
  {
    id: 'desi-spice',
    name: 'Desi Saffron & Spice',
    desc: 'Warm turmeric, saffron & tandoor red',
    preview: 'from-amber-500 to-orange-600',
    border: 'border-amber-500'
  },
  {
    id: 'cyber-dark',
    name: 'Midnight Chef (Dark)',
    desc: 'Deep slate with high-contrast neon mint',
    preview: 'from-slate-900 via-indigo-950 to-slate-800',
    border: 'border-teal-400'
  },
  {
    id: 'royal-berry',
    name: 'Royal Berry',
    desc: 'Rich plum, beetroot & lavender accents',
    preview: 'from-indigo-600 to-purple-700',
    border: 'border-purple-500'
  }
];

export default function Settings() {
  const { theme, setTheme, currentTheme } = useTheme();
  const [savedSuccess, setSavedSuccess] = useState(false);

  // User Profile & Cooking Preferences State with LocalStorage Persistence
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('cooksmart_preferences');
    return saved ? JSON.parse(saved) : {
      dietType: 'Pure Veg',
      spiceLevel: 'Medium Desi 🌶️',
      pantryAlertDays: 2,
      allowStoreSubstitutions: true,
      aiStrictPantryMode: false
    };
  });

  const dietOptions = ['Pure Veg', 'Jain (No Onion/Garlic)', 'Eggetarian', 'Non-Vegetarian', 'Vegan'];
  const spiceLevels = ['Mild', 'Medium Desi 🌶️', 'Dhaba Spicy 🌶️🌶️', 'Kolhapuri Fire 🔥'];

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('cooksmart_preferences', JSON.stringify(profile));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div 
      className="p-8 space-y-8 min-h-screen max-w-5xl transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <span>⚙️</span> Preferences & Theme Settings
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Customize your app appearance, dietary preferences, and AI behavior.
          </p>
        </div>

        <button 
          onClick={handleSaveSettings}
          className="flex items-center gap-2 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all cursor-pointer"
          style={{ backgroundColor: 'var(--accent-color, #059669)' }}
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Success Toast */}
      {savedSuccess && (
        <div 
          className="p-4 rounded-2xl flex items-center gap-2 text-sm font-bold animate-in fade-in duration-200 border" 
          style={{ 
            backgroundColor: 'var(--bg-card)', 
            borderColor: 'var(--accent-color, #059669)', 
            color: 'var(--accent-color, #059669)' 
          }}
        >
          <Check className="w-4 h-4" />
          Preferences and theme settings saved successfully!
        </div>
      )}

      {/* 1. Theme Selection Section */}
      <div 
        className="p-6 rounded-3xl border shadow-xs space-y-5 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2.5 rounded-xl" 
            style={{ backgroundColor: 'var(--border-color)', color: 'var(--accent-color, #059669)' }}
          >
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">App Theme & Appearance</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Choose a color palette for cards, banners, sidebar, and dashboard accents
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {THEMES.map((t) => {
            const isSelected = theme === t.id;

            return (
              <div
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                  isSelected 
                    ? `${t.border} shadow-md scale-102 ring-2 ring-emerald-400/40` 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
                style={{
                  backgroundColor: 'var(--bg-app)',
                  borderColor: isSelected ? undefined : 'var(--border-color)'
                }}
              >
                <div className={`h-16 rounded-xl bg-linear-to-r ${t.preview} flex items-center justify-end p-2 text-white shadow-inner`}>
                  {isSelected && (
                    <span className="w-6 h-6 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-3 text-slate-900" />
                    </span>
                  )}
                </div>

                <div>
                  <h4 className="font-bold text-sm">{t.name}</h4>
                  <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                    {t.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Indian Dietary & Taste Profile */}
      <div 
        className="p-6 rounded-3xl border shadow-xs space-y-6 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2.5 rounded-xl" 
            style={{ backgroundColor: 'var(--border-color)', color: 'var(--accent-color, #059669)' }}
          >
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Dietary & Desi Palate</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Filter recipe generation according to your dietary restrictions
            </p>
          </div>
        </div>

        {/* Diet Selector Chips */}
        <div className="space-y-2">
          <label className="text-xs font-bold block uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Dietary Category
          </label>
          <div className="flex flex-wrap gap-2.5">
            {dietOptions.map((option) => {
              const isSelected = profile.dietType === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setProfile({ ...profile, dietType: option })}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? 'var(--accent-color, #059669)' : 'var(--border-color)',
                    color: isSelected ? '#ffffff' : 'var(--text-main)',
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Spice Tolerance Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold block uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            Spice Level (Mirchi Preference)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {spiceLevels.map((lvl) => {
              const isSelected = profile.spiceLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setProfile({ ...profile, spiceLevel: lvl })}
                  className="px-3 py-2.5 rounded-xl text-xs font-bold transition text-center cursor-pointer border"
                  style={{
                    backgroundColor: isSelected ? 'var(--text-main)' : 'var(--bg-app)',
                    color: isSelected ? 'var(--bg-card)' : 'var(--text-main)',
                    borderColor: 'var(--border-color)'
                  }}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. AI Recipe Engine & Pantry Settings */}
      <div 
        className="p-6 rounded-3xl border shadow-xs space-y-6 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2.5 rounded-xl" 
            style={{ backgroundColor: 'var(--border-color)', color: 'var(--accent-color, #059669)' }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AI Chat Settings</h2>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Configure how strictly the AI relies on your current pantry
            </p>
          </div>
        </div>

        <div className="space-y-4 text-sm divide-y" style={{ borderColor: 'var(--border-color)' }}>
          <div className="flex items-center justify-between pt-2">
            <div>
              <p className="font-bold">Strict Pantry Only</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Never suggest recipes requiring items you haven’t logged in your pantry.
              </p>
            </div>
            <input
              type="checkbox"
              checked={profile.aiStrictPantryMode}
              onChange={(e) => setProfile({ ...profile, aiStrictPantryMode: e.target.checked })}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: 'var(--accent-color, #059669)' }}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-bold">Desi Ingredient Substitutions</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Allow AI to suggest alternatives (e.g. Kasuri Methi for Fresh Methi, Curd for Cream).
              </p>
            </div>
            <input
              type="checkbox"
              checked={profile.allowStoreSubstitutions}
              onChange={(e) => setProfile({ ...profile, allowStoreSubstitutions: e.target.checked })}
              className="w-5 h-5 rounded cursor-pointer"
              style={{ accentColor: 'var(--accent-color, #059669)' }}
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="font-bold">Expiry Reminder Window</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Alert me when pantry dairy or sabzi has fewer days left than:
              </p>
            </div>
            <select
              value={profile.pantryAlertDays}
              onChange={(e) => setProfile({ ...profile, pantryAlertDays: Number(e.target.value) })}
              className="px-3 py-1.5 border rounded-xl text-xs font-bold focus:outline-none"
              style={{ 
                backgroundColor: 'var(--bg-app)', 
                borderColor: 'var(--border-color)', 
                color: 'var(--text-main)' 
              }}
            >
              <option value={1}>1 Day before</option>
              <option value={2}>2 Days before</option>
              <option value={3}>3 Days before</option>
              <option value={5}>5 Days before</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
}