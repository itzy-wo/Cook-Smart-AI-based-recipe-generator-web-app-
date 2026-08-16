import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Flame, 
  Star, 
  ChefHat, 
  Filter, 
  X, 
  Check, 
  BookOpen,
  Utensils,
  Plus
} from 'lucide-react';

const INITIAL_RECIPES = [
  {
    id: 'r1',
    name: 'Creamy Paneer Makhani & Jeera Rice',
    region: 'North Indian',
    time: '25 mins',
    calories: 460,
    rating: 4.9,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
    ingredientsUsed: ['Paneer', 'Heavy Cream', 'Tomatoes', 'Butter', 'Kasuri Methi'],
    instructions: [
      'Puree ripe tomatoes with ginger, garlic, and cashews into a smooth paste.',
      'Melt butter in a pan with a pinch of cumin and cinnamon stick.',
      'Cook the puree on medium heat until ghee/oil starts separating.',
      'Add turmeric, Kashmiri red chili powder, garam masala, and salt.',
      'Pour in heavy cream, gently drop in paneer cubes, and crush kasuri methi over top.',
      'Simmer for 4 minutes and serve hot with aromatic Jeera Rice!'
    ],
    desiTip: 'Rub dried kasuri methi between your warm palms before adding to release deep aromatics.'
  },
  {
    id: 'r2',
    name: 'Crispy Mushroom & Capsicum Tawa Masala',
    region: 'Desi Street Style',
    time: '18 mins',
    calories: 320,
    rating: 4.8,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    ingredientsUsed: ['Mushrooms', 'Capsicum', 'Onions', 'Garam Masala'],
    instructions: [
      'Slice button mushrooms and green capsicum into thick strips.',
      'Heat mustard oil in a heavy flat bottom pan (tawa) till smoking.',
      'Toss sliced onions, crushed garlic, and green chilies on high flame.',
      'Add mushrooms, capsicum, cumin powder, and pav bhaji masala.',
      'Stir-fry briskly on high flame for 5 minutes to retain crunch without making it watery.',
      'Garnish with fresh chopped coriander and lemon juice.'
    ],
    desiTip: 'Do not salt mushrooms until the last minute of cooking so they don’t release moisture too fast.'
  },
  {
    id: 'r3',
    name: 'Homestyle Moong Dal Khichdi with Dahi Tadka',
    region: 'Comfort Food',
    time: '20 mins',
    calories: 380,
    rating: 4.9,
    difficulty: 'Quick',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    ingredientsUsed: ['Moong Dal', 'Rice', 'Curd', 'Onions'],
    instructions: [
      'Wash equal parts yellow moong dal and rice, then soak for 10 minutes.',
      'In a pressure cooker, add 1 tbsp desi ghee, hing (asafoetida), and cumin seeds.',
      'Add soaked dal-rice, turmeric, salt, and 3.5 cups of water.',
      'Pressure cook for 3-4 whistles on medium flame until soft.',
      'In a tadka pan, crackle mustard seeds, curry leaves, and green chilies in ghee.',
      'Pour tadka over fresh dahi (curd) and serve alongside steaming khichdi.'
    ],
    desiTip: 'A pinch of hing in the initial ghee fry elevates fragrance and aids digestion.'
  },
  {
    id: 'r4',
    name: 'Stuffed Paneer & Onion Paratha with Fresh Curd',
    region: 'North Indian',
    time: '15 mins',
    calories: 410,
    rating: 4.9,
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=800&q=80',
    ingredientsUsed: ['Atta', 'Paneer', 'Onions', 'Curd'],
    instructions: [
      'Grate paneer and mix with finely chopped onions, green chilies, ajwain, and salt.',
      'Roll a ball of whole wheat atta dough, place the spiced paneer filling in the center, and seal.',
      'Gently roll into a round paratha and roast on a hot tawa with ghee until golden crisp on both sides.',
      'Serve piping hot with chilled curd (dahi) and mango pickle.'
    ],
    desiTip: 'Adding a pinch of ajwain (carom seeds) to the paratha stuffing gives authentic Punjabi flavor.'
  }
];

