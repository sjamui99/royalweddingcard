import React from 'react';
import { CalendarDays, MapPin } from 'lucide-react';

export function PreWeddingEvents({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto text-center select-none">
      <div className="flex flex-col items-center mb-5">
        <h3 className="font-serif italic text-2xl text-stone-800">
          Pre-Wedding Events
        </h3>
        <div className="w-16 h-[1px] bg-amber-300 mt-2"></div>
      </div>

      <div className="space-y-4 text-left">
        {events.map((ev, idx) => (
          <div
            key={idx}
            className="bg-white/85 backdrop-blur-sm rounded-xl p-4 border border-amber-200/80 shadow-sm hover:shadow transition-all"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-stone-900">
                {ev.title}
              </h4>
              <span className="text-[11px] font-sans font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {ev.date}
              </span>
            </div>

            <div className="flex items-center text-xs text-stone-600 mt-1.5 space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span>{ev.location}</span>
            </div>

            {ev.desc && (
              <p className="text-[11px] text-stone-500 font-sans italic mt-1">
                {ev.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
