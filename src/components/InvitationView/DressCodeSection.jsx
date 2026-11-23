import React, { useState } from 'react';
import { Shirt, Sparkles } from 'lucide-react';
import { getTranslation } from '../../utils/translations';

export function DressCodeSection({ dressCode, lang = 'en' }) {
  const [activeTab, setActiveTab] = useState('women');

  if (!dressCode) return null;

  const womenText = lang === 'hi'
    ? (dressCode.women.includes('pastel') ? getTranslation('womenDress', 'hi') : dressCode.women)
    : dressCode.women;

  const menText = lang === 'hi'
    ? (dressCode.men.includes('formal') ? getTranslation('menDress', 'hi') : dressCode.men)
    : dressCode.men;

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto text-center select-none">
      {/* Icon & Title */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 mb-1.5 shadow-sm">
          <Shirt className="w-5 h-5 text-amber-700" />
        </div>
        <h3 className="font-serif italic text-2xl text-stone-800">
          {getTranslation('dressCode', lang)}
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex rounded-full p-1 bg-amber-100/60 border border-amber-200 max-w-[220px] mx-auto mb-4">
        <button
          onClick={() => setActiveTab('women')}
          className={`flex-1 py-1.5 text-xs font-sans font-semibold rounded-full transition-all duration-300 ${
            activeTab === 'women'
              ? 'bg-emerald-800 text-amber-200 shadow-sm'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          {getTranslation('women', lang)}
        </button>
        <button
          onClick={() => setActiveTab('men')}
          className={`flex-1 py-1.5 text-xs font-sans font-semibold rounded-full transition-all duration-300 ${
            activeTab === 'men'
              ? 'bg-emerald-800 text-amber-200 shadow-sm'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          {getTranslation('men', lang)}
        </button>
      </div>

      {/* Content Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-amber-200/90 shadow-sm min-h-[90px] flex items-center justify-center transition-all duration-300">
        <div className="flex flex-col items-center">
          <Sparkles className="w-4 h-4 text-amber-600 mb-1.5" />
          <p className="font-serif italic text-base text-stone-800">
            {activeTab === 'women' ? womenText : menText}
          </p>
        </div>
      </div>
    </div>
  );
}
