/**
 * @file Mock dataset and Firestore query examples for Shelter categorization.
 * Demonstrates sample data records for Long-Term, Mid-Term, and Livelihood categories,
 * as well as reference Firestore queries.
 */

/** @type {import('./types').Shelter[]} */
export const MOCK_SHELTERS = [
  {
    id: 'shelter-lt-1',
    name: 'Anbalayam Long-Term Sanctuary',
    category: 'long-term',
    tag: 'Permanent Elderly Care',
    address: '14/2, Thondamuthur Road, Vadavalli, Coimbatore 641046',
    description:
      'Permanent residential home equipped with specialized geriatric nursing, palliative support, and round-the-clock doctor availability for abandoned senior citizens and bedridden residents.',
    capacity: '50 Residents',
    capacityIcon: 'fa-solid fa-users-rays',
    mapUrl: 'https://maps.app.goo.gl/829XT7dxZnk52BfMA',
    images: ['/images/programs/independence-day.jpg'],
    image: '/images/programs/independence-day.jpg',
    tone: 'blue',
    sortKey: Date.now() - 1000000,
  },
  {
    id: 'shelter-mt-1',
    name: 'Karunai Illam Mid-Term Recovery Home',
    category: 'mid-term',
    tag: 'Transitional Psychiatric Care',
    address: '88, Trichy Road, Singanallur, Coimbatore 641005',
    description:
      'Transitional facility dedicated to stabilizing homeless individuals experiencing acute psychiatric and trauma distress, offering intensive psychotherapy, life skills, and family tracing support.',
    capacity: '35 Residents',
    capacityIcon: 'fa-solid fa-hands-holding-circle',
    mapUrl: 'https://maps.app.goo.gl/829XT7dxZnk52BfMA',
    images: ['/images/programs/counselling-session.png'],
    image: '/images/programs/counselling-session.png',
    tone: 'red',
    sortKey: Date.now() - 2000000,
  },
  {
    id: 'shelter-lh-1',
    name: 'Nambikkai Home & Vocational Hub',
    category: 'livelihood',
    tag: 'Independent Living & Trades',
    address: '5/12, Sathy Main Road, Saravanampatti, Coimbatore 641035',
    description:
      'Assisted group home and skill incubation center preparing rehabilitated residents for social reintegration, certified trade careers, and community living through the Home Again model.',
    capacity: '25 Trainees',
    capacityIcon: 'fa-solid fa-briefcase',
    mapUrl: 'https://maps.app.goo.gl/829XT7dxZnk52BfMA',
    images: ['/images/programs/outdoor-gathering.png'],
    image: '/images/programs/outdoor-gathering.png',
    tone: 'blue',
    sortKey: Date.now() - 3000000,
  },
];

/**
 * Example Firestore Query Demonstrations:
 *
 * 1. Simple category filter query:
 *    const q = query(collection(db, 'shelters'), where('category', '==', 'long-term'));
 *
 * 2. Ordered by creation date:
 *    const q = query(
 *      collection(db, 'shelters'),
 *      where('category', '==', 'mid-term'),
 *      orderBy('createdAt', 'desc')
 *    );
 *
 * 3. In-memory filter with backwards compatibility for legacy docs:
 *    const filtered = allShelters.filter(s => (s.category || 'long-term') === category);
 */
export function getMockSheltersByCategory(category) {
  const norm = String(category || 'long-term').toLowerCase().trim();
  return MOCK_SHELTERS.filter((s) => s.category === norm);
}
