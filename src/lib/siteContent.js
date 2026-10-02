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
  mapUrl: 'https://maps.app.goo.gl/829XT7dxZnk52BfMA',
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
  { name: 'Our Programs', href: '/programs' },
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
  /**
   * Set `upiId` to your UPI ID / VPA (the `name@bank` handle) and the donate
   * modal generates a QR that already contains the amount the donor typed —
   * their Google Pay / PhonePe / Paytm opens with the figure filled in.
   *
   * `qrImage` is only the fallback for when `upiId` is blank. A QR exported
   * from a payment app is static: it identifies the payee but cannot carry an
   * amount, so the donor has to type it themselves.
   */
  upiId: 'maheskasi007@okicici',
  qrImage: null, // e.g. '/donation-qr.png'  (fallback only)
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
 * Hero collage imagery — real photographs from our 2025–26 programme report.
 *
 * Served from /public rather than hotlinked from Unsplash. The hero background
 * is the page's LCP element, and routing it through the image optimiser to a
 * remote host added several seconds to the first uncached request.
 */
export const heroImages = {
  background: '/images/programs/team-and-residents.jpg',
  primary: '/images/programs/independence-day.jpg',
  secondary: '/images/programs/outdoor-gathering.png',
};

/**
 * Content for the /programs page, drawn from our 2025–26 programme report
 * ("Shelter details content with programs.pdf" in inputs/). Deliberately free
 * of shelter names, addresses, or anything else that identifies a specific
 * centre — that information belongs only in the admin-managed Shelters list
 * (lib/shelters.js), never in static site content.
 */
export const programsOverview = {
  eyebrow: 'Our Programs',
  title: 'Two Programmes, One Goal',
  description:
    'Helping Hearts remains committed to improving the lives of homeless individuals and supporting the welfare of needy people through dedicated humanitarian initiatives. Guided by compassion and a strong sense of social responsibility, we strive to restore dignity, provide essential assistance, and create opportunities for lasting change.',
};

/**
 * Welfare of Homeless People — implemented through four sequential focus
 * areas, from the moment someone is rescued through to independent living.
 */
export const homelessWelfareProgram = {
  title: 'Welfare of Homeless People',
  description:
    'This programme improves the quality of life of homeless individuals by providing comprehensive care, protection, and opportunities for rehabilitation. Through shelter, nutritious food, healthcare, psychosocial support, skill development, and livelihood opportunities, it helps individuals regain stability, dignity, and self-reliance — including people with mental health challenges, persons with disabilities, terminally ill patients, and elderly people.',
  rescueBreakdown: {
    total: '265',
    detail:
      'Everyone we have rescued from the streets so far, broken down by who they are.',
    byGender: [
      { label: 'Male', value: '141' },
      { label: 'Female', value: '124' },
    ],
    byCategory: [
      { label: 'Elderly', value: '26' },
      { label: 'Mental Illness', value: '129' },
      { label: 'Terminally Ill', value: '90' },
      { label: 'Differently Abled', value: '20' },
    ],
  },
  focusAreas: [
    {
      key: 'emergency-care',
      step: '01',
      title: 'Emergency Care & Short-Term Care',
      description:
        'Essential services for residents in crisis or facing immediate health and safety risks, aimed at protecting lives, meeting urgent needs, and helping individuals recover until long-term support is available.',
      services: [
        {
          title: 'Rescue Services',
          description:
            'Homeless individuals in distress are identified and rescued from unsafe locations such as streets, railway stations, or public places, then transported to safe care.',
        },
        {
          title: 'Medical Care',
          description:
            'Immediate attention for injuries, illnesses, malnutrition, dehydration, or mental health emergencies — basic check-ups, first aid, medicines, and hospital referrals when necessary.',
        },
        {
          title: 'Support Services',
          description:
            'Counselling, emotional support, and help reconnecting with family or accessing government welfare programmes to regain stability.',
        },
      ],
      image: '/images/programs/rescue-transport.png',
      imageAlt: 'A Helping Hearts vehicle transporting rescued residents to safety',
    },
    {
      key: 'medium-term-rehabilitation',
      step: '02',
      title: 'Medium-Term Rehabilitation Pathway',
      description:
        'Comprehensive care and support for individuals with mental health conditions, particularly those experiencing homelessness and social vulnerability — including psychiatric follow-up, medication support, counselling, psychosocial interventions, life skills training, occupational activities, and social reintegration support.',
      image: '/images/programs/counselling-session.png',
      imageAlt: 'A counselling and interaction session with residents',
    },
    {
      key: 'long-term-care',
      step: '03',
      title: 'Long-Term Residential & Dignified Care',
      description:
        'Safe, compassionate, and continuous care for individuals requiring long-term support, with comprehensive services including medical care, rehabilitation, nursing assistance, emotional support, daily living assistance, and palliative care — focused on dignity, comfort, and quality of life.',
      image: '/images/programs/independence-day.jpg',
      imageAlt: 'Residents celebrating Independence Day together',
    },
    {
      key: 'livelihood-development',
      step: '04',
      title: 'Livelihood Development & Social Reintegration',
      description:
        'For individuals who have completed recovery and rehabilitation but have no family support or safe place to return to. In association with the Tamil Nadu Skill Development initiative, beneficiaries receive vocational training — including catering, housekeeping, and security services — followed by employment opportunities, promoting financial independence and a smooth transition to community living.',
      image: '/images/programs/outdoor-gathering.png',
      imageAlt: 'Residents and volunteers on an outing together',
    },
  ],
};

