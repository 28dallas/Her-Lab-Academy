'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Bell, Award, MessageSquare, 
  AlertCircle, Star, User, HelpCircle, 
  ChevronRight, Megaphone
} from 'lucide-react';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [starredIds, setStarredIds] = useState<string[]>(['1']);

  const toggleStar = (id: string) => {
    setStarredIds(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  // Quick Access Icons
  const quickAccess = [
    { icon: BookOpen, label: 'My Courses', href: '#courses', color: 'bg-blue-100 text-blue-600' },
    { icon: Bell, label: 'Notices', href: '#notices', color: 'bg-orange-100 text-orange-600' },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates', color: 'bg-yellow-100 text-yellow-600' },
    { icon: MessageSquare, label: 'Forums', href: '#courses', color: 'bg-purple-100 text-purple-600' },
    { icon: AlertCircle, label: 'Complaints', href: '/dashboard/complaints', color: 'bg-red-100 text-red-600' },
    { icon: Star, label: 'Evaluations', href: '#courses', color: 'bg-green-100 text-green-600' },
    { icon: User, label: 'Profile', href: '/dashboard/profile', color: 'bg-indigo-100 text-indigo-600' },
    { icon: HelpCircle, label: 'Help', href: '/dashboard/help', color: 'bg-gray-100 text-gray-600' },
  ];

  // Mock Notices
  const notices = [
    { id: '1', title: 'Graduation Ceremony Date', date: 'Oct 15, 2026', content: 'The graduation ceremony for the upcoming cohort will be held on December 1st.' },
    { id: '2', title: 'New Course Added', date: 'Oct 10, 2026', content: 'We have just added a new short course on Digital Marketing. Check with your admin for enrollment.' },
  ];

  // Mock Enrolled Courses
  const myCourses = [
    { id: '1', title: 'Electrical Installation', icon: '⚡', progress: 35, status: 'In Progress', color: 'bg-yellow-50 text-yellow-600' },
    { id: '5', title: 'Fashion Design', icon: '🧵', progress: 100, status: 'Completed', color: 'bg-purple-50 text-purple-600' },
    { id: '9', title: 'ICT', icon: '💻', progress: 60, status: 'In Progress', color: 'bg-blue-50 text-blue-600' },
  ];

  const filteredCourses = myCourses.filter(c => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Starred') return starredIds.includes(c.id);
    return c.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-12">
      
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] mb-2">Welcome back, Jane!</h1>
        <p className="text-gray-600">What would you like to learn today?</p>
      </div>

      {/* Quick Access Grid (Mobile-friendly) */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h2>
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {quickAccess.map((item, idx) => (
            <Link 
              key={idx} 
              href={item.href}
              className="flex flex-col items-center justify-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Courses */}
        <div className="lg:col-span-2 space-y-6" id="courses">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
              {['All', 'In Progress', 'Completed', 'Starred'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filteredCourses.map(course => (
              <div key={course.id} className="relative">
                <button
                  onClick={() => toggleStar(course.id)}
                  className={`absolute top-3 right-3 z-10 p-1.5 rounded-full transition-colors ${
                    starredIds.includes(course.id) ? 'text-yellow-500 bg-yellow-50' : 'text-gray-300 hover:text-yellow-400 bg-white/80'
                  }`}
                  aria-label="Star course"
                >
                  <Star className="w-4 h-4" fill={starredIds.includes(course.id) ? 'currentColor' : 'none'} />
                </button>
                <Link
                  href={`/dashboard/course/${course.id}`}
                  className="block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-[var(--color-primary)] transition-all group"
                >
                  <div className={`h-32 flex items-center justify-center text-5xl ${course.color} group-hover:scale-105 transition-transform origin-bottom`}>
                    {course.icon}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${course.status === 'Completed' ? 'text-green-600' : 'text-[var(--color-primary)]'}`}>
                        {course.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                      {course.title}
                    </h3>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500 font-medium">Progress</span>
                        <span className="text-gray-900 font-bold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${course.status === 'Completed' ? 'bg-green-500' : 'bg-[var(--color-primary)]'}`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="col-span-full py-12 text-center bg-white border border-gray-200 rounded-xl border-dashed">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-gray-900 font-medium">No courses found</h3>
                <p className="text-gray-500 text-sm mt-1">You don't have any courses matching this filter.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Notice Board */}
        <div className="space-y-6" id="notices">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-[var(--color-primary)]" /> Notice Board
          </h2>
          
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {notices.map(notice => (
                <div key={notice.id} className="p-5 hover:bg-gray-50 transition-colors">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">{notice.date}</span>
                  <h4 className="font-bold text-gray-900 mt-1 mb-2">{notice.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{notice.content}</p>
                  <button className="text-[var(--color-primary)] text-sm font-medium mt-3 flex items-center hover:underline">
                    Read more <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
