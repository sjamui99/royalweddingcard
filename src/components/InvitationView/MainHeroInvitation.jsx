import React from 'react';
import { RoyalCurtainHeader, FountainGardenCourtyard, OrnateDivider } from '../common/Ornaments';
import { Heart } from 'lucide-react';

export function MainHeroInvitation({ card }) {
  const groom = card?.groom || {};
  const bride = card?.bride || {};

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Top Draped Royal Pelmet Curtain */}
      <RoyalCurtainHeader />

      <div className="px-6 pt-2 pb-6 text-center">
        {/* We're Getting Married Header */}
        <div className="flex items-center justify-center space-x-1.5 mb-5">
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
          <span className="font-serif italic text-base md:text-lg text-stone-700 tracking-wide">
            {card?.coupleTagline || "We're getting married"}
          </span>
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-500 animate-pulse" />
        </div>

        {/* Groom Section */}
        <div className="my-2">
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

        {/* Ornate '&' Connector */}
        <div className="my-3 flex items-center justify-center">
          <span className="font-script text-4xl text-amber-600 select-none">
            &
          </span>
        </div>

        {/* Bride Section */}
        <div className="my-2">
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

        {/* Neoclassical Fountain & Floral Courtyard Artwork */}
        <FountainGardenCourtyard />

        {/* Welcome Blessing Note (00:10 in video) */}
        <div className="mt-4 px-3 max-w-xs mx-auto">
          <p className="font-serif italic text-xs md:text-sm text-stone-700 leading-relaxed text-center">
            {card?.welcomeMessage || 
              "We are honored to welcome you to our Wedding ceremony. As we begin our journey together in faith and love, we thank you for being part of this blessed occasion 💕"}
          </p>
        </div>

        <OrnateDivider className="mt-6" />
      </div>
    </div>
  );
}
