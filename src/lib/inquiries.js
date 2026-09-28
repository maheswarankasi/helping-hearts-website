import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'inquiries';

function toInquiry(id, data) {
  return {
    id,
    name: optionalText(data.name) ?? '—',
    email: optionalText(data.email),
    phone: optionalText(data.phone) ?? '—',
    subject: optionalText(data.subject) ?? '(no subject)',
    message: optionalText(data.message) ?? '',
    read: Boolean(data.read),
    createdAt: toDate(data.createdAt),
  };
}

/**
 * Reads contact-form messages, newest first.
 *
 * Sorted in memory rather than with `orderBy` so a document whose
 * `serverTimestamp()` has not resolved yet still comes back instead of being
 * dropped from the result.
 */
export async function getInquiries({ limit } = {}) {
  if (!isFirebaseConfigured) return [];

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    const list = snapshot.docs
      .map((snap) => toInquiry(snap.id, snap.data()))
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));

    return limit ? list.slice(0, limit) : list;
  } catch (error) {
    console.warn(
      'Could not load inquiries from Firestore:',
      error?.message || error
    );
    return [];
  }
}
