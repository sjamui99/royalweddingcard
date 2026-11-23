import React from 'react';
import { Languages } from 'lucide-react';

export function LanguageSwitcher({ lang, onToggle, isFloating = true, className = "" }) {
  if (isFloating) {
    return (
      <div className={`fixed bottom-4 left-4 z-40 ${className}`}>
        <div className="bg-stone-900/95 backdrop-blur-md border border-amber-400/50 rounded-full p-1 shadow-2xl flex items-center space-x-1">
          <div className="pl-2 pr-1 text-amber-400 flex items-center space-x-1">
            <Languages className="w-4 h-4" />
          </div>

          <button
            onClick={() => onToggle('en')}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 ${
              lang === 'en'
                ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            English
          </button>

          <button
            onClick={() => onToggle('hi')}
            className={`px-3 py-1.5 rounded-full text-xs font-sans font-semibold transition-all duration-300 ${
              lang === 'hi'
                ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                : 'text-stone-300 hover:text-white hover:bg-stone-800'
            }`}
          >
            हिंदी
          </button>
        </div>
      </div>
    );
  }

  // Inline version for footer
  return (
    <div className={`inline-flex items-center rounded-full bg-stone-900/90 border border-amber-400/40 p-1 shadow-lg ${className}`}>
      <span className="text-amber-400 pl-2.5 pr-1">
        <Languages className="w-3.5 h-3.5" />
      </span>
      <button
        onClick={() => onToggle('en')}
        className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
          lang === 'en'
            ? 'bg-amber-400 text-stone-950 font-bold shadow'
            : 'text-stone-300 hover:text-white'
        }`}
      >
        English
      </button>
      <button
        onClick={() => onToggle('hi')}
        className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
          lang === 'hi'
            ? 'bg-amber-400 text-stone-950 font-bold shadow'
            : 'text-stone-300 hover:text-white'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
