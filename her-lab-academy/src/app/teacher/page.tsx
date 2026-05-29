import Link from 'next/link';
import { BookOpen, Users, TrendingUp, ChevronRight } from 'lucide-react';

const myCourses = [
  { id: '1', title: 'Electrical Installation', icon: '⚡', students: 12, avgProgress: 48, color: 'bg-yellow-50 text-yellow-600' },
  { id: '9', title: 'ICT', icon: '💻', students: 14, avgProgress: 62, color: 'bg-blue-50 text-blue-600' },
];

export default function TeacherDashboard() {
  const totalStudents = myCourses.reduce((s, c) => s + c.students, 0);
  const avgProgress = Math.round(myCourses.reduce((s, c) => s + c.avgProgress, 0) / myCourses.length);

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-10">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)]">Teacher Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, Sarah K.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: 'My Courses', value: myCourses.length, icon: BookOpen, color: 'bg-orange-50 text-orange-600' },
          { label: 'Total Students', value: totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Avg. Progress', value: `${avgProgress}%`, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
              <s.icon className="w-6 h-6" />
            </div>
            <div className="text-3xl font-display font-bold text-[var(--color-text-dark)]">{s.value}</div>
            <div className="text-sm text-gray-600 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">My Courses</h2>
        <div className="space-y-4">
          {myCourses.map(course => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${course.color}`}>
                    {course.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.students} students · {course.avgProgress}% avg progress</p>
                  </div>
                </div>
                <Link href={`/teacher/course/${course.id}`} className="flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] hover:underline">
                  Manage <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-[var(--color-primary)]" style={{ width: `${course.avgProgress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
