import React, { useState, useEffect } from 'react';
import { DEFAULT_CARD_DATA } from './types/defaultCardData';
import { getCardFromCurrentUrl } from './utils/urlCompression';
import { InvitationView } from './components/InvitationView';
import { StudioEditor } from './components/StudioEditor';

export default function App() {
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

  // Determine starting view mode:
  // If there's a ?card= param in the URL, start in Guest Invitation View.
  // Otherwise, start in Studio Editor mode so the user can immediately generate/customize!
  const [viewMode, setViewMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return (urlParams.has('card') || window.location.hash.startsWith('#card='))
      ? 'guest' 
      : 'studio';
  });

  // Save changes to localStorage when updated in studio
  const handleUpdateCard = (updated) => {
    setCard(updated);
    try {
      localStorage.setItem('royal_wedding_card_draft', JSON.stringify(updated));
    } catch {}
  };

  return (
    <div className="w-full min-h-screen bg-stone-950">
      {viewMode === 'guest' ? (
        <InvitationView
          card={card}
          onSwitchToStudio={() => setViewMode('studio')}
        />
      ) : (
        <StudioEditor
          card={card}
          onUpdateCard={handleUpdateCard}
          onPreviewGuestView={() => setViewMode('guest')}
        />
      )}
    </div>
  );
}
