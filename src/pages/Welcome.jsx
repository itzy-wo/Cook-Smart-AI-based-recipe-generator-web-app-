import Sidebar from "../components/Sidebar";
import React, { useState } from 'react';
import Pantry from './Pantry.jsx'; 
import MealPlanner from './MealPlanner.jsx'; 

export default function Welcome({ onLogOut }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [mood, setMood] = useState('Lazy');
  const [time, setTime] = useState('20 Min');
  const [craving, setCraving] = useState('Pasta');

  const pantryItems = [
    { name: '🥦 Mushrooms', qty: '200g', status: 'Expires Tmw!', critical: true },
    { name: '🥛 Heavy Cream', qty: '150ml', status: 'Expires Tmw!', critical: true },
    { name: '🥔 Potatoes', qty: '2 kg', status: 'Fresh', critical: false }
  ];

  // Helper to render current active tab workspace
  const renderWorkspace = () => {
    switch (activeTab) {
      case 'Pantry':
        return <Pantry />;
      case 'MealPlanner':
        return <MealPlanner />;
      case 'Analytics':
        return <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center text-slate-500">📊 Analytics Dashboard coming soon...</div>;
      case 'AIChat':
        return <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center text-slate-500">🤖 AI Chat Engine coming soon...</div>;
      case 'Dashboard':
      default:
        return (
          /* DEFAULT DASHBOARD VIEW */
          <div className="space-y-8">
            
            {/* 🚀 WELCOME HERO BANNER */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#4CAF50]"></div>
              <div>
                <h1 className="text-2xl font-black text-slate-800">👋 Welcome Back!</h1>
                <p className="text-slate-500 text-sm mt-0.5">Let's coordinate your kitchen consumption velocity today.</p>
              </div>
              
              {/* Green Interactive Get Started Gateway */}
              <button 
                type="button"
                onClick={() => onLogOut()}
                className="bg-[#4CAF50] hover:bg-green-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition shadow-md active:scale-[0.98] cursor-pointer whitespace-nowrap self-start sm:self-center"
              >
                Get Started ➔
              </button>
            </div>

            {/* DYNAMIC PARSING WIDGET */}
            <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-sm font-bold tracking-wider text-slate-400 uppercase">What should we cook today?</h2>
              
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-20 text-sm font-medium text-slate-600">Mood:</span>
                  {['Happy', 'Lazy', 'Comfort'].map((m) => {
                    const displayLabels = { Happy: 'Happy 😊', Lazy: 'Lazy 😴', Comfort: 'Comfort Food 😌' };
                    return (
                      <button 
                        key={m}
                        type="button"
                        onClick={() => setMood(m)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition cursor-pointer ${mood === m ? 'bg-[#4CAF50] text-white border-[#4CAF50]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {displayLabels[m]}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-20 text-sm font-medium text-slate-600">Time:</span>
                  {['10 Min', '20 Min', '30+ Min'].map((t) => (
                    <button 
                      key={t}
                      type="button"
                      onClick={() => setTime(t)}
                      className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition cursor-pointer ${time === t ? 'bg-[#4CAF50] text-white border-[#4CAF50]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-20 text-sm font-medium text-slate-600">Craving:</span>
                  {['Pasta', 'Sweet', 'Healthy'].map((c) => {
                    const displayLabels = { Pasta: 'Pasta 🍝', Sweet: 'Sweet 🍰', Healthy: 'Healthy 🥗' };
                    return (
                      <button 
                        key={c}
                        type="button"
                        onClick={() => setCraving(c)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition cursor-pointer ${craving === c ? 'bg-[#4CAF50] text-white border-[#4CAF50]' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}`}
                      >
                        {displayLabels[c]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* AI Matrix Response Box */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex gap-4">
                <div className="text-2xl">✨</div>
                <div>
                  <h3 className="font-bold text-emerald-900 mb-1">AI Smart Recommendation Response Matrix</h3>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    You selected a <strong>{time}</strong> runtime limit for a <strong>{mood}</strong> profile with a preference toward <strong>{craving}</strong> items.
                    System logic treats: <span className="font-bold underline text-slate-900">Creamy Tomato Pasta</span>. 
                    This implementation efficiently utilizes your remaining 150ml Heavy Cream stock target expiring tomorrow morning.
                  </p>
                </div>
              </div>
            </section>

            {/* COMPONENT PANTRY GRID QUICK PREVIEW */}
            <section className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-slate-700">🛒 Digital Pantry Preview</h2>
                <button 
                  type="button"
                  onClick={() => setActiveTab('Pantry')}
                  className="text-xs font-bold text-green-700 hover:underline bg-green-50 px-3 py-1.5 rounded-md border border-green-200 cursor-pointer"
                >
                  View Full Pantry ➔
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {pantryItems.map((item, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Quantity: {item.qty}</p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-wider font-extrabold mt-4 px-2 py-0.5 rounded w-fit ${item.critical ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-green-50 text-green-600 border border-green-200'}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <Sidebar />

      

      {/* MAIN VIEW CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* TOP METRICS RIBBON */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm shrink-0">
          <div className="flex items-center gap-3">
            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold border border-amber-200 flex items-center gap-1">
              🔥 5-Day Streak
            </span>
            
            {/* 👤 RE-INTEGRATED PROFILE LOGIN GATEWAY */}
            <button 
              type="button"
              onClick={() => onLogOut()}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              👤 Profile Setup / Login
            </button>
          </div>
          <div className="text-sm font-semibold text-rose-600 animate-pulse flex items-center gap-1">
            ⚠️ Alert: Milk Expires Soon!
          </div>
        </header>

        {/* WORKSPACE AREA */}
        <main className="p-8 max-w-5xl w-full mx-auto flex-1 overflow-y-auto">
          {renderWorkspace()}
        </main>
      </div>
    </div>
  );
}