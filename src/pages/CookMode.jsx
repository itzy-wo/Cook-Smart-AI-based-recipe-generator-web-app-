import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  Flame,
  Clock,
  ChefHat
} from 'lucide-react';

const FALLBACK_RECIPE = {
  id: 'r1',
  name: 'Creamy Paneer Makhani & Jeera Rice',
  region: 'North Indian',
  time: '25 mins',
  calories: 460,
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
};

export default function CookMode() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state?.recipe || FALLBACK_RECIPE;

  const [currentStep, setCurrentStep] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [voiceFeedback, setVoiceFeedback] = useState('Click mic to start hands-free voice mode');
  const [ttsEnabled, setTtsEnabled] = useState(true);

  // Integrated 4-minute cooking timer
  const [timerSeconds, setTimerSeconds] = useState(240);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const recognitionRef = useRef(null);

  // Text to Speech
  const speakText = (text) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Speak on step change
  useEffect(() => {
    const stepText = `Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`;
    speakText(stepText);
  }, [currentStep]);

  // Cooking Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      speakText('Timer complete! Check your pan.');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Voice Command Setup (Web Speech API)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceFeedback('Voice recognition is not supported in this browser. Use Chrome/Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      setVoiceFeedback(`Heard: "${transcript}"`);

      if (transcript.includes('next') || transcript.includes('forward')) {
        setCurrentStep((prev) => Math.min(prev + 1, recipe.instructions.length - 1));
      } else if (transcript.includes('back') || transcript.includes('previous')) {
        setCurrentStep((prev) => Math.max(prev - 1, 0));
      } else if (transcript.includes('repeat') || transcript.includes('again')) {
        speakText(`Step ${currentStep + 1}: ${recipe.instructions[currentStep]}`);
      } else if (transcript.includes('start timer') || transcript.includes('start')) {
        setIsTimerRunning(true);
      } else if (transcript.includes('pause timer') || transcript.includes('stop timer') || transcript.includes('pause')) {
        setIsTimerRunning(false);
      } else if (transcript.includes('reset timer')) {
        setIsTimerRunning(false);
        setTimerSeconds(240);
      }
    };

    recognition.onerror = (e) => {
      if (e.error !== 'no-speech') {
        setVoiceFeedback(`Voice error: ${e.error}`);
      }
    };

    recognition.onend = () => {
      if (isListening) {
        try {
          recognition.start();
        } catch {
          // Restart gracefully
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [currentStep, isListening]);

  const toggleVoiceMode = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      setVoiceFeedback('Voice mode paused.');
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setVoiceFeedback('Listening for commands: "Next", "Back", "Repeat", "Start Timer"...');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const isLastStep = currentStep === recipe.instructions.length - 1;

  return (
    <div 
      className="min-h-screen flex flex-col justify-between p-4 md:p-8 transition-colors duration-300 select-none"
      style={{ backgroundColor: 'var(--bg-app)', color: 'var(--text-main)' }}
    >
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition hover:opacity-80 cursor-pointer"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Cook Mode</span>
        </button>

        {/* Recipe Title & Badge */}
        <div className="text-center hidden sm:block">
          <span 
            className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
            style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)' }}
          >
            {recipe.region} Cuisine
          </span>
          <h1 className="text-lg font-black mt-1">{recipe.name}</h1>
        </div>

        {/* Voice & TTS Toggles */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTtsEnabled(!ttsEnabled)}
            className="p-3 rounded-2xl border transition cursor-pointer"
            style={{ 
              backgroundColor: 'var(--bg-card)', 
              borderColor: 'var(--border-color)',
              color: ttsEnabled ? 'var(--accent-color)' : 'var(--text-muted)'
            }}
            title={ttsEnabled ? 'Mute voice read-out' : 'Enable voice read-out'}
          >
            {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={toggleVoiceMode}
            className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer ${
              isListening ? 'animate-pulse text-white ring-4 ring-rose-400/30 bg-rose-600' : 'text-white'
            }`}
            style={{ backgroundColor: isListening ? '#e11d48' : 'var(--accent-color)' }}
          >
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            <span>{isListening ? 'Voice Active' : 'Enable Voice'}</span>
          </button>
        </div>
      </div>

      {/* Voice Status Prompt */}
      <div 
        className="mx-auto my-2 px-4 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-2 text-center"
        style={{ 
          backgroundColor: isListening ? 'rgba(225, 29, 72, 0.1)' : 'var(--bg-card)', 
          borderColor: isListening ? '#f43f5e' : 'var(--border-color)',
          color: isListening ? '#e11d48' : 'var(--text-muted)'
        }}
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{voiceFeedback}</span>
      </div>

      {/* Main Focus Card: Active Step Display */}
      <div className="max-w-4xl w-full mx-auto my-auto space-y-6">
        
        {/* Step Progress Tracker */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
            <span>Step {currentStep + 1} of {recipe.instructions.length}</span>
            <span>{Math.round(((currentStep + 1) / recipe.instructions.length) * 100)}% Completed</span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border-color)' }}>
            <div 
              className="h-full rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentStep + 1) / recipe.instructions.length) * 100}%`,
                backgroundColor: 'var(--accent-color)'
              }}
            />
          </div>
        </div>

        {/* Big Step Instruction Box */}
        <div 
          className="p-8 sm:p-12 rounded-3xl border shadow-xl flex flex-col justify-between min-h-80 transition-all"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span 
                className="w-10 h-10 rounded-2xl text-white font-black text-base flex items-center justify-center shadow-md"
                style={{ backgroundColor: 'var(--accent-color)' }}
              >
                {currentStep + 1}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Cooking Instruction
              </span>
            </div>

            <p className="text-xl sm:text-3xl font-black leading-relaxed tracking-tight">
              {recipe.instructions[currentStep]}
            </p>
          </div>

          {/* Desi Tip banner */}
          {recipe.desiTip && currentStep === 0 && (
            <div 
              className="mt-6 p-4 rounded-2xl border text-xs leading-relaxed flex items-center gap-3"
              style={{ 
                backgroundColor: 'var(--accent-light)', 
                borderColor: 'var(--accent-color)', 
                color: 'var(--text-main)' 
              }}
            >
              <span className="text-lg">💡</span>
              <div>
                <strong className="block">Chef's Secret:</strong>
                <span>{recipe.desiTip}</span>
              </div>
            </div>
          )}
        </div>

        {/* Integrated Hands-Free Companion Kitchen Timer */}
        <div 
          className="p-5 rounded-3xl border shadow-xs flex flex-wrap items-center justify-between gap-4"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Simmer / Fry Timer
              </p>
              <span className="text-2xl font-black font-mono tracking-tight">{formatTime(timerSeconds)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition shadow-sm cursor-pointer"
              style={{ backgroundColor: isTimerRunning ? '#e11d48' : 'var(--accent-color)' }}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
            </button>

            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(240);
              }}
              className="p-2 rounded-xl border transition hover:bg-slate-100 cursor-pointer"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Step Navigation Bar */}
      <div className="max-w-4xl w-full mx-auto pt-4 flex items-center justify-between gap-4">
        <button
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-4 rounded-2xl border font-bold text-sm transition cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        {isLastStep ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Finish Cooking!</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep((prev) => Math.min(prev + 1, recipe.instructions.length - 1))}
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-extrabold text-sm shadow-xl transition-all active:scale-95 cursor-pointer"
            style={{ backgroundColor: 'var(--accent-color)' }}
          >
            <span>Next Step</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
}