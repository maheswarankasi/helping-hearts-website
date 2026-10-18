/**
 * @file Emergency Care & Short-Term Care Programme Data
 * Extracted and structured from the verified Helping Hearts Programme Report and PDF documentation.
 * Covers Overview, Key Objectives & Services,
 * Operating Facilities (ECRCs), and Verified Impact Indicators.
 */

export const emergencyCareProgramme = {
  key: 'emergency-care',
  step: '01',
  slug: 'emergency-care',
  aliasSlug: 'emergency-short-term-care',
  title: 'Emergency Care & Short-Term Care',
  subtitle: 'Rapid Street Rescue, Crisis Medical Triage & Government Hospital Campus Emergency Recovery',
  tagline:
    'Essential services for residents in crisis or facing immediate health and safety risks, aimed at protecting lives, meeting urgent needs, and helping individuals recover until long-term support is available.',
  overview:
    'Our Emergency Care & Short-Term Care initiative serves as the frontline crisis intervention arm of Helping Hearts. We identify and rescue destitute, injured, and mentally ill individuals found in distress on streets, railway stations, and public spaces across Tamil Nadu. Operating in institutional collaboration with the Department of Health & Family Welfare through Emergency Care and Recovery Centres (ECRCs) located directly within Government Hospital campuses, we deliver immediate lifesaving medical triage, 24/7 psychiatric emergency care, personal hygiene restoration, and compassionate casework to lay the foundation for long-term recovery and social reintegration.',
  concludingNote:
    'Together, these services provide immediate relief and lay the foundation for recovery, stability, and reintegration.',
  image: '/images/programs/rescue-transport.png',
  imageAlt: 'A Helping Hearts rescue vehicle transporting rescued residents to safety',
  
  helpline: {
    title: '24/7 Crisis Rescue & Intake Helpline',
    phone: '+91 63747 13775',
    altPhone: '+91 99442 77721',
    note: 'Call immediately if you locate a destitute, injured, or mentally ill individual in need of emergency rescue in Tamil Nadu.',
  },

  // Key Objectives / Services (matching PDF)
  services: [
    {
      id: 'rescue',
      title: 'Rescue Services',
      stepNumber: '01',
      icon: 'fa-solid fa-truck-medical',
      tone: 'red',
      tagline: 'Rapid street identification & safe transport',
      description:
        'Homeless individuals in distress are identified and rescued from unsafe locations such as streets, railway stations, or public places, then transported to safe care.',
      features: [
        'Active mobile field outreach teams patrolling railway junctions, bus terminals, and public plazas',
        'Dedicated rescue vans equipped with stretchers, first-aid kits, hydration, and clean clothing',
        'Collaborative coordination with local police, railway authorities, and compassionate citizens',
        'Immediate removal from perilous road traffic, harsh weather, and interpersonal hazards',
      ],
    },
    {
      id: 'medical',
      title: 'Medical Care',
      stepNumber: '02',
      icon: 'fa-solid fa-hospital-user',
      tone: 'blue',
      tagline: 'Immediate clinical attention & psychiatric stabilization',
      description:
        'Immediate attention for injuries, illnesses, malnutrition, dehydration, or mental health emergencies — basic check-ups, first aid, medicines, and hospital referrals when necessary.',
      features: [
        'Comprehensive on-arrival triage: vitals assessment, wound dressing, and rehydration therapy',
        'Specialized psychiatric evaluation and evidence-based mental health stabilization',
        'Co-located on Government Medical College Hospital campuses for direct multi-speciality inpatient access',
        'Round-the-clock bedside nursing, prescription medication management, and nutritional support',
      ],
    },
    {
      id: 'support',
      title: 'Support Services',
      stepNumber: '03',
      icon: 'fa-solid fa-hand-holding-heart',
      tone: 'amber',
      tagline: 'Psychosocial counselling & welfare reconnection',
      description:
        'Counselling, emotional support, and help reconnecting with family or accessing government welfare programmes to regain stability.',
      features: [
        'Trauma-informed individual counselling and compassionate psychosocial support',
        'Meticulous family contact tracing across district, state, and national networks',
        'Assistance with civic identity restoration (Aadhaar cards, disability identification)',
        'Linkage to government pensions, free medical insurance, and state rehabilitation schemes',
      ],
    },
  ],

  // Operating Facilities & Model Centres (Hospital Campus ECRCs)
  facilities: [
    {
      id: 'ecrc-coimbatore',
      name: 'Emergency Care & Recovery Centre (ECRC) — Coimbatore',
      campus: 'Government Medical College Hospital Campus, Coimbatore',
      address: 'Trichy Road, Sungam, Coimbatore, Tamil Nadu 641018',
      capacity: '50 Beds',
      bedsNumber: 50,
      partner: 'Dept of Health & Family Welfare, Govt of Tamil Nadu',
      tag: 'Medical College Campus Facility',
      description:
        'Located directly within the Government Medical College Hospital grounds in Coimbatore, this centre delivers immediate round-the-clock emergency medical and psychiatric care with direct physical proximity to CMCH multi-speciality wards.',
      keyFeatures: [
        'Immediate access to secondary and tertiary government hospital healthcare',
        'Direct campus integration with Coimbatore Medical College Hospital',
        'Nutritious meals, personal hygiene assistance, and round-the-clock nursing',
        'Active family tracing and social reintegration casework wing',
      ],
    },
    {
      id: 'ecrc-dindigul',
      name: 'Emergency Care & Recovery Centre (ECRC) — Dindigul',
      campus: 'Government Hospital Campus, Oddanchatram',
      address: 'Government Hospital Campus, Oddanchatram, Dindigul District, Tamil Nadu 624619',
      capacity: '50 Beds',
      bedsNumber: 50,
      partner: 'Dept of Health & Family Welfare, Govt of Tamil Nadu',
      tag: 'District Hospital Campus Facility',
      description:
        'Serving central and southern Tamil Nadu transit corridors, this facility ensures rapid crisis intervention for homeless individuals rescued from highways, rural bus terminuses, and temple transit hubs.',
      keyFeatures: [
        'Direct hospital emergency room referral and diagnostic access',
        'Specialized care for homeless individuals facing severe mental health crises',
        'Integrated medical treatment, counseling, food, and hygiene support',
        'Close coordination with Dindigul District Administration for rehabilitation',
      ],
    },
    {
      id: 'ecrc-karur',
      name: 'Emergency Care & Recovery Centre (ECRC) — Karur',
      campus: 'Government Medical College Hospital Campus, Karur',
      address: 'Sanapiratti, Karur, Tamil Nadu 639004',
      capacity: '45 Beds',
      bedsNumber: 45,
      partner: 'Dept of Health & Family Welfare, Govt of Tamil Nadu',
      tag: 'Medical College Campus Facility',
      description:
        'Co-located on the campus of Government Medical College Hospital in Karur, offering acute psychiatric care, clinical supervision for chronically ill homeless residents, and comprehensive social casework.',
      keyFeatures: [
        'On-campus psychiatric consultation and continuous medication management',
        'Full laboratory, radiology, and emergency medical services on site',
        'Dedicated team of psychiatric social workers and clinical counselors',
        'Direct transition pipeline to vocational and mid-term shelter facilities',
      ],
    },
  ],

  // Impact Statistics (Verified from PDF)
  impactMetrics: [
    {
      label: 'Rescued From Streets',
      value: '265',
      subtext: 'Individuals identified in distress and brought to safety',
    },
    {
      label: 'Emergency Bed Capacity',
      value: '145',
      subtext: 'Beds across 3 Government Hospital ECRC centres',
    },
    {
      label: 'Reunited With Family',
      value: '49+',
      subtext: 'Beneficiaries safely traced and reintegrated with loved ones',
    },
    {
      label: 'Medical Stabilization Rate',
      value: '100%',
      subtext: 'All admitted residents receive physician care and treatment',
    },
  ],

  // Rescue breakdown by demographic category
  demographicBreakdown: {
    total: '265',
    byGender: [
      { label: 'Male Beneficiaries', value: '141', icon: 'fa-solid fa-person' },
      { label: 'Female Beneficiaries', value: '124', icon: 'fa-solid fa-person-dress' },
    ],
    byCondition: [
      {
        label: 'Mental Illness',
        value: '129',
        desc: 'Acute psychiatric conditions, psychosis, and cognitive distress',
        icon: 'fa-solid fa-brain',
      },
      {
        label: 'Terminally Ill',
        value: '90',
        desc: 'Advanced illnesses requiring palliative care and medical stabilization',
        icon: 'fa-solid fa-bed-pulse',
      },
      {
        label: 'Destitute Elderly',
        value: '26',
        desc: 'Vulnerable senior citizens abandoned without food or shelter',
        icon: 'fa-solid fa-person-cane',
      },
      {
        label: 'Differently Abled',
        value: '20',
        desc: 'Physical or intellectual disabilities requiring specialized support',
        icon: 'fa-solid fa-wheelchair',
      },
    ],
  },
};
