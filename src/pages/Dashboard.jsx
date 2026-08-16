import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Flame, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  TrendingUp, 
  ChefHat, 
  CheckCircle2,
  Utensils
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedVibe, setSelectedVibe] = useState('Lazy');

  const vibes = [
    { id: 'Happy', label: 'Festive & Rich', emoji: '🥳' },
    { id: 'Lazy', label: 'Quick & 1-Pot', emoji: '😴' },
    { id: 'Comfort Food', label: 'Homestyle Comfort', emoji: '🍲' },
    { id: 'Healthy & Clean', label: 'High Protein / Clean', emoji: '🥗' },
  ];

  const suggestedIndianRecipes = [
    {
      id: 'd1',
      title: 'Tawa Paneer Bhurji with Paratha',
      time: '15 mins',
      calories: 420,
      match: '96%',
      difficulty: 'Easy',
      desc: 'Uses your expiring paneer, onions, and ripe tomatoes with aromatic spices.'
    },
    {
      id: 'd2',
      title: 'Quick Moong Dal Khichdi & Dahi Tadka',
      time: '20 mins',
      calories: 380,
      match: '92%',
      difficulty: 'Easy',
      desc: 'One-pot comfort meal using whole yellow moong dal, desi ghee, and curd.'
    }
  ];

  return (
    <div 
      className="p-8 space-y-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      
      {/* 1. Hero Banner with Dynamic Theme Gradient */}
      <div 
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 transition-all duration-300"
        style={{ background: 'var(--banner-gradient, linear-gradient(135deg, #059669, #0d9488, #0891b2))' }}
      >
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> GEMINI AI POWERED
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, Chef! 👨‍🍳
          </h1>
          <p className="text-emerald-100/90 text-sm max-w-xl">
            You have 14 items in your pantry. 2 items (Spinach & Milk) are expiring soon. Let’s make something delicious!
          </p>
        </div>

        <button 
          onClick={() => navigate('/recipes')}
          className="relative z-10 flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-400/30 transition-all cursor-pointer shrink-0"
        >
          <ChefHat className="w-5 h-5" />
          <span>Generate Quick Recipe</span>
        </button>

        {/* Subtle background blur accent */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Expiring Alert */}
        <div 
          className="p-6 rounded-3xl border shadow-xs flex items-center gap-4 transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Expiring Soon</p>
            <h4 className="font-extrabold text-base mt-0.5">Fresh Milk & Spinach</h4>
          </div>
        </div>

        {/* Pantry Match */}
        <div 
          className="p-6 rounded-3xl border shadow-xs flex items-center gap-4 transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div 
            className="p-3 rounded-2xl"
            style={{ backgroundColor: 'var(--accent-light, #ecfdf5)', color: 'var(--accent-color, #059669)' }}
          >
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Pantry Match</p>
            <h4 className="font-extrabold text-base mt-0.5">82% Available Items</h4>
          </div>
        </div>

        {/* Daily Calorie Goal */}
        <div 
          className="p-6 rounded-3xl border shadow-xs flex items-center gap-4 transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Daily Target</p>
            <h4 className="font-extrabold text-base mt-0.5">1,450 / 2,100 kcal</h4>
          </div>
        </div>

      </div>

      {/* 3. Cooking Vibe Selector */}
      <div 
        className="p-6 rounded-3xl border shadow-xs space-y-4 transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-lg">What's your cooking vibe today?</h2>
          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>Personalized Desi suggestions</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {vibes.map((vibe) => {
            const isSelected = selectedVibe === vibe.id;
            return (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`p-4 rounded-2xl border-2 font-bold text-xs sm:text-sm transition-all cursor-pointer flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'shadow-md scale-102 ring-2 ring-emerald-400/30' 
                    : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? 'var(--accent-light, #ecfdf5)' : 'var(--bg-app)',
                  borderColor: isSelected ? 'var(--accent-color, #059669)' : 'var(--border-color)',
                  color: isSelected ? 'var(--accent-color, #059669)' : 'var(--text-main)',
                }}
              >
                <span className="text-3xl">{vibe.emoji}</span>
                <span>{vibe.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Suggested for You */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-extrabold text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent-color, #059669)' }} /> Suggested for you
          </h2>
          <button 
            onClick={() => navigate('/recipes')}
            className="text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
            style={{ color: 'var(--accent-color, #059669)' }}
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestedIndianRecipes.map((recipe) => (
            <div 
              key={recipe.id}
              className="p-6 rounded-3xl border shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all group"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span 
                    className="px-2.5 py-1 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-light, #ecfdf5)', color: 'var(--accent-color, #059669)' }}
                  >
                    ⚡ {recipe.match} Match
                  </span>
                  <span className="text-slate-400">{recipe.difficulty}</span>
                </div>

                <h3 className="font-bold text-base group-hover:underline">
                  {recipe.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {recipe.desc}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex items-center gap-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.time}</span>
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> {recipe.calories} kcal</span>
                </div>

                <button 
                  onClick={() => navigate('/recipes')}
                  className="p-2 rounded-xl text-white transition cursor-pointer"
                  style={{ backgroundColor: 'var(--accent-color, #059669)' }}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* AI On-Demand Card */}
          <div 
            onClick={() => navigate('/chat')}
            className="p-6 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center space-y-3 hover:opacity-90 transition cursor-pointer"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--accent-color, #059669)' 
            }}
          >
            <div 
              className="p-3 rounded-2xl"
              style={{ backgroundColor: 'var(--accent-light, #ecfdf5)', color: 'var(--accent-color, #059669)' }}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Generate on Demand</h3>
              <p className="text-xs mt-1 max-w-xs" style={{ color: 'var(--text-muted)' }}>
                Ask CookSmart Sous-Chef for custom Indian meal ideas tailored to what you feel like eating.
              </p>
            </div>
            <button 
              className="text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
              style={{ backgroundColor: 'var(--accent-color, #059669)' }}
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}