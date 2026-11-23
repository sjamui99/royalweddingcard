import React from 'react';
import { Bus, Hotel, Gift } from 'lucide-react';

export function TravelAccommodation({ logistics }) {
  if (!logistics) return null;

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto space-y-6 select-none">
      {/* Transportation */}
      {logistics.transportation && (
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm text-center">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-2">
            <Bus className="w-4 h-4 text-amber-700" />
          </div>
          <h4 className="font-serif italic text-xl text-stone-800 mb-1">
            Transportation
          </h4>
          <p className="font-sans text-xs text-stone-600 leading-relaxed">
            {logistics.transportation}
          </p>
        </div>
      )}

      {/* Accommodation */}
      {logistics.accommodation && (
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm text-center">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-2">
            <Hotel className="w-4 h-4 text-amber-700" />
          </div>
          <h4 className="font-serif italic text-xl text-stone-800 mb-1">
            Accommodation
          </h4>
          <p className="font-sans text-xs text-stone-600 leading-relaxed">
            {logistics.accommodation}
          </p>
        </div>
      )}

      {/* Gifts */}
      {logistics.gifts && (
        <div className="bg-white/85 backdrop-blur-sm rounded-2xl p-4 border border-amber-200/80 shadow-sm text-center">
          <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-2">
            <Gift className="w-4 h-4 text-amber-700" />
          </div>
          <h4 className="font-serif italic text-xl text-stone-800 mb-1">
            Gifts
          </h4>
          <p className="font-serif italic text-sm text-stone-700 leading-relaxed">
            "{logistics.gifts}"
          </p>
        </div>
      )}
    </div>
  );
}
