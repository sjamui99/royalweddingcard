import React, { useState, useEffect } from 'react';
import { X, Users, CheckCircle, XCircle, Download, MessageSquare } from 'lucide-react';

export function RSVPResponsesModal({ cardId, onClose }) {
  const [rsvps, setRsvps] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(`rsvp_${cardId}`) || '[]');
      setRsvps(stored);
    } catch {
      setRsvps([]);
    }
  }, [cardId]);

  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const totalGuests = rsvps
    .filter(r => r.attending === 'yes')
    .reduce((sum, r) => sum + (parseInt(r.guests, 10) || 1), 0);

  const downloadCSV = () => {
    if (rsvps.length === 0) return;
    const headers = ["Name", "Email", "Attending", "Guests", "Wishes", "Submitted At"];
    const rows = rsvps.map(r => [
      `"${r.name}"`,
      `"${r.email || ''}"`,
      r.attending === 'yes' ? 'Yes' : 'No',
      r.guests || '1',
      `"${(r.message || '').replace(/"/g, '""')}"`,
      `"${new Date(r.submittedAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `wedding_rsvps_${cardId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-2xl w-full text-white shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="font-serif text-2xl font-bold text-amber-200 flex items-center space-x-2">
            <Users className="w-6 h-6 text-amber-400" />
            <span>Guest RSVP Responses</span>
          </h3>
          <p className="font-sans text-xs text-stone-400 mt-1">
            Real-time responses received from guests who viewed this invitation.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-stone-800/80 p-3 rounded-xl border border-stone-700 text-center">
              <span className="text-xl font-bold text-white">{rsvps.length}</span>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider font-sans mt-0.5">Total Responses</p>
            </div>
            <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-700/50 text-center">
              <span className="text-xl font-bold text-emerald-400">{attendingCount}</span>
              <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-sans mt-0.5">Attending</p>
            </div>
            <div className="bg-amber-950/60 p-3 rounded-xl border border-amber-700/50 text-center">
              <span className="text-xl font-bold text-amber-300">{totalGuests}</span>
              <p className="text-[10px] text-amber-200 uppercase tracking-wider font-sans mt-0.5">Expected Guests</p>
            </div>
          </div>
        </div>

        {/* Responses Table / List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {rsvps.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-sans">No guest responses yet.</p>
              <p className="text-xs text-stone-600 mt-1">Share the invitation URL to start receiving RSVPs!</p>
            </div>
          ) : (
            rsvps.map((entry) => (
              <div
                key={entry.id}
                className="bg-stone-800/60 rounded-xl p-4 border border-stone-700/80 hover:border-amber-400/40 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {entry.attending === 'yes' ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    )}
                    <span className="font-serif font-bold text-base text-stone-100">
                      {entry.name}
                    </span>
                    {entry.email && (
                      <span className="text-xs text-stone-400 font-sans">({entry.email})</span>
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      entry.attending === 'yes'
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        : 'bg-stone-800 text-stone-400 border border-stone-600'
                    }`}
                  >
                    {entry.attending === 'yes' ? `Attending (${entry.guests} guests)` : 'Declined'}
                  </span>
                </div>

                {entry.message && (
                  <p className="text-xs text-amber-200/90 font-serif italic mt-2 pl-6 bg-stone-900/40 p-2 rounded-lg border-l-2 border-amber-500/60">
                    "{entry.message}"
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {rsvps.length > 0 && (
          <div className="mt-4 pt-4 border-t border-stone-800 flex justify-end">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-sans font-bold flex items-center space-x-1.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
