import Link from 'next/link';

export default function AdminDashboard() {
  // Ithu ippo dummy data. Aprm Firebase-la irunthu real data vangikalam
  const stats = [
    { title: "Total Shelters", count: "5", icon: "fa-house-medical", color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Total Events", count: "12", icon: "fa-calendar-check", color: "text-red-600", bg: "bg-red-50" },
    { title: "New Volunteers", count: "48", icon: "fa-hand-holding-heart", color: "text-green-600", bg: "bg-green-50" },
    { title: "Total Donors", count: "156", icon: "fa-hand-holding-dollar", color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="font-dm text-3xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1 font-sans">Welcome to Helping Hearts Admin Panel.</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Link href="/admin/shelters/new" className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-plus text-sm"></i> Add Shelter
          </Link>
          <Link href="/admin/events/new" className="bg-brand-blue text-white hover:bg-blue-900 px-4 py-2 rounded-lg font-medium transition shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-plus text-sm"></i> Add Event
          </Link>
        </div>
      </div>
      
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.title}</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{stat.count}</p>
            </div>
            <div className={`w-14 h-14 ${stat.bg} rounded-full flex items-center justify-center ${stat.color} text-2xl`}>
              <i className={`fa-solid ${stat.icon}`}></i>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-800">Recent Volunteers</h3>
          <Link href="/admin/volunteers" className="text-sm text-brand-blue font-medium hover:underline">
            View All
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Date Registered</th>
                <th className="px-6 py-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {/* Dummy Row 1 */}
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">Arun Kumar</td>
                <td className="px-6 py-4">+91 98765 43210</td>
                <td className="px-6 py-4">RS Puram, Coimbatore</td>
                <td className="px-6 py-4">Today, 10:30 AM</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">New</span>
                </td>
              </tr>
              {/* Dummy Row 2 */}
              <tr className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">Priya Sharma</td>
                <td className="px-6 py-4">+91 99887 76655</td>
                <td className="px-6 py-4">Gandhipuram, Coimbatore</td>
                <td className="px-6 py-4">Yesterday</td>
                <td className="px-6 py-4 text-center">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">Reviewed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}