"use client";

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';

export default function AdminDashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-dm overflow-hidden relative">
      
      {/* Mobile Overlay (Black tint). Itha click panna menu close aagum */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Container with Responsive Animation */}
      <div className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar closeSidebar={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        
        {/* Top Header with Hamburger Icon */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-8 py-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            
            {/* Hamburger Button (Shows only on Mobile) */}
            <button 
              className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none text-2xl"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            
            <h1 className="text-xl font-semibold text-gray-700 hidden md:block">Overview</h1>
          </div>

          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
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