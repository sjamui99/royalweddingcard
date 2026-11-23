import React, { useState } from 'react';
import { Copy, Check, MessageSquare, ExternalLink, QrCode, X, Share2 } from 'lucide-react';
import { generateShareableUrl } from '../../utils/urlCompression';

export function ShareModal({ card, onClose }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = generateShareableUrl(card);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappText = encodeURIComponent(
    `✨ You're cordially invited to celebrate the wedding of ${card.groom?.name} & ${card.bride?.name}!\n\nTap the royal invitation link below to open our interactive wedding card:\n${shareUrl}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;

  // QR Code URL using public API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full text-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800/80"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 mx-auto mb-3 shadow-inner">
            <Share2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-amber-200">
            Share Your Wedding Invitation
          </h3>
          <p className="font-sans text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            Guests who open this web URL will experience the luxury opening animation, interactive scratch card, music, timeline, and RSVP.
          </p>
        </div>

        {/* Copy Link Input Box */}
        <div className="mb-6">
          <label className="block text-xs font-sans text-stone-300 font-medium uppercase tracking-wider mb-2">
            Your Invitation Web URL
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono outline-none focus:border-amber-400 truncate"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold flex items-center space-x-1.5 transition-all ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans font-bold shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 text-amber-300 text-xs font-sans font-medium transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in New Tab</span>
          </a>
        </div>

        {/* QR Code Section */}
        <div className="bg-stone-950/80 rounded-2xl p-4 border border-stone-800 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="bg-white p-2 rounded-xl flex-shrink-0">
            <img
              src={qrCodeUrl}
              alt="QR Code for Wedding Invitation"
              className="w-24 h-24"
            />
          </div>
          <div className="text-center sm:text-left">
            <h5 className="font-serif font-bold text-amber-200 text-sm flex items-center justify-center sm:justify-start space-x-1.5">
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>Scan to Open on Mobile</span>
            </h5>
            <p className="font-sans text-[11px] text-stone-400 mt-1 leading-relaxed">
              Scan this QR code with any smartphone camera to immediately experience the viral envelope opening and invitation on your phone!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
