// Static content for the public site. Events and shelters are not here —
// those come from Firestore (see lib/events.js and lib/shelters.js).

export const siteInfo = {
  name: 'Helping Hearts',
  registrationNumber: '362/2009',
  phone: '+91 99442 77721',
  email: 'helpingheartsservice@gmail.com',
  shortAddress: 'Coimbatore, Tamil Nadu',
  address: ['13D, Indra Nagar 2nd Street, Rathinapuri, Coimbatore,', 'Tamil Nadu 641 027'],
  officeHours: '10 am–6 pm / Monday to Saturday',
  logo: '/helping-hearts.jpeg',
  socials: [
    {
      name: 'Facebook',
      icon: 'fa-brands fa-facebook-f',
      href: 'https://www.facebook.com/helpingheartsservice',
    },
    {
      name: 'Instagram',
      icon: 'fa-brands fa-instagram',
      href: 'https://www.instagram.com/helpingheartsservice/',
    },
    {
      name: 'YouTube',
      icon: 'fa-brands fa-youtube',
      href: 'https://www.youtube.com/@HelpingHeartsService',
    },
  ],
};

export const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Events', href: '/events' },
  { name: 'Our Shelters', href: '/shelters' },
  { name: 'Donate', href: '/donate' },
  { name: 'Contact', href: '/contact' },
];

/**
 * Donation details. We take donations by direct UPI transfer — there is no
 * third-party payment gateway.
 *
 * `qrImage` must point at a file in /public. Export your own QR from Google
 * Pay / PhonePe / your bank ("Share QR"), drop it in public/, and set the path
 * here. Until it is set, the donate page shows a placeholder panel instead of
 * a QR so that a non-working code is never displayed to a donor.
 */
export const donation = {
  qrImage: null, // e.g. '/donation-qr.png'
  upiId: '', // e.g. 'helpinghearts@okaxis'
  payeeName: 'Helping Hearts',
  bank: {
    accountName: '',
    accountNumber: '',
    ifsc: '',
    bankName: '',
  },
};

// Shown on the donate page — what a given amount typically covers.
export const donationImpact = [
  {
    amount: '₹500',
    icon: 'fa-solid fa-utensils',
    description: 'Nutritious meals for one resident for a week.',
  },
  {
    amount: '₹1,500',
    icon: 'fa-solid fa-briefcase-medical',
    description: 'A month of routine medicines for an elderly resident.',
  },
  {
    amount: '₹3,000',
    icon: 'fa-solid fa-book-open-reader',
    description: "A term of school books and uniforms for one child.",
  },
  {
    amount: '₹10,000',
    icon: 'fa-solid fa-house-chimney-user',
    description: 'A day of running costs across one of our homes.',
  },
];

// Options offered in the volunteer sign-up form.
export const volunteerInterests = [
  'Spending time with residents',
  'Teaching & tutoring children',
  'Medical & healthcare support',
  'Events & fundraising',
  'Cooking & food distribution',
  'Photography & social media',
  'Administration & accounts',
  'Transport & logistics',
];

export const volunteerAvailability = [
  'Weekdays',
  'Weekends',
  'Weekday evenings',
  'A few hours a month',
  'Flexible',
];

export const donationPurposes = [
  'General fund (wherever most needed)',
  'Food & groceries',
  'Medical care & medicines',
  "Children's education",
  'Shelter maintenance',
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

// Demo imagery for the hero collage — swap for real photographs before launch.
export const heroImages = {
  background:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  primary:
    'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=1470&auto=format&fit=crop',
  secondary:
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop',
};
