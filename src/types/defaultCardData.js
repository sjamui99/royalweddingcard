export const DEFAULT_CARD_DATA = {
  id: "royal-invitation",
  title: "Royal Wedding Invitation",
  defaultLanguage: "en", // "en" or "hi"
  theme: {
    id: "royal-emerald",
    name: "Royal Emerald & Gold",
    primary: "#23442e",       // Deep emerald
    accent: "#d4a43b",        // Regal gold
    paper: "#fcfaf5",         // Ivory cream
    sealColor: "#c59b27",     // Wax seal gold
    darkText: "#1c2b20",
    coverTexture: "emerald"
  },
  groom: {
    name: "Zayn",
    parents: "Son of Mr. & Mrs. Malik",
    title: "B.E., M.Sc. Data Scientist",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
  },
  bride: {
    name: "Nora",
    parents: "Daughter of Mr. & Mrs. Siddiqui",
    title: "MBBS, M.D. Pediatrician",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
  },
  coupleTagline: "We're getting married",
  weddingDate: "2026-11-30T10:00:00",
  dateFormatted: "November 30, 2026",
  dayOfWeek: "Monday",
  welcomeMessage: "We are honored to welcome you to the Wedding ceremony of Zayn & Nora. As they begin their journey together in faith and love, we thank you for being part of this blessed occasion 💕",
  scratchRevealText: "Our forever begins",
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
      caption: "Our First Chapter"
    },
    {
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
      caption: "Floral Moments"
    },
    {
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80",
      caption: "Eternal Love"
    },
    {
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80",
      caption: "Together Forever"
    }
  ],
  timeline: [
    {
      time: "10:00 AM",
      title: "Guest Arrival",
      desc: "We welcome you to join us for welcome drinks and meet the families",
      icon: "glass"
    },
    {
      time: "11:30 AM",
      title: "Wedding Ceremony",
      desc: "Sacred vows & auspicious rituals. Your presence means a lot",
      icon: "ring"
    },
    {
      time: "07:00 PM",
      desc: "Lavish royal banquet dinner, toasts, music & celebration",
      title: "Royal Reception",
      icon: "party"
    }
  ],
  venue: {
    name: "Grand Palace Hall",
    address: "City Centre, London, UK",
    mapQuery: "Grand Palace Hall City Centre London",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.540605941517!2d-0.1277583!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c38c8cd1d9%3A0xb78f2474b9645e0!2sTrafalgar%20Square!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk"
  },
  dressCode: {
    women: "Elegant formal attire in pastel hues or floral silks",
    men: "Suit or traditional royal formal wear"
  },
  preWeddingEvents: [
    {
      title: "Mehndi Ceremony",
      date: "Nov 28, 2026 • 6:30 PM",
      location: "Bride's Residence",
      desc: "Henna, song & celebration"
    },
    {
      title: "Haldi Ceremony",
      date: "Nov 29, 2026 • 11:00 AM",
      location: "Groom's Residence",
      desc: "Turmeric blessings with close family"
    },
    {
      title: "Sangeet Night",
      date: "Nov 29, 2026 • 7:30 PM",
      location: "Grand Crystal Ballroom",
      desc: "An evening of dance, performances & joy"
    }
  ],
  logistics: {
    transportation: "Shuttle service will be available from the city center to the venue. Pickup point: Central Station at 9:30 AM.",
    accommodation: "Special preferential rates at The Grand Palace Hotel (5 min from venue). Mention code WEDDING2026 when booking.",
    gifts: "Your love, blessings, and presence are the greatest gifts we could ever ask for. No boxed gifts, please."
  },
  music: {
    enabled: true,
    songTitle: "Romantic Wedding Theme (Shreya Ghoshal Style Melody)",
    volume: 0.6
  }
};

export const THEME_PRESETS = [
  {
    id: "royal-emerald",
    name: "Royal Emerald & Gold (Viral Video)",
    primary: "#1b3322",
    accent: "#d4a43b",
    paper: "#fcfaf5",
    sealColor: "#c59b27",
    darkText: "#15291b",
    coverClass: "bg-[#1b3322]"
  },
  {
    id: "royal-burgundy",
    name: "Royal Velvet Burgundy & Gold",
    primary: "#4a121e",
    accent: "#e5b758",
    paper: "#fdf8f4",
    sealColor: "#c93d52",
    darkText: "#320b14",
    coverClass: "bg-[#4a121e]"
  },
  {
    id: "sapphire-night",
    name: "Imperial Sapphire & Champagne",
    primary: "#11223e",
    accent: "#e0c283",
    paper: "#f6f8fb",
    sealColor: "#cca054",
    darkText: "#0d1b30",
    coverClass: "bg-[#11223e]"
  },
  {
    id: "blush-rose",
    name: "Vintage Rose & Champagne Gold",
    primary: "#613840",
    accent: "#d9a05b",
    paper: "#fdf7f8",
    sealColor: "#af6474",
    darkText: "#42252c",
    coverClass: "bg-[#613840]"
  }
];
