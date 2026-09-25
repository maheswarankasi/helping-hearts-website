import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeFirestore, getFirestore } from 'firebase/firestore';

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
const app = getApps().length
  ? getApp()
  : initializeApp(
      isFirebaseConfigured
        ? firebaseConfig
        : {
            apiKey: 'AIzaSyDemoDummyKeyForAppletEvaluation',
            authDomain: 'helping-hearts-demo.firebaseapp.com',
            projectId: 'helping-hearts-demo',
            storageBucket: 'helping-hearts-demo.appspot.com',
            messagingSenderId: '123456789012',
            appId: '1:123456789012:web:abcdef1234567890',
          }
    );

// Initialize Firestore using HTTP long-polling instead of WebSockets.
// This resolves the browser WebSocket connection failures and timeouts
// when running behind strict proxies, cloud containers, or iframes.
let db;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
} catch {
  db = getFirestore(app);
}

export { db };