export default function RecipeGenerator() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [selectedTag, setSelectedTag] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeModalRecipe, setActiveModalRecipe] = useState(null);

  // Available pantry ingredients
  const availableIngredients = ['Paneer', 'Mushrooms', 'Heavy Cream', 'Tomatoes', 'Curd', 'Onions', 'Moong Dal', 'Atta'];
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const filterTags = ['All', 'North Indian', 'Desi Street Style', 'Comfort Food', 'Under 20 Mins'];

  // Toggle ingredient selection & live filter
  const toggleIngredient = (name) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
  };

  // Generate dynamic AI recipe with selected ingredients
  const handleGenerateRecipes = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const chosen = selectedIngredients.length > 0 ? selectedIngredients : ['Paneer', 'Tomatoes', 'Onions'];
      
      const newCard = {
        id: crypto.randomUUID(),
        name: `Special Masala ${chosen[0]} with ${chosen[1] || 'Tadka'}`,
        region: 'North Indian',
        time: '20 mins',
        calories: 440,
        rating: 5.0,
        difficulty: 'Easy',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80',
        ingredientsUsed: chosen,
        instructions: [
          `Heat 1 tbsp ghee or oil in a pan, add cumin seeds and sauté ${chosen.join(' & ')}.`,
          'Add turmeric, red chili powder, garam masala, and salt to taste.',
          'Simmer on medium heat for 6-8 minutes until rich and aromatic.',
          'Garnish with freshly chopped coriander and serve hot!'
        ],
        desiTip: 'Cook the masala on a low flame till the oil separates for best flavor!'
      };

      setRecipes((prev) => [newCard, ...prev]);
      setIsGenerating(false);
    }, 700);
  };

  // Live filter: Matches selected tags AND selected ingredients
  const filteredRecipes = recipes.filter((r) => {
    const matchesTag = 
      selectedTag === 'All' 
        ? true 
        : selectedTag === 'Under 20 Mins' 
          ? parseInt(r.time) <= 20 
          : r.region === selectedTag;

    const matchesIngredients = 
      selectedIngredients.length === 0 
        ? true 
        : selectedIngredients.some((ing) => r.ingredientsUsed.includes(ing));

    return matchesTag && matchesIngredients;
  });

  return (
    <div 
      className="p-8 space-y-8 min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      
      {/* 1. Hero / Generator Banner */}
      <div 
        className="relative overflow-hidden rounded-3xl p-8 text-white shadow-xl space-y-6 transition-all duration-300"
        style={{ background: 'var(--banner-gradient, linear-gradient(135deg, #059669, #0d9488, #0891b2))' }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Gemini AI Desi Recipe Engine
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              What can we cook from your pantry today? 🍳
            </h1>
            <p className="text-emerald-100 mt-1 max-w-xl text-sm">
              Click ingredients below to filter matching recipes instantly, or generate brand new AI dishes.
            </p>
          </div>

          <button 
            type="button"
            onClick={handleGenerateRecipes}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-900 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-400/30 transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <ChefHat className="w-5 h-5" />
            <span>{isGenerating ? 'AI is Curating...' : 'Generate New Recipes'}</span>
          </button>
        </div>

        {/* Dynamic Pantry Ingredient Filter Chips */}
        <div className="relative z-20 space-y-2.5 pt-4 border-t border-white/20">
          <div className="flex justify-between items-center">
            <p className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
              Filter by your pantry ingredients:
            </p>
            {selectedIngredients.length > 0 && (
              <button 
                type="button"
                onClick={handleClearIngredients}
                className="text-xs text-amber-200 hover:text-white underline font-semibold cursor-pointer"
              >
                Clear selection ({selectedIngredients.length})
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {availableIngredients.map((ing) => {
              const isSelected = selectedIngredients.includes(ing);

              return (
                <button
                  type="button"
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer select-none active:scale-95 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-white scale-105'
                      : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
                  }`}
                >
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 stroke-3" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 opacity-70" />
                  )}
                  <span>{ing}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      </div>

      {/* 2. Cuisine Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        <span className="text-slate-400 flex items-center gap-1 pl-1 pr-2 shrink-0">
          <Filter className="w-3.5 h-3.5" /> Cuisine:
        </span>
        {filterTags.map((tag) => (
          <button
            type="button"
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-xl transition cursor-pointer whitespace-nowrap border ${
              selectedTag === tag
                ? 'text-white shadow-xs'
                : 'hover:opacity-80'
            }`}
            style={{
              backgroundColor: selectedTag === tag ? 'var(--accent-color, #059669)' : 'var(--bg-card)',
              borderColor: 'var(--border-color)',
              color: selectedTag === tag ? '#ffffff' : 'var(--text-muted)'
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* 3. Recipe Cards Grid */}
      {filteredRecipes.length === 0 ? (
        <div 
          className="rounded-3xl p-12 text-center border border-dashed space-y-3"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <p className="text-4xl">🥘</p>
          <h3 className="text-lg font-bold">No matching recipes found</h3>
          <p className="text-sm max-w-sm mx-auto" style={{ color: 'var(--text-muted)' }}>
            Try deselecting some ingredients or click <strong>"Generate New Recipes"</strong> to create one with Gemini!
          </p>
          <button
            type="button"
            onClick={handleClearIngredients}
            className="px-4 py-2 text-white text-xs font-bold rounded-xl cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color, #059669)' }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="rounded-3xl border shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent" />
                
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
                    {recipe.region}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                  <span className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {recipe.rating}
                  </span>
                  <span 
                    className="text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded-lg"
                    style={{ backgroundColor: 'var(--accent-color, #059669)' }}
                  >
                    {recipe.difficulty}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-lg transition-colors group-hover:opacity-80">
                    {recipe.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-semibold mt-2" style={{ color: 'var(--text-muted)' }}>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-amber-500" /> {recipe.calories} kcal
                    </span>
                  </div>

                  {/* Ingredients Included */}
                  <div className="mt-3 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.ingredientsUsed.map((ing, i) => {
                        const isMatch = selectedIngredients.includes(ing);
                        return (
                          <span 
                            key={i} 
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                              isMatch
                                ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                                : 'text-xs'
                            }`}
                            style={!isMatch ? { 
                              backgroundColor: 'var(--accent-light, #ecfdf5)', 
                              color: 'var(--accent-color, #059669)',
                              borderColor: 'var(--border-color)' 
                            } : undefined}
                          >
                            {ing}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Open Recipe Modal Button */}
                <button
                  type="button"
                  onClick={() => setActiveModalRecipe(recipe)}
                  className="w-full active:scale-98 text-white font-bold py-3 rounded-2xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                  style={{ backgroundColor: 'var(--accent-color, #059669)' }}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>View Recipe & Steps</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Step-by-Step Cooking Modal */}
      {activeModalRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div 
            className="w-full max-w-2xl rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          >
            
            <div className="flex justify-between items-start border-b pb-4" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span 
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: 'var(--accent-color, #059669)' }}
                >
                  {activeModalRecipe.region} Cuisine
                </span>
                <h2 className="text-2xl font-black mt-1">{activeModalRecipe.name}</h2>
                <div className="flex items-center gap-4 text-xs font-bold mt-2" style={{ color: 'var(--text-muted)' }}>
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                    <Clock className="w-3.5 h-3.5" /> {activeModalRecipe.time}
                  </span>
                  <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                    <Flame className="w-3.5 h-3.5 text-amber-500" /> {activeModalRecipe.calories} kcal
                  </span>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setActiveModalRecipe(null)}
                className="p-2 rounded-xl transition cursor-pointer hover:opacity-80"
                style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-muted)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Key Ingredients */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <Utensils className="w-4 h-4" style={{ color: 'var(--accent-color, #059669)' }} /> Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeModalRecipe.ingredientsUsed.map((ing, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border"
                    style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
                  >
                    ✓ {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <ChefHat className="w-4 h-4" style={{ color: 'var(--accent-color, #059669)' }} /> Step-by-Step Cooking Steps (Vidhi)
              </h3>
              <div className="space-y-2.5">
                {activeModalRecipe.instructions.map((step, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3.5 rounded-2xl border text-xs leading-relaxed"
                    style={{ backgroundColor: 'var(--bg-app)', borderColor: 'var(--border-color)' }}
                  >
                    <span 
                      className="w-5 h-5 rounded-full text-white font-bold flex items-center justify-center shrink-0 text-[10px]"
                      style={{ backgroundColor: 'var(--accent-color, #059669)' }}
                    >
                      {idx + 1}
                    </span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desi Tip */}
            {activeModalRecipe.desiTip && (
              <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-2xl text-xs space-y-1">
                <span className="font-extrabold text-amber-800 flex items-center gap-1.5">
                  💡 Desi Chef's Secret Tip
                </span>
                <p className="text-amber-900 leading-relaxed">
                  {activeModalRecipe.desiTip}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex justify-between items-center pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
              <button
                type="button"
                onClick={() => navigate('/cook-mode', { state: { recipe: activeModalRecipe } })}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-md cursor-pointer transition active:scale-95"
                style={{ backgroundColor: 'var(--accent-color, #059669)' }}
              >
                <ChefHat className="w-4 h-4" />
                <span>Start Cook Mode 🎙️</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModalRecipe(null)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Close Recipe
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}