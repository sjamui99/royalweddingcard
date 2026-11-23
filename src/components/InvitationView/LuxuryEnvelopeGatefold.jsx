import React, { useState } from 'react';
import { WaxSeal } from '../common/Ornaments';
import { royalAudio } from '../../utils/audioPlayer';
import { triggerRoyalConfetti } from '../../utils/confetti';

export function LuxuryEnvelopeGatefold({ isOpened, onOpen, card }) {
  const [openingStarted, setOpeningStarted] = useState(false);

  const handleOpen = () => {
    if (isOpened || openingStarted) return;
    setOpeningStarted(true);

    // Audio effects: royal chime & romantic melody
    royalAudio.playRoyalSealSound();
    setTimeout(() => {
      royalAudio.startBackgroundMelody();
    }, 600);

    // Confetti celebration
    triggerRoyalConfetti(0.5, 0.45);

    // Trigger parent open callback
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  const themePrimary = card?.theme?.primary || '#1f3824';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-all duration-1000 ${
        isOpened ? 'pointer-events-none opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      {/* Container wrapper matching phone screen ratio on desktop */}
      <div className="relative w-full h-full max-w-md mx-auto overflow-hidden shadow-2xl flex">
        {/* Left Gatefold Door */}
        <div
          style={{ backgroundColor: themePrimary }}
          className={`relative w-1/2 h-full emerald-damask border-r border-amber-300/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between p-4 ${
            openingStarted ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Inner Golden Border Framing */}
          <div className="absolute inset-2 border-2 border-amber-400/50 pointer-events-none rounded-l-lg">
            <div className="absolute inset-1 border border-amber-300/30 rounded-l-md" />
          </div>

          {/* Top Corner Filigree */}
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

          {/* Bottom Corner Filigree */}
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
          className={`relative w-1/2 h-full emerald-damask border-l border-amber-300/40 shadow-2xl transition-transform duration-1000 ease-[cubic-bezier(0.77,0,0.175,1)] flex flex-col justify-between p-4 ${
            openingStarted ? 'translate-x-full' : 'translate-x-0'
          }`}
        >
          {/* Inner Golden Border Framing */}
          <div className="absolute inset-2 border-2 border-amber-400/50 pointer-events-none rounded-r-lg">
            <div className="absolute inset-1 border border-amber-300/30 rounded-r-md" />
          </div>

          {/* Top Right Corner Filigree */}
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

          {/* Bottom Right Corner Filigree */}
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
              isOpened={openingStarted}
              label="TAP TO OPEN"
            />
          </div>
        </div>

        {/* Subtle Vertical Seam Highlight */}
        <div className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-amber-300/40 to-transparent pointer-events-none transition-opacity duration-500 ${
          openingStarted ? 'opacity-0' : 'opacity-100'
        }`} />
      </div>
    </div>
  );
}
