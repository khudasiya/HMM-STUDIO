// Full Sonic Branding Presentation Pitch Deck Data for hmm studio
// Directly transcribed and structured from the 10-slide masterclass deck

export interface SlideMetric {
  value: string;
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface ProblemItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface ViralTruthCase {
  brand: string;
  tagline?: string;
  duration?: string;
  description: string;
}

export interface WhySoundStat {
  value: string;
  unit?: string;
  label: string;
}

export interface FounderProfile {
  name: string;
  title: string;
  avatarInitials: string;
  roles: string[];
  languages: string[];
}

export interface DeliverableItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
}

export interface ComparisonRow {
  traditional: string;
  hmmStudio: string;
}

export interface ProofBrand {
  name: string;
  signature: string;
  description: string;
  soundKey?: 'amul' | 'mdh' | 'netflix' | 'intel' | 'airtel' | 'titan';
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

export interface SlideData {
  id: number;
  slug: string;
  categoryBadge?: string;
  badge?: string;
  title: string;
  titleHighlight: string;
  subtitle?: string;
  leadText?: string;
  metrics?: SlideMetric[];
  problems?: ProblemItem[];
  viralCases?: ViralTruthCase[];
  whySoundStats?: WhySoundStat[];
  founder?: FounderProfile;
  agencyPoints?: string[];
  deliverables?: DeliverableItem[];
  comparison?: {
    badTitle: string;
    badItems: string[];
    goodTitle: string;
    goodItems: string[];
  };
  proofBrands?: ProofBrand[];
  processSteps?: ProcessStepItem[];
  ctaOffer?: {
    title: string;
    description: string;
    agencyFooter: string;
    servicesList: string;
  };
}

export const SONIC_PITCH_DECK: SlideData[] = [
  // Slide 1: Cover / Hero
  {
    id: 1,
    slug: 'cover',
    badge: 'hmm studio',
    title: 'Your brand has a face.',
    titleHighlight: 'Give it a sound the world remembers.',
    subtitle: 'Sonic Identity · Viral Songs · Complete Audio Branding',
    leadText: "We don't run ads. We don't make campaigns. We create the sound that makes your brand impossible to forget.",
    metrics: [
      { value: '3.2×', label: 'More Brand Recall' },
      { value: '60%', label: 'More Organic Reach' },
      { value: '∞', label: 'Times a Viral Song Pays Back' },
    ],
  },

  // Slide 2: The Problem
  {
    id: 2,
    slug: 'the-problem',
    categoryBadge: 'THE PROBLEM',
    title: 'Brands spend crores on ads.',
    titleHighlight: 'And end every single one in silence.',
    problems: [
      {
        id: 'p1',
        icon: 'Clapperboard',
        title: 'Ads end in silence',
        description: 'Every video fades out with no ownable sound. A moment of pure brand recall — completely wasted.',
      },
      {
        id: 'p2',
        icon: 'Smartphone',
        title: 'Reels use random audio',
        description: 'Trending Bollywood plays over your content. That sound belongs to another brand, not yours.',
      },
      {
        id: 'p3',
        icon: 'Store',
        title: 'Stores have no identity',
        description: 'Customers walk in, hear generic music, walk out. No distinct feeling. No memory anchored.',
      },
    ],
  },

  // Slide 3: The Viral Truth
  {
    id: 3,
    slug: 'the-viral-truth',
    categoryBadge: 'THE VIRAL TRUTH',
    title: 'A viral song does more for your brand',
    titleHighlight: 'than 100 paid UGC ads.',
    viralCases: [
      {
        brand: 'Amul Jingle',
        duration: '60+ years. No ad budget. Just one song.',
        description: 'Every Indian hums it before seeing the pack. The jingle IS the brand.',
      },
      {
        brand: 'MDH Masale',
        tagline: '"Asli Masale Sach Sach" — three words.',
        description: 'Zero paid media. 100% mind share. Decades of dominance.',
      },
    ],
    metrics: [
      {
        value: '5×',
        label: 'higher chance a branded song goes viral vs a paid ad',
      },
      {
        value: '₹0',
        label: 'ongoing cost once your sonic identity is created',
      },
      {
        value: '10+',
        label: 'years — average lifespan of an iconic sonic identity',
      },
    ],
  },

  // Slide 4: Why Sound Works
  {
    id: 4,
    slug: 'why-sound-works',
    categoryBadge: 'WHY SOUND WORKS',
    title: 'Visuals make people see your brand.',
    titleHighlight: 'Sound makes them feel it — and feel is what sells.',
    whySoundStats: [
      {
        value: '3.2',
        unit: '×',
        label: 'More brand recall with consistent audio vs visual-only',
      },
      {
        value: '40',
        unit: '%',
        label: 'Increase in purchase intent with branded in-store sound',
      },
      {
        value: '86',
        unit: '%',
        label: 'Customers linked to brand through sound return repeatedly',
      },
      {
        value: '9',
        unit: '×',
        label: 'Better recall when brand name is in the sonic logo',
      },
    ],
  },

  // Slide 5: Who We Are
  {
    id: 5,
    slug: 'who-we-are',
    categoryBadge: 'WHO WE ARE',
    title: 'hmm studio',
    titleHighlight: "India's dedicated audio branding agency.",
    agencyPoints: [
      'Not a marketing agency. Not an ad agency. Pure audio.',
      'We compose original sonic identities from scratch.',
      'Music producer, composer & audio branding specialist.',
      'Worked with SK Bros, film projects & growing D2C brands.',
      'One thing done exceptionally: sound that builds brands.',
    ],
    founder: {
      name: 'Om Khudasiya',
      title: 'Founder, hmm studio',
      avatarInitials: 'OM',
      roles: [
        'Music Producer & Composer',
        'Audio Branding Specialist',
        'Brand Strategy + Sonic Identity',
      ],
      languages: ['English', 'Hindi'],
    },
  },

  // Slide 6: What We Build For You
  {
    id: 6,
    slug: 'what-we-build',
    categoryBadge: 'WHAT WE BUILD FOR YOU',
    title: 'One Complete Sonic Identity.',
    titleHighlight: 'Everything your brand needs to own its sound — forever.',
    deliverables: [
      {
        id: 'd1',
        number: '01',
        title: 'Sonic Logo',
        duration: '3–5 sec',
        description: "Your hero sound. Plays on every reel, ad, film. Like Netflix's Tudum — heard once, never forgotten.",
      },
      {
        id: 'd2',
        number: '02',
        title: 'Reel Song',
        duration: '60 sec',
        description: 'Fully produced brand track for all content. Organic reach without ad spend. Compounds every use.',
      },
      {
        id: 'd3',
        number: '03',
        title: 'In-Store Soundscape',
        duration: 'Loopable',
        description: 'Custom ambient music for your physical spaces. Customers feel your brand the moment they walk in.',
      },
      {
        id: 'd4',
        number: '04',
        title: 'Website Sound',
        duration: 'On-load',
        description: 'Subtle audio on digital touchpoints. Visitors feel your brand before they read a word.',
      },
      {
        id: 'd5',
        number: '05',
        title: 'Brand Theme',
        duration: '90 sec',
        description: 'Full brand anthem for films, campaigns, events and launch moments. The big sound.',
      },
    ],
  },

  // Slide 7: The Viral Engine (Comparison)
  {
    id: 7,
    slug: 'viral-engine',
    categoryBadge: 'THE VIRAL ENGINE',
    title: 'The Reel Song:',
    titleHighlight: 'Your cheapest, most powerful marketing asset.',
    comparison: {
      badTitle: 'Paid UGC Ad',
      badItems: [
        '✕ ₹50K–₹5L per campaign',
        '✕ Works while you pay. Stops when you stop.',
        '✕ Belongs to the creator or platform',
        '✕ Forgotten after 72 hours',
        '✕ Cannot compound over time',
      ],
      goodTitle: 'hmm Reel Song',
      goodItems: [
        '✓ One-time creation. Zero ongoing cost.',
        '✓ Works forever. Gets stronger with time.',
        '✓ 100% owned by you. No licensing ever.',
        '✓ Gets recalled every time someone hears it',
        '✓ Each use builds brand memory deeper',
      ],
    },
  },

  // Slide 8: Proof It Works
  {
    id: 8,
    slug: 'proof-it-works',
    categoryBadge: 'PROOF IT WORKS',
    title: 'Brands that own a sound,',
    titleHighlight: 'own their category for generations.',
    proofBrands: [
      {
        name: 'Amul',
        signature: 'Jingle since 1967',
        description: '60+ years. No media spend. India hums it before seeing the pack. The jingle IS the brand.',
        soundKey: 'amul',
      },
      {
        name: 'MDH Masale',
        signature: '"Asli Masale"',
        description: 'Three words. Decades of dominance. Sound built what no agency could.',
        soundKey: 'mdh',
      },
      {
        name: 'Netflix',
        signature: 'Tudum — 4 seconds',
        description: 'You lean forward before reading the title. That is the power of a sonic logo.',
        soundKey: 'netflix',
      },
      {
        name: 'Intel',
        signature: '5 Notes',
        description: 'A hidden chip — made globally famous through sound alone. Zero ongoing cost.',
        soundKey: 'intel',
      },
      {
        name: 'Airtel',
        signature: '4-Note Jingle',
        description: "India's most recognised brand sound. Built deep emotional bonds with a billion people.",
        soundKey: 'airtel',
      },
      {
        name: 'Titan',
        signature: '"Lapish" Theme',
        description: 'Decades of trust built on a flute melody. Customers feel premium before they browse.',
        soundKey: 'titan',
      },
    ],
  },

  // Slide 9: Our Process
  {
    id: 9,
    slug: 'our-process',
    categoryBadge: 'OUR PROCESS',
    title: 'From brief to brand sound.',
    titleHighlight: '4 steps. No guesswork. Full ownership transferred to you.',
    processSteps: [
      {
        number: '01',
        title: 'Brand Discovery',
        description: 'We deep-dive into your brand — values, audience, personality, competitors. We listen before we create.',
      },
      {
        number: '02',
        title: 'Creative Direction',
        description: 'We propose sonic direction — mood, instruments, tempo, cultural cues. You approve before a note is recorded.',
      },
      {
        number: '03',
        title: 'Production',
        description: 'Original composition, professional recording, mixing and mastering. Multiple variations delivered for review.',
      },
      {
        number: '04',
        title: 'Delivery & Rights',
        description: 'Final files in all formats. Full commercial rights transferred to you. Implementation guidance included.',
      },
    ],
  },

  // Slide 10: Call to Action / Pitch Close
  {
    id: 10,
    slug: 'pitch-close',
    title: 'Amul built an empire on a jingle. Intel became a household name with 5 notes.',
    titleHighlight: 'Your brand can own its sound too.',
    leadText: "The brands that dominate the next decade aren't just seen the most — they're the ones heard the most.",
    ctaOffer: {
      title: "Let's give your brand a sound it deserves.",
      description: "10 minutes. We'll show you exactly what it could feel like.",
      agencyFooter: "hmm studio | Om Khudasiya | India's Audio Branding Agency",
      servicesList: 'Sonic Logos · Reel Songs · In-Store Soundscapes · Complete Sonic Identity',
    },
  },
];
