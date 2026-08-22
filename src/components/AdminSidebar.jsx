"use client"; 

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ closeSidebar }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'fa-chart-line' },
    { name: 'Manage Events', href: '/admin/events', icon: 'fa-calendar-days' },
    { name: 'Manage Shelters', href: '/admin/shelters', icon: 'fa-house-chimney-user' },
    { name: 'Volunteers', href: '/admin/volunteers', icon: 'fa-hand-holding-heart' },
    { name: 'Donors', href: '/admin/donors', icon: 'fa-hand-holding-dollar' },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl h-full font-dm">
      <div className="p-6 border-b border-gray-800 flex justify-between md:justify-center items-center">
        {/* <h2 className="text-2xl font-bold tracking-wider text-center w-full">NGO ADMIN</h2> */}
        {/* <img src="./helping-hearts.jpeg" alt="helping hearts logo" /> */}
        <Image src='/helping-hearts.jpeg' alt='helping hearts logo' width={100} height={100} className='rounded-md' />
        {/* Mobile Close Button */}
        <button className="md:hidden text-gray-400 hover:text-white text-2xl" onClick={closeSidebar}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === '/admin' 
            ? pathname === '/admin' 
            : pathname.startsWith(item.href);

          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={closeSidebar} // Mobile-la click pannathum menu close aagum
              className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-6 text-lg`}></i> 
              <span className="ml-2 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-gray-800 text-gray-400 hover:text-white hover:bg-red-600 px-4 py-3 rounded-lg transition flex items-center justify-center gap-2">
          <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </div>
    </aside>
  );
}