'use client';

import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, User } from 'lucide-react';

const COURSES = [
  { id: '1', title: 'Electrical Installation', icon: '⚡', category: 'Trades', teacher: 'James O.', students: 12, published: true },
  { id: '2', title: 'Solar PV Installation', icon: '☀️', category: 'Trades', teacher: 'Peter N.', students: 8, published: true },
  { id: '3', title: 'Plumbing', icon: '🔧', category: 'Trades', teacher: 'John D.', students: 10, published: true },
  { id: '4', title: 'Cosmetology', icon: '✂️', category: 'Vocational', teacher: 'Jane M.', students: 15, published: true },
  { id: '5', title: 'Fashion Design', icon: '🧵', category: 'Vocational', teacher: 'Grace W.', students: 18, published: true },
  { id: '6', title: 'Regenerative Agriculture', icon: '🌍', category: 'Agriculture', teacher: 'Sarah K.', students: 9, published: true },
  { id: '7', title: 'Core Agriculture', icon: '🌱', category: 'Agriculture', teacher: 'Mary W.', students: 11, published: true },
  { id: '8', title: 'Reproductive Health', icon: '🩺', category: 'Health', teacher: 'Dr. Aisha M.', students: 20, published: true },
  { id: '9', title: 'ICT', icon: '💻', category: 'Technology', teacher: 'Kevin O.', students: 14, published: true },
  { id: '10', title: 'Basic Digital Literacy', icon: '📱', category: 'Technology', teacher: 'Kevin O.', students: 22, published: true },
  { id: '11', title: 'Entrepreneurship', icon: '💼', category: 'Business', teacher: 'Ruth N.', students: 16, published: true },
  { id: '12', title: 'Beadwork', icon: '📿', category: 'Vocational', teacher: 'Esther K.', students: 13, published: false },
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(COURSES);

  const togglePublish = (id: string) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, published: !c.published } : c));
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-[var(--color-primary)]" /> Manage Courses
        </h1>
        <p className="text-gray-600 mt-2">Publish, unpublish, and assign teachers to courses.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500">{courses.filter(c => c.published).length} published · {courses.filter(c => !c.published).length} unpublished</p>
        </div>
        <div className="divide-y divide-gray-100">
          {courses.map(course => (
            <div key={course.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{course.icon}</span>
                <div>
                  <p className="font-semibold text-gray-900">{course.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-gray-500">{course.category}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1"><User className="w-3 h-3" /> {course.teacher}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-500">{course.students} students</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${course.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {course.published ? 'Published' : 'Draft'}
                </span>
                <button
                  onClick={() => togglePublish(course.id)}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  {course.published ? <><EyeOff className="w-4 h-4" /> Unpublish</> : <><Eye className="w-4 h-4" /> Publish</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
