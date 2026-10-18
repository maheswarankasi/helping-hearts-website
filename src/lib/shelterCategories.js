/**
 * @file Programme Category metadata and helpers for Helping Hearts Shelters.
 * Exact text, headings, mission statements, statistics, and facilities
 * extracted directly from the verified 2025–26 Helping Hearts Programme Report PDF:
 *  - Long-Term Residential & Dignified Care (`long-term`)
 *  - Medium Term Rehabilitation Pathway (`mid-term`)
 *  - Livelihood Development and Social Reintegration (`livelihood`)
 */

/** @type {import('./types').ProgrammeCategory[]} */
export const PROGRAMME_CATEGORIES = [
  {
    id: 'long-term',
    slug: 'long-term',
    title: 'Long Term Residential & Dignified Care',
    shortTitle: 'Long-Term Care',
    badge: 'Long Term Residential & Dignified Care',
    tagline:
      'The Long-Term Residential & Dignified Care programme provides safe, compassionate, and continuous care for individuals requiring long-term support. Under this programme, rehabilitation homes for persons with disabilities, geriatric care centres for senior citizens, and hospice care centres for individuals with life-limiting illnesses are being operated.',
    icon: 'fa-solid fa-house-chimney-medical',
    tone: 'blue',
    image: '/images/programs/independence-day.jpg',
    imageAlt: 'Residents celebrating Independence Day together at our long-term care shelter',
    overview:
      'These centres provide a nurturing living environment with comprehensive support services, including medical care, rehabilitation, nursing assistance, emotional support, daily living assistance, and palliative care. The programme focuses on ensuring dignity, comfort, and quality of life for vulnerable individuals by addressing their physical, emotional, and social needs while promoting independence, respect, and compassionate care.',
    reportingSummary:
      'During the reporting period, a total of 394 beneficiaries received care and support across the facilities. Of these, 37 beneficiaries were reintegrated, 37 were rehabilitated, and 63 received end-of-life care support. The remaining beneficiaries continued to receive care and support based on their individual needs.',
    facilities: [
      {
        name: 'Shelter for Homeless (Geriatric Care Centres & Hospice)',
        description:
          'Under the Shelter for Urban Homeless (SUH) scheme, three Geriatric Care Centres/hospice care are being operated to provide safe shelter, care, and support for homeless elderly persons. These centres offer a secure and dignified living environment with essential services such as accommodation, nutritious food, healthcare support, personal care assistance, and emotional support. The centres focus on improving the quality of life of vulnerable senior citizens by addressing their physical, social, and emotional needs. Through compassionate care and continuous support, the programme ensures dignity, safety, and well-being for homeless elderly individuals.',
        locations: [
          'Centre 1: Pollachi, Coimbatore',
          'Centre 2: Kempatty Colony, Coimbatore',
          'Centre 3: Gopalapuram, Coimbatore',
          'Centre 4: Poosaripalayam, Coimbatore',
          'Centre 5: KNG Pudur, Coimbatore',
          'Centre 6: Kallakurichi',
        ],
      },
      {
        name: 'Rehabilitation Home for Differently-Abled',
        description:
          'The Rehabilitation Home for Persons with Disabilities provides a safe, supportive, and dignified living environment for individuals requiring long-term care and assistance. The centre offers comprehensive rehabilitation services, healthcare support, therapy, skill development, and assistance with daily living activities to enhance independence, confidence, and social inclusion among persons with disabilities.',
        locations: ['Centre 1: Kinathukadavu, Coimbatore'],
      },
    ],
    objectives: [
      'Operate Geriatric Care Centres and hospice care for homeless elderly persons under the SUH scheme.',
      'Run Rehabilitation Homes for Persons with Disabilities ensuring safe, supportive, and dignified long-term living.',
      'Provide comprehensive medical care, nursing assistance, therapy, and continuous end-of-life palliative care.',
      'Enhance independence, confidence, and social inclusion through daily living assistance and emotional support.',
    ],
    whoItSupports:
      'Homeless elderly persons, individuals requiring long-term support, persons with disabilities, and individuals with life-limiting or terminal illnesses with no surviving family.',
    impactMetrics: [
      {
        label: 'Beneficiaries Benefitted',
        value: '394',
        subtext: 'Care & support received across facilities',
      },
      {
        label: 'Total Bed Capacity',
        value: '234',
        subtext: 'Across 7 operational care centres',
      },
      {
        label: 'End-of-Life Care Support',
        value: '63',
        subtext: 'Palliative and hospice care support',
      },
      {
        label: 'Reintegrated & Rehabilitated',
        value: '74',
        subtext: '37 reintegrated with family, 37 rehabilitated',
      },
    ],
  },
  {
    id: 'mid-term',
    slug: 'mid-term',
    title: 'Medium Term Rehabilitation Pathway',
    shortTitle: 'Mid-Term Rehabilitation',
    badge: 'Medium Term Rehabilitation Pathway',
    tagline:
      'Under this program, we are operating two Rehabilitation Homes and three Emergency Care and Recovery Centres (ECRCs) across Tamil Nadu, providing comprehensive care and support for individuals with mental health conditions, particularly those experiencing homelessness and social vulnerability.',
    icon: 'fa-solid fa-hand-holding-hand',
    tone: 'red',
    image: '/images/programs/counselling-session.png',
    imageAlt: 'A counselling and psychosocial recovery session with residents',
    overview:
      'A Rehabilitation Home provides a safe, supportive, and structured environment for individuals living with mental illness who require continued care and assistance to regain independence and improve their quality of life. The home offers comprehensive mental health rehabilitation services, including psychiatric follow-up, medication support, counselling, psychosocial interventions, life skills training, occupational activities, and social reintegration support.',
    reportingSummary:
      'During the reporting period, a total of 240 beneficiaries received care and support across the facilities. Of these, 49 beneficiaries were reintegrated, 6 were rehabilitated, and 8 received end-of-life care support. The remaining beneficiaries continued to receive care and support based on their individual needs.',
    facilities: [
      {
        name: 'Rehabilitation Home for People with Mental Illness',
        description:
          'A Rehabilitation Home provides a safe, supportive, and structured environment for individuals living with mental illness who require continued care and assistance to regain independence and improve their quality of life. The home offers comprehensive mental health rehabilitation services, including psychiatric follow-up, medication support, counselling, psychosocial interventions, life skills training, occupational activities, and social reintegration support.',
        locations: [
          'Centre 1: Mettupalayam, Coimbatore',
          'Centre 2: Emerald, The Nilgiris',
        ],
      },
      {
        name: 'Emergency Care & Recovery Centre (ECRC)',
        description:
          'Emergency Care & Recovery Centre is to provide immediate care, protection, and rehabilitation support for homeless individuals experiencing mental health challenges. These centres offer a safe environment with essential services including emergency assistance, mental health assessment, counselling, medical care, food, hygiene support, and rehabilitation services. Located within the Government Hospitals’ campuses, the centres ensure easy access to medical services, psychiatric support, and emergency healthcare.',
        locations: [
          'Centre 1: Government Medical College Hospital, Coimbatore',
          'Centre 2: Government Hospital, Oddanchatram, Dindigul',
          'Centre 3: Government Medical College Hospital, Karur',
        ],
      },
    ],
    objectives: [
      'Operate Rehabilitation Homes offering structured psychiatric follow-up and psychosocial interventions.',
      'Provide Emergency Care & Recovery Centres within Government Hospital campuses for rapid crisis care.',
      'Deliver essential services including mental health assessment, medication support, counselling, and hygiene care.',
      'Strengthen life skills training, occupational activities, and social reintegration back into families and communities.',
    ],
    whoItSupports:
      'Individuals living with mental illness, homeless individuals experiencing acute mental health challenges, psychiatric crises, and social vulnerability requiring structured medical and psychosocial rehabilitation.',
    impactMetrics: [
      {
        label: 'Beneficiaries Benefitted',
        value: '240',
        subtext: 'Care & recovery support across facilities',
      },
      {
        label: 'Total Bed Capacity',
        value: '145',
        subtext: 'Across 2 Rehab Homes and 3 ECRCs',
      },
      {
        label: 'Reintegrated with Family',
        value: '49',
        subtext: 'Safely reunited with their families',
      },
      {
        label: 'Rehabilitated / End-of-Life',
        value: '14',
        subtext: '6 rehabilitated, 8 end-of-life support',
      },
    ],
  },
  {
    id: 'livelihood',
    slug: 'livelihood',
    title: 'Livelihood Development and Social Reintegration',
    shortTitle: 'Livelihood & Skills',
    badge: 'Livelihood Development and Social Reintegration',
    tagline:
      'This initiative is designed for individuals who have successfully completed their recovery and rehabilitation but have no family support or safe place to return to. Recognizing that sustainable recovery requires both economic independence and social inclusion, the program provides opportunities for skill development, employment, and community reintegration, enabling beneficiaries to rebuild their lives with dignity and self-reliance.',
    icon: 'fa-solid fa-briefcase',
    tone: 'emerald',
    image: '/images/programs/outdoor-gathering.png',
    imageAlt: 'Residents and volunteers gathered during a skill development workshop',
    overview:
      'The program supports individuals who have recovered from mental health challenges by providing vocational training and employment opportunities to help them lead independent and dignified lives. In association with the Tamil Nadu Skill Development initiative, beneficiaries receive training in Catering, Housekeeping, and Security Guard services, followed by employment within our shelters and community enterprises.',
    reportingSummary:
      'During the reporting period, a total of 43 beneficiaries received care and support across the facilities. Of these, 03 beneficiaries were reintegrated, 01 was rehabilitated and 04 were transferred to ECRC for treatment. The remaining beneficiaries continued to receive care and support based on their individual needs. During the reporting period, a total of 21 beneficiaries received skill development training across the livelihood courses. Of these, 15 beneficiaries were provided with employment opportunities, enabling them to build financial independence, strengthen their confidence, and progress towards sustainable social reintegration.',
    facilities: [
      {
        name: 'Halfway Home',
        description:
          'The Halfway Home supports individuals who have recovered from mental health challenges by providing vocational training and employment opportunities to help them lead independent and dignified lives. In association with the Tamil Nadu Skill Development initiative, beneficiaries receive training in Catering, Housekeeping, and Security Guard services. Upon successful completion, they are offered employment opportunities within our shelters and upcoming social enterprises, including community canteens and catering services. This initiative promotes financial independence, social reintegration, and a smooth transition from recovery to community living.',
        locations: ['Centre 1: Veerakeralam, Coimbatore'],
      },
      {
        name: 'Home Again',
        description:
          'The Home Again Project provides employment opportunities for individuals who have recovered from mental health challenges, enabling them to lead independent and dignified lives. The initiative promotes social inclusion, self-reliance, and successful community reintegration.',
        locations: [
          'Centre 1: Chikkidasampalayam, Coimbatore',
          'Centre 2: Oomapalayam, Coimbatore',
        ],
      },
      {
        name: 'Vetri Nitchayam',
        description:
          'Vetri Nitchayam is a skill development and employment initiative under which individuals are trained through TNSDC in various job-oriented activities such as laundry services, cooking, and security/watchman services.',
        locations: ['TNSDC Skill Training Centers, Coimbatore'],
      },
    ],
    objectives: [
      'Provide transitional housing through Halfway Homes promoting smooth transition from recovery to community living.',
      'Run Home Again supportive housing fostering social inclusion, self-reliance, and peer solidarity.',
      'Conduct Vetri Nitchayam skill development in laundry services, cooking, security, and tiffin services.',
      'Connect certified graduates with employment opportunities in community canteens and verified enterprises.',
    ],
    whoItSupports:
      'Individuals who have successfully completed recovery and rehabilitation from mental health challenges but have no family support or safe place to return to, seeking vocational training and economic independence.',
    impactMetrics: [
      {
        label: 'Beneficiaries Benefitted',
        value: '43',
        subtext: 'Supported across Halfway Home & Home Again',
      },
      {
        label: 'Skill Training Beneficiaries',
        value: '21',
        subtext: 'Trained across certified livelihood courses',
      },
      {
        label: 'Provided With Employment',
        value: '15',
        subtext: '71% placement in independent jobs',
      },
      {
        label: 'Total Bed Capacity',
        value: '28',
        subtext: 'Transitional & group living beds',
      },
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
  const normalized = category ? String(category).toLowerCase().trim() : '';

  switch (normalized) {
    case 'long-term':
      return {
        label: 'Long-Term',
        fullLabel: 'Long Term Residential & Dignified Care',
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        tone: 'blue',
      };
    case 'mid-term':
    case 'medium-term':
      return {
        label: 'Mid-Term',
        fullLabel: 'Medium Term Rehabilitation Pathway',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
        tone: 'red',
      };
    case 'livelihood':
      return {
        label: 'Livelihood',
        fullLabel: 'Livelihood Development and Social Reintegration',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        tone: 'emerald',
      };
    case 'emergency-care':
    case 'emergency':
      return {
        label: 'Emergency Care',
        fullLabel: 'Emergency Care & Short-Term Care',
        bg: 'bg-red-50 text-brand-red border-red-200',
        dot: 'bg-red-500',
        tone: 'red',
      };
    default:
      return {
        label: 'Long-Term',
        fullLabel: 'Long Term Residential & Dignified Care',
        bg: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        tone: 'blue',
      };
  }
}
