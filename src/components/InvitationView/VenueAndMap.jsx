import React from 'react';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export function VenueAndMap({ venue }) {
  if (!venue) return null;

  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${venue.name} ${venue.address}`
  )}`;

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto text-center select-none">
      {/* Icon & Title */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 mb-1.5 shadow-sm">
          <MapPin className="w-5 h-5 text-amber-700" />
        </div>
        <h3 className="font-serif italic text-2xl text-stone-800">
          Venue
        </h3>
        <p className="font-serif font-bold text-lg text-stone-900 mt-1">
          {venue.name}
        </p>
        <p className="font-sans text-xs text-stone-600 mt-0.5">
          {venue.address}
        </p>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-md bg-stone-100 mb-4 h-56">
        <iframe
          title="Wedding Venue Location"
          src={venue.embedUrl || `https://maps.google.com/maps?q=${encodeURIComponent(venue.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
        />
        <div className="absolute bottom-2 left-2 right-2 pointer-events-none text-center">
          <span className="bg-stone-900/70 text-amber-200 text-[10px] px-2.5 py-0.5 rounded-full backdrop-blur-sm">
            Use two fingers to move the map
          </span>
        </div>
      </div>

      {/* View on Google Maps Button (exact as in video) */}
      <a
        href={mapsSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center space-x-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-emerald-800 to-emerald-750 text-amber-200 hover:text-white font-serif font-bold text-xs tracking-widest uppercase border border-amber-400/50 shadow transition-all duration-300 hover:shadow-md"
      >
        <Navigation className="w-3.5 h-3.5 text-amber-300" />
        <span>View on Google Maps</span>
        <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
      </a>
    </div>
  );
}
