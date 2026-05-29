'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Award, ChevronDown, ChevronRight, FileText, Video, Bell, PlayCircle, CheckCircle2, FileImage, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function StudentCourseHome({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'Course' | 'Participants' | 'Grades'>('Course');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'm1': true,
  });

  const [courseState, setCourseState] = useState({
    title: 'Electrical Installation',
    category: 'Trades',
    teacher: 'James O.',
    progress: 0,
    announcements: [
      { id: '1', date: 'Oct 12', title: 'Welcome to the course!', content: 'Please review the syllabus before our first session.' }
    ],
    modules: [
      { 
        id: 'm1', 
        title: 'Electrical Safety & Tools', 
        description: 'Safety rules, PPE, and basic tools.', 
        resources: [
          { id: 'r1', type: 'pdf', title: 'Safety Handbook', viewed: false },
          { id: 'r2', type: 'video', title: 'PPE Introduction Video', viewed: false },
        ] 
      },
      { 
        id: 'm2', 
        title: 'Wiring & Circuit Basics', 
        description: 'Domestic wiring, circuits, and load calculations.', 
        resources: [
          { id: 'r3', type: 'doc', title: 'Circuit Diagrams Worksheet', viewed: false },
          { id: 'r4', type: 'video', title: 'Live Wiring Demo', viewed: false },
          { id: 'r5', type: 'text', title: 'Safety Checklist', viewed: false },
        ] 
      },
    ]
  });

  // Calculate progress on mount and whenever resources change
  useEffect(() => {
    let total = 0;
    let viewed = 0;
    
    courseState.modules.forEach(mod => {
      mod.resources.forEach(res => {
        total++;
        if (res.viewed) viewed++;
      });
    });

    const newProgress = total === 0 ? 0 : Math.round((viewed / total) * 100);
    
    if (newProgress !== courseState.progress) {
      setCourseState(prev => ({ ...prev, progress: newProgress }));
    }
  }, [courseState.modules]);

  const toggleModule = (id: string) => {
    setExpandedModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const markAsViewed = (moduleId: string, resourceId: string) => {
    setCourseState(prev => {
      const newModules = prev.modules.map(mod => {
        if (mod.id !== moduleId) return mod;
        return {
          ...mod,
          resources: mod.resources.map(res => {
            if (res.id !== resourceId) return res;
            return { ...res, viewed: true };
          })
        };
      });
      return { ...prev, modules: newModules };
    });
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <PlayCircle className="w-5 h-5 text-red-500" />;
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'image': return <FileImage className="w-5 h-5 text-green-500" />;
      case 'link': return <LinkIcon className="w-5 h-5 text-gray-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Course Banner */}
      <div className="bg-[var(--color-secondary)] rounded-2xl p-8 text-white mb-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-md mb-4">
                {courseState.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{courseState.title}</h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  {courseState.teacher.charAt(0)}
                </div>
                <span className="font-medium text-white/90">{courseState.teacher}</span>
              </div>
            </div>
            {/* Quick action buttons for course */}
            <div className="hidden md:flex gap-2">
              <Link href={`/dashboard/course/${params.id}/forum`} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Discussion Forum
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md">
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-white/80">Your Progress</span>
              <span>{courseState.progress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 overflow-hidden">
              <div className="bg-[var(--color-primary)] h-2.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${courseState.progress}%` }}></div>
            </div>
          </div>
          
          <div className="mt-4 md:hidden">
            <Link href={`/dashboard/course/${params.id}/forum`} className="inline-block bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Discussion Forum
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto hide-scrollbar">
        {['Course', 'Participants', 'Grades'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab 
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Course' && (
        <div className="space-y-8">
          {/* Announcements */}
          {courseState.announcements.length > 0 && (
            <div className="bg-[var(--color-accent)] border border-[var(--color-primary)]/20 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 text-[var(--color-primary)]">
                <Bell className="w-5 h-5" />
                <h3 className="font-bold">Latest Announcements</h3>
              </div>
              <div className="space-y-4">
                {courseState.announcements.map(ann => (
                  <div key={ann.id} className="bg-white p-4 rounded-lg shadow-sm border border-[var(--color-primary)]/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{ann.title}</h4>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{ann.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{ann.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modules */}
          <div>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-bold text-[var(--color-text-dark)]">Course Outline</h2>
              <button className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                Expand All
              </button>
            </div>

            <div className="space-y-4">
              {courseState.modules.map((mod, idx) => {
                const isExpanded = expandedModules[mod.id];
                return (
                  <div key={mod.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button 
                      onClick={() => toggleModule(mod.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                          {idx + 1}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                          <p className="text-xs text-gray-500 mt-1">{mod.resources.length} resources</p>
                        </div>
                      </div>
                      {isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="border-t border-gray-100 p-2">
                        {mod.resources.map(res => (
                          <div 
                            key={res.id} 
                            onClick={() => markAsViewed(mod.id, res.id)}
                            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer group transition-colors ${res.viewed ? 'bg-gray-50/50' : 'hover:bg-gray-50'}`}
                          >
                            <div className="flex items-center gap-3">
                              {res.viewed ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 group-hover:border-[var(--color-primary)] transition-colors"></div>
                              )}
                              {getResourceIcon(res.type)}
                              <span className={`text-sm font-medium ${res.viewed ? 'text-gray-500' : 'text-gray-900'} group-hover:text-[var(--color-primary)] transition-colors`}>
                                {res.title}
                              </span>
                            </div>
                            <button className={`text-xs font-medium px-3 py-1.5 rounded transition-colors ${res.viewed ? 'text-gray-500 bg-gray-100' : 'text-[var(--color-primary)] bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20'}`}>
                              {res.viewed ? 'Review' : 'View'}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Participants' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Participants List</h3>
          <p className="text-gray-500 mt-2">Connecting to database...</p>
        </div>
      )}

      {activeTab === 'Grades' && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[var(--color-text-dark)]">Module Completion</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">#</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Module</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Resources</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Completed</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courseState.modules.map((mod, idx) => {
                  const total = mod.resources.length;
                  const done = mod.resources.filter(r => r.viewed).length;
                  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
                  const isComplete = pct === 100;
                  return (
                    <tr key={mod.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-500">{idx + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{mod.title}</td>
                      <td className="px-6 py-4 text-gray-600">{total}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-100 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${isComplete ? 'bg-green-500' : 'bg-[var(--color-primary)]'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-xs text-gray-500">{done}/{total}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isComplete ? (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full">
                            In Progress
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {courseState.progress === 100 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4">
              <Award className="w-10 h-10 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900">Course Complete! 🎉</h3>
                <p className="text-sm text-green-700 mt-1">You've completed all modules. Your certificate is ready.</p>
                <div className="flex gap-3 mt-3">
                  <Link href="/dashboard/certificates" className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-md transition-colors">Download Certificate</Link>
                  <Link href={`/dashboard/evaluation/${params.id}`} className="text-sm font-medium text-green-700 border border-green-300 hover:bg-green-100 px-4 py-1.5 rounded-md transition-colors">Evaluate Lecturer</Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
