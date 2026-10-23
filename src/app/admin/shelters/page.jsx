"use client";

import { useEffect, useState, useMemo } from 'react';
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
import { getCategoryBadgeStyle, PROGRAMME_CATEGORIES } from '@/lib/shelterCategories';

const EMPTY_FORM = {
  name: '',
  category: 'long-term',
  address: '',
  mapUrl: '',
  capacity: '',
  description: EMPTY_DOC,
};

export default function AdminSheltersPage() {
  const [shelters, setShelters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState(EMPTY_FORM);
  const [existingImages, setExistingImages] = useState([]);
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
      category: shelter.category ?? 'long-term',
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

    if (!formData.name.trim()) {
      setError('Please enter a shelter name.');
      return;
    }

    if (!formData.category) {
      setError('Please select a shelter category.');
      return;
    }

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

      // Clean payload: shelterType / tag is completely omitted
      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        address: formData.address.trim(),
        mapUrl: formData.mapUrl.trim(),
        capacity: formData.capacity ? String(formData.capacity).trim() : '',
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
    if (!pendingDelete?.id) return;

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

  // Filter shelters by Category and Name
  const filteredShelters = useMemo(() => {
    return shelters.filter((shelter) => {
      if (selectedCategoryFilter !== 'all' && shelter.category !== selectedCategoryFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return shelter.name?.toLowerCase().includes(q);
      }
      return true;
    });
  }, [shelters, selectedCategoryFilter, searchQuery]);

  const exportRows = useMemo(() => {
    return filteredShelters.map((s) => ({
      ...s,
      categoryName:
        s.category === 'mid-term'
          ? 'Mid-Term'
          : s.category === 'livelihood'
          ? 'Livelihood'
          : 'Long-Term',
    }));
  }, [filteredShelters]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Manage Shelters</h2>
          <p className="text-sm text-gray-500 mt-1">
            Create, categorize, and update care homes across Long-Term, Mid-Term, and Livelihood programmes.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <ExportButton sheet="shelters" rows={exportRows} />
          <button
            onClick={openCreate}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm flex items-center cursor-pointer"
          >
            <i className="fa-solid fa-plus mr-2"></i> Add Shelter
          </button>
        </div>
      </div>

      {/* Category filter & Search toolbar */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Filter by Category:
          </span>
          <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-50 text-xs font-medium">
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                selectedCategoryFilter === 'all'
                  ? 'bg-white text-gray-900 shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All ({shelters.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('long-term')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                selectedCategoryFilter === 'long-term'
                  ? 'bg-blue-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Long-Term ({shelters.filter((s) => s.category === 'long-term').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('mid-term')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                selectedCategoryFilter === 'mid-term'
                  ? 'bg-amber-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mid-Term ({shelters.filter((s) => s.category === 'mid-term').length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('livelihood')}
              className={`px-3 py-1.5 rounded-md transition cursor-pointer ${
                selectedCategoryFilter === 'livelihood'
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Livelihood ({shelters.filter((s) => s.category === 'livelihood').length})
            </button>
          </div>
        </div>

        {/* Search Shelters by Name */}
        <div className="flex items-center gap-3 flex-1 sm:flex-initial min-w-[240px]">
          <div className="relative w-full">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shelters by name..."
              className="w-full pl-8 pr-8 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
          <span className="text-xs text-gray-400 whitespace-nowrap hidden lg:inline">
            Showing {filteredShelters.length} of {shelters.length}
          </span>
        </div>
      </div>

      {error && !isModalOpen && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
          <i className="fa-solid fa-circle-exclamation mr-2"></i>
          {error}
        </div>
      )}

      {/* Shelters table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Shelter Name</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Address</th>
              <th className="px-6 py-4 font-medium">Capacity</th>
              <th className="px-6 py-4 font-medium">Photos</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading shelters...
                </td>
              </tr>
            ) : filteredShelters.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  <div className="max-w-xs mx-auto text-center space-y-1.5">
                    <i className="fa-solid fa-house-chimney-crack text-2xl text-gray-300"></i>
                    <p className="font-medium text-gray-700">
                      {searchQuery
                        ? `No shelters match "${searchQuery}"`
                        : selectedCategoryFilter !== 'all'
                        ? `No shelters listed under ${selectedCategoryFilter} category yet`
                        : 'No shelters yet. Click “Add Shelter” to create the first one.'}
                    </p>
                    {searchQuery && (
                      <p className="text-xs text-gray-400">
                        Try searching with a different name or changing the category filter.
                      </p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredShelters.map((shelter) => {
                const badge = getCategoryBadgeStyle(shelter.category);
                return (
                  <tr key={shelter.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{shelter.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${badge.bg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                        {badge.label}
                      </span>
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
                          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-300 flex items-center justify-center transition cursor-pointer"
                        >
                          <i className="fa-solid fa-pen text-sm"></i>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(shelter)}
                          title="Delete shelter"
                          className="w-9 h-9 rounded-lg border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-300 flex items-center justify-center transition cursor-pointer"
                        >
                          <i className="fa-solid fa-trash text-sm"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingId ? 'Edit Shelter' : 'Add New Shelter'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm">
                <i className="fa-solid fa-circle-exclamation mr-2"></i>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Shelter Name <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="e.g. Anbalayam Shelter"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={update('name')}
                />
              </label>

              {/* Side-by-side: Capacity (Number) and Shelter Category (Dropdown) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Capacity <span className="text-sm font-normal text-gray-400">(Number of residents)</span>
                  </span>
                  <input
                    type="number"
                    min="0"
                    placeholder="e.g. 45"
                    className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={formData.capacity}
                    onChange={update('capacity')}
                  />
                </label>

                <label className="block">
                  <span className="text-base font-bold text-gray-800 mb-2 block">
                    Shelter Category <span className="text-red-500">*</span>
                  </span>
                  <select
                    required
                    className="w-full border p-3 rounded-lg bg-white font-medium text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.category}
                    onChange={update('category')}
                  >
                    <option value="long-term">
                      Long-Term
                    </option>
                    <option value="mid-term">
                      Mid-Term
                    </option>
                    <option value="livelihood">
                      Livelihood
                    </option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Address <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  type="text"
                  placeholder="e.g. 12, Gandhipuram, Coimbatore 641012"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.address}
                  onChange={update('address')}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Google Maps URL <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  type="url"
                  placeholder="https://maps.app.goo.gl/…"
                  className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.mapUrl}
                  onChange={update('mapUrl')}
                />
              </label>

              <label className="block">
                <span className="text-base font-bold text-gray-800 mb-2 block">
                  Description <span className="text-red-500">*</span>
                  <span className="text-sm font-normal text-gray-400 ml-2">
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

              {/* Photos */}
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
                  {editingId ? 'Add More Photos' : 'Shelter Photos'}{' '}
                  <span className="text-sm font-normal text-gray-400">
                    (JPG, PNG or WebP)
                  </span>
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages(Array.from(e.target.files || []))}
                  className="w-full border p-2 rounded-lg"
                />
              </label>

              {progress && (
                <div className="text-sm text-blue-600 font-medium">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {progress}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-medium disabled:opacity-50 flex items-center shadow-sm cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i> Saving...
                    </>
                  ) : editingId ? (
                    'Save Changes'
                  ) : (
                    'Create Shelter'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {pendingDelete && (
        <ConfirmDialog
          isOpen={Boolean(pendingDelete)}
          title="Delete Shelter?"
          itemName={pendingDelete.name}
          message="This will remove the shelter from the public site and cannot be undone."
          confirmLabel="Delete Shelter"
          isBusy={isDeleting}
          onConfirm={handleDelete}
          onCancel={() => setPendingDelete(null)}
        />
      )}
    </div>
  );
}