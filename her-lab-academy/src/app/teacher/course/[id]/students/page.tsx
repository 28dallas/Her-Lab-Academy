import { Users } from 'lucide-react';
import { AvatarFallback } from '@/components/ui/AvatarFallback';

const students = [
  { id: '1', name: 'Jane Doe', progress: 35, lastActive: 'Oct 14, 2026', status: 'In Progress' },
  { id: '2', name: 'Mary P.', progress: 100, lastActive: 'Oct 12, 2026', status: 'Completed' },
  { id: '3', name: 'Esther K.', progress: 60, lastActive: 'Oct 13, 2026', status: 'In Progress' },
  { id: '4', name: 'Ruth N.', progress: 10, lastActive: 'Oct 5, 2026', status: 'In Progress' },
];

export default function TeacherStudentsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <Users className="w-7 h-7 text-[var(--color-primary)]" /> Student Progress
        </h1>
        <p className="text-gray-600 mt-1">{students.length} enrolled students</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Student</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Progress</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden sm:table-cell">Last Active</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <AvatarFallback name={s.name} size="sm" />
                    <span className="font-medium text-gray-900">{s.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${s.progress === 100 ? 'bg-green-500' : 'bg-[var(--color-primary)]'}`}
                        style={{ width: `${s.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{s.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{s.lastActive}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
