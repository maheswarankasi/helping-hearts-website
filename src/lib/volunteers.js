import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'volunteers';

// In-memory fallback when Firestore credentials are not configured
const memoryVolunteers = [];

/**
 * Saves a volunteer sign-up.
 *
 * Called from the browser, so it only ever creates documents — it never reads
 * the collection back. Keep the Firestore rule for this collection
 * create-only for that reason.
 */
export async function addVolunteer(values) {
  if (!isFirebaseConfigured) {
    const id = 'mem_' + Date.now();
    memoryVolunteers.unshift({
      id,
      name: values.name?.trim() || 'Anonymous',
      email: values.email?.trim().toLowerCase() || '—',
      phone: values.phone?.trim() || '—',
      city: values.city?.trim() || '—',
      interest: values.interest || 'General',
      availability: values.availability || 'Flexible',
      message: values.message?.trim() || '',
      status: 'new',
      createdAt: new Date(),
    });
    return id;
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    city: values.city.trim(),
    interest: values.interest,
    availability: values.availability,
    message: values.message.trim(),
    status: 'new',
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

function toVolunteer(id, data) {
  return {
    id,
    name: optionalText(data.name) ?? '—',
    email: optionalText(data.email) ?? '—',
    phone: optionalText(data.phone) ?? '—',
    city: optionalText(data.city) ?? '—',
    interest: optionalText(data.interest) ?? '—',
    availability: optionalText(data.availability) ?? '—',
    message: optionalText(data.message),
    status: optionalText(data.status) ?? 'new',
    createdAt: toDate(data.createdAt),
  };
}

/** Reads all volunteer sign-ups, newest first. For the admin panel only. */
export async function getVolunteers() {
  if (!isFirebaseConfigured) return memoryVolunteers;

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs
      .map((snap) => toVolunteer(snap.id, snap.data()))
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  } catch (error) {
    console.error('Failed to load volunteers from Firestore, using memory fallback:', error);
    return memoryVolunteers;
  }
}
