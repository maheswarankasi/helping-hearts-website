"use client";

import { useEffect, useState, useMemo, useCallback } from 'react';
import { getDonors, updateDonorStatus } from '@/lib/donors';
import { formatAmount, formatDateParts } from '@/lib/firestoreUtils';
import ExportButton from '@/components/admin/ExportButton';
import DonorStatusDropdown from '@/components/admin/DonorStatusDropdown';

export default function DonorsAdminPage() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  // Toast notification helper
  const addToast = useCallback(({ type = 'success', title, message }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  // Fetch initial donors list
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
            'Could not load donors. If Firestore rules block reads on the donors collection, verify firestore.rules.'
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

  // Handle donor status updates with optimistic state and Firestore persistence
  const handleStatusChange = async (donorId, newStatus, donorName) => {
    const targetDonor = donors.find((d) => d.id === donorId);
    const previousStatus = targetDonor?.status || 'awaiting confirmation';

    if (previousStatus === newStatus) return;

    // Optimistically update local state immediately
    setDonors((prev) =>
      prev.map((d) =>
        d.id === donorId ? { ...d, status: newStatus, updatedAt: new Date() } : d
      )
    );

    try {
      await updateDonorStatus(donorId, newStatus);
      addToast({
        type: 'success',
        title: 'Status Updated',
        message: `Status updated to "${newStatus}" for ${donorName || 'donor'}.`,
      });
    } catch (err) {
      console.error('Failed to update status in Firestore:', err);
      // Revert to previous status on failure
      setDonors((prev) =>
        prev.map((d) => (d.id === donorId ? { ...d, status: previousStatus } : d))
      );
      addToast({
        type: 'error',
        title: 'Update Failed',
        message: `Could not save status change to Firestore: ${
          err?.message || 'Network or permissions error'
        }. Status reverted.`,
      });
    }
  };

  const pledgedTotal = useMemo(
    () => donors.reduce((sum, donor) => sum + (donor.amount ?? 0), 0),
    [donors]
  );

  const statusCounts = useMemo(() => {
    return {
      all: donors.length,
      awaiting: donors.filter((d) => d.status === 'awaiting confirmation').length,
      confirmed: donors.filter((d) => d.status === 'confirmed').length,
      receipted: donors.filter((d) => d.status === 'receipted').length,
    };
  }, [donors]);

  // Filtered and searched records
  const filteredDonors = useMemo(() => {
    return donors.filter((donor) => {
      // Status filter
      if (statusFilter !== 'all' && donor.status !== statusFilter) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = donor.name?.toLowerCase().includes(q);
        const matchesEmail = donor.email?.toLowerCase().includes(q);
        const matchesPhone = donor.phone?.toLowerCase().includes(q);
        const matchesId = donor.idNumber?.toLowerCase().includes(q);
        const matchesPurpose = donor.purpose?.toLowerCase().includes(q);
        return matchesName || matchesEmail || matchesPhone || matchesId || matchesPurpose;
      }

      return true;
    });
  }, [donors, statusFilter, searchQuery]);

  return (
    <div className="relative pb-12">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Donors List</h2>
          <p className="mt-1 text-sm text-gray-500">
            Donor details captured before the QR code is shown, newest first.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap items-center">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : donors.length} Records
          </span>
          <span className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-lg font-bold text-sm">
            {isLoading ? '—' : formatAmount(pledgedTotal)} Total
          </span>
          <ExportButton sheet="donors" rows={filteredDonors} disabled={isLoading} />
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-amber-800 text-sm flex items-start gap-3">
        <i className="fa-solid fa-circle-info mt-0.5 text-amber-600"></i>
        <div>
          A record is created when a donor submits the form and is shown the QR
          code. Because UPI transfers arrive with nothing to notify this site,
          please confirm each one against your bank statement and update the status dropdown accordingly.
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation"></i>
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="mb-4 bg-white p-3 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'all'
                ? 'bg-gray-900 text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === 'all' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {statusCounts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('awaiting confirmation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'awaiting confirmation'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/60'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
            </span>
            <span>Awaiting Confirmation</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === 'awaiting confirmation'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-200 text-amber-900'
              }`}
            >
              {statusCounts.awaiting}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('confirmed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'confirmed'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200/60'
            }`}
          >
            <i className="fa-solid fa-circle-check text-[10px]"></i>
            <span>Confirmed</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === 'confirmed'
                  ? 'bg-blue-700 text-white'
                  : 'bg-blue-200 text-blue-900'
              }`}
            >
              {statusCounts.confirmed}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('receipted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'receipted'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/60'
            }`}
          >
            <i className="fa-solid fa-receipt text-[10px]"></i>
            <span>Receipted</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                statusFilter === 'receipted'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-200 text-emerald-900'
              }`}
            >
              {statusCounts.receipted}
            </span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] flex-1 sm:flex-initial">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search donors by name, PAN, phone..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <i className="fa-solid fa-xmark text-xs"></i>
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1060px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs text-gray-500 uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Donor</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Address</th>
              <th className="px-6 py-4">PAN / Aadhaar</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Towards</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {isLoading ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2 text-blue-600"></i> Loading donors...
                </td>
              </tr>
            ) : filteredDonors.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-500">
                  <div className="max-w-xs mx-auto text-center space-y-2">
                    <i className="fa-solid fa-user-slash text-2xl text-gray-300"></i>
                    <p className="font-medium text-gray-700">No donor records found</p>
                    {statusFilter !== 'all' || searchQuery ? (
                      <p className="text-xs text-gray-400">
                        Try resetting your search query or status filter.
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">
                        When donors complete pledges, their records will appear here.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredDonors.map((donor) => (
                <tr
                  key={donor.id}
                  onClick={() =>
                    setExpandedId((current) =>
                      current === donor.id ? null : donor.id
                    )
                  }
                  className="hover:bg-blue-50/30 transition cursor-pointer align-top"
                >
                  {/* Donor Name & Message preview */}
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    <div className="flex items-center gap-1.5">
                      <span>{donor.name}</span>
                      {donor.message && (
                        <i
                          className="fa-solid fa-comment-dots text-gray-400 hover:text-blue-600"
                          title="Click row to view message"
                        ></i>
                      )}
                    </div>
                    {donor.message && expandedId === donor.id && (
                      <div className="mt-2.5 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 font-normal whitespace-pre-line max-w-xs">
                        <span className="font-semibold block text-[10px] text-gray-400 uppercase tracking-wide mb-1">
                          Donor Message:
                        </span>
                        {donor.message}
                      </div>
                    )}
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 text-gray-600 text-xs">
                    <a
                      href={`mailto:${donor.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-blue-600 hover:underline block truncate max-w-[180px]"
                      title={donor.email}
                    >
                      {donor.email}
                    </a>
                    <a
                      href={`tel:${donor.phone?.replace(/\s/g, '')}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline text-gray-700 font-medium block mt-0.5"
                    >
                      {donor.phone}
                    </a>
                  </td>

                  {/* Address */}
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-xs whitespace-pre-line line-clamp-2" title={donor.address}>
                    {donor.address}
                  </td>

                  {/* PAN / Aadhaar */}
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {donor.idType || 'PAN'}
                    </span>
                    <span className="font-mono text-xs tracking-wider text-gray-800 font-medium">
                      {donor.idNumber}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                    {formatAmount(donor.amount)}
                  </td>

                  {/* Towards / Purpose */}
                  <td className="px-6 py-4 text-gray-600 text-xs max-w-[160px] truncate" title={donor.purpose}>
                    {donor.purpose}
                  </td>

                  {/* Status Dropdown with Live Firestore Sync */}
                  <td
                    className="px-6 py-4 whitespace-nowrap"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DonorStatusDropdown
                      status={donor.status}
                      onChange={(newStatus) =>
                        handleStatusChange(donor.id, newStatus, donor.name)
                      }
                    />
                  </td>

                  {/* Submitted Date */}
                  <td className="px-6 py-4 text-gray-500 text-xs whitespace-nowrap">
                    {formatDateParts(donor.createdAt).label ?? '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Floating Auto-Dismiss Toast Alerts */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-xl p-4 shadow-xl border flex items-start gap-3 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              toast.type === 'success'
                ? 'bg-white/95 border-emerald-200 text-emerald-900 ring-1 ring-emerald-500/10'
                : 'bg-white/95 border-red-200 text-red-900 ring-1 ring-red-500/10'
            }`}
          >
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                toast.type === 'success'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <i
                className={`fa-solid ${
                  toast.type === 'success' ? 'fa-check' : 'fa-triangle-exclamation'
                }`}
              ></i>
            </span>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold leading-tight">{toast.title}</h4>
              <p className="text-xs text-gray-600 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-1 text-xs shrink-0"
              aria-label="Dismiss alert"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
