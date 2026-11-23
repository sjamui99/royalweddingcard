import React, { useState } from 'react';
import { WaxSeal } from '../common/Ornaments';
import { royalAudio } from '../../utils/audioPlayer';
import { triggerRoyalConfetti } from '../../utils/confetti';
import { getTranslation } from '../../utils/translations';

export function LuxuryEnvelopeGatefold({ isOpened, onOpen, card, lang = 'en' }) {
  // Stages: 'closed' -> 'doors_opened' -> 'curtains_opened' -> 'completed'
  const [stage, setStage] = useState('closed');

  const handleOpen = () => {
    if (stage !== 'closed') return;

    // 1. Audio and confetti on seal tap
    royalAudio.playRoyalSealSound();
    triggerRoyalConfetti(0.5, 0.45);

    // 2. Stage 1: Slide open green doors (revealing curtain page)
    setStage('doors_opened');

    // 3. Stage 2: After green doors slide open, draw open the pleated silk curtains
    setTimeout(() => {
      royalAudio.startBackgroundMelody();
      setStage('curtains_opened');
    }, 900);

    // 4. Stage 3: Curtains fully open -> reveal card & start sequential text animation
    setTimeout(() => {
      setStage('completed');
      onOpen();
    }, 2000);
  };

  const themePrimary = card?.theme?.primary || '#1f3824';

  if (stage === 'completed' && isOpened) {
    return null;
  }

  const greenDoorsOpen = stage === 'doors_opened' || stage === 'curtains_opened' || stage === 'completed';
  const curtainsOpen = stage === 'curtains_opened' || stage === 'completed';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        stage === 'completed' ? 'pointer-events-none opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <div className="relative w-full h-full max-w-md mx-auto overflow-hidden shadow-2xl flex">
        
        {/* ========================================================
            PAGE 2: PLEATED SILK CURTAIN PAGE (BEHIND GREEN DOORS)
           ======================================================== */}
        <div className="absolute inset-0 flex z-10 overflow-hidden pointer-events-none">
          {/* Left Pleated Silk Curtain */}
          <div
            className={`relative w-1/2 h-full pleated-silk border-r border-amber-300/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              curtainsOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Curtain Fold Shading Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/25 pointer-events-none" />
            
            {/* Golden Fringe / Trim at bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 border-t border-amber-200/50" />
          </div>

          {/* Right Pleated Silk Curtain */}
          <div
            className={`relative w-1/2 h-full pleated-silk border-l border-amber-300/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.65,0,0.35,1)] ${
              curtainsOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Curtain Fold Shading Overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/15 via-transparent to-black/25 pointer-events-none" />

            {/* Golden Fringe / Trim at bottom edge */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 border-t border-amber-200/50" />
          </div>

          {/* Central Curtain Seam Glow */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-amber-200 via-amber-400 to-amber-200 transition-opacity duration-300 ${
              curtainsOpen ? 'opacity-0' : 'opacity-60'
            }`}
          />
        </div>

        {/* ========================================================
            PAGE 1: TAPPING PAGE (GREEN GATEFOLD DOORS + WAX SEAL)
           ======================================================== */}
        <div className="absolute inset-0 flex z-20 overflow-hidden">
          {/* Left Gatefold Door */}
          <div
            style={{ backgroundColor: themePrimary }}
            className={`relative w-1/2 h-full emerald-damask border-r border-amber-300/40 shadow-2xl transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between p-4 ${
              greenDoorsOpen ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Inner Golden Border Framing */}
            <div className="absolute inset-2 border-2 border-amber-400/50 pointer-events-none rounded-l-lg">
              <div className="absolute inset-1 border border-amber-300/30 rounded-l-md" />
            </div>

            {/* Top Left Filigree */}
            <div className="relative z-10 text-amber-300/60 p-2">
              <svg className="w-8 h-8" viewBox="0 0 40 40" fill="currentColor">
                <path d="M0 0 C15 5, 25 15, 30 30 C20 20, 10 15, 0 10 Z" />
                <circle cx="8" cy="8" r="2" />
              </svg>
            </div>

            {/* Left Embossed Leaf Vines */}
            <div className="relative z-10 my-auto text-amber-200/20 flex flex-col items-center">
              <svg className="w-16 h-48 opacity-40" viewBox="0 0 60 200" fill="currentColor">
                <path d="M30 0 Q45 50 30 100 Q15 150 30 200" stroke="currentColor" strokeWidth="2" fill="none" />
                <ellipse cx="22" cy="40" rx="10" ry="5" transform="rotate(-30 22 40)" />
                <ellipse cx="38" cy="70" rx="10" ry="5" transform="rotate(30 38 70)" />
                <ellipse cx="20" cy="110" rx="11" ry="5" transform="rotate(-25 20 110)" />
                <ellipse cx="40" cy="140" rx="10" ry="5" transform="rotate(35 40 140)" />
                <ellipse cx="22" cy="170" rx="9" ry="4" transform="rotate(-20 22 170)" />
              </svg>
            </div>

            {/* Bottom Left Filigree */}
            <div className="relative z-10 text-amber-300/60 p-2">
              <svg className="w-8 h-8 transform rotate-270" viewBox="0 0 40 40" fill="currentColor">
                <path d="M0 40 C15 35, 25 25, 30 10 C20 20, 10 25, 0 30 Z" />
                <circle cx="8" cy="32" r="2" />
              </svg>
            </div>
          </div>

          {/* Right Gatefold Door */}
          <div
            style={{ backgroundColor: themePrimary }}
            className={`relative w-1/2 h-full emerald-damask border-l border-amber-300/40 shadow-2xl transition-transform duration-900 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between p-4 ${
              greenDoorsOpen ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            {/* Inner Golden Border Framing */}
            <div className="absolute inset-2 border-2 border-amber-400/50 pointer-events-none rounded-r-lg">
              <div className="absolute inset-1 border border-amber-300/30 rounded-r-md" />
            </div>

            {/* Top Right Filigree */}
            <div className="relative z-10 text-amber-300/60 p-2 ml-auto">
              <svg className="w-8 h-8 transform rotate-90" viewBox="0 0 40 40" fill="currentColor">
                <path d="M0 0 C15 5, 25 15, 30 30 C20 20, 10 15, 0 10 Z" />
                <circle cx="8" cy="8" r="2" />
              </svg>
            </div>

            {/* Right Embossed Leaf Vines */}
            <div className="relative z-10 my-auto text-amber-200/20 flex flex-col items-center">
              <svg className="w-16 h-48 opacity-40 transform scale-x-[-1]" viewBox="0 0 60 200" fill="currentColor">
                <path d="M30 0 Q45 50 30 100 Q15 150 30 200" stroke="currentColor" strokeWidth="2" fill="none" />
                <ellipse cx="22" cy="40" rx="10" ry="5" transform="rotate(-30 22 40)" />
                <ellipse cx="38" cy="70" rx="10" ry="5" transform="rotate(30 38 70)" />
                <ellipse cx="20" cy="110" rx="11" ry="5" transform="rotate(-25 20 110)" />
                <ellipse cx="40" cy="140" rx="10" ry="5" transform="rotate(35 40 140)" />
                <ellipse cx="22" cy="170" rx="9" ry="4" transform="rotate(-20 22 170)" />
              </svg>
            </div>

            {/* Bottom Right Filigree */}
            <div className="relative z-10 text-amber-300/60 p-2 ml-auto">
              <svg className="w-8 h-8 transform rotate-180" viewBox="0 0 40 40" fill="currentColor">
                <path d="M0 0 C15 5, 25 15, 30 30 C20 20, 10 15, 0 10 Z" />
                <circle cx="8" cy="8" r="2" />
              </svg>
            </div>
          </div>

          {/* Central Golden Wax Seal Badge (TAP TO OPEN) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <WaxSeal
                onClick={handleOpen}
                isOpened={greenDoorsOpen}
                label={getTranslation('tapToOpen', lang)}
                hint={getTranslation('tapToOpenHint', lang)}
              />
            </div>
          </div>

          {/* Seam Line */}
          <div
            className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-amber-300/40 to-transparent pointer-events-none transition-opacity duration-300 ${
              greenDoorsOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
        </div>

      </div>
    </div>
  );
}
