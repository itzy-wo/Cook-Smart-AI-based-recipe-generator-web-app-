import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Tag, 
  Clock,
  Filter,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Pantry() {
  const navigate = useNavigate();

  // Dynamic Pantry State
  const [items, setItems] = useState([
    {
      id: '1',
      name: 'Heavy Cream',
      quantity: 150,
      unit: 'ml',
      category: 'Dairy',
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: '2',
      name: 'Button Mushrooms',
      quantity: 200,
      unit: 'g',
      category: 'Produce',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: '3',
      name: 'Garlic Cloves',
      quantity: 6,
      unit: 'pcs',
      category: 'Produce',
      expiryDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ]);

  // Controls & Modal State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State for Adding New Item
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unit: 'g',
    category: 'Produce',
    expiryDate: ''
  });

  const categories = ['All', 'Produce', 'Dairy', 'Grains', 'Proteins', 'Baking', 'Spices'];

  // Helper: Calculate days until expiration dynamically
  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return null;
    const diff = new Date(expiryDate).getTime() - new Date().setHours(0, 0, 0, 0);
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  // Dynamic Handlers
  const handleQuantityChange = (id, delta) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const step = item.unit === 'pcs' ? 1 : 25;
          const newQty = Math.max(0, item.quantity + delta * step);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quantity) return;

    const newItem = {
      id: crypto.randomUUID(),
      name: formData.name.trim(),
      quantity: Number(formData.quantity),
      unit: formData.unit,
      category: formData.category,
      expiryDate: formData.expiryDate
    };

    setItems((prev) => [newItem, ...prev]);
    setFormData({ name: '', quantity: '', unit: 'g', category: 'Produce', expiryDate: '' });
    setIsModalOpen(false);
  };

  const handleUseInRecipe = (ingredientName) => {
    // Navigates to Recipe Generator with pre-selected ingredient state
    navigate('/recipes', { state: { selectedIngredient: ingredientName } });
  };

  // Dynamic Filter Computations
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const expiringCount = items.filter((item) => {
    const days = getDaysLeft(item.expiryDate);
    return days !== null && days <= 2 && days >= 0;
  }).length;

  return (
    <div className="p-8 space-y-8 bg-slate-50 min-h-screen text-slate-800">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <span>🥕</span> My Smart Pantry
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage your ingredients and keep track of expiration dates dynamically.
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Ingredient</span>
        </button>
      </div>

      {/* Search & Category Filter Section */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pantry ingredients (e.g., Cream, Mushrooms, Garlic)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all text-slate-800"
          />
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 pl-1 pr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Live Counter & Alert Banner */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 px-1">
        <span>Showing <strong className="text-slate-800">{filteredItems.length}</strong> items</span>
        {expiringCount > 0 && (
          <span className="flex items-center gap-1.5 text-amber-700 font-semibold bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200/60">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            {expiringCount} {expiringCount === 1 ? 'item' : 'items'} expiring soon!
          </span>
        )}
      </div>

      {/* Dynamic Item Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-slate-200 space-y-3">
          <p className="text-4xl">🥑</p>
          <h3 className="text-lg font-bold text-slate-700">No ingredients found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query or add new items to your pantry.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const daysLeft = getDaysLeft(item.expiryDate);
            
            return (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
              >
                {/* Title & Dynamic Status */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 mb-2">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {daysLeft !== null && (
                    daysLeft <= 1 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                        <Clock className="w-3 h-3 text-amber-600" />
                        {daysLeft <= 0 ? 'Expires Today' : 'Tomorrow'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {daysLeft} days
                      </span>
                    )
                  )}
                </div>

                {/* Dynamic Quantity Modifier */}
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-500">In Stock</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs active:scale-95"
                    >
                      -
                    </button>
                    <span className="font-bold text-slate-800 text-sm min-w-12.5 text-center">
                      {item.quantity} {item.unit}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 flex items-center justify-center font-bold text-sm cursor-pointer shadow-xs active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button 
                    onClick={() => handleUseInRecipe(item.name)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 px-3 py-2 rounded-xl transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Use in Recipe</span>
                  </button>

                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Add Ingredient Dynamic Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h2 className="text-xl font-bold text-slate-800">Add New Ingredient</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Ingredient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greek Yogurt, Mozzarella"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="250"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    <option value="g">grams (g)</option>
                    <option value="kg">kg</option>
                    <option value="ml">ml</option>
                    <option value="liters">liters</option>
                    <option value="pcs">pieces (pcs)</option>
                    <option value="tbsp">tbsp</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white"
                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 block mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
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
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}