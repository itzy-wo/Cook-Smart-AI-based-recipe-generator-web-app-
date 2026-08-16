import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2.5 rounded font-medium transition ${
      isActive
        ? "bg-slate-800 text-white"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-slate-900 text-slate-400 p-6 hidden md:flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="text-white font-bold text-xl mb-8 flex items-center gap-2">
          <span>🍳</span>
          CookSmart AI
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <NavLink to="/dashboard" className={linkClasses}>
              🏠 Dashboard
            </NavLink> 
          <NavLink to="/pantry" className={linkClasses}>
            🥕 My Pantry
          </NavLink>

          <NavLink to="/meal-planner" className={linkClasses}>
            📅 Meal Planner
          </NavLink>

          <NavLink to="/analytics" className={linkClasses}>
            📊 Analytics
          </NavLink>

          <NavLink to="/ai-chat" className={linkClasses}>
            🤖 AI Chat
          </NavLink>
          <NavLink to="/recipes" className={linkClasses}>
                        🍳 AI Recipes
                      </NavLink>

          <NavLink to="/settings" className={linkClasses}>
            ⚙️ Settings
          </NavLink>
        </nav>
      </div>

      {/* Footer */}
      <div className="text-xs text-slate-600 border-t border-slate-800 pt-4">
        Semester Project v1.0
      </div>
    </aside>
  );
}