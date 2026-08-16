import React, { useEffect } from 'react';

export default function LoadingScreen({ onBypass }) {
  useEffect(() => {
    console.log("LoadingScreen mounted, setting 2.5s matrix timer...");
    
    const timer = setTimeout(() => {
      console.log("Timer complete! Executing bypass transition...");
      onBypass();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onBypass]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-900 z-50 font-sans select-none">
      <div className="text-center space-y-4">
        {/* Spin Icon */}
        <div className="text-6xl animate-spin inline-block duration-1000">
          🍳
        </div>
        
        {/* Title */}
        <h1 className="text-white text-2xl font-black tracking-wider">
          COOKSMART AI
        </h1>
        
        {/* Fail-safe Progress Bar Area */}
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden mx-auto relative">
          <div 
            className="h-full bg-gradient-to-r from-[#4CAF50] to-[#FF9800] rounded-full absolute left-0 top-0 workflow-progress"
            style={{
              animation: 'loadProgress 2.5s linear forwards',
              width: '0%'
            }}
          ></div>
        </div>
        
        <p className="text-slate-500 text-xs uppercase tracking-widest font-mono pt-2">
          Initializing Kitchen Matrix...
        </p>
      </div>

      {/* Embedded CSS Keyframe fallback to prevent Tailwind v4 config misses */}
      <style>{`
        @keyframes loadProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}