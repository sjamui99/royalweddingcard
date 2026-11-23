import React, { useState } from 'react';
import { Mail, CheckCircle2, HeartHandshake, Send } from 'lucide-react';
import { triggerRoyalConfetti } from '../../utils/confetti';
import { royalAudio } from '../../utils/audioPlayer';

export function RSVPSection({ cardId = "default" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '1',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Save to local storage for the host/creator dashboard
    try {
      const storageKey = `rsvp_${cardId}`;
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const newEntry = {
        ...formData,
        id: Date.now(),
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem(storageKey, JSON.stringify([...existing, newEntry]));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }

    setSubmitted(true);
    triggerRoyalConfetti(0.5, 0.7);
    royalAudio.playRoyalSealSound();
  };

  return (
    <div className="my-10 px-4 w-full max-w-sm mx-auto select-none">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300/80 shadow-lg text-center relative overflow-hidden">
        {/* Top Ornament */}
        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-800 mx-auto mb-2 shadow-sm">
          <Mail className="w-5 h-5 text-amber-700" />
        </div>

        <h3 className="font-serif italic text-2xl text-stone-800 mb-1">
          RSVP
        </h3>
        <p className="font-sans text-xs text-stone-500 mb-5">
          Please let us know if you can join our celebration
        </p>

        {submitted ? (
          <div className="py-8 animate-fade-in flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-800 mb-1">
              Thank You, {formData.name}!
            </h4>
            <p className="font-sans text-xs text-stone-600 max-w-xs leading-relaxed">
              {formData.attending === 'yes'
                ? "Your response has been warmly received. We can't wait to celebrate together!"
                : "Thank you for letting us know. You will be missed in our hearts!"}
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-xs text-amber-700 underline font-sans"
            >
              Update your response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-[11px] font-sans font-medium text-stone-700 uppercase tracking-wider mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs font-sans text-stone-800 outline-none transition-all bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium text-stone-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs font-sans text-stone-800 outline-none transition-all bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-[11px] font-sans font-medium text-stone-700 uppercase tracking-wider mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  className={`py-2 px-3 rounded-xl border text-xs font-sans font-medium transition-all text-center ${
                    formData.attending === 'yes'
                      ? 'bg-emerald-800 border-emerald-800 text-amber-200 font-semibold shadow-sm'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Joyfully Accept ✨
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  className={`py-2 px-3 rounded-xl border text-xs font-sans font-medium transition-all text-center ${
                    formData.attending === 'no'
                      ? 'bg-stone-800 border-stone-800 text-white font-semibold shadow-sm'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {formData.attending === 'yes' && (
              <div>
                <label className="block text-[11px] font-sans font-medium text-stone-700 uppercase tracking-wider mb-1">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 text-xs font-sans text-stone-800 outline-none bg-stone-50/50"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4+">Family (4+ Persons)</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-sans font-medium text-stone-700 uppercase tracking-wider mb-1">
                Wishes & Blessings for the Couple
              </label>
              <textarea
                rows={2}
                placeholder="Write your heartfelt congratulations..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl border border-stone-200 focus:border-amber-500 text-xs font-sans text-stone-800 outline-none bg-stone-50/50 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-750 hover:to-emerald-650 text-amber-200 font-serif font-bold text-xs tracking-[0.2em] uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-amber-400/40 mt-4 active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
