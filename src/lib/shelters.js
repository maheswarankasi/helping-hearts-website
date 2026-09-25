import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { cleanImageList, optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'shelters';

const DEFAULT_SHELTERS = [
  {
    id: 'anbalayam-shelter-home',
    name: 'Anbalayam Shelter for the Destitute',
    tag: 'Primary Care Shelter',
    address: '13D, Indra Nagar 2nd Street, Rathinapuri, Coimbatore 641027',
    description:
      'Our central care shelter providing residential care, hygienic accommodation, 3 nutritious daily meals, and 24/7 caregiving for rescued homeless senior citizens and mentally challenged individuals.',
    capacity: '60 Residents',
    capacityIcon: 'fa-solid fa-users-rays',
    mapUrl: 'https://maps.google.com/?q=Coimbatore,Tamil+Nadu',
    images: [
      'https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1200&q=80',
    ],
    image:
      'https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=1200&q=80',
    tone: 'blue',
    sortKey: 1700000000000,
  },
  {
    id: 'karunai-rehabilitation-centre',
    name: 'Karunai Rehabilitation & Medical Centre',
    tag: 'Medical & Rehabilitation',
    address: 'Rathinapuri, Coimbatore, Tamil Nadu 641027',
    description:
      'Specialized facility with medical recovery beds, physical therapy support, and regular visits by volunteer doctors to nurse rescued street individuals back to physical and emotional health.',
    capacity: '40 Residents',
    capacityIcon: 'fa-solid fa-bed-pulse',
    mapUrl: 'https://maps.google.com/?q=Coimbatore,Tamil+Nadu',
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    ],
    image:
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    tone: 'red',
    sortKey: 1690000000000,
  },
];

// Cards alternate between the blue and red accent treatments.
const tones = ['blue', 'red'];

function toShelter(id, data, index = 0) {
  const images = cleanImageList(data.images);
  const createdAt = toDate(data.createdAt);

  return {
    id,
    name: optionalText(data.name) ?? 'Our Shelter',
    tag: optionalText(data.tag),
    address: optionalText(data.address),
    description: optionalText(data.description) ?? '',
    // Null whenever the admin left it blank — the UI hides the block entirely.
    capacity: optionalText(data.capacity),
    capacityIcon: optionalText(data.capacityIcon) ?? 'fa-solid fa-users-rays',
    mapUrl: optionalText(data.mapUrl),
    images,
    image: images[0] ?? null,
    tone: tones[index % tones.length],
    sortKey: createdAt ? createdAt.getTime() : 0,
  };
}

/**
 * Reads shelters from Firestore, newest first.
 *
 * Sorted in memory so documents without a `createdAt` are still returned.
 */
export async function getShelters({ limit } = {}) {
  let list = [];
  if (isFirebaseConfigured) {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      list = snapshot.docs
        .map((snap) => ({ id: snap.id, data: snap.data() }))
        .sort((a, b) => {
          const aTime = toDate(a.data.createdAt)?.getTime() ?? 0;
          const bTime = toDate(b.data.createdAt)?.getTime() ?? 0;
          return bTime - aTime;
        })
        .map(({ id, data }, index) => toShelter(id, data, index));
    } catch (error) {
      console.warn('Could not load shelters from Firestore, using fallback:', error?.message || error);
    }
  }

  // Combine live Firestore shelters first, and include default shelters if not shadowed
  const firestoreIds = new Set(list.map((item) => item.id));
  const combined = [
    ...list,
    ...DEFAULT_SHELTERS.filter((item) => !firestoreIds.has(item.id)),
  ];

  const result = combined.length > 0 ? combined : DEFAULT_SHELTERS;
  return limit ? result.slice(0, limit) : result;
}

/** Returns a single shelter, or null when the id does not exist. */
export async function getShelterById(id) {
  if (isFirebaseConfigured) {
    try {
      const snap = await getDoc(doc(db, COLLECTION, id));
      if (snap.exists()) {
        return toShelter(snap.id, snap.data(), 0);
      }
    } catch (error) {
      console.warn(`Could not load shelter ${id} from Firestore:`, error?.message || error);
    }
  }
  return DEFAULT_SHELTERS.find((s) => s.id === id) ?? null;
}
