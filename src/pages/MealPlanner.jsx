import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Flame, 
  Clock, 
  RotateCcw, 
  Trash2, 
  PieChart,
  X
} from 'lucide-react';

const INDIAN_MEAL_PLAN = {
  Monday: {
    breakfast: { id: 'm1', name: 'Kanda Poha with Peanuts & Lemon', calories: 290, protein: 7, carbs: 48, fat: 9, time: '15 mins' },
    lunch: { id: 'm2', name: 'Dal Tadka + 2 Phulkas + Jeera Aloo & Salad', calories: 480, protein: 18, carbs: 70, fat: 12, time: '25 mins' },
    dinner: { id: 'm3', name: 'Paneer Bhurji with 2 Multigrain Rotis', calories: 460, protein: 26, carbs: 32, fat: 24, time: '20 mins' },
    snack: { id: 'm4', name: 'Roasted Makhana & Ginger Masala Chai', calories: 130, protein: 4, carbs: 18, fat: 4, time: '5 mins' },
  },
  Tuesday: {
    breakfast: { id: 't1', name: 'Besan Chilla with Mint Chutney (2 pcs)', calories: 310, protein: 14, carbs: 38, fat: 10, time: '15 mins' },
    lunch: { id: 't2', name: 'Rajma Masala with Steamed Brown Rice', calories: 520, protein: 21, carbs: 82, fat: 10, time: '30 mins' },
    dinner: { id: 't3', name: 'Palak Paneer with 2 Jowar/Wheat Rotis', calories: 440, protein: 24, carbs: 36, fat: 22, time: '25 mins' },
    snack: { id: 't4', name: 'Moong Sprout Chaat with Cucumbers & Lime', calories: 150, protein: 9, carbs: 24, fat: 1, time: '5 mins' },
  },
  Wednesday: {
    breakfast: { id: 'w1', name: 'Vegetable Idli with Coconut & Sambar (3 pcs)', calories: 320, protein: 9, carbs: 58, fat: 5, time: '20 mins' },
    lunch: { id: 'w2', name: 'Chole Masala with Jeera Rice & Onion Salad', calories: 540, protein: 20, carbs: 86, fat: 12, time: '30 mins' },
    dinner: { id: 'w3', name: 'Methi Thepla with Low-Fat Curd (2 pcs)', calories: 380, protein: 13, carbs: 48, fat: 14, time: '20 mins' },
    snack: { id: 'w4', name: 'Roasted Chana with Jaggery', calories: 140, protein: 7, carbs: 22, fat: 2, time: '2 mins' },
  },
  Thursday: { breakfast: null, lunch: null, dinner: null, snack: null },
  Friday: { breakfast: null, lunch: null, dinner: null, snack: null },
  Saturday: { breakfast: null, lunch: null, dinner: null, snack: null },
  Sunday: { breakfast: null, lunch: null, dinner: null, snack: null }
};

