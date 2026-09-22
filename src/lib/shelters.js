import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { shelters as fallbackShelters } from './siteContent';

const tones = ['blue', 'red'];

// Normalises an admin-created Firestore shelter into the shape the
// public shelter cards expect.
function toShelterCard(doc, index) {
  const data = doc.data();

  return {
    id: doc.id,
    name: data.name ?? 'Our Shelter',
    tag: data.tag ?? null,
    location: data.address ?? null,
    description: data.description ?? '',
    capacityLabel: data.capacity ? `${data.capacity}` : null,
    capacityIcon: data.capacityIcon ?? 'fa-solid fa-users-rays',
    image: data.images?.[0] ?? null,
    images: data.images ?? [],
    mapUrl: data.mapUrl ?? null,
    tone: tones[index % tones.length],
  };
}

/**
 * Reads published shelters from Firestore. Falls back to the static content
 * in siteContent.js when Firebase is not configured or the read fails, so the
 * public site always renders something meaningful.
 */
export async function getShelters({ limit } = {}) {
  if (!isFirebaseConfigured) {
    return limit ? fallbackShelters.slice(0, limit) : fallbackShelters;
  }

  try {
    const snapshot = await getDocs(
      query(collection(db, 'shelters'), orderBy('createdAt', 'desc'))
    );
    const list = snapshot.docs.map(toShelterCard);

    if (list.length === 0) {
      return limit ? fallbackShelters.slice(0, limit) : fallbackShelters;
    }

    return limit ? list.slice(0, limit) : list;
  } catch (error) {
    console.error('Failed to load shelters from Firestore:', error);
    return limit ? fallbackShelters.slice(0, limit) : fallbackShelters;
  }
}
