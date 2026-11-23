import React from 'react';
import { RoyalCurtainHeader, FountainGardenCourtyard, OrnateDivider } from '../common/Ornaments';
import { Heart } from 'lucide-react';
import { getTranslation } from '../../utils/translations';

export function MainHeroInvitation({ card, isAnimated = true, lang = 'en' }) {
  const groom = card?.groom || {};
  const bride = card?.bride || {};

  const step1Class = isAnimated ? 'animate-step-1' : '';
  const step2Class = isAnimated ? 'animate-step-2' : '';
  const step3Class = isAnimated ? 'animate-step-3' : '';
  const step4Class = isAnimated ? 'animate-step-4' : '';
  const step5Class = isAnimated ? 'animate-step-5' : '';
  const step6Class = isAnimated ? 'animate-step-6' : '';

  // Language adaptions
  const coupleTagline = lang === 'hi' 
    ? (card?.coupleTagline === "We're getting married" ? getTranslation('weAreGettingMarried', 'hi') : card?.coupleTagline)
    : (card?.coupleTagline || "We're getting married");

  const groomName = (lang === 'hi' && groom.name === 'Zayn') ? getTranslation('groomName', 'hi') : groom.name || 'Zayn';
  const groomParents = (lang === 'hi' && groom.parents?.includes('Mr. & Mrs. Malik')) ? getTranslation('groomParents', 'hi') : groom.parents;
  const groomTitle = (lang === 'hi' && groom.title?.includes('Data Scientist')) ? getTranslation('groomTitle', 'hi') : groom.title;

  const brideName = (lang === 'hi' && bride.name === 'Nora') ? getTranslation('brideName', 'hi') : bride.name || 'Nora';
  const brideParents = (lang === 'hi' && bride.parents?.includes('Mr. & Mrs. Siddiqui')) ? getTranslation('brideParents', 'hi') : bride.parents;
  const brideTitle = (lang === 'hi' && bride.title?.includes('Pediatrician')) ? getTranslation('brideTitle', 'hi') : bride.title;

  const welcomeMessage = (lang === 'hi' && card?.welcomeMessage?.includes('We are honored'))
    ? getTranslation('welcomeMessage', 'hi')
    : (card?.welcomeMessage || getTranslation('welcomeMessage', lang));

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Top Draped Royal Pelmet Curtain */}
      <RoyalCurtainHeader />

      <div className="px-6 pt-2 pb-6 text-center">
        
        {/* Step 1: We're Getting Married Header */}
        <div className={`flex items-center justify-center space-x-1.5 mb-5 ${step1Class}`}>
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
          <span className="font-serif italic text-base md:text-lg text-stone-700 tracking-wide font-medium">
            {coupleTagline}
          </span>
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
        </div>

        {/* Step 2: Groom Section (Zayn) */}
        <div className={`my-2 ${step2Class}`}>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight text-stone-900 drop-shadow-sm">
            {groomName}
          </h1>
          {groomParents && (
            <p className="font-serif italic text-xs md:text-sm text-stone-600 mt-1">
              {groomParents}
            </p>
          )}
          {groomTitle && (
            <p className="font-sans text-[11px] font-medium tracking-wider text-amber-800 uppercase mt-0.5">
              {groomTitle}
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
            {brideName}
          </h2>
          {brideParents && (
            <p className="font-serif italic text-xs md:text-sm text-stone-600 mt-1">
              {brideParents}
            </p>
          )}
          {brideTitle && (
            <p className="font-sans text-[11px] font-medium tracking-wider text-amber-800 uppercase mt-0.5">
              {brideTitle}
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
            {welcomeMessage}
          </p>
          <OrnateDivider className="mt-5" />
        </div>

      </div>
    </div>
  );
}
