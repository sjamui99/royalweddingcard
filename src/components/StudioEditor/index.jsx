import React, { useState } from 'react';
import { 
  Sparkles, Eye, Share2, Users, Palette, Calendar, MapPin, 
  Clock, Shirt, Heart, Gift, Plus, Trash2, CheckCircle2, RotateCcw,
  Languages
} from 'lucide-react';
import { THEME_PRESETS } from '../../types/defaultCardData';
import { ShareModal } from './ShareModal';
import { RSVPResponsesModal } from './RSVPResponsesModal';
import { MainHeroInvitation } from '../InvitationView/MainHeroInvitation';
import { ScratchCardSection } from '../InvitationView/ScratchCardSection';
import { PhotoGalleryCarousel } from '../InvitationView/PhotoGalleryCarousel';
import { CountdownSection } from '../InvitationView/CountdownSection';
import { ProgramTimeline } from '../InvitationView/ProgramTimeline';
import { VenueAndMap } from '../InvitationView/VenueAndMap';
import { DressCodeSection } from '../InvitationView/DressCodeSection';
import { PreWeddingEvents } from '../InvitationView/PreWeddingEvents';
import { TravelAccommodation } from '../InvitationView/TravelAccommodation';

export function StudioEditor({ card, lang = 'en', onLanguageChange, onUpdateCard, onPreviewGuestView }) {
  const [activeTab, setActiveTab] = useState('couple');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [previewMode, setPreviewMode] = useState(false); // Mobile toggle between form and preview

  // Helper to update card fields safely
  const updateField = (path, value) => {
    const keys = path.split('.');
    const updated = JSON.parse(JSON.stringify(card));
    let cur = updated;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    onUpdateCard(updated);
  };

  const handleAddTimelineItem = () => {
    const items = [...(card.timeline || [])];
    items.push({
      time: "08:30 PM",
      title: "Cake Cutting & Fireworks",
      desc: "Join us under the stars",
      icon: "party"
    });
    updateField('timeline', items);
  };

  const handleRemoveTimelineItem = (idx) => {
    const items = [...(card.timeline || [])];
    items.splice(idx, 1);
    updateField('timeline', items);
  };

  const handleAddPreWeddingEvent = () => {
    const events = [...(card.preWeddingEvents || [])];
    events.push({
      title: "Cocktail & Sangeet Night",
      date: "Nov 29, 2026 • 7:30 PM",
      location: "Grand Ballroom",
      desc: "An evening of dance & cheer"
    });
    updateField('preWeddingEvents', events);
  };

  const handleRemovePreWeddingEvent = (idx) => {
    const events = [...(card.preWeddingEvents || [])];
    events.splice(idx, 1);
    updateField('preWeddingEvents', events);
  };

  const tabs = [
    { id: 'couple', label: 'Bride & Groom', icon: Heart },
    { id: 'language', label: 'Default Language', icon: Languages },
    { id: 'date', label: 'Date & Reveal', icon: Calendar },
    { id: 'theme', label: 'Royal Theme', icon: Palette },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'venue', label: 'Venue & Map', icon: MapPin },
    { id: 'details', label: 'Events & Details', icon: Shirt },
  ];

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      {/* Top Studio Navigation Bar */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md border-b border-amber-500/30 px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-stone-950 font-serif font-bold text-base sm:text-lg shadow-md flex-shrink-0">
            💍
          </div>
          <div className="min-w-0">
            <h1 className="font-serif text-sm sm:text-lg font-bold text-amber-200 tracking-wide truncate">
              Royal Wedding Card Studio
            </h1>
            <p className="text-[10px] text-stone-400 font-sans tracking-wider uppercase truncate">
              {card.groom?.name && card.bride?.name
                ? `${card.groom.name} & ${card.bride.name} • Live Generator`
                : (card.groom?.name || card.bride?.name)
                ? `${card.groom?.name || card.bride?.name} • Live Generator`
                : 'Live Invitation Generator'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2.5 ml-auto">
          <button
            onClick={() => setShowRSVPModal(true)}
            className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs font-sans font-medium flex items-center space-x-1.5 transition-all shadow-sm flex-shrink-0"
            title="View RSVPs submitted by guests"
          >
            <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>RSVPs</span>
          </button>

          <button
            onClick={onPreviewGuestView}
            className="px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-amber-400/50 text-amber-300 text-xs font-sans font-semibold flex items-center space-x-1.5 transition-all shadow-sm flex-shrink-0"
            title="Open Live Guest Experience"
          >
            <Eye className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Open Experience</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-sans font-bold text-xs flex items-center space-x-1.5 shadow-md transition-all active:scale-95 flex-shrink-0"
            title="Share Invitation URL"
          >
            <Share2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Share URL</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Panel: Form Settings */}
        <div className="w-full lg:w-[54%] border-r border-stone-800 flex flex-col h-auto lg:h-[calc(100vh-60px)] overflow-y-auto">
          {/* Sub Navigation Tabs */}
          <div className="bg-stone-900 border-b border-stone-800 px-3 sm:px-4 py-2 flex items-center space-x-1.5 overflow-x-auto no-scrollbar scroll-smooth">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center space-x-1.5 whitespace-nowrap flex-shrink-0 transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-400/40'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6 max-w-xl">
            
            {/* TAB: COUPLE */}
            {activeTab === 'couple' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    Groom & Bride Information
                  </h3>
                  <p className="text-xs text-stone-400">
                    Displayed prominently in the grand entrance archway.
                  </p>
                </div>

                {/* Default Language Selector */}
                <div className="bg-stone-900/80 p-4 rounded-2xl border border-amber-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-sans uppercase tracking-wider text-amber-300 font-bold">
                        Default Language for Guests (प्राथमिक भाषा)
                      </h4>
                    </div>
                    <span className="text-[10px] bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full font-sans font-medium border border-amber-400/30">
                      Auto-loads for guests
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Choose the primary language guests will see upon opening your invitation link:
                  </p>
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        updateField('defaultLanguage', 'en');
                        if (onLanguageChange) onLanguageChange('en');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        (card.defaultLanguage || 'en') === 'en'
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">🇬🇧</span>
                        {(card.defaultLanguage || 'en') === 'en' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-stone-100">English</span>
                      <span className="text-[10px] text-stone-400 mt-0.5">Standard English labels</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateField('defaultLanguage', 'hi');
                        if (onLanguageChange) onLanguageChange('hi');
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        card.defaultLanguage === 'hi'
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-lg ring-1 ring-amber-400'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">🇮🇳</span>
                        {card.defaultLanguage === 'hi' && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-stone-100">हिंदी (Hindi)</span>
                      <span className="text-[10px] text-stone-400 mt-0.5">॥ शुभ विवाह ॥ व देवनागरी</span>
                    </button>
                  </div>
                </div>

                {/* Groom */}
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
                    <span>🤵 The Groom</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Groom's Name</label>
                    <input
                      type="text"
                      value={card.groom?.name || ''}
                      onChange={(e) => updateField('groom.name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Parents' Dedication</label>
                    <input
                      type="text"
                      placeholder="Son of Mr. & Mrs. Malik"
                      value={card.groom?.parents || ''}
                      onChange={(e) => updateField('groom.parents', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Degrees / Profession</label>
                    <input
                      type="text"
                      placeholder="B.E., M.Sc. Data Scientist"
                      value={card.groom?.title || ''}
                      onChange={(e) => updateField('groom.title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Bride */}
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-amber-400 font-bold flex items-center space-x-1.5">
                    <span>👰 The Bride</span>
                  </h4>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Bride's Name</label>
                    <input
                      type="text"
                      value={card.bride?.name || ''}
                      onChange={(e) => updateField('bride.name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Parents' Dedication</label>
                    <input
                      type="text"
                      placeholder="Daughter of Mr. & Mrs. Siddiqui"
                      value={card.bride?.parents || ''}
                      onChange={(e) => updateField('bride.parents', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Degrees / Profession</label>
                    <input
                      type="text"
                      placeholder="MBBS, M.D. Pediatrician"
                      value={card.bride?.title || ''}
                      onChange={(e) => updateField('bride.title', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Tagline & Welcome message */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Couple Tagline</label>
                    <input
                      type="text"
                      value={card.coupleTagline || "We're getting married"}
                      onChange={(e) => updateField('coupleTagline', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Welcome & Blessing Message</label>
                    <textarea
                      rows={3}
                      value={card.welcomeMessage || ''}
                      onChange={(e) => updateField('welcomeMessage', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:border-amber-400 outline-none resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DEFAULT LANGUAGE */}
            {activeTab === 'language' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200 flex items-center space-x-2">
                    <Languages className="w-5 h-5 text-amber-400" />
                    <span>Default Language & Regional Settings</span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    Choose the primary language displayed to guests when opening your shared invitation card.
                  </p>
                </div>

                <div className="bg-stone-900/80 p-5 rounded-2xl border border-stone-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-sans font-bold text-stone-100">
                        Primary Invitation Language
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        This language will be pre-selected when guests open the web card or scan your QR code.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateField('defaultLanguage', 'en');
                        if (onLanguageChange) onLanguageChange('en');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        (card.defaultLanguage || 'en') === 'en'
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/60'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🇬🇧</span>
                        {(card.defaultLanguage || 'en') === 'en' ? (
                          <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                            Active Default
                          </span>
                        ) : null}
                      </div>
                      <span className="text-sm font-bold text-stone-100">English</span>
                      <span className="text-xs text-stone-400 mt-1">
                        Opens with "We're getting married", "Save The Date" & English typography
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        updateField('defaultLanguage', 'hi');
                        if (onLanguageChange) onLanguageChange('hi');
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        card.defaultLanguage === 'hi'
                          ? 'bg-amber-400/15 border-amber-400 text-white shadow-xl ring-2 ring-amber-400/60'
                          : 'bg-stone-800/60 border-stone-700 text-stone-300 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">🇮🇳</span>
                        {card.defaultLanguage === 'hi' ? (
                          <span className="text-[10px] bg-amber-400 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                            Active Default
                          </span>
                        ) : null}
                      </div>
                      <span className="text-sm font-bold text-stone-100">हिंदी (Hindi)</span>
                      <span className="text-xs text-stone-400 mt-1">
                        Opens with "॥ शुभ विवाह ॥", "शुभ परिणय संस्कार" & Devanagari script
                      </span>
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-stone-400 space-y-1.5">
                  <span className="font-semibold text-amber-300 flex items-center space-x-1">
                    <span>💡 Note for Guests:</span>
                  </span>
                  <p>
                    Regardless of your default language choice, guests can still easily switch between English and Hindi at any time using the language toggle button at the bottom of the card!
                  </p>
                </div>
              </div>
            )}

            {/* TAB: DATE & REVEAL */}
            {activeTab === 'date' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    Wedding Date & Scratch-to-Reveal
                  </h3>
                  <p className="text-xs text-stone-400">
                    Controls the interactive heart scratcher, calendar links & countdown timer.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">Date & Time (ISO/Picker)</label>
                    <input
                      type="datetime-local"
                      value={card.weddingDate ? card.weddingDate.substring(0, 16) : '2026-11-30T10:00'}
                      onChange={(e) => updateField('weddingDate', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">Formatted Date (Shown on card)</label>
                    <input
                      type="text"
                      placeholder="November 30, 2026"
                      value={card.dateFormatted || ''}
                      onChange={(e) => updateField('dateFormatted', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">Day of the Week</label>
                    <input
                      type="text"
                      placeholder="Monday"
                      value={card.dayOfWeek || ''}
                      onChange={(e) => updateField('dayOfWeek', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-300 mb-1 font-medium">Scratch Heart Line</label>
                    <input
                      type="text"
                      placeholder="Our forever begins"
                      value={card.scratchRevealText || ''}
                      onChange={(e) => updateField('scratchRevealText', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: THEME */}
            {activeTab === 'theme' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    Royal Color Palette & Aesthetic
                  </h3>
                  <p className="text-xs text-stone-400">
                    Select a luxury aesthetic for the gatefold doors, seal, and accents.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {THEME_PRESETS.map((t) => {
                    const isSelected = card.theme?.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => updateField('theme', t)}
                        className={`p-4 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 shadow-lg ring-1 ring-amber-400'
                            : 'border-stone-800 bg-stone-900 hover:border-stone-700'
                        }`}
                      >
                        <div
                          className="w-8 h-8 rounded-full border-2 border-amber-300 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: t.primary }}
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-100">{t.name}</h4>
                          <span className="text-[10px] text-stone-400 font-mono mt-0.5 block">
                            Accent: {t.accent}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: TIMELINE */}
            {activeTab === 'timeline' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-amber-200">
                      Program Timeline
                    </h3>
                    <p className="text-xs text-stone-400">
                      Events schedule shown on the wedding day.
                    </p>
                  </div>
                  <button
                    onClick={handleAddTimelineItem}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Step</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {(card.timeline || []).map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-900/80 p-4 rounded-xl border border-stone-800 space-y-2 relative group"
                    >
                      <button
                        onClick={() => handleRemoveTimelineItem(idx)}
                        className="absolute top-3 right-3 text-stone-500 hover:text-red-400 p-1"
                        title="Delete this event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-3 pr-8">
                        <div>
                          <label className="block text-[10px] text-stone-400 uppercase font-sans mb-1">Time</label>
                          <input
                            type="text"
                            value={item.time}
                            onChange={(e) => {
                              const list = [...card.timeline];
                              list[idx].time = e.target.value;
                              updateField('timeline', list);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-stone-400 uppercase font-sans mb-1">Title</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const list = [...card.timeline];
                              list[idx].title = e.target.value;
                              updateField('timeline', list);
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-stone-400 uppercase font-sans mb-1">Description</label>
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => {
                            const list = [...card.timeline];
                            list[idx].desc = e.target.value;
                            updateField('timeline', list);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100 outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: VENUE & MAP */}
            {activeTab === 'venue' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    Venue & Location
                  </h3>
                  <p className="text-xs text-stone-400">
                    Allows guests to open directions in Google Maps with one click.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Venue Hall / Hotel Name</label>
                    <input
                      type="text"
                      placeholder="Grand Palace Hall"
                      value={card.venue?.name || ''}
                      onChange={(e) => updateField('venue.name', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Address / Landmark</label>
                    <input
                      type="text"
                      placeholder="City Centre, London, UK"
                      value={card.venue?.address || ''}
                      onChange={(e) => updateField('venue.address', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-sm focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Google Maps Embed URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="https://maps.google.com/..."
                      value={card.venue?.embedUrl || ''}
                      onChange={(e) => updateField('venue.embedUrl', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs focus:border-amber-400 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DETAILS (Dress code, Pre-wedding events, Travel) */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-stone-800 pb-3">
                  <h3 className="font-serif text-lg font-bold text-amber-200">
                    Dress Code & Pre-Wedding Events
                  </h3>
                  <p className="text-xs text-stone-400">
                    Additional details to help guests prepare for the big celebration.
                  </p>
                </div>

                {/* Dress Code */}
                <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 space-y-3">
                  <h4 className="text-xs font-sans uppercase tracking-wider text-amber-400 font-bold">
                    Dress Code
                  </h4>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Women</label>
                    <input
                      type="text"
                      value={card.dressCode?.women || ''}
                      onChange={(e) => updateField('dressCode.women', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-400 mb-1">Men</label>
                    <input
                      type="text"
                      value={card.dressCode?.men || ''}
                      onChange={(e) => updateField('dressCode.men', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 text-xs focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>

                {/* Pre Wedding Events */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-sans uppercase tracking-wider text-amber-400 font-bold">
                      Pre-Wedding Ceremonies
                    </h4>
                    <button
                      onClick={handleAddPreWeddingEvent}
                      className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Ceremony</span>
                    </button>
                  </div>

                  {(card.preWeddingEvents || []).map((ev, idx) => (
                    <div key={idx} className="bg-stone-900/80 p-3.5 rounded-xl border border-stone-800 space-y-2 relative">
                      <button
                        onClick={() => handleRemovePreWeddingEvent(idx)}
                        className="absolute top-3 right-3 text-stone-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <div className="grid grid-cols-2 gap-2 pr-7">
                        <input
                          type="text"
                          placeholder="Event Title"
                          value={ev.title}
                          onChange={(e) => {
                            const list = [...card.preWeddingEvents];
                            list[idx].title = e.target.value;
                            updateField('preWeddingEvents', list);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100"
                        />
                        <input
                          type="text"
                          placeholder="Date & Time"
                          value={ev.date}
                          onChange={(e) => {
                            const list = [...card.preWeddingEvents];
                            list[idx].date = e.target.value;
                            updateField('preWeddingEvents', list);
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Location"
                        value={ev.location}
                        onChange={(e) => {
                          const list = [...card.preWeddingEvents];
                          list[idx].location = e.target.value;
                          updateField('preWeddingEvents', list);
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-stone-800 border border-stone-700 text-xs text-stone-100"
                      />
                    </div>
                  ))}
                </div>

                {/* Transportation & Accommodation */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Shuttle / Transportation</label>
                    <textarea
                      rows={2}
                      value={card.logistics?.transportation || ''}
                      onChange={(e) => updateField('logistics.transportation', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">Accommodation / Hotel Code</label>
                    <textarea
                      rows={2}
                      value={card.logistics?.accommodation || ''}
                      onChange={(e) => updateField('logistics.accommodation', e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-stone-100 text-xs resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right Panel: Live Mobile Invitation Preview */}
        <div className="w-full lg:w-[46%] bg-stone-950 flex flex-col items-center justify-start py-6 px-4 overflow-y-auto">
          <div className="mb-3 flex items-center space-x-2 text-xs text-stone-400">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-serif italic">Real-Time Mobile Device Preview</span>
          </div>

          {/* Scaled Device Mockup */}
          <div className="w-full max-w-[390px] rounded-[36px] border-[10px] border-stone-800 bg-[#fdfbf7] shadow-2xl overflow-hidden relative min-h-[700px]">
            {/* Notch */}
            <div className="w-32 h-4 bg-stone-800 rounded-b-xl mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none" />

            {/* Inner Card Scroll Content */}
            <div className="pt-4 overflow-y-auto max-h-[660px]">
              <MainHeroInvitation card={card} isAnimated={false} lang={lang} key={lang} />
              <ScratchCardSection card={card} lang={lang} />
              <PhotoGalleryCarousel gallery={card.gallery} />
              <CountdownSection targetDate={card.weddingDate} lang={lang} />
              <ProgramTimeline timeline={card.timeline} lang={lang} />
              <VenueAndMap venue={card.venue} lang={lang} />
              <DressCodeSection dressCode={card.dressCode} lang={lang} />
              <PreWeddingEvents events={card.preWeddingEvents} lang={lang} />
              <TravelAccommodation logistics={card.logistics} lang={lang} />
            </div>
          </div>
        </div>

      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal card={card} onClose={() => setShowShareModal(false)} />
      )}

      {/* Guest RSVPs Modal */}
      {showRSVPModal && (
        <RSVPResponsesModal cardId={card.id || "zayn-and-nora"} onClose={() => setShowRSVPModal(false)} />
      )}
    </div>
  );
}
