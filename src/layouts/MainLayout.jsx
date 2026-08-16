import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Carrot, 
  CalendarDays, 
  BarChart3, 
  Bot, 
  ChefHat, 
  Settings 
} from 'lucide-react';

export default function MainLayout() {
  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/pantry', label: 'My Pantry', icon: Carrot },
    { to: '/meal-planner', label: 'Meal Planner', icon: CalendarDays },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/ai-chat', label: 'AI Chat', icon: Bot },
    { to: '/recipes', label: 'AI Recipes', icon: ChefHat },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className="flex min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      {/* Dynamic Sidebar */}
      <aside 
        className="w-64 text-white flex flex-col justify-between p-4 shadow-xl shrink-0 transition-colors duration-300"
        style={{ backgroundColor: 'var(--sidebar-bg)' }}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-3 py-2">
            <span className="text-2xl">🍳</span>
            <span className="font-black text-xl tracking-tight text-white">CookSmart AI</span>
          </div>

          <nav className="space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`
                }
                style={({ isActive }) => ({
                  backgroundColor: isActive ? 'var(--accent-color, #059669)' : 'transparent',
                })}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-3 py-2 text-[11px] text-slate-400 font-medium opacity-60">
          Semester Project v1.0
        </div>
      </aside>

      {/* Main Content View with Dynamic Background */}
      <main 
        className="flex-1 overflow-y-auto min-h-screen transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
      >
        <Outlet />
      </main>
    </div>
  );
}