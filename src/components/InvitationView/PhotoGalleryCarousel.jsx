import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export function PhotoGalleryCarousel({ gallery = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!gallery || gallery.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="my-8 px-4 w-full max-w-sm mx-auto select-none">
      <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100 aspect-[4/3] group">
        {/* Current Image */}
        <img
          src={gallery[currentIndex].url}
          alt={gallery[currentIndex].caption || "Wedding moment"}
          className="w-full h-full object-cover transition-all duration-700 transform hover:scale-105"
        />

        {/* Gradient shadow overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Caption */}
        {gallery[currentIndex].caption && (
          <div className="absolute bottom-3 left-4 right-4 text-center">
            <span className="font-serif italic text-white text-sm tracking-wide drop-shadow-md">
              {gallery[currentIndex].caption}
            </span>
          </div>
        )}

        {/* Left Arrow */}
        {gallery.length > 1 && (
          <button
            onClick={prevSlide}
            aria-label="Previous photo"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow */}
        {gallery.length > 1 && (
          <button
            onClick={nextSlide}
            aria-label="Next photo"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Slide Indicators / Dots */}
      {gallery.length > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-3">
          {gallery.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-6 bg-amber-600' 
                  : 'w-2 bg-stone-300 hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
