# 💍 Royal Wedding Card Studio (Viral Gatefold Invitation Generator)

A luxury interactive wedding invitation web generator inspired by the viral Instagram reel. Couples can design an opulent digital wedding card and send a web URL to guests. When guests open the link on their smartphone or browser, they experience the interactive gatefold envelope opening animation, romantic background melody, scratch-to-reveal heart, countdown timer, program timeline, Google Maps venue location, dress code, and interactive RSVP form.

---

## ✨ Features Replicated From The Viral Video

1. **Gatefold Opening & Wax Seal (`TAP TO OPEN`)**:
   - Textured emerald green & gold embossed doors meeting at the center seam.
   - Ornate scalloped golden wax seal with wedding rings and subtle floating pulse animation.
   - When tapped: Plays an authentic royal chime, the seal bursts, and the gatefold doors smoothly slide left and right into view.
2. **Romantic Wedding Melody**:
   - Ambient flute/sitar/harp melody automatically plays once opened.
   - Floating music player toggle button to mute or play at any time.
3. **Hero Archway & Courtyard Artwork**:
   - Classical scalloped draped pelmet curtains with golden tassels.
   - Bride & Groom names (**Zayn & Nora**), parent dedications, and profession titles.
   - Neoclassical marble fountain courtyard surrounded by blossoming roses and greenery.
4. **Interactive Scratch-to-Reveal Card**:
   - Canvas-based olive-gold glitter heart.
   - Guests can rub/scratch with finger or mouse cursor to reveal:
     - *"Our forever begins"*
     - *"November 30, 2026 • Monday"*
   - Triggers celebratory golden confetti and sound effects once scratched past 40%!
   - Quick reveal fallback option for instant access.
5. **One-Click Calendar Integration ("SAVE THE DATE")**:
   - Emerald "Save The Date" button.
   - Instant export to Google Calendar and download of standard `.ics` file (Apple Calendar / Microsoft Outlook).
6. **Photo Moments Carousel**:
   - Smooth couple gallery with dot indicators and navigation arrows.
7. **Counting Down to Forever**:
   - Live real-time countdown timer tracking Days, Hours, Minutes, and Seconds.
8. **Program Timeline**:
   - Guest Arrival (10:00 AM)
   - Wedding Ceremony (11:30 AM)
   - Reception (07:00 PM)
9. **Venue & Interactive Google Maps**:
   - "Grand Palace Hall, City Centre, London"
   - Embedded interactive map with "View on Google Maps" navigation button.
10. **Dress Code Guide**:
    - Interactive tabs for Women (Pastels) and Men (Formal suits / traditional wear).
11. **Pre-Wedding Ceremonies**:
    - Mehndi, Haldi, and Sangeet ceremony details with times and locations.
12. **Logistics & Registry**:
    - Shuttle bus transportation info, preferential hotel accommodation promo codes, and heartfelt gifts note.
13. **Interactive RSVP Form**:
    - Guests submit attendance (Joyfully Accept / Regretfully Decline), number of attendees, email, and blessings.
    - Responses are stored locally for the couple to view and export via CSV in the Studio.

---

## 🚀 How Invitation Sharing Works

- **Zero-Backend URL Encoding**: The generator studio compresses the entire wedding card data into a URL parameter (`?card=...`) using LZString compression.
- **Instant Delivery**: Users can click **"Share URL"** to:
  - Copy the direct link
  - Share directly to WhatsApp with pre-filled greeting text
  - Scan a mobile QR code to open the card on any phone immediately
- **Host Dashboard**: Hosts can view real-time RSVPs submitted by their guests and download them as a `.csv` spreadsheet.

---

## 🛠️ Tech Stack & Architecture

- **React 19 & Vite 8**: Ultra-fast component rendering and hot-module replacement.
- **Tailwind CSS**: Luxury typography, custom gradients, and ornate borders.
- **HTML5 Canvas**: Interactive scratch-to-reveal heart with physics and alpha sampling.
- **Web Audio API**: Procedural royal chimes, scratch audio, and romantic classical melody.
- **LZ-String**: Lossless URL compression for unlimited shareable links.

---

## 💻 Running Locally

```bash
cd wedding-invite-studio
npm run dev
```

Server runs on `http://localhost:3000`.
