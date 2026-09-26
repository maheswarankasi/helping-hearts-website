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
import { uploadImages, toFolderName } from '@/lib/cloudinary';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import ExportButton from '@/components/admin/ExportButton';
import { EMPTY_DOC, isRichEmpty, toStoredValue } from '@/lib/richText';

const EMPTY_FORM = {
  name: '',
  tag: '',
  address: '',
  mapUrl: '',
  capacity: '',
  description: EMPTY_DOC,
};

export default function AdminSheltersPage() {
  const [shelters, setShelters] = useState([]);
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

  const loadShelters = async () => {
    try {
      const { getShelters } = await import('@/lib/shelters');
      return await getShelters();
    } catch (e) {
      console.warn('Could not read shelters:', e);
      return [];
    }
  };

  // setState lands in an async continuation, so the effect body stays sync-free
  useEffect(() => {
    let isActive = true;

    loadShelters()
      .then((data) => {
        if (isActive) setShelters(data);
      })
      .catch((err) => {
        console.error('Error fetching shelters:', err);
        if (isActive) setError('Could not load shelters. Check the console.');
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
      setShelters(await loadShelters());
    } catch (err) {
      console.error('Error refreshing shelters:', err);
    }
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setExistingImages([]);
    setImages([]);
    setError(null);
    setIsModalOpen(true);
  };

  const openEdit = (shelter) => {
    setEditingId(shelter.id);
    setFormData({
      name: shelter.name ?? '',
      tag: shelter.tag ?? '',
      address: shelter.address ?? '',
      mapUrl: shelter.mapUrl ?? '',
      capacity: shelter.capacity ?? '',
      description: shelter.description || EMPTY_DOC,
    });
    setExistingImages(shelter.images ?? []);
    setImages([]);
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
      let uploaded = [];
      if (images.length > 0) {
        try {
          uploaded = await uploadImages(
            images,
            `HelpingHearts/Shelters/${toFolderName(formData.name)}`,
            (done, total) => setProgress(`Uploading image ${done} of ${total}...`)
          );
        } catch (uploadErr) {
          console.warn('Image upload fallback (Cloudinary unconfigured):', uploadErr);
          uploaded = images.map((f) => URL.createObjectURL(f));
        }
      }

      setProgress(editingId ? 'Updating shelter...' : 'Saving shelter...');

      const payload = {
        name: formData.name.trim(),
        tag: formData.tag.trim(),
        address: formData.address.trim(),
        mapUrl: formData.mapUrl.trim(),
        capacity: formData.capacity.trim(),
        // Stored as a ProseMirror JSON document, not HTML.
        description: toStoredValue(formData.description),
        images: [...existingImages, ...uploaded],
      };

      if (editingId) {
        await updateDoc(doc(db, 'shelters', editingId), {
          ...payload,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'shelters'), {
          ...payload,
          createdAt: serverTimestamp(),
        });
      }

      setFormData(EMPTY_FORM);
      setExistingImages([]);
      setImages([]);
      setEditingId(null);
      setIsModalOpen(false);
      await refresh();
    } catch (err) {
      console.error('Save shelter failed:', err);
      setError(err.message || 'Failed to save shelter.');
    } finally {
      setIsSubmitting(false);
      setProgress(null);
    }
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;

    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'shelters', pendingDelete.id));
      setPendingDelete(null);
      await refresh();
    } catch (err) {
      console.error('Delete shelter failed:', err);
      setError(err.message || 'Failed to delete shelter.');
      setPendingDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const update = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-gray-800">Manage Shelters</h2>
        <div className="flex items-center gap-3 flex-wrap">
          <ExportButton sheet="shelters" rows={shelters} />
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Shelter
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
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Shelter Name</th>
              <th className="px-6 py-4 font-medium">Address</th>
              <th className="px-6 py-4 font-medium">Capacity</th>
              <th className="px-6 py-4 font-medium">Photos</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading...
                </td>
              </tr>
            ) : shelters.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No shelters yet. Click “Add Shelter” to create the first one.
                </td>
              </tr>
            ) : (
              shelters.map((shelter) => (
                <tr key={shelter.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">
                    {shelter.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                    {shelter.address}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {shelter.capacity?.trim() ? (
                      shelter.capacity
                    ) : (
                      <span className="text-gray-400 italic">Not set</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {shelter.images?.length || 0} Photos
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/shelters/${shelter.id}`}
                        target="_blank"
                        title="Open on the public site"
                        className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square text-sm"></i>
                      </Link>

                      <button
                        type="button"
                        onClick={() => openEdit(shelter)}
                        title="Edit shelter"
                        className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition"
                      >
                        <i className="fa-solid fa-pen text-sm"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(shelter)}
                        title="Delete shelter"
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
              {editingId ? 'Edit Shelter' : 'Add New Shelter'}
            </h3>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Shelter Name
                </span>
                <input
                  required
                  type="text"
                  placeholder="e.g. Anbalayam Shelter"
                  className="w-full border p-3 rounded-lg"
                  value={formData.name}
                  onChange={update('name')}
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Shelter Type <span className="text-sm font-normal text-gray-400">(optional)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Elderly Home"
                    className="w-full border p-3 rounded-lg"
                    value={formData.tag}
                    onChange={update('tag')}
                  />
                </label>
                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Capacity <span className="text-sm font-normal text-gray-400">(optional)</span>
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. 45 Residents"
                    className="w-full border p-3 rounded-lg"
                    value={formData.capacity}
                    onChange={update('capacity')}
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Address
                </span>
                <input
                  required
                  type="text"
                  placeholder="e.g. 12, Gandhipuram, Coimbatore 641012"
                  className="w-full border p-3 rounded-lg"
                  value={formData.address}
                  onChange={update('address')}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Google Maps URL
                </span>
                <input
                  required
                  type="url"
                  placeholder="https://maps.app.goo.gl/…"
                  className="w-full border p-3 rounded-lg"
                  value={formData.mapUrl}
                  onChange={update('mapUrl')}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Description{' '}
                  <span className="text-sm font-normal text-gray-400">
                    — shown on the shelter details page
                  </span>
                </span>
                <RichTextEditor
                  minHeight="12rem"
                  placeholder="Describe the shelter, who it serves, and what facilities it has…"
                  value={formData.description}
                  onChange={(doc) =>
                    setFormData((prev) => ({ ...prev, description: doc }))
                  }
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
                      ? 'Update Shelter'
                      : 'Save Shelter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this shelter?"
          itemName={pendingDelete.name}
          message="It will disappear from the public site immediately. Uploaded photos stay in Cloudinary and are not removed."
          isBusy={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}
