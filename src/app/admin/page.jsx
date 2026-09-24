"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { getVolunteers } from '@/lib/volunteers';
import { formatDateParts } from '@/lib/firestoreUtils';

const CARDS = [
  {
    key: 'shelters',
    title: 'Total Shelters',
    href: '/admin/shelters',
    icon: 'fa-house-medical',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    key: 'events',
    title: 'Total Events',
    href: '/admin/events',
    icon: 'fa-calendar-check',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    key: 'volunteers',
    title: 'Volunteers',
    href: '/admin/volunteers',
    icon: 'fa-hand-holding-heart',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    key: 'donors',
    title: 'Donor Records',
    href: '/admin/donors',
    icon: 'fa-hand-holding-dollar',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
];

async function countDocs(name) {
  const snapshot = await getDocs(collection(db, name));
  return snapshot.size;
}

export default function AdminDashboard() {
  const [counts, setCounts] = useState(null);
  const [recent, setRecent] = useState([]);
  // Derived from a module constant, so it can be the initial state rather
  // than something an effect has to set.
  const [error, setError] = useState(
    isFirebaseConfigured
      ? null
      : 'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* to .env.local.'
  );

  // setState lands in an async continuation, so the effect body stays sync-free
  useEffect(() => {
    if (!isFirebaseConfigured) return undefined;

    let isActive = true;

    Promise.all([
      countDocs('shelters'),
      countDocs('events'),
      getVolunteers(),
      countDocs('donors'),
    ])
      .then(([shelters, events, volunteers, donors]) => {
        if (!isActive) return;
        setCounts({
          shelters,
          events,
          volunteers: volunteers.length,
          donors,
        });
        setRecent(volunteers.slice(0, 5));
      })
      .catch((err) => {
        console.error('Dashboard load failed:', err);
        if (isActive) {
          setError(
            'Could not load dashboard data. If Firestore rules block reads, publish the updated firestore.rules.'
          );
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-dm text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome to the Helping Hearts admin panel.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/admin/shelters"
            className="bg-white border border-gray-200 text-gray-700 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-sm"></i> Add Shelter
          </Link>
          <Link
            href="/admin/events"
            className="bg-white border border-gray-200 text-gray-700 hover:bg-blue-900 hover:text-white px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-plus text-sm"></i> Add Event
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {/* Live counts straight from Firestore */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {CARDS.map((card) => (
          <Link
            key={card.key}
            href={card.href}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition"
          >
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {card.title}
              </p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                {counts ? (
                  counts[card.key]
                ) : (
                  <i className="fa-solid fa-spinner fa-spin text-2xl text-gray-300"></i>
                )}
              </p>
            </div>
            <div
              className={`w-14 h-14 ${card.bg} rounded-full flex items-center justify-center ${card.color} text-2xl`}
            >
              <i className={`fa-solid ${card.icon}`}></i>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Recent Volunteers</h3>
          <Link
            href="/admin/volunteers"
            className="text-sm text-brand-blue font-medium hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">City</th>
                <th className="px-6 py-4 font-medium">Interest</th>
                <th className="px-6 py-4 font-medium">Signed Up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    {counts ? 'No volunteer sign-ups yet.' : 'Loading...'}
                  </td>
                </tr>
              ) : (
                recent.map((volunteer) => (
                  <tr key={volunteer.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {volunteer.name}
                    </td>
                    <td className="px-6 py-4">{volunteer.phone}</td>
                    <td className="px-6 py-4">{volunteer.city}</td>
                    <td className="px-6 py-4">{volunteer.interest}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDateParts(volunteer.createdAt).label ?? '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
