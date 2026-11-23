import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Check, Sparkles, Download, Bell } from 'lucide-react';
import { triggerRoyalConfetti } from '../../utils/confetti';
import { downloadCalendarEvent, getGoogleCalendarUrl } from '../../utils/calendarExport';
import { royalAudio } from '../../utils/audioPlayer';

export function ScratchCardSection({ card }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Set dimensions based on container
    const width = 280;
    const height = 250;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Draw luxury olive-gold glitter heart scratch surface
    drawGlitterHeart(ctx, width, height);
  }, []);

  // Helper to draw a heart path
  const createHeartPath = (ctx, x, y, width, height) => {
    ctx.beginPath();
    const topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
      x, y, 
      x - width / 2, y, 
      x - width / 2, y + topCurveHeight
    );
    // bottom left curve
    ctx.bezierCurveTo(
      x - width / 2, y + (height + topCurveHeight) / 2, 
      x, y + (height + topCurveHeight) / 2, 
      x, y + height
    );
    // bottom right curve
    ctx.bezierCurveTo(
      x, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + (height + topCurveHeight) / 2, 
      x + width / 2, y + topCurveHeight
    );
    // top right curve
    ctx.bezierCurveTo(
      x + width / 2, y, 
      x, y, 
      x, y + topCurveHeight
    );
    ctx.closePath();
  };

  const drawGlitterHeart = (ctx, width, height) => {
    ctx.save();
    createHeartPath(ctx, width / 2, 20, width * 0.88, height * 0.88);
    ctx.clip();

    // Base olive-gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#536b56');
    grad.addColorStop(0.3, '#75947a');
    grad.addColorStop(0.6, '#465f49');
    grad.addColorStop(1, '#628066');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Draw shimmering glitter specs
    const specCount = 1800;
    for (let i = 0; i < specCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      const size = Math.random() * 2 + 0.5;
      const shade = Math.random();

      if (shade > 0.7) {
        ctx.fillStyle = '#fffab3';
      } else if (shade > 0.4) {
        ctx.fillStyle = '#e5c06d';
      } else if (shade > 0.2) {
        ctx.fillStyle = '#a6c9a9';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      ctx.fillRect(px, py, size, size);
    }

    // Inner gold border flourish
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(235, 215, 140, 0.6)';
    ctx.stroke();

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
    ctx.arc(x, y, 22, 0, Math.PI * 2, false);
    ctx.fill();

    royalAudio.playScratchSound();
    checkScratchCompletion();
  };

  const checkScratchCompletion = () => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = 280;
    const height = 250;
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
    setScratchProgress(Math.min(100, Math.round(ratio * 200)));

    if (ratio > 0.38) {
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

  return (
    <div className="flex flex-col items-center my-8 px-4 text-center select-none" ref={containerRef}>
      {/* Script Header */}
      <h3 className="font-script text-3xl md:text-4xl text-amber-900 drop-shadow-sm mb-1">
        Scratch to Reveal
      </h3>
      <p className="text-xs text-stone-500 font-sans tracking-wide mb-4 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
        Rub to uncover the sacred date
      </p>

      {/* Interactive Card Canvas & Underlayer */}
      <div className="relative w-[280px] h-[250px] flex items-center justify-center">
        {/* Revealed Content Underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-amber-50/90 via-white to-amber-50/90 rounded-3xl border-2 border-amber-300/70 shadow-lg">
          <div className="w-full flex flex-col items-center">
            {/* Heart Motif */}
            <div className="w-10 h-10 mb-2 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>

            <span className="font-script text-2xl text-amber-800">
              {card.scratchRevealText || "Our forever begins"}
            </span>

            <div className="my-1.5 h-[1px] w-24 bg-amber-300"></div>

            <span className="font-serif text-lg md:text-xl font-bold tracking-wider text-stone-800 uppercase">
              {card.dateFormatted || "November 30, 2026"}
            </span>

            <span className="font-sans text-xs tracking-widest text-amber-700 uppercase mt-0.5 font-medium">
              {card.dayOfWeek || "Monday"}
            </span>
          </div>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`absolute inset-0 cursor-pointer touch-none transition-opacity duration-700 ${
            isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        />
      </div>

      {/* Quick Reveal Helper for Mobile / Instant View */}
      {!isRevealed && (
        <button
          onClick={handleManualReveal}
          className="mt-3 text-[11px] font-sans tracking-wider text-amber-700 hover:text-amber-900 underline underline-offset-2 opacity-80 hover:opacity-100"
        >
          Can't scratch? Tap here to reveal
        </button>
      )}

      {/* Save The Date Button (Exact as in video) */}
      <div className="mt-5 w-full max-w-[280px]">
        <button
          onClick={() => setShowOptionsModal(true)}
          className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-600 text-amber-200 font-serif font-bold text-sm tracking-[0.2em] uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-amber-400/40 active:scale-98"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Save The Date</span>
        </button>
      </div>

      {/* Calendar Add Options Modal */}
      {showOptionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-ivory-50 border-2 border-amber-400/60 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl relative">
            <h4 className="font-serif text-xl font-bold text-stone-800 mb-1">
              Add to Your Calendar
            </h4>
            <p className="font-sans text-xs text-stone-600 mb-5">
              {card.groom?.name} & {card.bride?.name}'s Wedding Ceremony
              <br />
              {card.dateFormatted}
            </p>

            <div className="space-y-3">
              <a
                href={getGoogleCalendarUrl(card)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowOptionsModal(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 hover:border-amber-500 flex items-center justify-center space-x-2 text-stone-800 font-sans text-sm font-medium shadow-sm hover:shadow transition-all"
              >
                <span>📅 Google Calendar</span>
              </a>

              <button
                onClick={() => {
                  downloadCalendarEvent(card);
                  setShowOptionsModal(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-stone-200 hover:border-amber-500 flex items-center justify-center space-x-2 text-stone-800 font-sans text-sm font-medium shadow-sm hover:shadow transition-all"
              >
                <Download className="w-4 h-4 text-amber-600" />
                <span>Apple / Outlook (.ics file)</span>
              </button>
            </div>

            <button
              onClick={() => setShowOptionsModal(false)}
              className="mt-5 text-xs text-stone-500 hover:text-stone-800 font-sans uppercase tracking-wider"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
