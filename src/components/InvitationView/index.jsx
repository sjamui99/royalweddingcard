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
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Sparkles, Edit3 } from 'lucide-react';
import { getTranslation } from '../../utils/translations';

export function InvitationView({ card, lang = 'en', onLanguageChange, onSwitchToStudio, isPreview = false }) {
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
          lang={lang}
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
              <span>{getTranslation('customizeCard', lang)}</span>
            </button>
          </div>
        )}

        {/* Inner Card Content (shown once opened or revealed) */}
        <div className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
          {/* Main Hero: Draped curtain header, Zayn & Nora with staggered one-by-one text entrance */}
          <MainHeroInvitation
            card={card}
            isAnimated={isOpened}
            lang={lang}
            key={`${isOpened ? 'opened' : 'closed'}_${lang}`}
          />

          {/* Interactive Scratch-to-Reveal Card (Heart on both front and behind) */}
          <ScratchCardSection card={card} lang={lang} />

          {/* Couple Moments Carousel */}
          <PhotoGalleryCarousel gallery={card.gallery} />

          {/* Countdown to Forever */}
          <CountdownSection targetDate={card.weddingDate} lang={lang} />

          {/* Program Timeline */}
          <ProgramTimeline timeline={card.timeline} lang={lang} />

          {/* Venue & Map */}
          <VenueAndMap venue={card.venue} lang={lang} />

          {/* Dress Code */}
          <DressCodeSection dressCode={card.dressCode} lang={lang} />

          {/* Pre-Wedding Events */}
          <PreWeddingEvents events={card.preWeddingEvents} lang={lang} />

          {/* Transportation, Accommodation & Gifts */}
          <TravelAccommodation logistics={card.logistics} lang={lang} />

          {/* RSVP Form */}
          <RSVPSection cardId={card.id || "card_1"} lang={lang} />

          {/* Footer with Language Switcher */}
          <div className="py-8 px-4 text-center border-t border-amber-200/60 bg-amber-50/40">
            <div className="flex items-center justify-center space-x-1 text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="font-serif italic text-xs">{getTranslation('withLoveAndGratitude', lang)}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <p className="font-serif text-sm font-semibold text-stone-800">
              {lang === 'hi' && card.groom?.name === 'Zayn' ? 'ज़ैन' : card.groom?.name} & {lang === 'hi' && card.bride?.name === 'Nora' ? 'नोरा' : card.bride?.name}
            </p>

            {/* Language Switcher in Footer */}
            {onLanguageChange && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-[10px] font-sans text-stone-500 uppercase tracking-widest mb-1.5 font-medium">
                  {lang === 'en' ? 'Select Language / भाषा चुनें' : 'भाषा चुनें / Select Language'}
                </p>
                <LanguageSwitcher
                  lang={lang}
                  onToggle={onLanguageChange}
                  isFloating={false}
                />
              </div>
            )}

            {onSwitchToStudio && (
              <button
                onClick={onSwitchToStudio}
                className="mt-5 text-[11px] font-sans text-stone-500 hover:text-stone-800 underline tracking-wider block mx-auto"
              >
                {getTranslation('createYourOwn', lang)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