export default function MealPlanner() {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [weeklyPlan, setWeeklyPlan] = useState(INDIAN_MEAL_PLAN);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState('breakfast');
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    time: '20 mins'
  });

  const dailyGoal = { calories: 1800, protein: 90, carbs: 220, fat: 50 };

  // Calculate day macros dynamically
  const currentDayMeals = weeklyPlan[selectedDay] || {};
  const activeMeals = Object.values(currentDayMeals).filter(Boolean);

  const totalCalories = activeMeals.reduce((sum, m) => sum + (Number(m.calories) || 0), 0);
  const totalProtein = activeMeals.reduce((sum, m) => sum + (Number(m.protein) || 0), 0);
  const totalCarbs = activeMeals.reduce((sum, m) => sum + (Number(m.carbs) || 0), 0);
  const totalFat = activeMeals.reduce((sum, m) => sum + (Number(m.fat) || 0), 0);

  const handleOpenAddModal = (slot) => {
    setTargetSlot(slot);
    setFormData({ name: '', calories: '', protein: '', carbs: '', fat: '', time: '20 mins' });
    setIsModalOpen(true);
  };

  const handleSaveMeal = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newMeal = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      calories: Number(formData.calories) || 350,
      protein: Number(formData.protein) || 12,
      carbs: Number(formData.carbs) || 50,
      fat: Number(formData.fat) || 10,
      time: formData.time || '20 mins'
    };

    setWeeklyPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [targetSlot]: newMeal
      }
    }));

    setIsModalOpen(false);
  };

  const handleRemoveMeal = (slot) => {
    setWeeklyPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [slot]: null
      }
    }));
  };

  // Indian AI meal plans generation
  const handleAiAutoFill = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const aiSuggestions = {
        breakfast: { id: crypto.randomUUID(), name: 'Vegetable Upma with Sambar & Filter Coffee', calories: 310, protein: 9, carbs: 54, fat: 7, time: '15 mins' },
        lunch: { id: crypto.randomUUID(), name: 'Moong Dal Khichdi with Ghee, Curd & Papad', calories: 460, protein: 18, carbs: 68, fat: 12, time: '20 mins' },
        dinner: { id: crypto.randomUUID(), name: 'Soya Chunks Curry with 2 Phulkas & Kachumber Salad', calories: 430, protein: 32, carbs: 42, fat: 11, time: '25 mins' },
        snack: { id: crypto.randomUUID(), name: 'Bhelpuri (Light on Chutney) or Murmura Chaat', calories: 160, protein: 4, carbs: 32, fat: 3, time: '5 mins' }
      };

      setWeeklyPlan((prev) => ({
        ...prev,
        [selectedDay]: aiSuggestions
      }));
      setIsGenerating(false);
    }, 700);
  };

  const mealSlots = [
    { key: 'breakfast', label: 'Nashta / Breakfast', emoji: '☕', defaultTime: '15 mins' },
    { key: 'lunch', label: 'Dopahar ka Khana / Lunch', emoji: '🍛', defaultTime: '25 mins' },
    { key: 'dinner', label: 'Raat ka Khana / Dinner', emoji: '🫓', defaultTime: '20 mins' },
    { key: 'snack', label: 'Evening Snacks / Chaat', emoji: '🥟', defaultTime: '5 mins' }
  ];

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-800">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <span>🍛</span> Indian Meal Planner
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Plan your home-style thalis, track calories, and suggest desi recipes with Gemini AI.
          </p>
        </div>

        <button 
          onClick={handleAiAutoFill}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>{isGenerating ? 'AI is Curating...' : 'Auto-Plan Desi Meals with AI'}</span>
        </button>
      </div>

      {/* Week Day Selector */}
      <div className="bg-white p-2.5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-2 overflow-x-auto">
        {daysOfWeek.map((day) => {
          const isSelected = selectedDay === day;
          const hasMeals = Object.values(weeklyPlan[day] || {}).some(Boolean);

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`flex-1 min-w-[100px] py-3 px-4 rounded-2xl text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'hover:bg-slate-100 text-slate-600'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider">{day.slice(0, 3)}</span>
              <span className="text-sm font-bold">{day}</span>
              <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${hasMeals ? (isSelected ? 'bg-emerald-400' : 'bg-emerald-500') : 'bg-transparent'}`} />
            </button>
          );
        })}
      </div>

      {/* Daily Macro Progress Summary */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <PieChart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">{selectedDay}'s Nutrition Summary</h3>
              <p className="text-xs text-slate-400">Total daily macro breakdown</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-slate-900">{totalCalories}</span>
            <span className="text-xs font-bold text-slate-400">/ {dailyGoal.calories} kcal</span>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">💪 Protein</span>
              <span className="text-slate-900">{totalProtein}g / {dailyGoal.protein}g</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalProtein / dailyGoal.protein) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">🌾 Carbs</span>
              <span className="text-slate-900">{totalCarbs}g / {dailyGoal.carbs}g</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalCarbs / dailyGoal.carbs) * 100)}%` }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">🧈 Fats / Ghee</span>
              <span className="text-slate-900">{totalFat}g / {dailyGoal.fat}g</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totalFat / dailyGoal.fat) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Meal Slots List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealSlots.map(({ key, label, emoji }) => {
          const meal = currentDayMeals[key];

          return (
            <div 
              key={key}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:shadow-md transition-all relative overflow-hidden"
            >
              {/* Header inside card */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{emoji}</span>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg">{label}</h4>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {meal ? 'Added to Menu' : 'Not Planned'}
                    </span>
                  </div>
                </div>

                {meal && (
                  <button 
                    onClick={() => handleRemoveMeal(key)}
                    className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition cursor-pointer"
                    title="Remove meal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Meal Content or Empty State */}
              {meal ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h5 className="font-extrabold text-slate-900 text-base">{meal.name}</h5>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Flame className="w-3.5 h-3.5" /> {meal.calories} kcal
                    </span>
                    <span className="flex items-center gap-1 text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {meal.time}
                    </span>
                    <span className="text-slate-600">Protein: <strong className="text-slate-800">{meal.protein}g</strong></span>
                    <span className="text-slate-600">Carbs: <strong className="text-slate-800">{meal.carbs}g</strong></span>
                    <span className="text-slate-600">Fat: <strong className="text-slate-800">{meal.fat}g</strong></span>
                  </div>
                </div>
              ) : (
                <div 
                  onClick={() => handleOpenAddModal(key)}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-emerald-100 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center transition">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-emerald-700">
                    Add dish to {label.split('/')[0].trim()}
                  </span>
                </div>
              )}

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={() => handleOpenAddModal(key)}
                  className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                >
                  {meal ? 'Edit Dish' : '+ Add Custom Dish'}
                </button>

                <button 
                  onClick={handleAiAutoFill}
                  className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Auto-Suggest
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Custom Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-800 capitalize">Add Dish to {targetSlot}</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMeal} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Dish Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Paneer Tikka Masala with 2 Phulkas"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Calories (kcal)</label>
                  <input
                    type="number"
                    placeholder="450"
                    value={formData.calories}
                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Prep & Cook Time</label>
                  <input
                    type="text"
                    placeholder="25 mins"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Protein (g)</label>
                  <input
                    type="number"
                    placeholder="18"
                    value={formData.protein}
                    onChange={(e) => setFormData({ ...formData, protein: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Carbs (g)</label>
                  <input
                    type="number"
                    placeholder="65"
                    value={formData.carbs}
                    onChange={(e) => setFormData({ ...formData, carbs: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Fats (g)</label>
                  <input
                    type="number"
                    placeholder="14"
                    value={formData.fat}
                    onChange={(e) => setFormData({ ...formData, fat: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-600/20 cursor-pointer"
                >
                  Save Dish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}