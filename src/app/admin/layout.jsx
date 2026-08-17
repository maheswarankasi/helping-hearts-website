// Google bot-a block panra Metadata!
export const metadata = {
  title: 'Admin Dashboard | Helping Hearts',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* Left Sidebar (Dark & Minimalist) */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold tracking-wider">NGO ADMIN</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <a href="/admin" className="block px-4 py-3 bg-gray-800 text-white rounded-lg transition">
            <i className="fa-solid fa-chart-line mr-3"></i> Dashboard
          </a>
          <a href="/admin/events" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i className="fa-solid fa-calendar-days mr-3"></i> Manage Events
          </a>
          <a href="/admin/shelters" className="block px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition">
            <i className="fa-solid fa-house-chimney-user mr-3"></i> Manage Shelters
          </a>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">Overview</h1>
          <button className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full font-medium transition duration-300">
            Logout
          </button>
        </header>

        {/* Dashboard Pages Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}