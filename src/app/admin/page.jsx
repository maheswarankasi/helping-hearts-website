export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Welcome Back!</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Total Shelters</p>
            <p className="text-4xl font-bold text-brand-blue mt-2">5</p>
          </div>
          <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-brand-blue text-2xl">
            <i className="fa-solid fa-house"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Total Events</p>
            <p className="text-4xl font-bold text-brand-red mt-2">12</p>
          </div>
          <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-brand-red text-2xl">
            <i className="fa-solid fa-calendar-check"></i>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">Volunteer Requests</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">8</p>
          </div>
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 text-2xl">
            <i className="fa-solid fa-users"></i>
          </div>
        </div>

      </div>
    </div>
  );
}