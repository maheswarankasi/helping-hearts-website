"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export default function AdminSheltersPage() {
  const [shelters, setShelters] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', address: '', mapUrl: '', description: '' });
  const [images, setImages] = useState([]);

  const fetchShelters = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "shelters"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setShelters(data);
    } catch (error) {
      console.error("Error fetching shelters:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchShelters(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrls = [];

      // Promise.all-ku bathila 'for...of' loop use panrom (One by one upload)
      for (const file of images) {
        const cloudData = new FormData();
        cloudData.append('file', file);
        cloudData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        cloudData.append('folder', `HelpingHearts/Shelters/${formData.name.replace(/\s+/g, '_')}`);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: cloudData,
        });

        if (!res.ok) {
          throw new Error(`Cloudinary upload failed for ${file.name}`);
        }

        const result = await res.json();
        imageUrls.push(result.secure_url); // Upload aana URL-a array-la add panrom
      }

      // Upload mudinja piragu Firebase-la save panrom
      await addDoc(collection(db, "shelters"), {
        ...formData,
        images: imageUrls,
        createdAt: serverTimestamp(),
      });

      setFormData({ name: '', address: '', mapUrl: '', description: '' });
      setImages([]);
      setIsModalOpen(false);
      fetchShelters();
      alert("Shelter added successfully!");
      
    } catch (error) {
      console.error("Upload Error: ", error);
      alert("Failed to add shelter. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Shelters</h2>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          <i className="fa-solid fa-plus mr-2"></i> Add Shelter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase">
              <th className="px-6 py-4 font-medium">Shelter Name</th>
              <th className="px-6 py-4 font-medium">Address</th>
              <th className="px-6 py-4 font-medium">Photos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan="3" className="text-center py-8">Loading...</td></tr>
            ) : shelters.map((shelter) => (
              <tr key={shelter.id}>
                <td className="px-6 py-4 font-semibold">{shelter.name}</td>
                <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{shelter.address}</td>
                <td className="px-6 py-4">{shelter.images?.length || 0} Photos</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
            <h3 className="text-2xl font-bold mb-4">Add New Shelter</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required type="text" placeholder="Shelter Name" className="w-full border p-3 rounded-lg"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              
              <input required type="text" placeholder="Address" className="w-full border p-3 rounded-lg"
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              
              <input required type="url" placeholder="Google Maps URL" className="w-full border p-3 rounded-lg"
                value={formData.mapUrl} onChange={e => setFormData({...formData, mapUrl: e.target.value})} />
              
              <textarea required rows="4" placeholder="Description" className="w-full border p-3 rounded-lg"
                value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              
              <input required type="file" multiple accept="image/*" className="w-full border p-2 rounded-lg"
                onChange={e => setImages(Array.from(e.target.files))} />
              
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-70">
                  {isSubmitting ? 'Uploading...' : 'Save Shelter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}