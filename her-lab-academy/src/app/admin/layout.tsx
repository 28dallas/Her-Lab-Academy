import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar user={{ id: '0', email: 'admin@herlab.org', user_metadata: { full_name: 'Admin' } }} role="admin" />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar role="admin" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
