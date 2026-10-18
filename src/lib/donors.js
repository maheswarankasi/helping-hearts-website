import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { optionalText, toDate } from './firestoreUtils';

const COLLECTION = 'donors';

export const DONOR_STATUSES = [
  'awaiting confirmation',
  'confirmed',
  'receipted',
];

// In-memory fallback when Firestore credentials are not configured
const memoryDonors = [];

/**
 * Records a donor's intent to give, before they scan the QR code.
 *
 * Because we take payment by direct UPI transfer rather than through a
 * gateway, nothing here confirms that money actually arrived. Every record
 * starts as `awaiting confirmation` and has to be reconciled against the bank
 * or UPI statement by hand.
 *
 * No card, UPI PIN, or bank credential is ever collected or stored.
 */
export async function addDonor(values) {
  if (!isFirebaseConfigured) {
    const id = 'mem_' + Date.now();
    memoryDonors.unshift({
      id,
      name: values.name?.trim() || 'Anonymous',
      email: values.email?.trim().toLowerCase() || '—',
      phone: values.phone?.trim() || '—',
      address: values.address?.trim() || '—',
      idType: values.idType || 'PAN',
      idNumber: values.idNumber?.trim().toUpperCase() || '—',
      amount: Number(values.amount) || 0,
      purpose: values.purpose || 'General fund',
      message: values.message?.trim() || '',
      status: 'awaiting confirmation',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return id;
  }

  const docRef = await addDoc(collection(db, COLLECTION), {
    name: values.name.trim(),
    email: values.email.trim().toLowerCase(),
    phone: values.phone.trim(),
    address: values.address.trim(),
    idType: values.idType,
    idNumber: values.idNumber.trim().toUpperCase(),
    amount: Number(values.amount),
    purpose: values.purpose,
    message: values.message.trim(),
    status: 'awaiting confirmation',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export function normalizeDonorStatus(rawStatus) {
  const s = String(rawStatus || '').toLowerCase().trim();
  if (s === 'confirmed') return 'confirmed';
  if (s === 'receipted') return 'receipted';
  return 'awaiting confirmation';
}

function toDonor(id, data) {
  const amount = Number(data.amount);

  return {
    id,
    name: optionalText(data.name) ?? '—',
    email: optionalText(data.email) ?? '—',
    phone: optionalText(data.phone) ?? '—',
    address: optionalText(data.address) ?? '—',
    // Older records were saved before the PAN/Aadhaar choice existed and
    // only ever stored a PAN, so missing idType still means PAN.
    idType: optionalText(data.idType) ?? 'PAN',
    idNumber: optionalText(data.idNumber) ?? optionalText(data.pan) ?? '—',
    amount: Number.isFinite(amount) ? amount : null,
    purpose: optionalText(data.purpose) ?? '—',
    message: optionalText(data.message),
    status: normalizeDonorStatus(data.status),
    updatedAt: toDate(data.updatedAt),
    createdAt: toDate(data.createdAt),
  };
}

/** Reads all donor records, newest first. For the admin panel only. */
export async function getDonors() {
  if (!isFirebaseConfigured) return memoryDonors;

  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs
      .map((snap) => toDonor(snap.id, snap.data()))
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0));
  } catch (error) {
    console.error('Failed to load donors from Firestore, using memory fallback:', error);
    return memoryDonors;
  }
}

/**
 * Updates a donor's status in Firestore and in-memory cache.
 * Valid statuses: 'awaiting confirmation' | 'confirmed' | 'receipted'
 */
export async function updateDonorStatus(id, newStatus) {
  const normalized = normalizeDonorStatus(newStatus);

  // In-memory update if present
  const mem = memoryDonors.find((d) => d.id === id);
  if (mem) {
    mem.status = normalized;
    mem.updatedAt = new Date();
  }

  if (!isFirebaseConfigured) {
    return { id, status: normalized };
  }

  const donorDocRef = doc(db, COLLECTION, id);
  await updateDoc(donorDocRef, {
    status: normalized,
    updatedAt: serverTimestamp(),
  });

  return { id, status: normalized };
}

