import { Users, BookOpen, Award, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Total Students', value: '124', icon: Users, color: 'bg-blue-50 text-blue-600', change: '+12 this month' },
  { label: 'Active Courses', value: '12', icon: BookOpen, color: 'bg-orange-50 text-orange-600', change: '12 published' },
  { label: 'Certificates Issued', value: '38', icon: Award, color: 'bg-green-50 text-green-600', change: '+5 this week' },
  { label: 'Avg. Progress', value: '64%', icon: TrendingUp, color: 'bg-purple-50 text-purple-600', change: 'Across all courses' },
];

const recentActivity = [
  { text: 'Jane Doe completed Fashion Design', time: '2 hours ago', type: 'cert' },
  { text: 'New complaint from Mary P.', time: '4 hours ago', type: 'complaint' },
  { text: 'Kevin O. uploaded resources to ICT', time: '1 day ago', type: 'upload' },
  { text: 'Esther K. enrolled in Beadwork', time: '2 days ago', type: 'enroll' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto pb-12 space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)]">Platform Analytics</h1>
        <p className="text-gray-600 mt-1">Overview of Her Lab Academy activity.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-display font-bold text-[var(--color-text-dark)] mb-1">{s.value}</div>
            <div className="text-sm font-medium text-gray-700">{s.label}</div>
            <div className="text-xs text-gray-500 mt-1">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${a.type === 'cert' ? 'bg-green-500' : a.type === 'complaint' ? 'bg-red-400' : 'bg-blue-400'}`} />
                <div>
                  <p className="text-sm text-gray-800">{a.text}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="font-bold text-gray-900 mb-5">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { label: 'Manage Courses', href: '/admin/courses', icon: BookOpen },
              { label: 'Manage Users', href: '/admin/users', icon: Users },
              { label: 'Issue Certificates', href: '/admin/certificates', icon: Award },
              { label: 'View Complaints', href: '/admin/complaints', icon: AlertCircle },
              { label: 'Post Notice', href: '/admin/notices', icon: CheckCircle2 },
            ].map(link => (
              <Link key={link.href} href={link.href} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-100 hover:border-[var(--color-primary)] hover:bg-[var(--color-accent)] transition-colors group">
                <link.icon className="w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary)]" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-[var(--color-primary)]">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
