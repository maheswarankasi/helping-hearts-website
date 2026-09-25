import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  cleanImageList,
  formatDateParts,
  optionalText,
  toDate,
} from './firestoreUtils';

const COLLECTION = 'events';

const DEFAULT_EVENTS = [
  {
    id: 'free-medical-camp-coimbatore',
    title: 'Free Mega Health & Eye Checkup Camp',
    summary:
      'Comprehensive free health screenings, general medicine distribution, and eye checkups conducted for underserved communities in and around Coimbatore.',
    description:
      'Our medical volunteer team conducted a full-day free health camp in Rathinapuri, providing vital diagnostics, specialist consultations, free medicines, and eye examinations. Over 450 beneficiaries attended, receiving direct medical care and referrals for necessary surgeries.',
    location: 'Rathinapuri Community Centre, Coimbatore',
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    ],
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2025-08-18',
    day: '18',
    month: 'Aug',
    dateLabel: '18 Aug',
    sortKey: 1755475200000,
  },
  {
    id: 'street-rescue-and-shelter-drive',
    title: 'Street Rescue & Rehabilitation Outreach Drive',
    summary:
      'Night outreach drive to identify destitute homeless individuals on city railway stations and bus stands, providing immediate warmth, food, and safe shelter intake.',
    description:
      'Volunteers and field coordinators mobilized across major transit hubs in Coimbatore. Five elderly and destitute individuals were safely rescued, given hot meals, clean clothes, and transitioned to our Anbalayam shelter for ongoing medical checkups and care.',
    location: 'Coimbatore Junction & Gandhipuram',
    images: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    ],
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2025-09-04',
    day: '04',
    month: 'Sep',
    dateLabel: '04 Sep',
    sortKey: 1756944000000,
  },
  {
    id: 'diwali-celebration-with-residents',
    title: 'Deepavali Joy with Shelter Elders & Children',
    summary:
      'Spreading the light of Diwali with traditional sweets, new clothes distribution, cultural programs, and festive lunch for all shelter residents.',
    description:
      'A heartwarming celebration with volunteers, well-wishers, and shelter residents. The day was filled with music, sweet distribution, festive gifts, and a grand communal lunch to ensure no one felt lonely during the festival.',
    location: 'Helping Hearts Main Shelter, Coimbatore',
    images: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    ],
    image:
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    eventDate: '2025-10-20',
    day: '20',
    month: 'Oct',
    dateLabel: '20 Oct',
    sortKey: 1760918400000,
  },
];

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
  let list = [];
  if (isFirebaseConfigured) {
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      list = snapshot.docs
        .map((snap) => toEvent(snap.id, snap.data()))
        .sort((a, b) => b.sortKey - a.sortKey);
    } catch (error) {
      console.warn('Could not load events from Firestore, using fallback:', error?.message || error);
    }
  }

  // Combine live Firestore events first, and include default events if not shadowed
  const firestoreIds = new Set(list.map((item) => item.id));
  const combined = [
    ...list,
    ...DEFAULT_EVENTS.filter((item) => !firestoreIds.has(item.id)),
  ];

  const result = combined.length > 0 ? combined : DEFAULT_EVENTS;
  return limit ? result.slice(0, limit) : result;
}

/** Returns a single event, or null when the id does not exist. */
export async function getEventById(id) {
  if (isFirebaseConfigured) {
    try {
      const snap = await getDoc(doc(db, COLLECTION, id));
      if (snap.exists()) {
        return toEvent(snap.id, snap.data());
      }
    } catch (error) {
      console.warn(`Could not load event ${id} from Firestore:`, error?.message || error);
    }
  }
  return DEFAULT_EVENTS.find((e) => e.id === id) ?? null;
}
