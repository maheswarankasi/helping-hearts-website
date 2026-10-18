"use client";

import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

/**
 * Real-time listener for unread messages count in the 'inquiries' collection.
 * Stays synchronized across the admin dashboard whenever messages are received,
 * opened/read, or deleted.
 */
export function useUnreadInquiries() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(() => Boolean(isFirebaseConfigured && db));

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      return undefined;
    }

    try {
      const inquiriesRef = collection(db, 'inquiries');
      const unsubscribe = onSnapshot(
        inquiriesRef,
        (snapshot) => {
          let count = 0;
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            // A message is read if read === true, isRead === true, or status === 'read'
            const isRead =
              data.read === true ||
              data.isRead === true ||
              data.status === 'read';
            if (!isRead) {
              count++;
            }
          });
          setUnreadCount(count);
          setLoading(false);
        },
        (error) => {
          console.warn('Could not listen to unread inquiries in real-time:', error?.message || error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn('Failed to initialize unread inquiries listener:', err?.message || err);
    }
  }, []);

  return { unreadCount, loading };
}
