import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { cleanImageList, optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'shelters';

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
  if (!isFirebaseConfigured) return [];

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const list = snapshot.docs
      .map((snap) => ({ id: snap.id, data: snap.data() }))
      .sort((a, b) => {
        const aTime = toDate(a.data.createdAt)?.getTime() ?? 0;
        const bTime = toDate(b.data.createdAt)?.getTime() ?? 0;
        return bTime - aTime;
      })
      .map(({ id, data }, index) => toShelter(id, data, index));

    return limit ? list.slice(0, limit) : list;
  } catch (error) {
    console.error('Failed to load shelters from Firestore:', error);
    return [];
  }
}

/** Returns a single shelter, or null when the id does not exist. */
export async function getShelterById(id) {
  if (!isFirebaseConfigured) return null;

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    return snap.exists() ? toShelter(snap.id, snap.data()) : null;
  } catch (error) {
    console.error(`Failed to load shelter ${id} from Firestore:`, error);
    return null;
  }
}
