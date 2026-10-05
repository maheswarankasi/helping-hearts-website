"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { toInquiry } from '@/lib/inquiries';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import ExportButton from '@/components/admin/ExportButton';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null); // Modal-la full message kaata

  // Firebase-la irunthu real-time aaga data edukkum function
  useEffect(() => {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(messagesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching inquiries: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Message-a "Read" (Padithachu) nu maathurathu
  const markAsRead = async (id, currentStatus) => {
    if (currentStatus) return; // Already read aagi iruntha onnum panna thevayilla
    try {
      await updateDoc(doc(db, "inquiries", id), { read: true });
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  // Message-a delete panrathu
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteDoc(doc(db, "inquiries", id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      } catch (error) {
        console.error("Error deleting message: ", error);
      }
    }
  };

  // Date format panra chinna function
  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Export wants a Date for `createdAt`, not the raw Firestore Timestamp
  // these live rows carry — toInquiry() is the same normaliser the admin
  // dashboard's own Messages count already relies on.
  const exportRows = inquiries.map((inq) => toInquiry(inq.id, inq));

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-brand-blue">Contact Inquiries</h1>
          <p className="text-gray-500 mt-1">Manage messages received from the website contact form.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="bg-blue-50 text-brand-blue px-4 py-2 rounded-lg font-bold">
            Total: {inquiries.length}
          </div>
          <ExportButton sheet="inquiries" rows={exportRows} disabled={loading} />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <i className="fa-solid fa-spinner fa-spin text-4xl text-brand-blue"></i>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl text-gray-400">
            <i className="fa-regular fa-envelope-open"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-700">No Inquiries Yet</h3>
          <p className="text-gray-500 mt-2">When someone contacts you via the website, it will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-4 font-semibold text-gray-600 text-sm">Status</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Date</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Name</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Subject</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm">Contact Info</th>
                  <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className={`hover:bg-gray-50 transition-colors ${!inq.read ? 'bg-blue-50/30' : ''}`}>
                    <td className="p-4">
                      {!inq.read ? (
                        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> New
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Read
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                      {formatDate(inq.createdAt)}
                    </td>
                    <td className="p-4 font-medium text-gray-900">
                      {inq.name}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      {inq.subject}
                    </td>
                    <td className="p-4 text-sm text-gray-500">
                      <div>{inq.phone}</div>
                      <div className="text-xs text-gray-400">{inq.email || '-'}</div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedMessage(inq);
                            markAsRead(inq.id, inq.read);
                          }}
                          className="p-2 text-brand-blue hover:bg-blue-50 rounded-lg transition"
                          title="View Message"
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button 
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message View Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-900">Message Details</h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-gray-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">From</p>
                  <p className="font-medium text-gray-900">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Date Received</p>
                  <p className="font-medium text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Phone</p>
                  <a href={`tel:${selectedMessage.phone}`} className="font-medium text-brand-blue hover:underline">
                    {selectedMessage.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email</p>
                  {selectedMessage.email ? (
                    <a href={`mailto:${selectedMessage.email}`} className="font-medium text-brand-blue hover:underline">
                      {selectedMessage.email}
                    </a>
                  ) : (
                    <p className="text-gray-500">Not provided</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Subject: {selectedMessage.subject}</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <a
                href={`tel:+91${String(selectedMessage.phone ?? '').replace(/\D/g, '').slice(-10)}`}
                className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition flex items-center gap-2"
              >
                <i className="fa-solid fa-phone"></i> Make a Call:{' '}
                <span className="font-bold">
                  +91 {String(selectedMessage.phone ?? '').replace(/\D/g, '').slice(-10)}
                </span>
              </a>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}