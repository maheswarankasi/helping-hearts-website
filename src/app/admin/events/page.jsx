"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toDate, formatDateParts } from '@/lib/firestoreUtils';
import { uploadImages, toFolderName } from '@/lib/cloudinary';

const EMPTY_FORM = {
  title: '',
  eventDate: '',
  location: '',
  summary: '',
  description: '',
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);

  const loadEvents = async () => {
    try {
      const { getEvents } = await import('@/lib/events');
      return await getEvents();
    } catch (e) {
      console.warn('Could not read events:', e);
      return [];
    }
  };

  // setState lands in an async continuation, so the effect body stays sync-free
  useEffect(() => {
    let isActive = true;

    loadEvents()
      .then((data) => {
        if (isActive) setEvents(data);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        if (isActive) setError('Could not load events. Check the console.');
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const refresh = async () => {
    try {
      setEvents(await loadEvents());
    } catch (err) {
      console.error('Error refreshing events:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrls = [];
      if (images.length > 0) {
        try {
          imageUrls = await uploadImages(
            images,
            `HelpingHearts/Events/${toFolderName(formData.title)}`,
            (done, total) => setProgress(`Uploading image ${done} of ${total}...`)
          );
        } catch (uploadErr) {
          console.warn('Image upload fallback (Cloudinary unconfigured):', uploadErr);
          imageUrls = images.map((f) => URL.createObjectURL(f));
        }
      }

      setProgress('Saving event...');

      await addDoc(collection(db, 'events'), {
        title: formData.title.trim(),
        eventDate: formData.eventDate,
        location: formData.location.trim(),
        summary: formData.summary.trim(),
        description: formData.description.trim(),
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      setFormData(EMPTY_FORM);
      setImages([]);
      setIsModalOpen(false);
      await refresh();
    } catch (err) {
      console.error('Save event failed:', err);
      setError(err.message || 'Failed to add event.');
    } finally {
      setIsSubmitting(false);
      setProgress(null);
    }
  };

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
        <button
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add Event
        </button>
      </div>

      {error && !isModalOpen && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Event</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Photos</th>
              <th className="px-6 py-4 font-medium">View</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading...
                </td>
              </tr>
            ) : events.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No events yet. Click “Add Event” to create the first one.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td className="px-6 py-4 font-semibold">{event.title}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {event.dateLabel || formatDateParts(toDate(event.eventDate || event.createdAt)).label || '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {event.images?.length || 0} Photos
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/events/${event.id}`}
                      target="_blank"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Open <i className="fa-solid fa-arrow-up-right-from-square text-xs ml-1"></i>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4">Add New Event</h3>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Event Title"
                className="w-full border p-3 rounded-lg"
                value={formData.title}
                onChange={update('title')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-600 mb-1 block">
                    Event Date
                  </span>
                  <input
                    required
                    type="date"
                    className="w-full border p-3 rounded-lg"
                    value={formData.eventDate}
                    onChange={update('eventDate')}
                  />
                </label>
                <label className="block">
                  <span className="text-sm text-gray-600 mb-1 block">
                    Location <span className="text-gray-400">(optional)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. RS Puram, Coimbatore"
                    className="w-full border p-3 rounded-lg"
                    value={formData.location}
                    onChange={update('location')}
                  />
                </label>
              </div>

              <textarea
                required
                rows="2"
                placeholder="Short summary (shown on the card)"
                className="w-full border p-3 rounded-lg"
                value={formData.summary}
                onChange={update('summary')}
              />

              <textarea
                required
                rows="5"
                placeholder="Full description (shown on the details page)"
                className="w-full border p-3 rounded-lg"
                value={formData.description}
                onChange={update('description')}
              />

              <label className="block">
                <span className="text-sm text-gray-600 mb-1 block">
                  Photos — the first one becomes the card image
                </span>
                <input
                  required
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full border p-2 rounded-lg"
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
              </label>

              {progress && (
                <p className="text-sm text-blue-600 font-medium">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {progress}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2 border rounded-lg disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
