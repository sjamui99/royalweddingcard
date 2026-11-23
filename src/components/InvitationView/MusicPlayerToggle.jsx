import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { royalAudio } from '../../utils/audioPlayer';

export function MusicPlayerToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => {
    const newState = royalAudio.togglePlay();
    setIsPlaying(newState);
  };

  return (
    <div className="fixed top-4 right-4 z-40">
      <button
        onClick={toggle}
        aria-label="Toggle background wedding melody"
        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-amber-300/60 backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-emerald-800 text-amber-200 animate-pulse-subtle'
            : 'bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white'
        }`}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-amber-300 animate-spin-slow" />
        ) : (
          <VolumeX className="w-5 h-5 text-stone-500" />
        )}
      </button>
    </div>
  );
}