/**
 * Welfare of Needy People — public healthcare access initiatives run inside
 * government hospital premises, for patients and attendants who need them.
 */
export const needyWelfareProgram = {
  title: 'Welfare of Needy People',
  description:
    'We support needy and vulnerable individuals by addressing their basic needs inside government hospital premises — safe drinking water, clothing, healthcare assistance, accommodation support for attendants, and access to essential welfare services — helping patients and families navigate difficult circumstances with greater security, care, and dignity.',
  initiatives: [
    {
      title: 'Information Centre & Helpdesk',
      description:
        'A centralised hub of accurate, up-to-date information on hospital services, facilities, medical specialties, visiting hours, and registration procedures, delivered in a compassionate and supportive manner.',
      stat: '2,01,351+ people guided through our stalls',
      image: '/images/programs/information-helpdesk.jpg',
      imageAlt: 'The Helping Hearts information helpdesk stall at a government hospital',
    },
    {
      title: 'Thaimai Koodu — Lactation Room',
      description:
        'A dedicated, hygienic, and welcoming space for breastfeeding mothers, equipped with proper lighting, ventilation, a feeding pillow, chair, and cradle, ensuring comfort, dignity, and privacy.',
      stat: '769 mothers supported',
    },
    {
      title: 'Neer Nalam — Drinking Water Facility',
      description:
        'An RO-purified drinking water point offering 24/7 access to safe water for patients, visitors, and staff, promoting hygiene and reducing the risk of water-borne disease.',
      stat: '7,03,852+ litres served, an estimated 3,51,926 people benefited',
      image: '/images/programs/neer-nalam-water-point.jpg',
      imageAlt: 'Patients and attendants using the Neer Nalam drinking water point',
    },
    {
      title: 'PatientFirst — OP Registration Support',
      description:
        'Specialised manpower support for the out-patient registration process, helping patients obtain their OP chits quickly and reducing waiting times during peak hours.',
      stat: '1,35,056+ patients supported',
      image: '/images/programs/op-registration-desk.jpg',
      imageAlt: 'Volunteers assisting patients at an OP registration desk',
    },
    {
      title: 'Attendant Support Services',
      description:
        'Subsidised photocopying for medical and government documentation, and clean clothing support for patients and attendants in need — small conveniences that protect dignity during a hospital stay.',
    },
  ],
};
