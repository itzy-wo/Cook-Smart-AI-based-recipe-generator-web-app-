import React, { useState } from 'react';
import { 
  TrendingUp, 
  Leaf, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  PieChart, 
  Lightbulb, 
  ArrowUpRight,
  IndianRupee
} from 'lucide-react';

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('This Month');

  const stats = [
    {
      title: 'ESTIMATED SAVINGS',
      value: '₹5,400',
      subtitle: 'Saved from expiring ingredient use',
      badge: '+18%',
      icon: IndianRupee,
      iconBg: 'var(--accent-light, #ecfdf5)',
      iconColor: 'var(--accent-color, #059669)',
    },
    {
      title: 'WASTE PREVENTED',
      value: '9.8 kg',
      subtitle: 'Zero-waste cooking goal: 95%',
      badge: '+15%',
      icon: Leaf,
      iconBg: 'rgba(245, 158, 11, 0.1)',
      iconColor: '#d97706',
    },
    {
      title: 'DESI MEALS COOKED',
      value: '74',
      subtitle: 'Logged via CookSmart AI',
      badge: 'Active Cook',
      icon: Calendar,
      iconBg: 'rgba(99, 102, 241, 0.1)',
      iconColor: '#6366f1',
    },
    {
      title: 'PANTRY HEALTH SCORE',
      value: '92%',
      subtitle: 'Based on on-time ingredient usage',
      badge: 'Top Tier',
      icon: ShieldCheck,
      iconBg: 'var(--accent-light, #ecfdf5)',
      iconColor: 'var(--accent-color, #059669)',
    }
  ];

  const weeklyData = [
    { week: 'W1', meals: 65, saved: 30 },
    { week: 'W2', meals: 82, saved: 48 },
    { week: 'W3', meals: 58, saved: 25 },
    { week: 'W4', meals: 76, saved: 40 },
  ];

  const pantryCategories = [
    { name: 'Atta, Rice & Dals', percentage: 42, color: '#f59e0b' },
    { name: 'Fresh Sabzi & Produce', percentage: 28, color: 'var(--accent-color, #059669)' },
    { name: 'Dairy (Milk, Dahi, Paneer)', percentage: 18, color: '#0ea5e9' },
    { name: 'Oils, Ghee & Masalas', percentage: 12, color: '#ef4444' },
  ];

  return (
    <div 
      className="p-8 space-y-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      
      {/* Header & Timeframe Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
            <span>📊</span> Kitchen Analytics & Savings
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Track your grocery savings, reduce food waste, and measure pantry health.
          </p>
        </div>

        <div 
          className="flex items-center p-1 rounded-2xl border shadow-xs text-xs font-bold transition-colors"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          {['This Week', 'This Month', 'Year to Date'].map((tab) => {
            const isSelected = timeframe === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setTimeframe(tab)}
                className="px-4 py-2 rounded-xl transition cursor-pointer"
                style={{
                  backgroundColor: isSelected ? 'var(--accent-color, #059669)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Top Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl border shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="p-3 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span 
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                >
                  {item.badge}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {item.title}
                </p>
                <h3 className="text-2xl font-black mt-0.5 tracking-tight">
                  {item.value}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. Main Analytics Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Bar Chart Visualization */}
        <div 
          className="lg:col-span-2 p-6 sm:p-8 rounded-3xl border shadow-xs space-y-6 flex flex-col justify-between transition-colors duration-300"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-lg font-extrabold">Meals Cooked vs. Ingredients Saved</h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Comparing cooking frequency with zero-waste utilization
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--accent-color, #059669)' }} />
                  <span>Meals</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span>Saved Items</span>
                </span>
              </div>
            </div>

            {/* Custom Bar Graph */}
            <div className="h-64 flex items-end justify-between gap-6 pt-12 px-4 border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
              {weeklyData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-2 h-full">
                    {/* Meals Bar */}
                    <div 
                      className="w-full max-w-5 rounded-t-xl transition-all duration-500 group-hover:opacity-80"
                      style={{ 
                        height: `${d.meals}%`, 
                        backgroundColor: 'var(--accent-color, #059669)' 
                      }}
                      title={`Meals Cooked: ${d.meals}%`}
                    />
                    {/* Saved Bar */}
                    <div 
                      className="w-full max-w-5 bg-amber-400 rounded-t-xl transition-all duration-500 group-hover:opacity-80"
                      style={{ height: `${d.saved}%` }}
                      title={`Ingredients Saved: ${d.saved}%`}
                    />
                  </div>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
                    {d.week}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Insight Callout */}
          <div 
            className="p-4 rounded-2xl border flex items-center justify-between text-xs font-bold"
            style={{ 
              backgroundColor: 'var(--bg-app)', 
              borderColor: 'var(--border-color)' 
            }}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-amber-500">💡</span>
              <span>Most active cooking day: <strong>Sunday (Family Brunch & Meal Prep)</strong></span>
            </div>
            <span 
              className="flex items-center gap-1 cursor-pointer hover:underline"
              style={{ color: 'var(--accent-color, #059669)' }}
            >
              Top Efficiency <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Right Column: Pantry Breakdown & AI Recommendation */}
        <div className="space-y-6 flex flex-col justify-between">
          
          {/* Pantry Composition */}
          <div 
            className="p-6 rounded-3xl border shadow-xs space-y-5 transition-colors duration-300"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
          >
            <h2 className="text-base font-extrabold flex items-center gap-2">
              <PieChart className="w-4 h-4" style={{ color: 'var(--accent-color, #059669)' }} /> Pantry Composition
            </h2>

            <div className="space-y-4">
              {pantryCategories.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span style={{ color: 'var(--text-main)' }}>{cat.name}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{cat.percentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic AI Smart Recommendation Card */}
          <div 
            className="p-6 rounded-3xl text-white shadow-xl space-y-3 relative overflow-hidden transition-all duration-300"
            style={{ background: 'var(--banner-gradient, linear-gradient(135deg, #059669, #0d9488, #0891b2))' }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" /> AI Smart Recommendation
            </div>
            
            <h3 className="font-extrabold text-base leading-snug">
              You have ₹320 worth of dairy expiring soon.
            </h3>
            
            <p className="text-xs text-white/90 leading-relaxed">
              Consider making <strong>Palak Paneer</strong> or <strong>Dahi Tadka</strong> for dinner tonight to utilize 100% of your remaining curd and heavy cream.
            </p>

            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          </div>

        </div>

      </div>

    </div>
  );
}