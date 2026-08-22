import AdminDashboardLayout from "@/components/AdminDashboardLayout";
export const metadata = {
  title: "Admin Dashboard | Helping Hearts",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    // Inga 'font-sans' ku badhila 'font-dm' nu maathi irukkom
    <AdminDashboardLayout>{children}</AdminDashboardLayout>
  );
}
