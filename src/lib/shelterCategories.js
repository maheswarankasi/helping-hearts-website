/**
 * @file Programme Category metadata and helpers for Helping Hearts Shelters.
 * Classifies shelters into:
 *  - Long-Term (`long-term`)
 *  - Mid-Term (`mid-term`)
 *  - Livelihood (`livelihood`)
 */

/** @type {import('./types').ProgrammeCategory[]} */
export const PROGRAMME_CATEGORIES = [
  {
    id: 'long-term',
    slug: 'long-term',
    title: 'Long-Term Shelters',
    shortTitle: 'Long-Term',
    badge: 'Permanent & Dignified Care',
    tagline:
      'Safe, compassionate, and continuous care for elderly and abandoned individuals requiring lifelong support.',
    icon: 'fa-solid fa-house-chimney-medical',
    tone: 'blue',
    image: '/images/programs/independence-day.jpg',
    imageAlt: 'Residents celebrating together at our long-term care shelter',
    overview:
      'Our Long-Term Shelters provide permanent residential sanctuary and dignified end-of-life care for individuals who cannot be reunited with families or live independently. Residents receive round-the-clock medical attention, nursing support, nutritious meals, psychosocial care, and a warm family environment filled with love and respect.',
    objectives: [
      'Provide permanent safe housing, clean bedding, and nutritious daily meals.',
      'Deliver 24/7 healthcare, specialized nursing care, and palliative support for terminally ill and bedridden residents.',
      'Restore human dignity, combat loneliness, and foster an inclusive, loving community for abandoned elders.',
      'Facilitate recreational therapy, daily exercises, and cultural celebrations to enrich quality of life.',
    ],
    whoItSupports:
      'Rescued destitute senior citizens, bedridden and terminally ill individuals, persons with severe permanent disabilities, and homeless individuals with no surviving family or social safety net.',
    impactMetrics: [
      { label: 'Long-Term Residents', value: '180+', subtext: 'Supported across our centres' },
      { label: '24/7 Medical Care', value: '100%', subtext: 'Doctor visits and daily nursing' },
      { label: 'Elderly Cared For', value: '26+', subtext: 'Rescued senior citizens' },
      { label: 'Specialized Diet', value: '3 Meals', subtext: 'Plus daily nutrition and medicines' },
    ],
  },
  {
    id: 'mid-term',
    slug: 'mid-term',
    title: 'Mid-Term Shelters',
    shortTitle: 'Mid-Term',
    badge: 'Transitional & Psychiatric Rehabilitation',
    tagline:
      'Structured psychiatric recovery, physical healing, and family tracing to safely reintegrate individuals back into home life.',
    icon: 'fa-solid fa-hand-holding-hand',
    tone: 'red',
    image: '/images/programs/counselling-session.png',
    imageAlt: 'A counselling and psychosocial recovery session with residents',
    overview:
      'Our Mid-Term Shelters serve as transitional care facilities for individuals rescued from streets or acute distress who require time-limited, intensive rehabilitation. With focused psychiatric treatment, counselling, and social worker interventions, we stabilize mental health conditions and actively trace lost families across Tamil Nadu and neighboring states.',
    objectives: [
      'Conduct comprehensive physical and psychiatric assessments upon rescue and admission.',
      'Administer continuous psychiatric medication, psychotherapy, and individual counselling sessions.',
      'Engage residents in occupational therapy, cognitive restoration, and daily living skills.',
      'Coordinate with police, district social welfare departments, and interstate networks for successful family tracing and repatriation.',
    ],
    whoItSupports:
      'Individuals rescued with severe mental illness, individuals disoriented or lost due to trauma, individuals in temporary crisis, and rescued wanderers awaiting family tracing.',
    impactMetrics: [
      { label: 'Psychiatric Rescues', value: '129', subtext: 'Individuals stabilized' },
      { label: 'Family Reunions', value: '75+', subtext: 'Safely repatriated home' },
      { label: 'Average Stay', value: '6–18 Mo', subtext: 'Tailored rehabilitation cycle' },
      { label: 'Counselling Ratio', value: '1:1', subtext: 'Dedicated case management' },
    ],
  },
  {
    id: 'livelihood',
    slug: 'livelihood',
    title: 'Livelihood Shelters',
    shortTitle: 'Livelihood',
    badge: 'Vocational Training & Independent Living',
    tagline:
      'Skill empowerment, vocational workshops, and assisted independent living enabling recovered individuals to achieve self-sufficiency.',
    icon: 'fa-solid fa-briefcase',
    tone: 'emerald',
    image: '/images/programs/outdoor-gathering.png',
    imageAlt: 'Residents and volunteers gathered during a skill development workshop',
    overview:
      'For individuals who have completed mental and physical recovery but lack safe family homes to return to, our Livelihood Shelters offer bridge housing and practical career pathways. In partnership with Tamil Nadu Skill Development initiatives and local enterprises, residents acquire marketable skills and earn an independent livelihood.',
    objectives: [
      'Impart vocational training in catering, housekeeping, horticulture, handicraft, and security services.',
      'Foster financial literacy, personal banking habits, and disciplined savings for future independence.',
      'Provide supported group homes (Home Again model) promoting community integration and peer solidarity.',
      'Connect trained graduates with verified inclusive employers ensuring living wages and dignity at work.',
    ],
    whoItSupports:
      'Rehabilitated individuals ready for employment, youth aging out of shelters, rescued women seeking financial self-reliance, and persons with mild disabilities capable of sustained productive work.',
    impactMetrics: [
      { label: 'Vocational Graduates', value: '60+', subtext: 'Trained in certified trades' },
      { label: 'Employment Rate', value: '85%', subtext: 'Placed in dignified jobs' },
      { label: 'Supported Group Homes', value: '3', subtext: 'Independent living units' },
      { label: 'Monthly Stipends', value: '100%', subtext: 'Earned directly by beneficiaries' },
    ],
  },
];

/** Map of category IDs to their definitions for O(1) lookup */
export const CATEGORY_MAP = Object.fromEntries(
  PROGRAMME_CATEGORIES.map((cat) => [cat.id, cat])
);

/**
 * Retrieves the category definition by ID or slug with safe fallback
 * @param {string} [idOrSlug]
 * @returns {import('./types').ProgrammeCategory}
 */
export function getCategoryConfig(idOrSlug) {
  if (!idOrSlug) return PROGRAMME_CATEGORIES[0];
  const normalized = String(idOrSlug).toLowerCase().trim();
  return CATEGORY_MAP[normalized] || PROGRAMME_CATEGORIES[0];
}

/**
 * Checks if a string is a recognized shelter category
 * @param {string} [category]
 * @returns {boolean}
 */
export function isValidCategory(category) {
  return Boolean(category && CATEGORY_MAP[category]);
}

/**
 * Returns Tailwind badge styling for a given shelter category
 * @param {string} [category]
 */
export function getCategoryBadgeStyle(category) {
  switch (category) {
    case 'long-term':
      return {
        label: 'Long-Term',
        fullLabel: 'Long-Term Shelter',
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        tone: 'blue',
      };
    case 'mid-term':
      return {
        label: 'Mid-Term',
        fullLabel: 'Mid-Term Shelter',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        tone: 'red',
      };
    case 'livelihood':
      return {
        label: 'Livelihood',
        fullLabel: 'Livelihood Shelter',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        tone: 'emerald',
      };
    default:
      return {
        label: 'Long-Term',
        fullLabel: 'Long-Term Shelter',
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        tone: 'blue',
      };
  }
}
