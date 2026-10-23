"use client";

import { useEffect, useState, useMemo } from 'react';
import { getVolunteers } from '@/lib/volunteers';
import { formatDateParts } from '@/lib/firestoreUtils';
import ExportButton from '@/components/admin/ExportButton';

export default function VolunteersAdminPage() {
  const [volunteers, setVolunteers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // setState lands in an async continuation, so the effect body stays sync-free
  useEffect(() => {
    let isActive = true;

    getVolunteers()
      .then((data) => {
        if (isActive) setVolunteers(data);
      })
      .catch((err) => {
        console.error('Error fetching volunteers:', err);
        if (isActive) {
          setError(
            'Could not load volunteers. If Firestore rules block reads on the volunteers collection, publish the updated firestore.rules.'
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

  // Filter volunteers by Name OR Mobile Number
  const filteredVolunteers = useMemo(() => {
    if (!searchQuery.trim()) return volunteers;
    const q = searchQuery.toLowerCase().trim();
    const qDigits = q.replace(/\D/g, '');

    return volunteers.filter((volunteer) => {
      const matchName = volunteer.name?.toLowerCase().includes(q);
      const phoneRaw = volunteer.phone || '';
      const phoneDigits = phoneRaw.replace(/\D/g, '');
      const matchPhone =
        phoneRaw.toLowerCase().includes(q) ||
        (qDigits.length > 0 && phoneDigits.includes(qDigits));

      return matchName || matchPhone;
    });
  }, [volunteers, searchQuery]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Volunteers List</h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign-ups from the public Join Us page, newest first.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : volunteers.length} Total
          </span>
          <ExportButton sheet="volunteers" rows={filteredVolunteers} disabled={isLoading} />
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {/* Search Input Bar */}
      <div className="mb-4 bg-white p-3 rounded-xl border border-gray-100 shadow-xs flex items-center justify-between gap-3 flex-wrap">
        <div className="relative min-w-[260px] max-w-md flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search volunteers by name or mobile number..."
            className="w-full pl-8 pr-8 py-2 rounded-lg border border-gray-200 text-xs focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filteredVolunteers.length} of {volunteers.length} volunteers
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Contact</th>
              <th className="px-6 py-4 font-medium">Address</th>
              <th className="px-6 py-4 font-medium">City</th>
              <th className="px-6 py-4 font-medium">Interest</th>
              <th className="px-6 py-4 font-medium">Availability</th>
              <th className="px-6 py-4 font-medium">Signed Up</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading...
                </td>
              </tr>
            ) : filteredVolunteers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  <div className="max-w-xs mx-auto text-center space-y-1.5">
                    <i className="fa-solid fa-user-slash text-2xl text-gray-300"></i>
                    <p className="font-medium text-gray-700">
                      {searchQuery ? 'No matching volunteers found' : 'No volunteer sign-ups yet'}
                    </p>
                    {searchQuery && (
                      <p className="text-xs text-gray-400">
                        Try searching with a different name or mobile number.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredVolunteers.map((volunteer) => (
                <tr
                  key={volunteer.id}
                  onClick={() =>
                    setExpandedId((current) =>
                      current === volunteer.id ? null : volunteer.id
                    )
                  }
                  className="hover:bg-gray-50 transition cursor-pointer align-top"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {volunteer.name}
                    {volunteer.message && (
                      <>
                        <i
                          className="fa-solid fa-comment-dots text-gray-400 ml-2"
                          title="Has a message"
                        ></i>
                        {expandedId === volunteer.id && (
                          <p className="mt-2 font-normal text-gray-600 whitespace-pre-line max-w-xs">
                            {volunteer.message}
                          </p>
                        )}
                      </>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <a
                      href={`mailto:${volunteer.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:underline block"
                    >
                      {volunteer.email}
                    </a>
                    <a
                      href={`tel:${volunteer.phone.replace(/\s/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                    >
                      {volunteer.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs whitespace-pre-line">
                    {volunteer.address}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{volunteer.city}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {volunteer.interest}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {volunteer.availability}
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {formatDateParts(volunteer.createdAt).label ?? '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {volunteers.some((volunteer) => volunteer.message) && (
        <p className="mt-4 text-xs text-gray-500">
          <i className="fa-solid fa-circle-info mr-1"></i>
          Rows with a message icon can be clicked to read the full note.
        </p>
      )}
    </div>
  );
}
