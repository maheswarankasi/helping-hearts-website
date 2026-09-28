import AdminAuthGate from "@/components/admin/AdminAuthGate";
import AdminDashboardLayout from "@/components/AdminDashboardLayout";
export const metadata = {
  title: "Admin Dashboard | Helping Hearts",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return (
    <AdminAuthGate>
      <AdminDashboardLayout>{children}</AdminDashboardLayout>
    </AdminAuthGate>
  );
}
