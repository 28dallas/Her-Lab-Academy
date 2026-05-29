import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Passing mock user for now to show the dashboard view */}
      <Navbar user={{ id: '1', email: 'student@example.com', user_metadata: { full_name: 'Jane Doe' } }} role="student" />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar role="student" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
