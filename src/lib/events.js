import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  cleanImageList,
  formatDateParts,
  optionalText,
  toDate,
} from './firestoreUtils';

const COLLECTION = 'events';

function toEvent(id, data) {
  const eventDate = toDate(data.eventDate) ?? toDate(data.createdAt);
  const { day, month, label } = formatDateParts(eventDate);
  const images = cleanImageList(data.images);

  return {
    id,
    title: optionalText(data.title) ?? 'Untitled event',
    summary: optionalText(data.summary) ?? optionalText(data.description) ?? '',
    description: optionalText(data.description) ?? '',
    location: optionalText(data.location),
    images,
    image: images[0] ?? null,
    day,
    month,
    dateLabel: label,
    // Kept as a number so we can sort without re-parsing.
    sortKey: eventDate ? eventDate.getTime() : 0,
  };
}

/**
 * Reads events from Firestore, newest first.
 *
 * Sorting happens in memory rather than with `orderBy` so that documents
 * missing an `eventDate` still come back instead of being silently dropped.
 */
export async function getEvents({ limit } = {}) {
  if (!isFirebaseConfigured) return [];

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const list = snapshot.docs
      .map((snap) => toEvent(snap.id, snap.data()))
      .sort((a, b) => b.sortKey - a.sortKey);

    return limit ? list.slice(0, limit) : list;
  } catch (error) {
    console.error('Failed to load events from Firestore:', error);
    return [];
  }
}

/** Returns a single event, or null when the id does not exist. */
export async function getEventById(id) {
  if (!isFirebaseConfigured) return null;

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    return snap.exists() ? toEvent(snap.id, snap.data()) : null;
  } catch (error) {
    console.error(`Failed to load event ${id} from Firestore:`, error);
    return null;
  }
}
