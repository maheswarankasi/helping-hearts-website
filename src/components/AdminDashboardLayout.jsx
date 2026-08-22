"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // <-- Itha puthusa add pannirukkom
import AdminSidebar from './AdminSidebar';

export default function AdminDashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Current URL-a edukkum

  // URL-a vachu Title-a kandupudikkum function
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Admin Dashboard';
    // 'startsWith' use panrathala '/admin/events/new' nu ponalum title theliva varum
    if (pathname.startsWith('/admin/events')) return 'Events';
    if (pathname.startsWith('/admin/shelters')) return 'Shelters';
    if (pathname.startsWith('/admin/volunteers')) return 'Volunteers';
    if (pathname.startsWith('/admin/donors')) return 'Donors';
    return 'Admin Dashboard'; // Default
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-dm overflow-hidden relative">
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar closeSidebar={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            
            {/* Hamburger Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none text-2xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            
            {/* Dynamic Page Title Inga varum */}
            <h1 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold border border-blue-200">
                AD
             </div>
          </div>
        </header>

        {/* Dynamic Pages Load Here */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}