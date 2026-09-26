import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  cleanImageList,
  formatDateParts,
  optionalRichText,
  optionalText,
  toDate,
} from './firestoreUtils';
import { toPlainText } from './richText';

const COLLECTION = 'events';

function toEvent(id, data) {
  const eventDate = toDate(data.eventDate) ?? toDate(data.createdAt);
  const { day, month, label } = formatDateParts(eventDate);
  const images = cleanImageList(data.images);

  return {
    id,
    title: optionalText(data.title) ?? 'Untitled event',
    // Rich text documents, or plain strings on older records.
    summary: optionalRichText(data.summary) ?? optionalRichText(data.description) ?? '',
    description: optionalRichText(data.description) ?? '',
    // Flattened once here so cards, clamps and <meta> tags never have to
    // care which format the field is in.
    summaryText: toPlainText(
      optionalRichText(data.summary) ?? optionalRichText(data.description) ?? ''
    ),
    location: optionalText(data.location),
    // Rich text documents, or plain strings on records saved before these
    // became editors. Null when blank, so the UI can hide the block.
    impact: optionalRichText(data.impact),
    chiefGuest: optionalRichText(data.chiefGuest),
    sponsors: optionalRichText(data.sponsors),
    sponsorLogos: cleanImageList(data.sponsorLogos),
    images,
    image: images[0] ?? null,
    day,
    month,
    dateLabel: label,
    // Kept as a number so we can sort without re-parsing.
    sortKey: eventDate ? eventDate.getTime() : 0,
    eventDate: data.eventDate || null,
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

  let list = [];
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    list = snapshot.docs
      .map((snap) => toEvent(snap.id, snap.data()))
      .sort((a, b) => b.sortKey - a.sortKey);
  } catch (error) {
    console.warn(
      'Could not load events from Firestore:',
      error?.message || error
    );
    return [];
  }

  return limit ? list.slice(0, limit) : list;
}

/** Returns a single event, or null when the id does not exist. */
export async function getEventById(id) {
  if (!isFirebaseConfigured) return null;

  try {
    const snap = await getDoc(doc(db, COLLECTION, id));
    return snap.exists() ? toEvent(snap.id, snap.data()) : null;
  } catch (error) {
    console.warn(
      `Could not load event ${id} from Firestore:`,
      error?.message || error
    );
    return null;
  }
}
