export interface ProjectData {
  id: string;
  number: string;
  name: string;
  nameLines: string[];
  category: string;
  projectType: string;
  description: string;
  services: string[];
  coverImage: string;
  heroImage: string;
  sectionImages: string[];
  mobileImage: string;
  url?: string;
  liveUrl?: string;
}

export const projects: ProjectData[] = [
  {
    id: 'vila-aruanna',
    number: '01',
    name: 'Vila Aruanna',
    nameLines: ['VILA', 'ARUANNA'],
    category: 'Real Estate & Hospitality',
    projectType: 'Premium Landing Page',
    description:
      'A serene mountain chalet retreat in Montes Claros, MG. The page was built to convey the exclusive and intimate experience of the property, communicating luxury, nature and privacy to attract high-intent guests.',
    services: ['Positioning', 'Copy', 'UI Design', 'Development', 'Conversion Flow'],
    coverImage: '/projects/vila-aruanna/cover-desktop.webp',
    heroImage: '/projects/vila-aruanna/hero.webp',
    sectionImages: [
      '/projects/vila-aruanna/section-01.webp',
      '/projects/vila-aruanna/section-02.webp',
    ],
    mobileImage: '/projects/vila-aruanna/mobile.webp',
    liveUrl: 'https://vilaaruanna.com.br',
  },
  {
    id: 'gizelly-viana',
    number: '02',
    name: 'Gizelly Viana',
    nameLines: ['GIZELLY', 'VIANA'],
    category: 'Aesthetic Clinic',
    projectType: 'Conversion Landing Page',
    description:
      'Landing page for a specialist in facial harmonization and aesthetic procedures. Designed to generate consultation bookings, building authority, trust and showcasing real patient results.',
    services: ['Positioning', 'Copy', 'UI Design', 'Development', 'Conversion Flow'],
    coverImage: '/projects/gizelly-viana/cover-desktop.webp',
    heroImage: '/projects/gizelly-viana/hero.webp',
    sectionImages: [
      '/projects/gizelly-viana/section-01.webp',
      '/projects/gizelly-viana/section-02.webp',
    ],
    mobileImage: '/projects/gizelly-viana/mobile.webp',
  },
  {
    id: 'jonas-de-paula',
    number: '03',
    name: 'Jonas de Paula',
    nameLines: ['JONAS DE', 'PAULA'],
    category: 'Dentistry & Health',
    projectType: 'Premium Landing Page',
    description:
      'A premium landing page for a dental specialist focused on aesthetic procedures. Positioned to attract patients looking for excellence, safety and high-end results in dental care.',
    services: ['Positioning', 'Copy', 'UI Design', 'Development'],
    coverImage: '/projects/jonas-de-paula/cover-desktop.webp',
    heroImage: '/projects/jonas-de-paula/hero.webp',
    sectionImages: [
      '/projects/jonas-de-paula/section-01.webp',
      '/projects/jonas-de-paula/section-02.webp',
    ],
    mobileImage: '/projects/jonas-de-paula/mobile.webp',
  },
];
