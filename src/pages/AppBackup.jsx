import { supabase } from "./lib/supabase";
import React, { useState, useEffect } from 'react';
import Welcome from './pages/Welcome.jsx'; 
import LoadingScreen from "./components/LoadingScreen.jsx";
import MealPlanner from "./pages/MealPlanner.jsx";
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // 🔑 CHANGE: Default user to an authenticated state instead of null to bypass login on boot
  const [user, setUser] = useState({ email: 'developer@cooksmart.ai' }); 
  const [authStep, setAuthStep] = useState('login'); 
  
  // Auth Form Input States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [securityQuestion, setSecurityQuestion] = useState(
  "What is your favorite fruit?"
);

const [securityAnswer, setSecurityAnswer] = useState("");
  // Recovery Security States
  const [selectedQuestion, setSelectedQuestion] = useState('What is your favorite fruit?');
  const [recoveryAnswer, setRecoveryAnswer] = useState('');
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Dropdown Options List
  const securityQuestions = [
    "What is your favorite fruit?",
    "What was the name of your first pet?",
    "What is your favorite color?",
    "What is your dream destination?",
    "What was your childhood nickname?"
  ];

  // ⏱️ Standardized Loading Sequence Delay (2 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

   const handleRegister = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    setAuthError(error.message);
    return;
  }

  const { error: insertError } = await supabase.from("users").insert([
    {
      id: data.user.id,
      email: email,
      skill_level: "Beginner",
    },
  ]);

  if (insertError) {
    setAuthError(insertError.message);
    return;
  }

  setSuccessMessage("Account created successfully!");
  setAuthStep("login");
};
  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setAuthError(error.message);
    return;
  }

  setUser(data.user);
  setAuthError("");
};

  const handleRecovery = (e) => {
    e.preventDefault();
    if (recoveryAnswer.toLowerCase().trim() === 'cybercat') {
      setSuccessMessage('Identity verified successfully. Password reset granted.');
      setAuthError('');
      setTimeout(() => {
        setSuccessMessage('');
        setAuthStep('login');
      }, 2500);
    } else {
      setAuthError('Incorrect recovery key answer. Access denied.');
    }
  };

  // Triggers when clicking "Get Started" or "Profile Setup / Login" to take them to auth pages
  const handleLogOut = () => {
    setUser(null);
    setAuthStep('login');
  };

  // 1. Render Loading Screen Sequence first
  if (isLoading) {
    return <LoadingScreen />;
  }

  // 2. Render Main Application once authenticated
  if (user) {
    return <Welcome onLogOut={handleLogOut} />;
  }

  // 3. Fallback to Gateway Core (Login / Register / Forgot Password)
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-slate-200 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-green-500 to-amber-500"></div>
        
        <div className="text-center mb-6">
          <span className="text-4xl">🍳</span>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight mt-2">CookSmart AI</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono mt-0.5">Control Panel Gateway</p>
        </div>

        {authError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-600 font-medium text-xs p-3.5 rounded-xl mb-4 text-center">
            ⚠️ {authError}
          </div>
        )}

        {successMessage && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs p-3.5 rounded-xl mb-4 text-center">
            ✨ {successMessage}
          </div>
        )}

        {/* 🔑 LOGIN STEP */}
        {authStep === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-green-500 transition" 
                placeholder="developer@cooksmart.ai"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Account Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-green-500 transition" 
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-md transition cursor-pointer text-sm uppercase">
              Authorize Account ➔
            </button>
            <div className="flex justify-between text-xs font-medium pt-2">
              <button type="button" onClick={() => setAuthStep('forgot')} className="text-amber-600 hover:underline cursor-pointer">Forgot Recovery Key?</button>
              <button type="button" onClick={() => setAuthStep('register')} className="text-slate-500 hover:underline cursor-pointer">Create Account</button>
            </div>
          </form>
        )}

        {/* 📝 REGISTER STEP */}
        {authStep === 'register' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Choose Username</label>
              <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-green-500 transition"
                  placeholder="ChefCyberCat"
                />
              </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-green-500 transition" placeholder="name@domain.com" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Set Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-green-500 transition" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl shadow-md transition cursor-pointer text-sm uppercase">
              Register Credentials ➔
            </button>
            <div className="text-center text-xs font-medium pt-2">
              <button type="button" onClick={() => setAuthStep('login')} className="text-slate-500 hover:underline cursor-pointer">Already registered? Log In</button>
            </div>
          </form>
        )}

        {/* 🛡️ PASSWORD RECOVERY STEP */}
        {authStep === 'forgot' && (
          <form onSubmit={handleRecovery} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Select Security Question</label>
              <select 
                value={selectedQuestion}
                onChange={(e) => setSelectedQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm focus:outline-hidden focus:border-amber-500 transition font-medium text-slate-700 cursor-pointer"
              >
                {securityQuestions.map((q, i) => (
                  <option key={i} value={q}>{q}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Secret Verification Answer</label>
              <input 
                type="text" 
                required 
                value={recoveryAnswer}
                onChange={(e) => setRecoveryAnswer(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:border-amber-500 transition" 
                placeholder="Type security override token..."
              />
            </div>
            <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md transition cursor-pointer text-sm uppercase">
              Verify Secret Answer ➔
            </button>
            <div className="text-center text-xs font-medium pt-2">
              <button type="button" onClick={() => setAuthStep('login')} className="text-slate-500 hover:underline cursor-pointer">Return to Login</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}