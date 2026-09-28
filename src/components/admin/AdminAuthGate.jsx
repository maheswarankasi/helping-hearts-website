"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { isAllowedAdmin, signOutAdmin, watchAdmin } from '@/lib/auth';
import AdminLogin from './AdminLogin';

const AdminAuthContext = createContext(null);

/** The signed-in admin plus a logout handler. Only valid inside /admin. */
export function useAdminAuth() {
  const value = useContext(AdminAuthContext);
  if (!value) {
    throw new Error('useAdminAuth must be used inside AdminAuthGate');
  }
  return value;
}

/**
 * Guards every /admin page. Until Firebase has restored the session we show a
 * spinner rather than the login form, otherwise a reload would flash "log in"
 * at an admin who is already signed in.
 */
export default function AdminAuthGate({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  // Set when someone signs in with an account that is not the admin, so the
  // login form can say why they were bounced back out.
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    return watchAdmin((nextUser) => {
      // Signed out. Leave any notice in place: this also fires as the tail
      // of a logout or of the rejection below, and both set the wording the
      // login screen should show.
      if (!nextUser) {
        setUser(null);
        setReady(true);
        return;
      }

      if (!isAllowedAdmin(nextUser)) {
        setNotice('That account is not allowed to use the admin panel.');
        setUser(null);
        setReady(true);
        signOutAdmin().catch((err) =>
          console.error('Sign-out of unauthorised account failed:', err)
        );
        return;
      }

      setNotice(null);
      setUser(nextUser);
      setReady(true);
    });
  }, []);

  const logout = async () => {
    try {
      await signOutAdmin();
      setNotice('You have been logged out. Please log in to continue.');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (!ready) {
    return (
      <div className="min-h-screen bg-gray-50 font-dm flex flex-col items-center justify-center gap-3 text-gray-400">
        <i className="fa-solid fa-spinner fa-spin text-3xl"></i>
        <p className="text-sm">Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin notice={notice} />;
  }

  return (
    <AdminAuthContext.Provider value={{ user, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}
