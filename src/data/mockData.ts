import { AudioItem, BlogPost, ClientTestimonial, ProcessStep, ServiceItem, VideoItem } from '../types/portfolio';

// Initial portfolio entries for Hmm Studio
export const INITIAL_AUDIO_ITEMS: AudioItem[] = [
  // 1. Logo Audio (2-5 sec punchy brand marks)
  {
    id: 'logo-1',
    title: 'NeonPulse Sonic Signature',
    client: 'NeonPulse Energy',
    category: 'logo_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/scifi/sci_fi_futuristic_logo_intro.ogg',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    duration: '0:03',
    description: 'Electrifying 3-note frequency chime engineered for high-energy tech and beverage commercials.',
    tags: ['Tech', 'Energy', 'Futuristic'],
    isFeatured: true,
    published: true,
    createdAt: '2026-01-15',
  },
  {
    id: 'logo-2',
    title: 'Verve Pay Audio Identity',
    client: 'Verve Financial',
    category: 'logo_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/deep_space_drone.ogg',
    coverImage: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
    duration: '0:02',
    description: 'Reassuring acoustic tone coupled with a crisp digital confirmation chime for fintech checkout screens.',
    tags: ['Fintech', 'Trust', 'Clean'],
    isFeatured: true,
    published: true,
    createdAt: '2026-02-10',
  },
  {
    id: 'logo-3',
    title: 'Aero Dynamics Stinger',
    client: 'Aero EV Systems',
    category: 'logo_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/wind_chimes.ogg',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=600&q=80',
    duration: '0:04',
    description: 'Fluid aerodynamic shimmer sound mark used across electric vehicle startup sequences.',
    tags: ['Automotive', 'EV', 'Smooth'],
    isFeatured: false,
    published: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'logo-4',
    title: 'Lumina Cloud Identifier',
    client: 'Lumina Cloud',
    category: 'logo_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/scifi/sci_fi_device_power_up.ogg',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    duration: '0:03',
    description: 'Warm synth swell ending in a subtle glass sparkle for enterprise cloud software boot-up.',
    tags: ['SaaS', 'Cloud', 'Modern'],
    isFeatured: false,
    published: true,
    createdAt: '2026-03-20',
  },

  // 2. Brand Anthem (Flagship long-form musical identities)
  {
    id: 'anthem-1',
    title: 'The Resonance of Tomorrow',
    client: 'Aura Luxury Group',
    category: 'brand_anthem',
    audioUrl: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    duration: '2:14',
    description: 'A rich cinematic orchestral score infused with organic analog synths, portraying timeless elegance and relentless innovation.',
    tags: ['Cinematic', 'Orchestral', 'Luxury'],
    isFeatured: true,
    published: true,
    createdAt: '2026-01-05',
  },
  {
    id: 'anthem-2',
    title: 'Unbound Horizons Anthem',
    client: 'Horizon Global Ventures',
    category: 'brand_anthem',
    audioUrl: 'https://actions.google.com/sounds/v1/scifi/humming_engine.ogg',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    duration: '1:48',
    description: 'Driving acoustic percussion blending with electronic arpeggios to evoke momentum and global connectivity.',
    tags: ['Inspirational', 'Percussive', 'Global'],
    isFeatured: true,
    published: true,
    createdAt: '2026-02-18',
  },

  // 3. Podcast Audio (Intros, Outros & Theme Music)
  {
    id: 'podcast-1',
    title: 'The Future Architecture Theme',
    client: 'Design Forward Podcast',
    category: 'podcast_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/household/clock_ticking.ogg',
    coverImage: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=600&q=80',
    duration: '0:35',
    description: 'Groovy lo-fi electronic intro with ambient vocal textures and pulse bass, creating an inviting studio vibe.',
    tags: ['Lo-Fi', 'Design', 'Intro'],
    isFeatured: true,
    published: true,
    createdAt: '2026-02-01',
  },
  {
    id: 'podcast-2',
    title: 'Mind & Market Suite',
    client: 'Mind & Market Daily',
    category: 'podcast_audio',
    audioUrl: 'https://actions.google.com/sounds/v1/science_fiction/alien_beacon.ogg',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    duration: '0:42',
    description: 'Sharp, rhythmic synth-pop theme engineered to grab immediate listener focus during morning commutes.',
    tags: ['Business', 'Upbeat', 'Daily'],
    isFeatured: false,
    published: true,
    createdAt: '2026-03-05',
  },

  // 4. Commercial Songs (Ad Campaigns + Case Studies)
  {
    id: 'commercial-1',
    title: 'Chasing the Electric Dream',
    client: 'Volta Mobility Campaign',
    category: 'commercial_song',
    audioUrl: 'https://actions.google.com/sounds/v1/vehicles/car_passing.ogg',
    coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    duration: '1:15',
    description: 'High-energy electro-pop commercial song crafted for global TV and YouTube preroll commercials.',
    caseStudy: {
      challenge: 'Volta needed to differentiate its new EV lineup from generic corporate car ads with a track that felt youthful yet premium.',
      solution: 'Hmm Studio produced a custom track anchored by an infectious synth hook and live recorded electric cello.',
      result: 'Broadcasted across 14 countries, generating over 45M impressions and a 38% increase in brand recall scores.'
    },
    tags: ['EV', 'Pop', 'Commercial'],
    isFeatured: true,
    published: true,
    createdAt: '2026-01-20',
  },
  {
    id: 'commercial-2',
    title: 'Pure Hydration Symphony',
    client: 'Oasis Craft Water',
    category: 'commercial_song',
    audioUrl: 'https://actions.google.com/sounds/v1/water/water_drop.ogg',
    coverImage: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80',
    duration: '0:58',
    description: 'Organic acoustic guitar track blended with natural water soundscapes for a nationwide summer launch.',
    caseStudy: {
      challenge: 'Create a sensory audio experience highlighting purity and organic craftsmanship.',
      solution: 'Fused pristine hydrophone water samples with custom acoustic fingerpicking patterns.',
      result: 'Awarded Gold at the 2026 Sonic Branding Summit for Best Commercial Audio Score.'
    },
    tags: ['Acoustic', 'Organic', 'Summer'],
    isFeatured: false,
    published: true,
    createdAt: '2026-02-25',
  },

  // 5. Jingles (Short, repeatable brand hooks)
  {
    id: 'jingle-1',
    title: 'FreshBite 4-Note Hook',
    client: 'FreshBite Organics',
    category: 'jingle',
    audioUrl: 'https://actions.google.com/sounds/v1/cartoon/boing_spring.ogg',
    coverImage: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    duration: '0:06',
    description: 'Playful vocal harmonies singing the brand name with acoustic ukulele accents.',
    tags: ['Food', 'Vocal', 'Catchy'],
    isFeatured: true,
    published: true,
    createdAt: '2026-02-14',
  },
  {
    id: 'jingle-2',
    title: 'Urban Ride Callout',
    client: 'Urban Ride App',
    category: 'jingle',
    audioUrl: 'https://actions.google.com/sounds/v1/transportation/bicycle_bell.ogg',
    coverImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&q=80',
    duration: '0:05',
    description: 'Whistled melody motif designed for app push notifications and radio ads.',
    tags: ['Whistle', 'App', 'Friendly'],
    isFeatured: false,
    published: true,
    createdAt: '2026-03-12',
  },

  // 6. Extras (Mini logos & audio stingers)
  {
    id: 'extra-1',
    title: 'Micro-Stinger: App Unlock',
    client: 'Kryptos Wallet',
    category: 'extras',
    audioUrl: 'https://actions.google.com/sounds/v1/scifi/sci_fi_bleep.ogg',
    coverImage: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1bd?auto=format&fit=crop&w=600&q=80',
    duration: '0:01',
    description: 'Ultra-fast 1-second biometric authentication haptic sound motif.',
    tags: ['Stinger', 'UI', 'Micro'],
    isFeatured: false,
    published: true,
    createdAt: '2026-03-18',
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'video-1',
    title: 'Behind the Sound: Aura Anthem Scoring Session',
    client: 'Hmm Studio Original',
    category: 'extras',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
    description: 'A peek into our studio as we layer analog synthesizers with a 16-piece string quartet.',
    published: true,
    createdAt: '2026-01-28',
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Why Sonic Identity is the Missing 50% of Your Brand Architecture',
    slug: 'sonic-identity-missing-50-percent',
    excerpt: 'In a screen-fatigued world dominated by audio channels and smart devices, visual logos alone no longer cut it. Discover why leading brands invest in audio brand books.',
    content: `Visual design has enjoyed a century of dominance in brand strategy. From typography to color theory, guidelines dictate how brands look across every imaginable surface. But as consumer attention shifts to voice assistants, podcast sponsors, EV interior sounds, and subtle UI haptics, visual identity reaches a hard ceiling.

### The Ear vs. The Eye
Neuroscientific research shows that the human brain processes sound **up to 20 to 100 times faster** than visual information. Sound bypasses rational filters and triggers emotional memory instantly.

### Core Elements of a Sonic Brand Architecture:
1. **The Sonic Logo**: A 2-to-4 second brand mark (e.g. Netflix's "Ta-dum").
2. **The Brand Anthem**: A 2-to-3 minute master composition expressing brand values.
3. **The Sound Palette**: Instrument choices, frequencies, and texture rules that define your sonic tone.
4. **UX/UI Audio Tokens**: Functional sound feedback for digital products and hardware apps.

When these elements work together, brand recognition skyrockets even when screens are completely off.`,
    category: 'Sonic Branding',
    featuredImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    author: 'Hmm Studio Editorial',
    readTime: '4 min read',
    published: true,
    createdAt: '2026-02-12',
  },
  {
    id: 'post-2',
    title: 'Deconstructing the 3-Second Sonic Logo: Anatomy of a Hook',
    slug: 'anatomy-of-a-3-second-sonic-logo',
    excerpt: 'How do you condense an entire company ethos into 3 seconds of audio? We break down our 4-step composition process for creating iconic sound marks.',
    content: `Creating a 3-second audio brand mark is like sculpting in miniature. Every millisecond carries immense weight.

### The Anatomy of a Successful Sonic Logo:
- **The Attractor (0.0s - 0.5s)**: A high-frequency accent or transient pulse that cuts through background noise.
- **The Core Tonal Motif (0.5s - 2.0s)**: A simple 2-to-4 note melodic phrase that is easily recallable and hummable.
- **The Resonance/Tail (2.0s - 3.5s)**: A warm acoustic sustain or atmospheric decay that leaves a memorable emotional impression.

Simplicity is key. If a child cannot whistle your sonic logo after hearing it twice, it is too complex.`,
    category: 'Case Studies',
    featuredImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    author: 'Alex Vance, Creative Director',
    readTime: '6 min read',
    published: true,
    createdAt: '2026-03-04',
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Sonic Logos',
    subtitle: 'Micro Brand Marks',
    description: 'Instant 2 to 5 second audio signatures designed for app bootups, checkout screens, TV endcards, and podcast stings.',
    iconName: 'Zap',
    anchorId: 'logo-audio',
    highlights: ['2-5s Audio Marks', 'UI/UX Sound Tokens', 'Global Usage License']
  },
  {
    id: 'srv-2',
    title: 'Brand Anthems',
    subtitle: 'Full Musical Identities',
    description: 'Flagship orchestral and electronic master compositions that define your brand’s emotional tone across major events & keynotes.',
    iconName: 'Music',
    anchorId: 'brand-anthem',
    highlights: ['Custom Master Scores', 'Stems & Remixes', 'Brand Audio Guidelines']
  },
  {
    id: 'srv-3',
    title: 'Podcast Audio',
    subtitle: 'Show Audio Design',
    description: 'Bespoke intro themes, segment transitions, background underscore, and custom sound design for top-charting shows.',
    iconName: 'Mic',
    anchorId: 'podcast-audio',
    highlights: ['Intro & Outro Themes', 'Segment Stingers', 'Mastered for Spoken Word']
  },
  {
    id: 'srv-4',
    title: 'Commercial Songs',
    subtitle: 'Ad Campaign Scores',
    description: 'Original songs and sonic identity tracks tailored specifically for commercial ads, TV campaigns, and digital viral content.',
    iconName: 'Radio',
    anchorId: 'commercial-songs',
    highlights: ['Custom Songwriting', 'Vocal & Instrumental Tracks', 'Case-Study Ready']
  },
  {
    id: 'srv-5',
    title: 'Jingles',
    subtitle: 'Catchy Brand Hooks',
    description: 'Memorable, repeatable vocal and melodic hooks engineered for radio, retail environments, and quick social spots.',
    iconName: 'Volume2',
    anchorId: 'jingles',
    highlights: ['Vocal Hooks', 'Multi-Length Edits', 'Retail & Airwave Ready']
  },
  {
    id: 'srv-6',
    title: 'Video Sound Design',
    subtitle: 'Spatial & Motion Audio',
    description: 'Foley, atmospheric soundscapes, and high-impact sound design synchronized to brand videos and product teasers.',
    iconName: 'Film',
    anchorId: 'extras',
    highlights: ['Cinematic Sound Design', 'Spatial Audio Mixing', 'Behind-the-Scenes Reels']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Discovery & Sonic Audit',
    description: 'We analyze your brand values, target audience, visual design tokens, and competitive landscape to establish your unique sound DNA.',
    details: ['Brand Value Alignment', 'Competitive Audio Mapping', 'Sonic DNA Brief']
  },
  {
    step: '02',
    title: 'Composition & Exploration',
    description: 'Our sound designers compose distinct audio directions, testing different acoustic textures, instruments, and melodic motifs.',
    details: ['3 Distinct Audio Concepts', 'Multi-Environment Mockups', 'Feedback Workshops']
  },
  {
    step: '03',
    title: 'Refinement & Production',
    description: 'We polish the chosen direction with live musicians, high-end synth recording, meticulous mixing, and spatial audio mastering.',
    details: ['Analog & Acoustic Recording', 'Mastering for All Speakers', 'UX Sound Testing']
  },
  {
    step: '04',
    title: 'Delivery & Brand Guidelines',
    description: 'You receive high-res WAV/MP3 files, stem packages, implementation guidelines, and worldwide royalty-free commercial licensing.',
    details: ['Complete Stem Bundles', 'Sonic Style Guide PDF', '100% Commercial License']
  }
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 't-1',
    quote: 'Hmm Studio created a 3-second sonic logo that transformed our mobile app experience. Over 10M users hear it daily, and it has become synonymous with instant trust.',
    clientName: 'Elena Rostova',
    clientRole: 'VP of Brand Experience',
    company: 'Verve Pay'
  },
  {
    id: 't-2',
    quote: 'Working with the Hmm Studio team felt like collaborating with master film composers. The anthem they built for our global summit brought the audience to tears.',
    clientName: 'Marcus Vance',
    clientRole: 'Chief Marketing Officer',
    company: 'Aura Luxury Group'
  },
  {
    id: 't-3',
    quote: 'The commercial score Hmm Studio composed delivered a 38% surge in ad recall. They don’t just make music; they engineer emotional connection.',
    clientName: 'Sarah Jenkins',
    clientRole: 'Head of Creative Strategy',
    company: 'Volta Mobility'
  }
];
