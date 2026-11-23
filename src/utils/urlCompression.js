import LZString from 'lz-string';

/**
 * Encodes full card object into a compressed URL-safe string
 */
export function encodeCardToUrl(cardData) {
  try {
    const jsonStr = JSON.stringify(cardData);
    const compressed = LZString.compressToEncodedURIComponent(jsonStr);
    return compressed;
  } catch (err) {
    console.error("Compression error:", err);
    return encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(cardData)))));
  }
}

/**
 * Decodes compressed string from URL into full card object
 */
export function decodeCardFromUrl(compressedStr) {
  if (!compressedStr) return null;
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(compressedStr);
    if (decompressed) {
      return JSON.parse(decompressed);
    }
    // Fallback base64 decoding
    const decoded = decodeURIComponent(escape(atob(decodeURIComponent(compressedStr))));
    return JSON.parse(decoded);
  } catch (err) {
    console.warn("Decompression error, trying raw json decode:", err);
    try {
      return JSON.parse(decodeURIComponent(compressedStr));
    } catch {
      return null;
    }
  }
}

/**
 * Gets card data from current URL query param or hash
 */
export function getCardFromCurrentUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const cardParam = urlParams.get('card');
  if (cardParam) {
    return decodeCardFromUrl(cardParam);
  }

  // Also check hash #card=...
  if (window.location.hash.startsWith('#card=')) {
    const hashData = window.location.hash.replace('#card=', '');
    return decodeCardFromUrl(hashData);
  }

  return null;
}

/**
 * Generates a full shareable link for a card
 */
export function generateShareableUrl(cardData) {
  const compressed = encodeCardToUrl(cardData);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?card=${compressed}`;
}
