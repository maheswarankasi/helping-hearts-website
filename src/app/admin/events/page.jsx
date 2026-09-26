"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toDate, formatDateParts } from '@/lib/firestoreUtils';
import { uploadImages, toFolderName } from '@/lib/cloudinary';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import ExportButton from '@/components/admin/ExportButton';
import { EMPTY_DOC, isRichEmpty, toStoredValue } from '@/lib/richText';

const EMPTY_FORM = {
  title: '',
  eventDate: '',
  location: '',
  description: EMPTY_DOC,
  // Rich text too, so a chief guest list or a multi-line impact note works.
  impact: EMPTY_DOC,
  chiefGuest: EMPTY_DOC,
  sponsors: EMPTY_DOC,
};

export default function EventsAdminPage() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  // null while creating; the document id while editing.
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);
  // Already-uploaded image URLs kept on the record being edited.
  const [existingImages, setExistingImages] = useState([]);
  // Newly picked File objects, not yet uploaded.
  const [images, setImages] = useState([]);
  // Sponsor / CSR partner logos, kept separate from the event photo gallery.
  const [existingSponsorLogos, setExistingSponsorLogos] = useState([]);
  const [sponsorLogos, setSponsorLogos] = useState([]);

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

  const openCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setExistingImages([]);
    setImages([]);
    setExistingSponsorLogos([]);
    setSponsorLogos([]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (event) => {
    setEditingId(event.id);
    setFormData({
      title: event.title ?? '',
      // <input type="date"> needs a plain YYYY-MM-DD string.
      eventDate:
        typeof event.eventDate === 'string'
          ? event.eventDate.slice(0, 10)
          : toDate(event.eventDate)?.toISOString().slice(0, 10) ?? '',
      location: event.location ?? '',
      description: event.description || EMPTY_DOC,
      // Older records stored these as plain strings; the editor accepts both.
      impact: event.impact || EMPTY_DOC,
      chiefGuest: event.chiefGuest || EMPTY_DOC,
      sponsors: event.sponsors || EMPTY_DOC,
    });
    setExistingImages(event.images ?? []);
    setImages([]);
    setExistingSponsorLogos(event.sponsorLogos ?? []);
    setSponsorLogos([]);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The rich text field is not an <input>, so the browser's own `required`
    // validation never sees it.
    if (isRichEmpty(formData.description)) {
      setError('Please enter a description.');
      return;
    }
    if (existingImages.length === 0 && images.length === 0) {
      setError('Please add at least one photo.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const folder = `HelpingHearts/Events/${toFolderName(formData.title)}`;

      const upload = async (files, subfolder, label) => {
        if (files.length === 0) return [];
        try {
          return await uploadImages(files, subfolder, (done, total) =>
            setProgress(`Uploading ${label} ${done} of ${total}...`)
          );
        } catch (uploadErr) {
          console.warn('Image upload fallback (Cloudinary unconfigured):', uploadErr);
          return files.map((f) => URL.createObjectURL(f));
        }
      };

      const uploaded = await upload(images, folder, 'photo');
      const uploadedLogos = await upload(
        sponsorLogos,
        `${folder}/Sponsors`,
        'sponsor logo'
      );

      setProgress(editingId ? 'Updating event...' : 'Saving event...');

      const payload = {
        title: formData.title.trim(),
        eventDate: formData.eventDate,
        location: formData.location.trim(),
        // Stored as ProseMirror JSON documents, not HTML.
        description: toStoredValue(formData.description),
        impact: toStoredValue(formData.impact),
        chiefGuest: toStoredValue(formData.chiefGuest),
        sponsors: toStoredValue(formData.sponsors),
        images: [...existingImages, ...uploaded],
        sponsorLogos: [...existingSponsorLogos, ...uploadedLogos],
      };

      if (editingId) {
        await updateDoc(doc(db, 'events', editingId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'events'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      setFormData(EMPTY_FORM);
      setExistingImages([]);
      setImages([]);
      setExistingSponsorLogos([]);
      setSponsorLogos([]);
      setEditingId(null);
      setIsModalOpen(false);
      await refresh();
    } catch (err) {
      console.error('Save event failed:', err);
      setError(err.message || 'Failed to save event.');
    } finally {
      setIsSubmitting(false);
      setProgress(null);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'events', pendingDelete.id));
      setPendingDelete(null);
      await refresh();
    } catch (err) {
      console.error('Delete event failed:', err);
      setError(err.message || 'Failed to delete event.');
      setPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  // Rich text editors hand back a document, not a DOM event.
  const setField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <ExportButton sheet="events" rows={events} />
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Event
          </button>
        </div>
      </div>

      {error && !isModalOpen && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Event</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Photos</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
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
                <tr key={event.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">{event.title}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {event.dateLabel ||
                      formatDateParts(toDate(event.eventDate || event.createdAt))
                        .label ||
                      '—'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {event.images?.length || 0} Photos
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/events/${event.id}`}
                        target="_blank"
                        title="Open on the public site"
                        className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEdit(event)}
                        title="Edit event"
                        className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-pen text-sm"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(event)}
                        title="Delete event"
                        className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-trash text-sm"></i>
                      </button>
                    </div>
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
            <h3 className="text-2xl font-bold mb-4">
              {editingId ? 'Edit Event' : 'Add New Event'}
            </h3>

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
                  <span className="text-base font-bold text-gray-800 mb-2 block">
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
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Location <span className="text-sm font-normal text-gray-400">(optional)</span>
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

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Event Description{' '}
                  <span className="text-sm font-normal text-gray-400">
                    — shown in full on the details page, and trimmed to three
                    lines on the events card
                  </span>
                </span>
                <RichTextEditor
                  minHeight="12rem"
                  placeholder="Tell the full story. Use lists and links where they help…"
                  value={formData.description}
                  onChange={(doc) => setField('description', doc)}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Impact / Beneficiaries{' '}
                  <span className="text-sm font-normal text-gray-400">(optional)</span>
                </span>
                <RichTextEditor
                  minHeight="7rem"
                  placeholder="e.g. 450 beneficiaries reached, including 120 elderly residents…"
                  value={formData.impact}
                  onChange={(doc) => setField('impact', doc)}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Chief Guest{' '}
                  <span className="text-sm font-normal text-gray-400">
                    (optional — use the list buttons to add more than one)
                  </span>
                </span>
                <RichTextEditor
                  minHeight="7rem"
                  placeholder="e.g. Dr. R. Meenakshi, District Collector…"
                  value={formData.chiefGuest}
                  onChange={(doc) => setField('chiefGuest', doc)}
                />
              </label>

              {/* Existing photos, each removable, when editing a record */}
              {existingImages.length > 0 && (
                <div>
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Current photos{' '}
                    <span className="text-sm font-normal text-gray-400">
                      — the first one is the card image
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((url, index) => (
                      <div
                        key={url}
                        className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          title="Remove this photo"
                          onClick={() =>
                            setExistingImages((prev) =>
                              prev.filter((item) => item !== url)
                            )
                          }
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                        >
                          <i className="fa-solid fa-xmark"></i>
                        </button>
                        {index === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-blue-600/90 text-white text-[10px] text-center font-bold py-0.5">
                            COVER
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  {existingImages.length > 0 ? 'Add more photos' : 'Photos'}{' '}
                  <span className="text-sm font-normal text-gray-400">
                    {existingImages.length > 0
                      ? '(optional)'
                      : '— the first one becomes the card image'}
                  </span>
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full border p-2 rounded-lg"
                  onChange={(e) => setImages(Array.from(e.target.files))}
                />
              </label>

              {/* Sponsors: the name(s) and their logos kept together, since
                  they render as one block on the details page. Logos are a
                  separate set from the event photo gallery. */}
              <div className="border-t pt-4 space-y-4">
                <p className="text-base font-bold text-gray-800">
                  <i className="fa-solid fa-handshake-angle text-gray-400 mr-2"></i>
                  Sponsors / CSR Initiative{' '}
                  <span className="text-sm font-normal text-gray-400">(optional)</span>
                </p>

                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Sponsor name(s){' '}
                    <span className="text-sm font-normal text-gray-400">
                      (use the list buttons for more than one)
                    </span>
                  </span>
                  <RichTextEditor
                    minHeight="7rem"
                    placeholder="e.g. Acme Industries CSR, Coimbatore Rotary Club…"
                    value={formData.sponsors}
                    onChange={(doc) => setField('sponsors', doc)}
                  />
                </label>

                {existingSponsorLogos.length > 0 && (
                  <div className="mb-3">
                    <span className="text-base font-bold text-gray-800 mb-2 block">
                      Current sponsor logos
                    </span>
                    <div className="flex flex-wrap gap-3">
                      {existingSponsorLogos.map((url, index) => (
                        <div
                          key={url}
                          className="relative w-28 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`Sponsor logo ${index + 1}`}
                            className="w-full h-full object-contain p-1"
                          />
                          <button
                            type="button"
                            title="Remove this logo"
                            onClick={() =>
                              setExistingSponsorLogos((prev) =>
                                prev.filter((item) => item !== url)
                              )
                            }
                            className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    {existingSponsorLogos.length > 0
                      ? 'Add more sponsor logos'
                      : 'Sponsor logos'}{' '}
                    <span className="text-sm font-normal text-gray-400">
                      (PNG with a transparent background works best)
                    </span>
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full border p-2 rounded-lg"
                    onChange={(e) => setSponsorLogos(Array.from(e.target.files))}
                  />
                </label>
              </div>

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
                  {isSubmitting
                    ? 'Saving...'
                    : editingId
                      ? 'Update Event'
                      : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this event?"
          itemName={pendingDelete.title}
          message="It will disappear from the public site immediately. Uploaded photos stay in Cloudinary and are not removed."
          isBusy={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
