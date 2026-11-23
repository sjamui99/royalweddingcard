import React, { useState, useEffect } from 'react';
import { DEFAULT_CARD_DATA } from './types/defaultCardData';
import { getCardFromCurrentUrl } from './utils/urlCompression';
import { InvitationView } from './components/InvitationView';
import { StudioEditor } from './components/StudioEditor';
import { LanguageSwitcher } from './components/common/LanguageSwitcher';

export default function App() {
  // Check if opened as an invitation recipient via shared URL parameter (?card=... or #card=...)
  const isSharedViaUrl = (() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has('card') || window.location.hash.startsWith('#card=');
  })();

  const [card, setCard] = useState(() => {
    // 1. Check if opened via URL query (?card=...)
    const fromUrl = getCardFromCurrentUrl();
    if (fromUrl) return fromUrl;

    // 2. Check localStorage for previously saved card
    try {
      const saved = localStorage.getItem('royal_wedding_card_draft');
      if (saved) return JSON.parse(saved);
    } catch {}

    // 3. Fallback to default Zayn & Nora card matching video
    return DEFAULT_CARD_DATA;
  });

  const [lang, setLang] = useState(() => {
    // Prefer card's own defaultLanguage if set
    if (card?.defaultLanguage) return card.defaultLanguage;
    try {
      return localStorage.getItem('royal_wedding_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  // Sync lang when card defaultLanguage changes
  useEffect(() => {
    if (card?.defaultLanguage) {
      setLang(card.defaultLanguage);
    }
  }, [card?.defaultLanguage]);

  // Update browser document/tab title dynamically based on typed names
  useEffect(() => {
    const groom = card?.groom?.name?.trim() || '';
    const bride = card?.bride?.name?.trim() || '';

    // If still untouched initial default sample ("Zayn" & "Nora") in studio mode, keep generic studio title
    const isUntouchedSample = !isSharedViaUrl && groom === 'Zayn' && bride === 'Nora';

    let coupleName = '';
    if (!isUntouchedSample && (groom || bride)) {
      if (groom && bride) {
        coupleName = `${groom} & ${bride}`;
      } else {
        coupleName = groom || bride;
      }
    }

    if (coupleName) {
      if (viewMode === 'guest') {
        document.title = `${coupleName} • ${lang === 'hi' ? 'शुभ विवाह निमंत्रण' : 'Wedding Invitation'}`;
      } else {
        document.title = `${coupleName} • Wedding Card Studio`;
      }
    } else {
      if (viewMode === 'guest') {
        document.title = lang === 'hi' ? 'शुभ विवाह निमंत्रण पत्र' : 'Royal Wedding Invitation';
      } else {
        document.title = 'Royal Wedding Card Studio';
      }
    }
  }, [card?.groom?.name, card?.bride?.name, viewMode, lang, isSharedViaUrl]);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    try {
      localStorage.setItem('royal_wedding_lang', newLang);
    } catch {}
  };

  // Determine starting view mode:
  // If there's a ?card= param in the URL, start in Guest Invitation View.
  const [viewMode, setViewMode] = useState(() => {
    return isSharedViaUrl ? 'guest' : 'studio';
  });

  // Save changes to localStorage when updated in studio
  const handleUpdateCard = (updated) => {
    setCard(updated);
    if (updated.defaultLanguage && updated.defaultLanguage !== lang) {
      setLang(updated.defaultLanguage);
    }
    try {
      localStorage.setItem('royal_wedding_card_draft', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="w-full min-h-screen bg-stone-950 relative">
      {viewMode === 'guest' ? (
        <InvitationView
          card={card}
          lang={lang}
          isSharedViaUrl={isSharedViaUrl}
          onLanguageChange={handleLanguageChange}
          onSwitchToStudio={isSharedViaUrl ? null : () => setViewMode('studio')}
        />
      ) : (
        <StudioEditor
          card={card}
          lang={lang}
          onLanguageChange={handleLanguageChange}
          onUpdateCard={handleUpdateCard}
          onPreviewGuestView={() => setViewMode('guest')}
        />
      )}

      {/* Floating Language Switcher at the bottom of the application */}
      <LanguageSwitcher
        lang={lang}
        onToggle={handleLanguageChange}
        isFloating={true}
      />
    </div>
  );
}
