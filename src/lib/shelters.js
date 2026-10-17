import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  cleanImageList,
  optionalRichText,
  optionalText,
  toDate,
} from './firestoreUtils';

const COLLECTION = 'shelters';

// Valid categories
export const VALID_CATEGORIES = ['long-term', 'mid-term', 'livelihood'];

// Cards alternate between the blue and red accent treatments.
const tones = ['blue', 'red'];

/**
 * Normalizes Firestore document into a typed Shelter object.
 * Existing records missing the category field default gracefully to 'long-term'.
 */
function toShelter(id, data, index = 0) {
  const images = cleanImageList(data.images);
  const createdAt = toDate(data.createdAt);

  const rawCategory = optionalText(data.category)?.toLowerCase()?.trim();
  const category = VALID_CATEGORIES.includes(rawCategory) ? rawCategory : 'long-term';

  return {
    id,
    name: optionalText(data.name) ?? 'Our Shelter',
    category,
    tag: optionalText(data.tag),
    address: optionalText(data.address),
    // Rich text document, or a plain string on older records.
    description: optionalRichText(data.description) ?? '',
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
 * Reads all shelters from Firestore, sorted newest first.
 * Sorted in memory so documents without a `createdAt` are still returned.
 * @param {object} [options]
 * @param {number} [options.limit]
 * @returns {Promise<import('./types').Shelter[]>}
 */
export async function getShelters({ limit } = {}) {
  if (!isFirebaseConfigured) return [];

  let list = [];
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
    console.warn(
      'Could not load shelters from Firestore:',
      error?.message || error
    );
    return [];
  }

  return limit ? list.slice(0, limit) : list;
}

/**
 * Fetches shelters filtered by category ('long-term' | 'mid-term' | 'livelihood').
 * Backwards-compatible: existing records without category match 'long-term'.
 *
 * @param {'long-term' | 'mid-term' | 'livelihood'} category
 * @param {object} [options]
 * @param {number} [options.limit]
 * @returns {Promise<import('./types').Shelter[]>}
 */
export async function getSheltersByCategory(category, { limit } = {}) {
  const all = await getShelters();
  const normalizedCategory = String(category || 'long-term').toLowerCase().trim();
  const filtered = all.filter((s) => s.category === normalizedCategory);
  return limit ? filtered.slice(0, limit) : filtered;
}

/** Returns a single shelter, or null when the id does not exist. */
export async function getShelterById(id) {
  if (!isFirebaseConfigured) return null;

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    return snap.exists() ? toShelter(snap.id, snap.data(), 0) : null;
  } catch (error) {
    console.warn(
      `Could not load shelter ${id} from Firestore:`,
      error?.message || error
    );
    return null;
  }
}

/**
 * Firestore direct query helper example for reference / testing.
 * Query: collection('shelters').where('category', '==', category)
 */
export async function querySheltersFromFirestoreDirect(category) {
  if (!isFirebaseConfigured) return [];
  try {
    const q = query(collection(db, COLLECTION), where('category', '==', category));
    const snap = await getDocs(q);
    return snap.docs.map((d, idx) => toShelter(d.id, d.data(), idx));
  } catch (err) {
    console.warn('Direct category query fallback to memory filter:', err);
    return getSheltersByCategory(category);
  }
}
