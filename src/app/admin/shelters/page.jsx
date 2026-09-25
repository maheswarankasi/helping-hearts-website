"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toDate } from '@/lib/firestoreUtils';
import { uploadImages, toFolderName } from '@/lib/cloudinary';

const EMPTY_FORM = {
  name: '',
  tag: '',
  address: '',
  mapUrl: '',
  capacity: '',
  description: '',
};

export default function AdminSheltersPage() {
  const [shelters, setShelters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(EMPTY_FORM);
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
            `HelpingHearts/Shelters/${toFolderName(formData.name)}`,
            (done, total) => setProgress(`Uploading image ${done} of ${total}...`)
          );
        } catch (uploadErr) {
          console.warn('Image upload fallback (Cloudinary unconfigured):', uploadErr);
          imageUrls = images.map((f) => URL.createObjectURL(f));
        }
      }

      setProgress('Saving shelter...');

      await addDoc(collection(db, 'shelters'), {
        name: formData.name.trim(),
        tag: formData.tag.trim(),
        address: formData.address.trim(),
        mapUrl: formData.mapUrl.trim(),
        capacity: formData.capacity.trim(),
        description: formData.description.trim(),
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      setFormData(EMPTY_FORM);
      setImages([]);
      setIsModalOpen(false);
      await refresh();
    } catch (err) {
      console.error('Save shelter failed:', err);
      setError(err.message || 'Failed to add shelter.');
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
        <h2 className="text-2xl font-bold text-gray-800">Manage Shelters</h2>
        <button
          onClick={() => {
            setError(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add Shelter
        </button>
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
              <th className="px-6 py-4 font-medium">View</th>
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
                <tr key={shelter.id}>
                  <td className="px-6 py-4 font-semibold">{shelter.name}</td>
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
                    <Link
                      href={`/shelters/${shelter.id}`}
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
            <h3 className="text-2xl font-bold mb-4">Add New Shelter</h3>

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
                placeholder="Shelter Name"
                className="w-full border p-3 rounded-lg"
                value={formData.name}
                onChange={update('name')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm text-gray-600 mb-1 block">
                    Shelter Type <span className="text-gray-400">(optional)</span>
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
                  <span className="text-sm text-gray-600 mb-1 block">
                    Capacity <span className="text-gray-400">(optional)</span>
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

              <input
                required
                type="text"
                placeholder="Address"
                className="w-full border p-3 rounded-lg"
                value={formData.address}
                onChange={update('address')}
              />

              <input
                required
                type="url"
                placeholder="Google Maps URL"
                className="w-full border p-3 rounded-lg"
                value={formData.mapUrl}
                onChange={update('mapUrl')}
              />

              <textarea
                required
                rows="4"
                placeholder="Description"
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
                  {isSubmitting ? 'Saving...' : 'Save Shelter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
