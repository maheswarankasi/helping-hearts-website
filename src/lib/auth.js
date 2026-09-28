import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from './firebase';

/**
 * Only this account may use /admin. Firebase's Email/Password provider lets
 * anyone call the client sign-up API, so the account list alone is not a
 * gate — we check the signed-in address against this allowlist too.
 * Leave NEXT_PUBLIC_ADMIN_EMAIL unset to accept any account in the project.
 */
const ALLOWED_EMAIL = (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? '')
  .trim()
  .toLowerCase();

/** The one admin account, or null for anyone else / nobody. */
export function isAllowedAdmin(user) {
  if (!user?.email) return false;
  if (!ALLOWED_EMAIL) return true;
  return user.email.trim().toLowerCase() === ALLOWED_EMAIL;
}

/** Subscribe to sign-in state. Returns the unsubscribe function. */
export function watchAdmin(callback) {
  return onAuthStateChanged(auth, callback);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export function signOutAdmin() {
  return firebaseSignOut(auth);
}

/**
 * Firebase error codes read like internals ("auth/invalid-credential"), so
 * turn the ones an admin can actually hit into plain sentences.
 */
export function describeAuthError(error) {
  // Firebase spells this one out in the code itself, so it never matches a
  // fixed string: 'auth/api-key-not-valid.-please-pass-a-valid-api-key.'
  if (error?.code?.startsWith('auth/api-key-not-valid')) {
    return 'Firebase rejected the API key for sign-in. Enable the Identity Toolkit API for this project, and check the key is not API-restricted in Google Cloud Console.';
  }

  switch (error?.code) {
    case 'auth/invalid-email':
      return 'That does not look like a valid email address.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.';
    case 'auth/invalid-api-key':
      return 'The Firebase API key in .env.local is not valid.';
    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'Email/password sign-in is not enabled for this Firebase project.';
    default:
      return 'Could not sign you in. Please try again.';
  }
}
