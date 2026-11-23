import React, { useState } from 'react';
import { LuxuryEnvelopeGatefold } from './LuxuryEnvelopeGatefold';
import { MainHeroInvitation } from './MainHeroInvitation';
import { ScratchCardSection } from './ScratchCardSection';
import { PhotoGalleryCarousel } from './PhotoGalleryCarousel';
import { CountdownSection } from './CountdownSection';
import { ProgramTimeline } from './ProgramTimeline';
import { VenueAndMap } from './VenueAndMap';
import { DressCodeSection } from './DressCodeSection';
import { PreWeddingEvents } from './PreWeddingEvents';
import { TravelAccommodation } from './TravelAccommodation';
import { RSVPSection } from './RSVPSection';
import { MusicPlayerToggle } from './MusicPlayerToggle';
import { Sparkles, Edit3 } from 'lucide-react';

export function InvitationView({ card, onSwitchToStudio, isPreview = false }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="min-h-screen bg-stone-900 flex justify-center py-0 md:py-8 px-0 md:px-4">
      {/* Phone Canvas Container */}
      <div className="relative w-full max-w-md bg-[#fdfbf7] shadow-2xl overflow-x-hidden min-h-screen md:min-h-[850px] md:rounded-3xl border-0 md:border-8 md:border-stone-800">
        
        {/* The Gatefold Double-Door Opening Envelope Overlay (Tapping Page & Pleated Curtain Page) */}
        <LuxuryEnvelopeGatefold
          isOpened={isOpened}
          onOpen={() => setIsOpened(true)}
          card={card}
        />

        {/* Floating Background Music Control */}
        <MusicPlayerToggle />

        {/* Floating Switch-to-Editor Button for Creator */}
        {onSwitchToStudio && (
          <div className="fixed bottom-5 right-5 z-40 flex items-center space-x-2">
            <button
              onClick={onSwitchToStudio}
              className="px-4 py-2.5 rounded-full bg-stone-900/90 hover:bg-stone-950 text-amber-300 backdrop-blur-md shadow-xl border border-amber-400/40 text-xs font-sans font-medium flex items-center space-x-1.5 transition-all transform hover:scale-105"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customize Card</span>
            </button>
          </div>
        )}

        {/* Inner Card Content (shown once opened or revealed) */}
        <div className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          {/* Main Hero: Draped curtain header, Zayn & Nora with staggered one-by-one text entrance */}
          <MainHeroInvitation
            card={card}
            isAnimated={isOpened}
            key={isOpened ? 'opened' : 'closed'}
          />

          {/* Interactive Scratch-to-Reveal Card (Heart on both front and behind) */}
          <ScratchCardSection card={card} />

          {/* Couple Moments Carousel */}
          <PhotoGalleryCarousel gallery={card.gallery} />

          {/* Countdown to Forever */}
          <CountdownSection targetDate={card.weddingDate} />

          {/* Program Timeline */}
          <ProgramTimeline timeline={card.timeline} />

          {/* Venue & Map */}
          <VenueAndMap venue={card.venue} />

          {/* Dress Code */}
          <DressCodeSection dressCode={card.dressCode} />

          {/* Pre-Wedding Events */}
          <PreWeddingEvents events={card.preWeddingEvents} />

          {/* Transportation, Accommodation & Gifts */}
          <TravelAccommodation logistics={card.logistics} />

          {/* RSVP Form */}
          <RSVPSection cardId={card.id || "card_1"} />

          {/* Footer */}
          <div className="py-8 px-4 text-center border-t border-amber-200/60 bg-amber-50/40">
            <div className="flex items-center justify-center space-x-1 text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-serif italic text-xs">With Love & Gratitude</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-serif text-sm font-semibold text-stone-800">
              {card.groom?.name} & {card.bride?.name}
            </p>
            {onSwitchToStudio && (
              <button
                onClick={onSwitchToStudio}
                className="mt-4 text-[11px] font-sans text-stone-500 hover:text-stone-800 underline tracking-wider"
              >
                Create your own wedding invitation web card ✨
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
