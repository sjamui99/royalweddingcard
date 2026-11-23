import React, { useState, useEffect } from 'react';
import { Copy, Check, MessageSquare, ExternalLink, QrCode, X, Share2, Link2, Sparkles, Loader2 } from 'lucide-react';
import { generateShareableUrl, createShortUrl } from '../../utils/urlCompression';

export function ShareModal({ card, onClose }) {
  const [copied, setCopied] = useState(false);
  const fullUrl = generateShareableUrl(card);
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(true);
  const [urlMode, setUrlMode] = useState('short'); // 'short' or 'full'

  useEffect(() => {
    let isMounted = true;
    setIsShortening(true);

    createShortUrl(fullUrl)
      .then((short) => {
        if (isMounted) {
          setShortUrl(short);
          setIsShortening(false);
        }
      })
      .catch((err) => {
        console.warn("Failed to create short URL:", err);
        if (isMounted) {
          setShortUrl(fullUrl);
          setIsShortening(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [fullUrl]);

  // Active URL to share (prioritizes short URL when available)
  const activeUrl = urlMode === 'short' && shortUrl ? shortUrl : fullUrl;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isHindi = card?.defaultLanguage === 'hi';
  const groomName = isHindi && card.groom?.name === 'Zayn' ? 'ज़ैन' : card.groom?.name;
  const brideName = isHindi && card.bride?.name === 'Nora' ? 'नोरा' : card.bride?.name;

  const whatsappText = encodeURIComponent(
    isHindi
      ? `✨ आप ${groomName} एवं ${brideName} के शुभ विवाह में सस्नेह आमंत्रित हैं!\n\nशाही डिजिटल निमंत्रण पत्र खोलने के लिए नीचे दिए गए लिंक पर टैप करें:\n${activeUrl}`
      : `✨ You're cordially invited to celebrate the wedding of ${card.groom?.name} & ${card.bride?.name}!\n\nTap the royal invitation link below to open our interactive wedding card:\n${activeUrl}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappText}`;

  // QR Code URL based on the active short URL (much cleaner to scan)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activeUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full text-white shadow-2xl relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800/80 transition-colors"
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
            Send this link to friends and family. Opening it triggers the viral gatefold doors, background music, scratch card, and RSVP.
          </p>
        </div>

        {/* Short URL / Full URL Toggle Tabs */}
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-sans text-stone-300 font-medium uppercase tracking-wider flex items-center space-x-1.5">
            <Link2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Invitation Link</span>
          </label>

          <div className="flex rounded-full bg-stone-800 p-0.5 border border-stone-700 text-[11px] font-sans">
            <button
              type="button"
              onClick={() => setUrlMode('short')}
              className={`px-3 py-1 rounded-full transition-all ${
                urlMode === 'short'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Short URL ✨
            </button>
            <button
              type="button"
              onClick={() => setUrlMode('full')}
              className={`px-3 py-1 rounded-full transition-all ${
                urlMode === 'full'
                  ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              Full Link
            </button>
          </div>
        </div>

        {/* URL Input Box */}
        <div className="mb-5">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                readOnly
                value={isShortening && urlMode === 'short' ? 'Generating short URL...' : activeUrl}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-amber-300 text-xs font-mono outline-none focus:border-amber-400 truncate pr-8"
              />
              {isShortening && urlMode === 'short' && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-400">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}
            </div>

            <button
              onClick={handleCopy}
              disabled={isShortening && urlMode === 'short'}
              className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold flex items-center space-x-1.5 transition-all flex-shrink-0 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>

          {urlMode === 'short' && shortUrl && (
            <p className="text-[11px] text-emerald-400 font-sans mt-1.5 flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Clean short link ready for WhatsApp and SMS messages!</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-sans font-bold shadow-md transition-all active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Share via WhatsApp</span>
          </a>

          <a
            href={activeUrl}
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
          <div className="bg-white p-2 rounded-xl flex-shrink-0 shadow-md">
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
              Scan with any phone camera to experience the viral envelope opening animation and music on mobile instantly!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
