import React from 'react';

/**
 * Royal Wax Seal Badge (TAP TO OPEN)
 */
export function WaxSeal({ onClick, isOpened, label = "TAP TO OPEN", hint = "Click to Open Invitation" }) {
  return (
    <button
      onClick={onClick}
      disabled={isOpened}
      aria-label={label}
      className={`group relative z-30 transition-all duration-700 transform focus:outline-none ${
        isOpened 
          ? 'scale-125 opacity-0 pointer-events-none' 
          : 'hover:scale-105 active:scale-95 animate-pulse-subtle'
      }`}
    >
      {/* Outer ambient glow */}
      <div className="absolute -inset-4 bg-amber-400/25 rounded-full blur-xl group-hover:bg-amber-300/40 transition-all duration-500 animate-pulse"></div>

      {/* Wax seal body */}
      <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full flex flex-col items-center justify-center p-3 text-center wax-seal-shadow border-2 border-amber-300/80 bg-gradient-to-br from-[#e4be6c] via-[#ca9a37] to-[#8c6014]">
        {/* Scalloped decorative ring */}
        <div className="absolute inset-1.5 rounded-full border border-dashed border-amber-200/60 pointer-events-none"></div>
        <div className="absolute inset-3 rounded-full border border-amber-900/30 pointer-events-none"></div>

        {/* Top filigree flourish */}
        <svg className="w-8 h-4 text-amber-950/70 mb-0.5" viewBox="0 0 100 40" fill="currentColor">
          <path d="M50 0 C40 15, 20 20, 0 25 C25 28, 40 35, 50 40 C60 35, 75 28, 100 25 C80 20, 60 15, 50 0 Z" />
        </svg>

        {/* Intertwined rings icon */}
        <div className="flex items-center justify-center -space-x-1.5 my-0.5">
          <div className="w-4 h-4 rounded-full border-2 border-amber-950/80"></div>
          <div className="w-4 h-4 rounded-full border-2 border-amber-950/80"></div>
        </div>

        {/* Text */}
        <span className="font-serif text-[11px] md:text-xs tracking-[0.15em] font-bold text-amber-950 uppercase mt-0.5 leading-tight drop-shadow-sm px-1">
          {label}
        </span>

        {/* Bottom spark icon */}
        <svg className="w-6 h-3 text-amber-950/70 mt-1" viewBox="0 0 60 20" fill="currentColor">
          <circle cx="30" cy="10" r="3" />
          <circle cx="18" cy="10" r="1.5" />
          <circle cx="42" cy="10" r="1.5" />
        </svg>

        {/* Click hint pill */}
        <div className="absolute -bottom-8 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[10px] text-amber-200 tracking-wider whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity">
          {hint}
        </div>
      </div>
    </button>
  );
}

/**
 * Royal Top Draped Curtain Arch
 */
export function RoyalCurtainHeader() {
  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Luxurious scalloped drape SVG */}
      <svg
        viewBox="0 0 800 200"
        className="w-full h-auto drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="curtainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dfd1b8" />
            <stop offset="40%" stopColor="#f3ebd9" />
            <stop offset="85%" stopColor="#ddceb5" />
            <stop offset="100%" stopColor="#c5b394" />
          </linearGradient>
          <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c59b27" />
            <stop offset="50%" stopColor="#fedb72" />
            <stop offset="100%" stopColor="#b88628" />
          </linearGradient>
          <filter id="shadowDrape" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#3c2f1a" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Left Draped Curtain Swag */}
        <path
          d="M0 0 L0 170 Q40 130 90 90 Q150 150 250 80 Q320 120 400 95 L400 0 Z"
          fill="url(#curtainGrad)"
          filter="url(#shadowDrape)"
        />
        {/* Right Draped Curtain Swag */}
        <path
          d="M800 0 L800 170 Q760 130 710 90 Q650 150 550 80 Q480 120 400 95 L400 0 Z"
          fill="url(#curtainGrad)"
          filter="url(#shadowDrape)"
        />

        {/* Central Arch Pelmet */}
        <path
          d="M100 0 Q250 120 400 120 Q550 120 700 0 Z"
          fill="url(#curtainGrad)"
          stroke="url(#goldTrim)"
          strokeWidth="3"
        />

        {/* Drape Pleats / Folds */}
        <path d="M180 20 Q280 100 400 100" stroke="#bda887" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
        <path d="M620 20 Q520 100 400 100" stroke="#bda887" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
        <path d="M220 10 Q300 80 400 80" stroke="#baa481" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
        <path d="M580 10 Q500 80 400 80" stroke="#baa481" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

        {/* Scalloped Trim & Little Tassels along bottom edge */}
        {Array.from({ length: 15 }).map((_, i) => {
          const cx = 135 + i * 38;
          // Approximate curve y
          const rel = (cx - 400) / 300;
          const cy = 118 - rel * rel * 65;
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r="3" fill="#d4a43b" />
              <line x1={cx} y1={cy} x2={cx} y2={cy + 7} stroke="#b88628" strokeWidth="1.5" />
              <circle cx={cx} cy={cy + 8} r="2" fill="#fedb72" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Royal Garden Fountain Courtyard Illustration (as in video)
 */
export function FountainGardenCourtyard() {
  return (
    <div className="relative w-full flex flex-col items-center mt-4 mb-2 pointer-events-none select-none">
      <svg
        viewBox="0 0 500 240"
        className="w-full max-w-md h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="marbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ede5d8" />
            <stop offset="60%" stopColor="#dacbbe" />
            <stop offset="100%" stopColor="#c7b6a4" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9ccfd6" />
            <stop offset="100%" stopColor="#679fab" />
          </linearGradient>
        </defs>

        {/* Classical Stone Balustrade / Courtyard floor */}
        <ellipse cx="250" cy="200" rx="190" ry="32" fill="#ebd9c3" fillOpacity="0.4" />
        <ellipse cx="250" cy="195" rx="160" ry="24" fill="#debfa0" fillOpacity="0.3" />

        {/* Floral arrangements (Roses & Greenery) on sides */}
        {/* Left Flower Bush */}
        <g transform="translate(70, 130)">
          <ellipse cx="40" cy="40" rx="35" ry="22" fill="#3c583f" />
          <circle cx="30" cy="30" r="14" fill="#4d6f51" />
          <circle cx="50" cy="35" r="12" fill="#365039" />
          {/* Roses */}
          <circle cx="35" cy="25" r="8" fill="#e8989e" />
          <circle cx="35" cy="25" r="5" fill="#cf6874" />
          <circle cx="52" cy="28" r="9" fill="#f4bcc2" />
          <circle cx="52" cy="28" r="5" fill="#e07b86" />
          <circle cx="22" cy="35" r="8" fill="#deb6ba" />
          <circle cx="42" cy="42" r="7" fill="#ecccd0" />
        </g>

        {/* Right Flower Bush */}
        <g transform="translate(320, 130)">
          <ellipse cx="40" cy="40" rx="35" ry="22" fill="#3c583f" />
          <circle cx="30" cy="30" r="12" fill="#365039" />
          <circle cx="50" cy="35" r="14" fill="#4d6f51" />
          {/* Roses */}
          <circle cx="32" cy="28" r="9" fill="#f4bcc2" />
          <circle cx="32" cy="28" r="5" fill="#e07b86" />
          <circle cx="48" cy="25" r="8" fill="#e8989e" />
          <circle cx="48" cy="25" r="5" fill="#cf6874" />
          <circle cx="58" cy="35" r="8" fill="#deb6ba" />
          <circle cx="38" cy="42" r="7" fill="#ecccd0" />
        </g>

        {/* Neoclassical Tiered Marble Fountain */}
        {/* Base Basin */}
        <ellipse cx="250" cy="180" rx="85" ry="16" fill="url(#marbleGrad)" stroke="#aa937d" strokeWidth="1.5" />
        <ellipse cx="250" cy="177" rx="76" ry="12" fill="url(#waterGrad)" />
        {/* Ripples */}
        <ellipse cx="250" cy="177" rx="45" ry="6" fill="none" stroke="#d5f2f7" strokeWidth="1" strokeOpacity="0.8" />
        
        {/* Pedestal */}
        <path d="M242 176 L240 145 L260 145 L258 176 Z" fill="url(#marbleGrad)" stroke="#a28a74" strokeWidth="1" />

        {/* Second Tier Basin */}
        <ellipse cx="250" cy="144" rx="46" ry="9" fill="url(#marbleGrad)" stroke="#a28a74" strokeWidth="1" />
        <ellipse cx="250" cy="142" rx="40" ry="6" fill="url(#waterGrad)" />
        <ellipse cx="250" cy="142" rx="22" ry="3" fill="none" stroke="#d5f2f7" strokeWidth="0.8" />

        {/* Upper Column */}
        <path d="M245 142 L244 122 L256 122 L255 142 Z" fill="url(#marbleGrad)" />

        {/* Top Spout Basin & Finial */}
        <ellipse cx="250" cy="122" rx="22" ry="5" fill="url(#marbleGrad)" stroke="#a28a74" strokeWidth="0.8" />
        <path d="M247 121 C247 114 253 114 253 121 Z" fill="#d4a43b" />

        {/* Cascading Water Jets */}
        <path d="M250 115 Q245 105 242 120" stroke="#b2e7f0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M250 115 Q255 105 258 120" stroke="#b2e7f0" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        
        {/* Tier to tier streams */}
        <path d="M232 144 Q228 160 234 176" stroke="#b2e7f0" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
        <path d="M268 144 Q272 160 266 176" stroke="#b2e7f0" strokeWidth="1.2" strokeOpacity="0.7" fill="none" />
      </svg>
    </div>
  );
}

/**
 * Ornate Scroll Divider
 */
export function OrnateDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center my-3 text-amber-600/60 ${className}`}>
      <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-amber-400"></div>
      <div className="mx-2 flex items-center space-x-1">
        <span className="text-amber-500 text-xs">❦</span>
        <span className="text-amber-600 text-sm font-serif">❖</span>
        <span className="text-amber-500 text-xs">❧</span>
      </div>
      <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-amber-400"></div>
    </div>
  );
}
