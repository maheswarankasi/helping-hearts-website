"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <-- Itha puthusa add pannirukkom
import AdminSidebar from './AdminSidebar';
import { useAdminAuth } from './admin/AdminAuthGate';
import { useUnreadInquiries } from '@/hooks/useUnreadInquiries';

export default function AdminDashboardLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Current URL-a edukkum
  const { user } = useAdminAuth();
  const { unreadCount } = useUnreadInquiries();

  // First two letters of the account name, so the badge matches whoever
  // is actually signed in instead of a hard-coded "AD".
  const initials = (user?.email?.slice(0, 2) ?? "ad").toUpperCase();

  // URL-a vachu Title-a kandupudikkum function
  const getPageTitle = () => {
    if (pathname === '/admin') return 'Admin Dashboard';
    // 'startsWith' use panrathala '/admin/events/new' nu ponalum title theliva varum
    if (pathname.startsWith('/admin/events')) return 'Events';
    if (pathname.startsWith('/admin/shelters')) return 'Shelters';
    if (pathname.startsWith('/admin/volunteers')) return 'Volunteers';
    if (pathname.startsWith('/admin/donors')) return 'Donors';
    if (pathname.startsWith('/admin/inquiries')) return 'Messages';
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
            
            {/* Hamburger Button with unread indicator for mobile */}
            <div className="relative md:hidden">
              <button 
                className="text-gray-600 hover:text-blue-600 focus:outline-none text-2xl p-1"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open Admin Menu"
              >
                <i className="fa-solid fa-bars"></i>
              </button>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-pulse">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </div>
            
            {/* Dynamic Page Title Inga varum */}
            <h1 className="text-xl font-semibold text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
             {/* Messages Quick Access with Badge (Mobile & Desktop Header) */}
             <Link
               href="/admin/inquiries"
               className={`relative p-2.5 rounded-xl transition flex items-center justify-center border ${
                 pathname.startsWith('/admin/inquiries')
                   ? 'bg-blue-50 text-blue-600 border-blue-200 shadow-xs'
                   : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100 border-transparent'
               }`}
               title={`Messages ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
               aria-label="Messages"
             >
               <i className="fa-solid fa-message text-lg"></i>
               {unreadCount > 0 && (
                 <span
                   className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-red-600 text-[11px] font-bold text-white shadow-md ring-2 ring-white animate-pulse"
                 >
                   {unreadCount > 99 ? '99+' : unreadCount}
                 </span>
               )}
             </Link>

             <div
                className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold border border-blue-200"
                title={user?.email ?? undefined}
             >
                {initials}
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