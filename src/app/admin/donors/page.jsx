"use client";

import { useEffect, useState } from 'react';
import { getDonors } from '@/lib/donors';
import { formatAmount, formatDateParts } from '@/lib/firestoreUtils';

const STATUS_STYLES = {
  awaiting_confirmation: {
    label: 'Awaiting confirmation',
    className: 'bg-amber-100 text-amber-700',
  },
  confirmed: { label: 'Confirmed', className: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-600' },
};

export default function DonorsAdminPage() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // setState lands in an async continuation, so the effect body stays sync-free
  useEffect(() => {
    let isActive = true;

    getDonors()
      .then((data) => {
        if (isActive) setDonors(data);
      })
      .catch((err) => {
        console.error('Error fetching donors:', err);
        if (isActive) {
          setError(
            'Could not load donors. If Firestore rules block reads on the donors collection, publish the updated firestore.rules.'
          );
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const pending = donors.filter(
    (donor) => donor.paymentStatus === 'awaiting_confirmation'
  );
  const pledgedTotal = donors.reduce(
    (sum, donor) => sum + (donor.amount ?? 0),
    0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Donors List</h2>
          <p className="mt-1 text-sm text-gray-500">
            Donor details captured before the QR code is shown, newest first.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : donors.length} Records
          </span>
          <span className="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : pending.length} To Reconcile
          </span>
          <span className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : formatAmount(pledgedTotal)} Pledged
          </span>
        </div>
      </div>

      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm">
        <i className="fa-solid fa-triangle-exclamation mr-2"></i>
        These are <strong>pledges, not confirmed payments</strong>. Because
        donations come in by direct UPI transfer, each record has to be matched
        against your bank or UPI statement by hand.
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Donor</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Towards</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading...
                </td>
              </tr>
            ) : donors.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  No donor records yet.
                </td>
              </tr>
            ) : (
              donors.map((donor) => {
                const status =
                  STATUS_STYLES[donor.paymentStatus] ??
                  STATUS_STYLES.awaiting_confirmation;

                return (
                  <tr
                    key={donor.id}
                    onClick={() =>
                      setExpandedId((current) =>
                        current === donor.id ? null : donor.id
                      )
                    }
                    className="hover:bg-gray-50 transition cursor-pointer align-top"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {donor.name}
                      {donor.message && (
                        <>
                          <i
                            className="fa-solid fa-comment-dots text-gray-400 ml-2"
                            title="Has a message"
                          ></i>
                          {expandedId === donor.id && (
                            <p className="mt-2 font-normal text-gray-600 whitespace-pre-line max-w-xs">
                              {donor.message}
                            </p>
                          )}
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <a
                        href={`mailto:${donor.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:underline block"
                      >
                        {donor.email}
                      </a>
                      <a
                        href={`tel:${donor.phone.replace(/\s/g, '')}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline"
                      >
                        {donor.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                      {formatAmount(donor.amount)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{donor.purpose}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`${status.className} px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {formatDateParts(donor.createdAt).label ?? '—'}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
