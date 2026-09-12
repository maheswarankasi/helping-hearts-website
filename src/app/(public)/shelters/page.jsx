"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function PublicSheltersPage() {
  const [shelters, setShelters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "shelters"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setShelters(data);
      } catch (error) {
        console.error("Error fetching public shelters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShelters();
  }, []);

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Shelters</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the safe havens we operate. Each shelter is designed to provide care, comfort, and a loving environment.</p>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500 text-xl"><i className="fa-solid fa-spinner fa-spin mr-2"></i> Loading shelters...</div>
        ) : shelters.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">No shelters available currently.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shelters.map((shelter) => (
              <div key={shelter.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                {/* Image Section - Displays first uploaded image */}
                <div className="h-64 bg-gray-200 relative">
                  {shelter.images && shelter.images.length > 0 ? (
                    <img src={shelter.images[0]} alt={shelter.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{shelter.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{shelter.description}</p>
                  
                  <div className="flex items-start text-gray-500 text-sm mb-6">
                    <i className="fa-solid fa-location-dot mt-1 mr-2 text-red-500"></i>
                    <span>{shelter.address}</span>
                  </div>
                  
                  <a 
                    href={shelter.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    <i className="fa-solid fa-map mr-2"></i> View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}