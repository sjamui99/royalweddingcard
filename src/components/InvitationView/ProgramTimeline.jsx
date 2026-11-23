import React from 'react';
import { Clock, Wine, Heart, Sparkles, Music } from 'lucide-react';

export function ProgramTimeline({ timeline = [] }) {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-100/80 border border-amber-300 flex items-center justify-center text-amber-800 mb-1.5 shadow-sm">
          <Clock className="w-5 h-5" />
        </div>
        <h3 className="font-serif italic text-2xl text-stone-800">
          Program Timeline
        </h3>
        <div className="w-16 h-[1px] bg-amber-300 mt-2"></div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-[1.5px] before:bg-amber-300/80">
        {timeline.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline bullet circle */}
            <div className="absolute -left-[20px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-amber-600 bg-ivory-50 group-hover:bg-amber-500 transition-colors shadow-sm"></div>

            {/* Timeline Card */}
            <div className="bg-white/85 backdrop-blur-sm rounded-xl p-3.5 border border-amber-200/80 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif font-bold text-base text-stone-900">
                  {item.title}
                </span>
                <span className="text-xs font-sans font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
