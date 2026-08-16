import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Utensils, 
  Flame, 
  ChefHat, 
  Ban, 
  X 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { currentTheme } = useTheme();
  const [currentStep, setCurrentStep] = useState(1);

  // Preference state
  const [dietaryPreference, setDietaryPreference] = useState('Pure Veg');
  const [selectedCuisines, setSelectedCuisines] = useState(['North Indian', 'Street Food']);
  const [skillLevel, setSkillLevel] = useState('Home Cook');
  const [dislikedIngredients, setDislikedIngredients] = useState(['Bitter Gourd (Karela)']);
  const [ingredientInput, setIngredientInput] = useState('');

  const totalSteps = 4;

  const diets = [
    { id: 'Pure Veg', title: 'Pure Vegetarian', desc: 'No meat, fish, or eggs. Dairy is welcome.', icon: '🥬' },
    { id: 'Jain', title: 'Jain Friendly', desc: 'Strictly no root vegetables, onion, or garlic.', icon: '🌿' },
    { id: 'Eggetarian', title: 'Eggetarian', desc: 'Vegetarian meals + whole eggs.', icon: '🥚' },
    { id: 'Non-Veg', title: 'Non-Vegetarian', desc: 'Includes chicken, mutton, fish & seafood.', icon: '🍗' },
    { id: 'Vegan', title: '100% Plant-Based Vegan', desc: 'No animal products or dairy.', icon: '🌱' }
  ];

  const cuisines = [
    'North Indian', 'South Indian', 'Maharashtrian', 'Gujarati', 
    'Bengali', 'Street Food & Chaat', 'Mughlai', 'Indo-Chinese'
  ];

  const skillLevels = [
    { id: 'Beginner', title: 'Kitchen Novice', desc: 'Quick 1-pot meals, easy 15-min recipes with basic steps.', icon: '🔪' },
    { id: 'Home Cook', title: 'Comfortable Cook', desc: 'Everyday rotis, dals, sabzis, and layered masalas.', icon: '🍳' },
    { id: 'Pro Chef', title: 'Master Desi Chef', desc: 'Complex biryanis, slow-cooked gravies & authentic baking.', icon: '👨‍🍳' }
  ];

  const handleToggleCuisine = (cuisine) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]
    );
  };

  const handleAddDisliked = (e) => {
    e.preventDefault();
    if (ingredientInput.trim() && !dislikedIngredients.includes(ingredientInput.trim())) {
      setDislikedIngredients([...dislikedIngredients, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const handleRemoveDisliked = (item) => {
    setDislikedIngredients(dislikedIngredients.filter((i) => i !== item));
  };

  const handleComplete = () => {
    const userPreferences = {
      dietaryPreference,
      selectedCuisines,
      skillLevel,
      dislikedIngredients
    };
    localStorage.setItem('cooksmart_preferences', JSON.stringify(userPreferences));
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen ${currentTheme?.bg || 'bg-slate-50'} flex flex-col justify-center items-center p-4 sm:p-6`}>
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-xl p-6 sm:p-10 space-y-8">
        
        {/* Progress Bar & Header */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs font-extrabold uppercase tracking-wider text-slate-400">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% Setup</span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Dietary Preference */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>🥗</span> Dietary Preferences
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Tell us your daily eating habits so Gemini filters your ingredients accurately.
              </p>
            </div>

            <div className="space-y-3">
              {diets.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setDietaryPreference(d.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    dietaryPreference === d.id
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{d.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{d.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{d.desc}</p>
                    </div>
                  </div>
                  {dietaryPreference === d.id && (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Regional Cuisines */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>🍛</span> Favorite Desi Cuisines
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Select regional cuisines you enjoy cooking at home (pick as many as you like).
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {cuisines.map((cuisine) => {
                const isSelected = selectedCuisines.includes(cuisine);
                return (
                  <button
                    key={cuisine}
                    type="button"
                    onClick={() => handleToggleCuisine(cuisine)}
                    className={`p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800'
                        : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'
                    }`}
                  >
                    <span>{cuisine}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-600 stroke-3" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Cooking Skill Level */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>👨‍🍳</span> Your Cooking Skill Level
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                This helps us tune the complexity of generated recipes and prep step timings.
              </p>
            </div>

            <div className="space-y-3">
              {skillLevels.map((lvl) => (
                <div
                  key={lvl.id}
                  onClick={() => setSkillLevel(lvl.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    skillLevel === lvl.id
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{lvl.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{lvl.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{lvl.desc}</p>
                    </div>
                  </div>
                  {skillLevel === lvl.id && (
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-3" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Disliked Ingredients & Allergies */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                <span>🚫</span> Disliked Ingredients & Allergies
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Any ingredients we should exclude completely from recipe recommendations?
              </p>
            </div>

            <form onSubmit={handleAddDisliked} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Peanuts, Karela, Eggplant..."
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white text-slate-800"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition cursor-pointer"
              >
                Add Tag
              </button>
            </form>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Excluded items:
              </span>
              <div className="flex flex-wrap gap-2">
                {dislikedIngredients.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 border border-rose-200 text-rose-700"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDisliked(item)}
                      className="text-rose-400 hover:text-rose-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-slate-100">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-6 py-3 rounded-2xl shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Complete Setup & Enter</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}