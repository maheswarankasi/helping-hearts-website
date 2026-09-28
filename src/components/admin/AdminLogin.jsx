"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { isFirebaseConfigured } from '@/lib/firebase';
import { signIn, describeAuthError } from '@/lib/auth';

export default function AdminLogin({ notice }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(
    isFirebaseConfigured
      ? null
      : 'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* to .env.local.'
  );

  // On success nothing is set here: the auth listener in AdminAuthGate swaps
  // this screen for the dashboard, so this component unmounts.
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (busy || !isFirebaseConfigured) return;

    setError(null);
    setBusy(true);
    try {
      await signIn(email, password);
    } catch (err) {
      console.error('Admin sign-in failed:', err);
      setError(describeAuthError(err));
      setPassword('');
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-dm flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-900 px-8 py-8 flex flex-col items-center gap-4">
            <Image
              src="/helping-hearts.jpeg"
              alt="Helping Hearts"
              width={80}
              height={80}
              className="rounded-md"
            />
            <div className="text-center">
              <h1 className="text-white text-xl font-semibold">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {notice ?? 'Please log in to continue.'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm"
              >
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="admin-email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-11 pr-11 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-1 text-gray-400 hover:text-gray-700 transition"
                >
                  <i
                    className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={busy || !isFirebaseConfigured}
              className="w-full bg-brand-blue text-white px-4 py-3 rounded-lg font-medium shadow-sm transition hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {busy ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Logging in…
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right-to-bracket"></i> Log in
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          <Link href="/" className="hover:text-brand-blue transition">
            <i className="fa-solid fa-arrow-left text-xs mr-1.5"></i>
            Back to the website
          </Link>
        </p>
      </div>
    </div>
  );
}
