// Static content for the public site. Events and shelters are not here —
// those come from Firestore (see lib/events.js and lib/shelters.js).

/** Founded in 2009; used to keep "Nth year of service" from going stale. */
export const FOUNDED_YEAR = 2009;
export const yearsOfService = new Date().getFullYear() - FOUNDED_YEAR;

export const siteInfo = {
  name: 'Helping Hearts',
  registrationNumber: '362/2009',
  tagline: 'Love You Give Might Help Somebody Live',
  motto:
    'The organization is completely focused on providing aid and support to the community. We intend to extend our support to any social cause which will make a difference in many lives. To shower love and affection to the hopeless, helpless and the gifted people around us, to see a great smile in their faces.',
  phone: '+91 99442 77721',
  whatsapp: '6374713775',
  whatsappDisplay: '+91 63747 13775',
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

/**
 * The three things donations actually pay for. Kept deliberately free of
 * per-rupee costings — we publish what the money is used for, not invented
 * unit prices.
 */
export const donationAllocations = [
  {
    icon: 'fa-solid fa-hand-holding-heart',
    label: 'Street Rescue',
    description:
      'Reaching homeless people living on the streets, and moving them somewhere safe with food, clothing and immediate care.',
  },
  {
    icon: 'fa-solid fa-house-chimney-user',
    label: 'Shelters & Centres',
    description:
      'Running our shelters and care centres across districts — food, bedding, hygiene, and day-to-day support for residents.',
  },
  {
    icon: 'fa-solid fa-briefcase-medical',
    label: 'Healthcare Access',
    description:
      'Public health camps and healthcare access projects that have reached lakhs of people in and around Coimbatore.',
  },
  {
    icon: 'fa-solid fa-people-group',
    label: 'Social Causes',
    description:
      'Responding to any social cause where our volunteers can make a real difference to the hopeless and the helpless.',
  },
];

// Options offered in the volunteer sign-up form.
export const volunteerInterests = [
  'Street rescue & outreach drives',
  'Spending time with residents',
  'Medical & healthcare camps',
  'Food preparation & distribution',
  'Events & fundraising',
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
  'Street rescue & outreach',
  'Shelters & care centres',
  'Healthcare access & camps',
  'Food & groceries',
];

/** The three things we actually do, in the order they happen. */
export const impactCards = [
  {
    icon: 'fa-solid fa-hand-holding-heart',
    title: 'Rescue From the Streets',
    description:
      'We find homeless people living on the streets across districts, and bring them somewhere safe. 265 have been rescued so far.',
    tone: 'blue',
  },
  {
    icon: 'fa-solid fa-house-chimney-user',
    title: 'Shelters & Care Centres',
    description:
      'Our shelters and centres give residents a bed, regular meals, and people who know their name. Over 300 have been cared for.',
    tone: 'red',
  },
  {
    icon: 'fa-solid fa-briefcase-medical',
    title: 'Healthcare Access',
    description:
      'Our public healthcare access projects have reached at least 4,00,000 beneficiaries across Coimbatore District.',
    tone: 'blue',
  },
];

/**
 * Headline figures, as supplied by the organisation. Every number on the
 * public site should trace back to this list — please don't invent new ones.
 */
export const impactStats = [
  {
    value: '265',
    label: 'Rescued From Streets',
    icon: 'fa-solid fa-hand-holding-heart',
    detail:
      '265 homeless people were rescued from the streets across various districts.',
  },
  {
    value: '300+',
    label: 'Sheltered & Cared For',
    icon: 'fa-solid fa-house-chimney-user',
    detail:
      'At least 300 homeless beneficiaries were supported through our shelters and centres across various districts.',
  },
  {
    value: '4,00,000+',
    label: 'Healthcare Beneficiaries',
    icon: 'fa-solid fa-briefcase-medical',
    detail:
      'At least 4,00,000 beneficiaries were reached through our public healthcare access projects in Coimbatore District.',
  },
  {
    value: `${yearsOfService}`,
    label: 'Years of Service',
    icon: 'fa-solid fa-calendar-check',
    detail: `Running since ${FOUNDED_YEAR}, now in our ${yearsOfService + 1}th year.`,
  },
];

/** People behind the organisation. */
export const leadership = {
  founder: { name: 'M. Ganesh', role: 'Founder' },
  trustees: [
    { name: 'S. Ranjith Kumar', role: 'Trustee' },
    { name: 'B. Ramkumar', role: 'Trustee' },
  ],
};

export const impactVideo = {
  title: 'Watch Our Impact',
  subtitle:
    'See how your contributions and our volunteers are changing lives every single day.',
  // Just the video id — the player is only loaded once someone clicks play.
  youtubeId: 'tgbNymZ7vqY',
};

/**
 * Demo imagery for the hero collage — swap for real photographs before launch.
 *
 * Served from /public rather than hotlinked from Unsplash. The hero background
 * is the page's LCP element, and routing it through the image optimiser to a
 * remote host added several seconds to the first uncached request.
 */
export const heroImages = {
  background: '/images/hero-background.jpg',
  primary: '/images/hero-primary.jpg',
  secondary: '/images/hero-secondary.jpg',
};
