import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when .env.local actually carries the Firebase credentials. */
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

// Guard against re-initialising during Next's hot reload / SSR passes.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Only Firestore is imported here. `firebase/auth` and `firebase/storage`
// were pulling ~200 KB into the client bundle while going completely unused —
// images go to Cloudinary, and the admin panel has no sign-in yet. Add them
// back (lazily, from the module that needs them) if that changes.
export const db = getFirestore(app);
