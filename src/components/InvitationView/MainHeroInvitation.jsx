import React from 'react';
import { RoyalCurtainHeader, FountainGardenCourtyard, OrnateDivider } from '../common/Ornaments';
import { Heart } from 'lucide-react';

export function MainHeroInvitation({ card, isAnimated = true }) {
  const groom = card?.groom || {};
  const bride = card?.bride || {};

  const step1Class = isAnimated ? 'animate-step-1' : '';
  const step2Class = isAnimated ? 'animate-step-2' : '';
  const step3Class = isAnimated ? 'animate-step-3' : '';
  const step4Class = isAnimated ? 'animate-step-4' : '';
  const step5Class = isAnimated ? 'animate-step-5' : '';
  const step6Class = isAnimated ? 'animate-step-6' : '';

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Top Draped Royal Pelmet Curtain */}
      <RoyalCurtainHeader />

      <div className="px-6 pt-2 pb-6 text-center">
        
        {/* Step 1: We're Getting Married Header */}
        <div className={`flex items-center justify-center space-x-1.5 mb-5 ${step1Class}`}>
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
          <span className="font-serif italic text-base md:text-lg text-stone-700 tracking-wide">
            {card?.coupleTagline || "We're getting married"}
          </span>
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
        </div>

        {/* Step 2: Groom Section (Zayn) */}
        <div className={`my-2 ${step2Class}`}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-stone-900 drop-shadow-sm">
            {groom.name || "Zayn"}
          </h1>
          {groom.parents && (
            <p className="font-serif italic text-xs md:text-sm text-stone-600 mt-1">
              {groom.parents}
            </p>
          )}
          {groom.title && (
            <p className="font-sans text-[11px] font-medium tracking-wider text-amber-800 uppercase mt-0.5">
              {groom.title}
            </p>
          )}
        </div>

        {/* Step 3: Ornate '&' Connector */}
        <div className={`my-3 flex items-center justify-center ${step3Class}`}>
          <span className="font-script text-4xl text-amber-600 select-none">
            &
          </span>
        </div>

        {/* Step 4: Bride Section (Nora) */}
        <div className={`my-2 ${step4Class}`}>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-stone-900 drop-shadow-sm">
            {bride.name || "Nora"}
          </h2>
          {bride.parents && (
            <p className="font-serif italic text-xs md:text-sm text-stone-600 mt-1">
              {bride.parents}
            </p>
          )}
          {bride.title && (
            <p className="font-sans text-[11px] font-medium tracking-wider text-amber-800 uppercase mt-0.5">
              {bride.title}
            </p>
          )}
        </div>

        {/* Step 5: Neoclassical Fountain & Floral Courtyard Artwork */}
        <div className={step5Class}>
          <FountainGardenCourtyard />
        </div>

        {/* Step 6: Welcome Blessing Note (00:10 in video) */}
        <div className={`mt-4 px-3 max-w-xs mx-auto ${step6Class}`}>
          <p className="font-serif italic text-xs md:text-sm text-stone-700 leading-relaxed text-center">
            {card?.welcomeMessage || 
              "We are honored to welcome you to the Wedding ceremony of Zayn & Nora. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 💕"}
          </p>
          <OrnateDivider className="mt-5" />
        </div>

      </div>
    </div>
  );
}
