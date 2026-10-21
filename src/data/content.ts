// ─── Project / Portfolio Data ─────────────────────────────────────────────
export type ProjectCategory =
  | 'Cinematography'
  | 'Commercial Videos'
  | 'Photography'
  | 'Brand Identity'
  | 'Digital Content'
  | 'AI & Experimental';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  year: number;
  description: string;
  fullDescription: string;
  placeholder?: string; // gradient / color used as fallback
  image?: string; // real photograph URL
  tags: string[];
  isDemo?: boolean;
}

export const projects: Project[] = [
  {
    id: 'cinematography-shoot-01',
    title: 'Urban Portrait Cinematic Session',
    category: 'Cinematography',
    year: 2024,
    description: 'Outdoor cinematic capture with natural depth of field and authentic urban mood.',
    fullDescription:
      'A natural light cinematic portrait study showcasing candid emotion, outdoor atmosphere, and rich color tones. Captured with attention to subtle movement and cinematic framing.',
    image: `${import.meta.env.BASE_URL}cinematography-shoot.jpg`,
    tags: ['Cinematography', 'Outdoor Session', 'Color Grade', 'Visual Storytelling'],
    isDemo: false,
  },
  {
    id: 'birthday-shoot-01',
    title: 'Birthday Shoot',
    category: 'Photography',
    year: 2024,
    description: 'Cinematic birthday portrait session with classic red roses and moody ambient tones.',
    fullDescription:
      'A cinematic portrait photoshoot capturing celebration and elegance. Styled with vibrant red roses, dark attire, and soft ambient lighting to create a timeless, artistic memory.',
    image: `${import.meta.env.BASE_URL}birthday-shoot.jpg`,
    tags: ['Birthday Shoot', 'Portrait', 'Lifestyle Photography', 'Studio Lighting'],
    isDemo: false,
  },
  {
    id: 'demo-01',
    title: 'Horizon Brand Film',
    category: 'Cinematography',
    year: 2024,
    description: 'A cinematic brand film blending landscape and identity.',
    fullDescription:
      'A sweeping brand film produced for a fictional outdoor lifestyle brand. Shot across Sri Lanka\'s highlands and coasts, combining handheld intimacy with wide cinematic frames.',
    placeholder: '#1a1a2e',
    tags: ['Brand Film', '4K', 'Color Grade', 'Sound Design'],
    isDemo: true,
  },
  {
    id: 'demo-02',
    title: 'Pulse Commercial',
    category: 'Commercial Videos',
    year: 2024,
    description: 'High-energy 60-second commercial for a beverage brand.',
    fullDescription:
      'A fast-cut, high-energy promotional commercial concept. Includes motion graphics overlays, beat-synced editing, and vivid product shots.',
    placeholder: '#2d1b1b',
    tags: ['Commercial', 'Motion Graphics', 'Product', '60s'],
    isDemo: true,
  },
  {
    id: 'demo-03',
    title: 'Bloom Product Series',
    category: 'Photography',
    year: 2024,
    description: 'Elegant product photography for a boutique cosmetics label.',
    fullDescription:
      'A minimalist product photography series featuring natural light, marble surfaces, and botanical elements. Crafted to support e-commerce and editorial use.',
    placeholder: '#1c1a2e',
    tags: ['Product', 'E-commerce', 'Natural Light', 'Editorial'],
    isDemo: true,
  },
  {
    id: 'demo-04',
    title: 'Noir Identity System',
    category: 'Brand Identity',
    year: 2024,
    description: 'Complete visual identity for a concept architecture studio.',
    fullDescription:
      'End-to-end brand identity: wordmark, type system, colour palette, business collateral, and brand guidelines. Built around a bold minimal aesthetic.',
    placeholder: '#111111',
    tags: ['Logo', 'Type System', 'Brand Guidelines', 'Print'],
    isDemo: true,
  },
  {
    id: 'demo-05',
    title: 'Vibe Reels Pack',
    category: 'Digital Content',
    year: 2024,
    description: 'Monthly short-form reel package for a lifestyle brand.',
    fullDescription:
      'A 12-piece monthly content package for social media — styled reels, stories, and static posts. Optimised for Instagram, TikTok, and YouTube Shorts.',
    placeholder: '#1a2d1a',
    tags: ['Reels', 'Instagram', 'Short-form', 'Lifestyle'],
    isDemo: true,
  },
  {
    id: 'demo-06',
    title: 'Fragment — AI Film Concept',
    category: 'AI & Experimental',
    year: 2024,
    description: 'AI-assisted experimental short exploring memory and time.',
    fullDescription:
      'An experimental visual project blending generative AI imagery, traditional cinematography, and sound design to explore fragmented memory.',
    placeholder: '#0d1b2a',
    tags: ['AI', 'Experimental', 'Short Film', 'Generative'],
    isDemo: true,
  },
];

