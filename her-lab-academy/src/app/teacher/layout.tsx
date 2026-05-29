import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Passing mock user for now to show the dashboard view */}
      <Navbar user={{ id: '1', email: 'teacher@example.com', user_metadata: { full_name: 'Sarah K.' } }} role="teacher" />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar role="teacher" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
