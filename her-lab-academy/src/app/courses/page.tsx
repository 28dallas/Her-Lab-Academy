'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Search, LayoutGrid, List as ListIcon } from 'lucide-react';

export default function CoursesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Trades', 'Vocational', 'Agriculture', 'Technology', 'Health', 'Business'];

  const allCourses = [
    { id: '1',  title: 'Electrical Installation',   category: 'Trades',       icon: '⚡',  duration: '10 weeks', color: 'bg-yellow-50 text-yellow-600' },
    { id: '2',  title: 'Solar PV Installation',      category: 'Trades',       icon: '☀️',  duration: '10 weeks', color: 'bg-orange-50 text-orange-500' },
    { id: '3',  title: 'Plumbing',                   category: 'Trades',       icon: '🔧',  duration: '10 weeks', color: 'bg-slate-50 text-slate-600'   },
    { id: '4',  title: 'Cosmetology',                category: 'Vocational',   icon: '✂️',  duration: '8 weeks',  color: 'bg-pink-50 text-pink-600'     },
    { id: '5',  title: 'Fashion Design',             category: 'Vocational',   icon: '🧵',  duration: '16 weeks', color: 'bg-purple-50 text-purple-600' },
    { id: '6',  title: 'Regenerative Agriculture',   category: 'Agriculture',  icon: '🌍',  duration: '12 weeks', color: 'bg-green-50 text-green-600'   },
    { id: '7',  title: 'Core Agriculture',           category: 'Agriculture',  icon: '🌱',  duration: '12 weeks', color: 'bg-lime-50 text-lime-600'     },
    { id: '8',  title: 'Reproductive Health',        category: 'Health',       icon: '🩺',  duration: '6 weeks',  color: 'bg-red-50 text-red-500'       },
    { id: '9',  title: 'ICT',                        category: 'Technology',   icon: '💻',  duration: '10 weeks', color: 'bg-blue-50 text-blue-600'     },
    { id: '10', title: 'Basic Digital Literacy',     category: 'Technology',   icon: '📱',  duration: '6 weeks',  color: 'bg-cyan-50 text-cyan-600'     },
    { id: '11', title: 'Entrepreneurship',           category: 'Business',     icon: '💼',  duration: '8 weeks',  color: 'bg-amber-50 text-amber-600'   },
    { id: '12', title: 'Beadwork',                   category: 'Vocational',   icon: '📿',  duration: '8 weeks',  color: 'bg-rose-50 text-rose-500'     },
    { id: '13', title: 'Soap Making',                category: 'Vocational',   icon: '🧼',  duration: '4 weeks',  color: 'bg-teal-50 text-teal-600'     },
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'All' || course.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold text-[var(--color-text-dark)] mb-4">Our Programs</h1>
          <p className="text-lg text-gray-600 max-w-2xl">Browse our comprehensive list of vocational and technical training courses designed to equip you with practical, job-ready skills.</p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent sm:text-sm transition-colors"
              placeholder="Search programs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
            <div className="flex items-center space-x-1 bg-gray-200/50 p-1 rounded-lg overflow-x-auto w-full sm:w-auto hide-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-[var(--color-text-dark)] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center space-x-1 border border-gray-200 rounded-lg p-1 bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded text-gray-500 hover:text-gray-900 transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : ''}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded text-gray-500 hover:text-gray-900 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : ''}`}
                aria-label="List view"
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> programs
          </p>
        </div>

        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No programs found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
              className="mt-4 text-[var(--color-primary)] font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              : "flex flex-col space-y-4"
          }>
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[var(--color-primary)] hover:shadow-md transition-all ${
                  viewMode === 'list' ? 'flex flex-row items-center h-32' : 'flex flex-col'
                }`}
              >
                <div className={`${
                  viewMode === 'list' ? 'w-32 h-full' : 'h-36 w-full'
                } flex-shrink-0 flex items-center justify-center text-5xl ${course.color} transition-transform group-hover:scale-105 duration-300`}>
                  {course.icon}
                </div>
                <div className={`p-5 flex flex-col justify-between ${viewMode === 'list' ? 'flex-grow' : ''}`}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{course.category}</span>
                    <h3 className="mt-1 text-lg font-bold text-[var(--color-text-dark)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">{course.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
