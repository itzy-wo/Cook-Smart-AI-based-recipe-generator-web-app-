import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext'; // Adjust to './conext/ThemeContext' if not renamed

// Public Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Onboarding from './pages/Onboarding';

// App Pages
import Dashboard from './pages/Dashboard';
import Pantry from './pages/Pantry';
import MealPlanner from './pages/MealPlanner';
import Analytics from './pages/Analytics';
import AIChat from './pages/AIChat';
import Settings from './pages/Settings';
import RecipeGenerator from './pages/RecipeGenerator';

// Layout
import MainLayout from './layouts/MainLayout';

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/cook-mode" element={<CookMode />} />
        {/* Pages with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/recipes" element={<RecipeGenerator />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}