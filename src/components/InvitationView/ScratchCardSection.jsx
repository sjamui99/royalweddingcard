import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Check, Sparkles, Download, ExternalLink } from 'lucide-react';
import { triggerRoyalConfetti } from '../../utils/confetti';
import { downloadCalendarEvent, getGoogleCalendarUrl } from '../../utils/calendarExport';
import { royalAudio } from '../../utils/audioPlayer';
import { getTranslation } from '../../utils/translations';

export function ScratchCardSection({ card, lang = 'en' }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [savedToCalendar, setSavedToCalendar] = useState(false);
  const isRevealedRef = useRef(false);

  // Exact heart path coordinates for width=300, height=270
  const heartSvgPath = "M 150 250 C 70 190, 15 135, 15 78 C 15 32, 52 8, 98 8 C 124 8, 142 20, 150 38 C 158 20, 176 8, 202 8 C 248 8, 285 32, 285 78 C 285 135, 230 190, 150 250 Z";
  const innerHeartDashedPath = "M 150 238 C 76 182, 26 130, 26 78 C 26 38, 58 18, 98 18 C 122 18, 139 28, 150 44 C 161 28, 178 18, 202 18 C 242 18, 274 38, 274 78 C 274 130, 224 182, 150 238 Z";

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 300;
    const height = 270;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Draw shimmering olive-gold glitter texture across the heart canvas
    drawGlitterTexture(ctx, width, height);
  }, []);

  const drawGlitterTexture = (ctx, width, height) => {
    ctx.save();

    // Base olive-gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#4e6751');
    grad.addColorStop(0.25, '#729177');
    grad.addColorStop(0.5, '#567159');
    grad.addColorStop(0.75, '#6a8b6f');
    grad.addColorStop(1, '#415744');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Shimmering glitter particles
    const specCount = 2200;
    for (let i = 0; i < specCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      const size = Math.random() * 2.2 + 0.5;
      const shade = Math.random();

      if (shade > 0.75) {
        ctx.fillStyle = '#fffbc2';
      } else if (shade > 0.45) {
        ctx.fillStyle = '#eed18a';
      } else if (shade > 0.25) {
        ctx.fillStyle = '#a9cba9';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(px, py, size, size);
    }

    ctx.restore();
  };

  const scratch = (clientX, clientY) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';

    // Erase circular scratch brush
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2, false);
    ctx.fill();

    royalAudio.playScratchSound();
    checkScratchCompletion();
  };

  const checkScratchCompletion = () => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 300;
    const height = 270;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentCount = 0;
    const totalSampled = pixels.length / 16;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] < 128) {
        transparentCount++;
      }
    }

    const ratio = transparentCount / totalSampled;

    // Once scratched more than 35%, reveal fully with celebratory confetti & chime
    if (ratio > 0.35) {
      setIsRevealed(true);
      isRevealedRef.current = true;
      triggerRoyalConfetti(0.5, 0.45);
      royalAudio.playRoyalSealSound();
    }
  };

  const handlePointerDown = (e) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  const handleManualReveal = () => {
    setIsRevealed(true);
    triggerRoyalConfetti(0.5, 0.45);
    royalAudio.playRoyalSealSound();
  };

  // Direct action: tapping "Save the Date" saves into Google Calendar
  const handleSaveTheDate = () => {
    const googleCalendarUrl = getGoogleCalendarUrl(card);
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    triggerRoyalConfetti(0.5, 0.55);
    setSavedToCalendar(true);
    royalAudio.playRoyalSealSound();
    setTimeout(() => setSavedToCalendar(false), 5000);
  };

  return (
    <div className="flex flex-col items-center my-8 px-4 text-center select-none" ref={containerRef}>
      
      {/* SVG Definitions for Heart Clipping (Used for both Front & Behind) */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="royalHeartClip" clipPathUnits="userSpaceOnUse">
            <path d={heartSvgPath} />
          </clipPath>
          <linearGradient id="heartGoldBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5e1a4" />
            <stop offset="40%" stopColor="#d4a43b" />
            <stop offset="70%" stopColor="#edd69c" />
            <stop offset="100%" stopColor="#b88628" />
          </linearGradient>
        </defs>
      </svg>

      {/* Script Header */}
      <h3 className="font-script text-3xl md:text-4xl text-amber-900 drop-shadow-sm mb-1">
        {getTranslation('scratchToReveal', lang)}
      </h3>
      <p className="text-xs text-stone-500 font-sans tracking-wide mb-4 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
        {getTranslation('rubToUncover', lang)}
      </p>

      {/* ========================================================
          HEART CONTAINER (BOTH FRONT & BEHIND ARE SHAPED AS A HEART)
         ======================================================== */}
      <div className="relative w-[300px] h-[270px] flex items-center justify-center drop-shadow-xl">
        
        {/* 1. BEHIND HEART LAYER: Revealed Content Underneath */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          style={{
            clipPath: 'url(#royalHeartClip)',
            WebkitClipPath: 'url(#royalHeartClip)',
            background: 'linear-gradient(145deg, #fffdfa 0%, #faf3e3 50%, #f4e7cb 100%)'
          }}
        >
          <div className="flex flex-col items-center justify-center -mt-2">
            {/* Small Gold Ring Motif */}
            <div className="flex items-center justify-center -space-x-1 mb-1">
              <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-600" />
              <div className="w-3.5 h-3.5 rounded-full border-2 border-amber-600" />
            </div>

            <span className="font-script text-2xl text-amber-800 leading-tight">
              {lang === 'hi' ? getTranslation('ourForeverBegins', 'hi') : (card.scratchRevealText || getTranslation('ourForeverBegins', lang))}
            </span>

            <div className="my-1.5 h-[1.5px] w-28 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

            <span className="font-serif text-lg font-bold tracking-wider text-stone-800 uppercase">
              {lang === 'hi' ? getTranslation('dateFormatted', 'hi') : (card.dateFormatted || "November 30, 2026")}
            </span>

            <span className="font-sans text-[11px] tracking-widest text-amber-700 uppercase mt-0.5 font-semibold">
              {lang === 'hi' ? getTranslation('dayOfWeek', 'hi') : (card.dayOfWeek || "Monday")}
            </span>
          </div>
        </div>

        {/* 2. FRONT HEART LAYER: Canvas with Olive-Gold Glitter Scratch Surface */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{
            clipPath: 'url(#royalHeartClip)',
            WebkitClipPath: 'url(#royalHeartClip)'
          }}
          className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />

        {/* 3. HEART ORNAMENTAL GOLD FOIL BORDER OVERLAY (Always framing the heart) */}
        <svg
          viewBox="0 0 300 270"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* Outer Solid Golden Heart Rim */}
          <path
            d={heartSvgPath}
            fill="none"
            stroke="url(#heartGoldBorderGrad)"
            strokeWidth="3.5"
          />
          {/* Inner Dashed Delicate Gold Filigree Pinstripe */}
          <path
            d={innerHeartDashedPath}
            fill="none"
            stroke="#d4a43b"
            strokeWidth="1"
            strokeDasharray="3 3"
            strokeOpacity="0.75"
          />
        </svg>
      </div>

      {/* Manual Reveal Fallback Option */}
      {!isRevealed && (
        <button
          onClick={handleManualReveal}
          className="mt-3 text-[11px] font-sans tracking-wider text-amber-700 hover:text-amber-900 underline underline-offset-2 opacity-80 hover:opacity-100"
        >
          {getTranslation('cantScratch', lang)}
        </button>
      )}

      {/* ========================================================
          SAVE THE DATE (Tapping directly saves to Google Calendar)
         ======================================================== */}
      <div className="mt-5 w-full max-w-[280px]">
        <button
          onClick={handleSaveTheDate}
          className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 text-amber-200 font-serif font-bold text-sm tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 border border-amber-400/50 active:scale-95"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>{getTranslation('saveTheDate', lang)}</span>
        </button>

        {/* Confirmation feedback when tapped */}
        {savedToCalendar ? (
          <p className="text-xs font-sans text-emerald-700 font-medium mt-2 flex items-center justify-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>{getTranslation('openingCalendar', lang)}</span>
          </p>
        ) : (
          <p className="text-[10px] text-stone-500 font-sans mt-1.5 tracking-wide">
            {getTranslation('calendarHint', lang)}
          </p>
        )}

        {/* Secondary download option for Apple / Outlook (.ics) */}
        <button
          onClick={() => downloadCalendarEvent(card)}
          className="mt-2 text-[10px] text-amber-800/70 hover:text-amber-900 underline font-sans tracking-wider block mx-auto"
        >
          {getTranslation('appleOutlookDownload', lang)}
        </button>
      </div>

    </div>
  );
}
