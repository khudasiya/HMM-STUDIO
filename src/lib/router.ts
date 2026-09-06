export interface RouteInfo {
  id: string;
  path: string;
  label: string;
  shortLabel: string;
  category: string;
  description: string;
}

export const ROUTES: RouteInfo[] = [
  {
    id: 'hero',
    path: '/',
    label: 'HOME SHOWCASE',
    shortLabel: 'HOME',
    category: 'Featured Work',
    description: 'Sonic branding showcase & hero highlight',
  },
  {
    id: 'services',
    path: '/services',
    label: 'SERVICES OVERVIEW',
    shortLabel: 'SERVICES',
    category: 'Offerings',
    description: 'Full suite of sonic identity services',
  },
  {
    id: 'logo-audio',
    path: '/logos',
    label: 'SONIC LOGOS',
    shortLabel: 'LOGOS',
    category: '2-5s Brand Marks',
    description: 'Ultra-condensed sonic signatures & chimes',
  },
  {
    id: 'brand-anthem',
    path: '/anthems',
    label: 'BRAND ANTHEMS',
    shortLabel: 'ANTHEMS',
    category: 'Full Audio',
    description: 'Cinematic brand themes and audio identity',
  },
  {
    id: 'podcast-audio',
    path: '/podcast',
    label: 'PODCAST AUDIO',
    shortLabel: 'PODCAST',
    category: 'Show Themes',
    description: 'Podcast intros, outros & stingers',
  },
  {
    id: 'commercial-songs',
    path: '/commercial',
    label: 'COMMERCIAL TRACKS',
    shortLabel: 'COMMERCIAL',
    category: 'Ad Music',
    description: 'Bespoke music for ads, TV & digital',
  },
  {
    id: 'jingles',
    path: '/jingles',
    label: 'RADIO JINGLES',
    shortLabel: 'JINGLES',
    category: 'Earworms',
    description: 'Broadcast audio jingles & catchy hooks',
  },
  {
    id: 'extras',
    path: '/extras',
    label: 'EXTRAS & STINGERS',
    shortLabel: 'EXTRAS',
    category: 'Mini Assets',
    description: 'UI sound effects & motion graphic stingers',
  },
  {
    id: 'blog',
    path: '/blog',
    label: 'SONIC BLOG',
    shortLabel: 'BLOG',
    category: 'Articles',
    description: 'Deep dives & sonic branding insights',
  },
  {
    id: 'process',
    path: '/how',
    label: 'HOW IT WORKS',
    shortLabel: 'HOW',
    category: 'Framework',
    description: 'Our 4-step sonic creation workflow',
  },
  {
    id: 'about',
    path: '/about',
    label: 'ABOUT STUDIO',
    shortLabel: 'ABOUT',
    category: 'Our Team',
    description: 'Learn about Hmm Studio & team',
  },
  {
    id: 'contact',
    path: '/contact',
    label: 'START PROJECT',
    shortLabel: 'CONTACT',
    category: 'Get In Touch',
    description: 'Book a sonic identity discovery call',
  },
  {
    id: 'admin',
    path: '/admin',
    label: 'ADMIN PORTAL',
    shortLabel: 'ADMIN',
    category: 'Dashboard',
    description: 'Manage audio tracks, videos & blog posts',
  },
];

export function getSectionIdFromPath(pathname: string): string {
  const cleanPath = pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  // Direct path matches
  const route = ROUTES.find(r => r.path === cleanPath);
  if (route) return route.id;

  // Secondary legacy/alias matches
  if (cleanPath === '/logo-audio') return 'logo-audio';
  if (cleanPath === '/brand-anthem') return 'brand-anthem';
  if (cleanPath === '/podcast-audio') return 'podcast-audio';
  if (cleanPath === '/commercial-songs') return 'commercial-songs';
  if (cleanPath === '/process') return 'process';

  return 'hero';
}

export function getPathFromSectionId(sectionId: string): string {
  const route = ROUTES.find(r => r.id === sectionId);
  return route ? route.path : '/';
}

export function navigateToSection(sectionId: string) {
  const targetPath = getPathFromSectionId(sectionId);
  if (window.location.pathname !== targetPath) {
    window.history.pushState({ sectionId }, '', targetPath);
  }
}
