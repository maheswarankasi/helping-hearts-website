import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'donors';

/**
 * Records a donor's intent to give, before they scan the QR code.
 *
 * Because we take payment by direct UPI transfer rather than through a
 * gateway, nothing here confirms that money actually arrived. Every record
 * starts as `awaiting_confirmation` and has to be reconciled against the bank
 * or UPI statement by hand.
 *
 * No card, UPI PIN, or bank credential is ever collected or stored.
 */
export async function addDonor(values) {
  if (!isFirebaseConfigured) {
    throw new Error(
      'Firebase is not configured. Add the NEXT_PUBLIC_FIREBASE_* values to .env.local.'
    );
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    amount: Number(values.amount),
    purpose: values.purpose,
    message: values.message.trim(),
    paymentStatus: 'awaiting_confirmation',
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

function toDonor(id, data) {
  const amount = Number(data.amount);

  return {
    id,
    name: optionalText(data.name) ?? '—',
    email: optionalText(data.email) ?? '—',
    phone: optionalText(data.phone) ?? '—',
    amount: Number.isFinite(amount) ? amount : null,
    purpose: optionalText(data.purpose) ?? '—',
    message: optionalText(data.message),
    paymentStatus: optionalText(data.paymentStatus) ?? 'awaiting_confirmation',
    createdAt: toDate(data.createdAt),
  };
}

/** Reads all donor records, newest first. For the admin panel only. */
export async function getDonors() {
  if (!isFirebaseConfigured) return [];

  const snapshot = await getDocs(collection(db, COLLECTION));
  return snapshot.docs
    .map((snap) => toDonor(snap.id, snap.data()))
    .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
}

/** Formats an amount as Indian rupees, e.g. 1500 -> "₹1,500". */
export function formatAmount(amount) {
  if (amount === null) return '—';
  return `₹${amount.toLocaleString('en-IN')}`;
}
