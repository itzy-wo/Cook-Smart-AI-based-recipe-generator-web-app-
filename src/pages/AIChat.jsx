import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Trash2, 
  RefreshCw, 
  ChefHat, 
  Lightbulb, 
  Clock, 
  Flame 
} from 'lucide-react';

const QUICK_PROMPTS = [
  'What can I cook with paneer, tomatoes & onions?',
  'Quick 15-minute healthy Indian evening snack',
  'How do I fix runny or overly salted dal?',
  'Suggest a high-protein vegetarian Indian dinner'
];

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Namaste Chef! 🙏 I am your CookSmart Desi Sous-Chef. Ask me about Indian recipes, ingredient substitutions, zero-waste meal ideas from your pantry, or quick cooking hacks!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom of the chat window
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI response stream
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('salt') || lower.includes('salty')) {
        botResponse = `Here are 3 quick Desi hacks to fix excess salt in your curry or dal:\n\n1. **Kneaded Atta Balls:** Drop 2 small balls of raw wheat dough into the simmering curry for 5 minutes, then remove them. They absorb excess sodium.\n2. **Boiled Potato:** Add raw or boiled peeled potato cubes to soak up salt.\n3. **Cream / Dahi / Ghee:** A spoonful of fresh malai, curd, or a dash of lemon juice will balance out sharpness!`;
      } else if (lower.includes('paneer')) {
        botResponse = `Here is a quick **Tawa Paneer Bhurji & Paratha combo** (Ready in 15 mins):\n\n• **Prep:** Crumble 200g paneer, finely chop 1 onion, 1 tomato, 2 green chilies.\n• **Tadka:** Heat 1 tbsp mustard oil/ghee with jeera, sauté ginger-garlic paste and onions.\n• **Spice Mix:** Add turmeric, red chili powder, pav bhaji masala, and tomatoes till soft.\n• **Finish:** Toss crumbled paneer with kasuri methi & fresh coriander. Serve hot with warm rotis! 🫓`;
      } else if (lower.includes('snack')) {
        botResponse = `Try **Crispy Masala Makhana & Roasted Chana Chaat** (10 mins, under 150 kcal):\n\n• Roast 1 cup lotus seeds (makhana) in 1 tsp desi ghee with chaat masala, turmeric, and black pepper.\n• Toss with roasted chana, diced cucumber, tomatoes, lemon juice, and chopped mint.\n• Crunchy, high-protein, and guilt-free!`;
      } else {
        botResponse = `Great question! To make the most of that, heat a pan with mustard oil or ghee, add a pinch of hing and cumin seeds, and layer your aromatics. Would you like a step-by-step recipe card with calorie and macro targets for this?`;
      }

      const reply = {
        id: crypto.randomUUID(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 900);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: 'Chat cleared. How can I assist your kitchen prep today? 👨‍🍳',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="p-6 md:p-8 bg-slate-50 min-h-screen text-slate-800 flex flex-col justify-between">
      
      {/* Header Bar */}
      <div className="flex justify-between items-center bg-white p-4 px-6 rounded-3xl border border-slate-100 shadow-xs mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              Gemini Kitchen Sous-Chef
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h1>
            <p className="text-xs text-slate-400">Trained on authentic Indian recipes & pantry optimization</p>
          </div>
        </div>

        <button
          onClick={handleClearChat}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition cursor-pointer"
          title="Reset conversation"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Thread Container */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-100 shadow-xs p-4 md:p-6 overflow-y-auto space-y-4 max-h-[60vh] min-h-[400px]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold ${
                isUser ? 'bg-slate-900' : 'bg-linear-to-tr from-emerald-500 to-teal-600'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs ${
                isUser 
                  ? 'bg-slate-900 text-white rounded-tr-xs' 
                  : 'bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-xs whitespace-pre-line'
              }`}>
                <p>{msg.text}</p>
                <span className={`block text-[10px] mt-2 text-right ${isUser ? 'text-slate-400' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shrink-0">
              <Bot className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="bg-slate-50 border border-slate-100 p-3 px-4 rounded-2xl rounded-tl-xs flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0 pl-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> Suggestions:
        </span>
        {QUICK_PROMPTS.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleSendMessage(prompt)}
            className="px-3.5 py-1.5 rounded-full bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 text-slate-600 text-xs whitespace-nowrap transition cursor-pointer active:scale-95 shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Message Box */}
      <div className="bg-white p-2 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask for Indian recipes, spice swaps, or tips for your pantry..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1 pl-4 py-2.5 text-sm bg-transparent border-none focus:outline-none text-slate-800"
        />
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim() || isTyping}
          className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 active:scale-95 text-white p-3 rounded-2xl shadow-md shadow-emerald-600/20 transition cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}