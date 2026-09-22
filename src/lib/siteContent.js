// Static content for the public site.
// Events/shelters here act as the fallback until the matching Firestore
// collections are populated from the admin panel.

export const siteInfo = {
  name: 'Helping Hearts',
  phone: '+91 98765 43210',
  email: 'info@helpinghearts.org',
  shortAddress: 'Coimbatore, Tamil Nadu',
  address: ['123, RS Puram, Coimbatore,', 'Tamil Nadu 600032'],
  logo: '/helping-hearts.jpeg',
  socials: [
    { name: 'Facebook', icon: 'fa-brands fa-facebook-f', href: '#' },
    { name: 'Twitter', icon: 'fa-brands fa-twitter', href: '#' },
    { name: 'Instagram', icon: 'fa-brands fa-instagram', href: '#' },
    { name: 'YouTube', icon: 'fa-brands fa-youtube', href: '#' },
  ],
};

// Our Story / Contact are placeholders until those pages are built.
export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '#' },
  { name: 'Events', href: '/events' },
  { name: 'Our Shelters', href: '/shelters' },
  { name: 'Contact', href: '#' },
];

export const impactCards = [
  {
    icon: 'fa-solid fa-person-cane',
    title: 'Elderly Sanctuary',
    description:
      'Dignified living spaces, nutritious meals, and 24/7 medical supervision for abandoned senior citizens.',
    tone: 'blue',
  },
  {
    icon: 'fa-solid fa-wheelchair',
    title: 'Disability Support',
    description:
      'Empowerment centers focusing on rehabilitation, skill development, and specialized care.',
    tone: 'red',
  },
  {
    icon: 'fa-solid fa-children',
    title: "Children's Haven",
    description:
      'Providing orphaned kids with a loving family environment, quality education, and a bright future.',
    tone: 'blue',
  },
];

export const impactVideo = {
  title: 'Watch Our Impact',
  subtitle:
    'See how your contributions and our volunteers are changing lives every single day.',
  embedUrl: 'https://www.youtube.com/embed/tgbNymZ7vqY?controls=1',
};

export const events = [
  {
    id: 'independence-day',
    title: 'Independence Day Celebration',
    day: '15',
    month: 'Aug',
    image:
      'https://images.unsplash.com/photo-1593113616828-6f22bca04804?q=80&w=1470&auto=format&fit=crop',
    summary:
      "We celebrated India's Independence Day with our children's home inmates, featuring cultural programs, flag hoisting, and a special feast.",
    description:
      "We celebrated India's Independence Day with our children's home inmates, featuring cultural programs, flag hoisting, and a special feast. The children performed beautiful dances and sang patriotic songs, reminding us all of the true spirit of freedom and unity. Sweets were distributed by our honorable chief guest.",
  },
  {
    id: 'medical-camp',
    title: 'Free Medical Camp',
    day: '02',
    month: 'Jul',
    image:
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=1470&auto=format&fit=crop',
    summary:
      'A comprehensive free health checkup camp was organized for senior citizens in the surrounding villages, complete with medicine distribution.',
    description:
      'A comprehensive free health checkup camp was organized for senior citizens in the surrounding villages. Over 150 elderly individuals received free consultations from expert cardiologists, orthopedics, and general physicians. Essential medicines and nutritional supplements were distributed free of cost to all attendees.',
  },
  {
    id: 'wheelchair-drive',
    title: 'Wheelchair Donation Drive',
    day: '28',
    month: 'Jun',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0KgwWh49nztR35-FrQ9uKkkABRhXjrwz1olF3SYTrbNAapNaCD4sTJMI&s=10',
    summary:
      'Partnering with local donors, we successfully distributed 50 custom-fitted wheelchairs to differently-abled individuals at our center.',
    description:
      'Partnering with local donors and corporates, we successfully distributed 50 custom-fitted wheelchairs to differently-abled individuals. The event was filled with tears of joy as recipients experienced newfound mobility and independence. We thank all our sponsors for making this possible.',
  },
];

export const shelters = [
  {
    id: 'anbu-muthiyor-illam',
    name: 'Anbu Muthiyor Illam',
    tag: 'Elderly Home',
    location: 'Gandhipuram, Coimbatore',
    description:
      'A peaceful sanctuary for senior citizens providing 24/7 nursing care, nutritious meals, and regular health checkups in a warm, family-like atmosphere where dignity is preserved.',
    capacityLabel: '45 Residents',
    capacityIcon: 'fa-solid fa-users-rays',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-lWS5Eq8IilLGjEDwmcG0fBwQKOZMi6xA7RA7t4yEfbS4C4BsSj_izZPx&s=10',
    tone: 'blue',
  },
  {
    id: 'siragugal-kuzhandhaigal-illam',
    name: 'Siragugal Kuzhandhaigal Illam',
    tag: "Children's Village",
    location: 'RS Puram, Coimbatore',
    description:
      'A vibrant home for orphaned children focusing on holistic development. We ensure quality school education, extracurricular activities, and essential life skills training.',
    capacityLabel: '60 Children',
    capacityIcon: 'fa-solid fa-school',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop',
    tone: 'red',
  },
];

// Demo imagery — swap these for real photographs before launch.
export const heroImages = {
  background:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  primary:
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1470&auto=format&fit=crop',
  secondary:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop',
};