// ─── Services ─────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  deliverables: string[];
}

export const services: Service[] = [
  {
    id: 'cinematography',
    icon: '🎬',
    title: 'Cinematography & Video Production',
    description:
      'Promotional films, cinematic brand videos, interviews, documentaries, and short-form content — crafted to stop the scroll.',
    deliverables: ['Brand Films', 'Promotional Videos', 'Interview & Documentary', 'Event Coverage', '4K Production'],
  },
  {
    id: 'photography',
    icon: '📷',
    title: 'Photography',
    description:
      'Product, brand, lifestyle, event, and commercial photography for businesses that need imagery that earns attention.',
    deliverables: ['Product Photography', 'Brand & Editorial', 'Lifestyle', 'Event Coverage', 'E-commerce Ready'],
  },
  {
    id: 'editing',
    icon: '🎞',
    title: 'Video Editing & Post-Production',
    description:
      'Professional editing, cinematic colour grading, sound design, and motion graphics that elevate raw footage to finished film.',
    deliverables: ['Film Editing', 'Colour Grading', 'Sound Design', 'Motion Graphics', 'VFX Integration'],
  },
  {
    id: 'branding',
    icon: '✦',
    title: 'Brand Identity & Graphic Design',
    description:
      'Logos, visual identities, social media graphics, and advertising design that give brands a distinctive, lasting presence.',
    deliverables: ['Logo Design', 'Visual Identity', 'Brand Guidelines', 'Social Media Design', 'Print & Digital Ads'],
  },
  {
    id: 'social',
    icon: '◎',
    title: 'Social Media Content',
    description:
      'Reels, short-form videos, and monthly content packages designed to grow audience and drive engagement for businesses.',
    deliverables: ['Instagram Reels', 'TikTok Videos', 'YouTube Shorts', 'Content Strategy', 'Monthly Packages'],
  },
  {
    id: 'ai',
    icon: '⬡',
    title: 'AI & Experimental Visuals',
    description:
      'AI-assisted filmmaking, concept visuals, and creative experiments that push boundaries for brands willing to explore.',
    deliverables: ['AI Image Generation', 'Concept Films', 'Generative Art', 'AI-assisted Editing', 'Visual Experiments'],
  },
];

// ─── Process Steps ────────────────────────────────────────────────────────
export const processSteps = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We begin by understanding your brand, your goals, your audience, and the story you want to tell.',
  },
  {
    number: '02',
    title: 'Concept',
    description:
      'We develop the creative idea — moodboards, scripts, visual direction, and a clear production plan.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'We plan, shoot, design, and produce — bringing every creative decision to life with precision.',
  },
  {
    number: '04',
    title: 'Deliver',
    description:
      'We edit, refine, and deliver. Your feedback shapes the final cut until you are proud of the result.',
  },
];

// ─── Navigation Links ─────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

// ─── Contact Info ─────────────────────────────────────────────────────────
export const contactInfo = {
  email: 'hello@vargastudio.lk',
  whatsapp: '+94 77 049 8850',
  whatsappLink: 'https://wa.me/94770498850',
  youtube: 'https://youtube.com/@vargaproduction',
  facebook: 'https://web.facebook.com/people/VARGA/61595343985644/',
  instagram: 'https://instagram.com/vargastudio',
  location: 'Sri Lanka',
};
