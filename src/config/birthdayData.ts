export interface WishItem {
  id: string;
  title: string;
  text: string;
  tagline: string;
}

export interface EnvelopeItem {
  id: string;
  label: string;
  sublabel: string;
  content: string;
  paperNote: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
  tag: string;
  aspect?: string;
}

export interface BirthdayData {
  recipientName: string;
  senderName: string;
  openingQuote: string;
  openingSub: string;
  openingCta: string;
  heroHeadline: string;
  heroSupporting: string;
  heartLetter: {
    heading: string;
    paragraphs: string[];
  };
  fiveWishes: WishItem[];
  openWhenEnvelopes: EnvelopeItem[];
  gallery: GalleryItem[];
  starWish: {
    headline: string;
    message: string;
    buttonText: string;
    shootingStarWish: string;
  };
  finalSurprise: {
    preamble: string[];
    headline: string;
    blessings: string[];
    closing: string;
    signature: string;
  };
}

export const initialBirthdayData: BirthdayData = {
  recipientName: "Dimple",
  senderName: "Ajinkya",
  openingQuote: "Some people make the world more beautiful just by being in it.",
  openingSub: "Dimple, this little universe is for you.",
  openingCta: "Open Your Birthday Surprise",
  heroHeadline: "Happy Birthday, Dimple",
  heroSupporting: "Today, the world celebrates your birthday. And I hope life reminds you, in a thousand little ways, how beautiful it can be.",
  heartLetter: {
    heading: "To my girl, Dimple.",
    paragraphs: [
      "Happy Birthday, my girl. ❤️",
      "In a world full of temporary things, you’re the one I pray stays forever.",
      "Keep doing good things in life. Stay grateful for what you have, and stay focused on your dreams and career. Don't let unnecessary thoughts steal your peace.",
      "Keep your kind heart. Learn to understand people, and always be mindful of others' feelings. Never lose the beautiful person you are, and never forget to take care of yourself, too.",
      "May life give you every happiness your heart deserves. May you grow into the person you dream of becoming, find peace in the little things, and have the courage to chase everything that matters to you.",
      "I hope this new year of your life brings you beautiful opportunities, genuine happiness, personal growth, and countless reasons to smile.",
      "Happy Birthday, Dimple. ❤️"
    ]
  },
  fiveWishes: [
    {
      id: "01",
      title: "For Her Dreams",
      tagline: "Unwavering belief & discipline",
      text: "May you find the discipline to work towards your goals and the courage to never stop believing in your potential."
    },
    {
      id: "02",
      title: "For Her Peace",
      tagline: "Serenity amidst the noise",
      text: "May you learn to release unnecessary worries and protect the peace that makes you feel like yourself."
    },
    {
      id: "03",
      title: "For Her Kind Heart",
      tagline: "Gentle boundaries & warmth",
      text: "May you always remain kind, while learning that protecting your own heart matters just as much as caring for others."
    },
    {
      id: "04",
      title: "For Her Growth",
      tagline: "Wisdom through every season",
      text: "May every experience teach you something, every challenge make you wiser, and every new day bring you closer to the person you want to become."
    },
    {
      id: "05",
      title: "For Her Happiness",
      tagline: "Laughter, warmth & genuine joy",
      text: "May you have more reasons to laugh, more moments to feel grateful, and more people around you who genuinely care about your happiness."
    }
  ],
  openWhenEnvelopes: [
    {
      id: "overthink",
      label: "When you overthink",
      sublabel: "A quiet space to exhale",
      paperNote: "Breathe, my girl.",
      content: "Take a breath. You don't need to figure everything out today. Not every thought deserves your energy, and not every uncertainty deserves your peace. Give yourself time and be kind to yourself."
    },
    {
      id: "doubt",
      label: "When you doubt yourself",
      sublabel: "A reminder of your light",
      paperNote: "Believe in who you are.",
      content: "Remember the dreams you carry and the person you are working to become. Progress takes time. Keep learning, keep trying, and trust yourself enough to take the next step."
    },
    {
      id: "smile",
      label: "When you need a smile",
      sublabel: "A little spark of joy",
      paperNote: "Just for you.",
      content: "Somewhere in your ordinary day, I hope something unexpectedly beautiful happens. I hope you smile without a reason, laugh without holding back, and remember that your happiness matters."
    }
  ],
  gallery: [
    {
      id: "g1",
      image: "/src/assets/images/gallery_golden_sunset_1793168288411.jpg",
      title: "Golden Hour Horizons",
      caption: "Placeholder: For the quiet walks, beautiful sunsets, and peaceful horizons waiting ahead.",
      tag: "Memory 01"
    },
    {
      id: "g2",
      image: "/src/assets/images/gallery_blush_roses_1793168288671.jpg",
      title: "A Bouquet of Grace",
      caption: "Placeholder: For your gentle heart, your elegance, and the soft warmth you bring everywhere.",
      tag: "Memory 02"
    },
    {
      id: "g3",
      image: "/src/assets/images/gallery_starlit_night_1793168289885.jpg",
      title: "Midnight Stargazing",
      caption: "Placeholder: Under the vast universe, thinking of you and every dream in your eyes.",
      tag: "Memory 03"
    },
    {
      id: "g4",
      image: "/src/assets/images/gallery_cozy_coffee_1793168291046.jpg",
      title: "Quiet Morning Thoughts",
      caption: "Placeholder: For cozy conversations, shared warm cups of coffee, and peaceful laughter.",
      tag: "Memory 04"
    },
    {
      id: "g5",
      image: "/src/assets/images/gallery_fairy_lights_1793168290993.jpg",
      title: "Warm Evening Celebrations",
      caption: "Placeholder: Celebrating you tonight and wishing you endless reasons to rejoice.",
      tag: "Memory 05"
    },
    {
      id: "g6",
      image: "/src/assets/images/gallery_misty_mountains_1793168291001.jpg",
      title: "The Next Great Chapter",
      caption: "Placeholder: For all the beautiful peaks you will climb and the dreams you will achieve.",
      tag: "Memory 06"
    }
  ],
  starWish: {
    headline: "If I could wish one thing for you…",
    message: "I would wish for a life in which you feel proud of how far you've come, peaceful about what you cannot control, grateful for the little things, and excited about everything still waiting for you.",
    buttonText: "Make a Wish",
    shootingStarWish: "May your next chapter be kinder, brighter, and more beautiful than you imagined."
  },
  finalSurprise: {
    preamble: [
      "And before this little surprise ends…",
      "I hope you never become so busy chasing the future that you forget to appreciate the beautiful person you already are.",
      "Keep growing. Keep dreaming. Stay grateful. Protect your peace. And never let the world take away your kindness."
    ],
    headline: "Happy Birthday, Dimple.",
    blessings: [
      "You deserve a life filled with genuine happiness, meaningful moments, beautiful growth, and dreams that become your reality.",
      "May you always find a reason to smile, even on ordinary days."
    ],
    closing: "With love, always. ♡",
    signature: "Ajinkya"
  }
};
