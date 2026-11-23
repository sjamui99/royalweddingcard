import React, { useState, useEffect } from 'react';

export function CountdownSection({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate || '2026-11-30T10:00:00') - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const padZero = (n) => String(n).padStart(2, '0');

  const items = [
    { label: 'DAYS', val: padZero(timeLeft.days) },
    { label: 'HOURS', val: padZero(timeLeft.hours) },
    { label: 'MINUTES', val: padZero(timeLeft.minutes) },
    { label: 'SECONDS', val: padZero(timeLeft.seconds) },
  ];

  return (
    <div className="my-8 px-4 text-center select-none">
      <h3 className="font-serif italic text-2xl text-stone-800 tracking-wide mb-4">
        Counting Down to Forever
      </h3>

      <div className="flex items-center justify-center space-x-2 md:space-x-3 max-w-sm mx-auto">
        {items.map((item, idx) => (
          <React.Fragment key={item.label}>
            <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl py-3 px-1 border border-amber-300/60 shadow-sm flex flex-col items-center">
              <span className="font-serif text-2xl md:text-3xl font-bold text-stone-800 tracking-tight">
                {item.val}
              </span>
              <span className="text-[9px] md:text-[10px] font-sans font-semibold tracking-wider text-amber-800/80 uppercase mt-1">
                {item.label}
              </span>
            </div>
            {idx < items.length - 1 && (
              <span className="text-amber-600 font-serif font-bold text-lg -mt-3">
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
