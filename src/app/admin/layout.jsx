import AdminDashboardLayout from "@/components/AdminDashboardLayout";
export const metadata = {
  title: "Admin Dashboard | Helping Hearts",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminDashboardLayout>{children}</AdminDashboardLayout>;
}
