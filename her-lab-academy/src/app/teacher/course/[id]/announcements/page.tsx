'use client';

import React, { useState } from 'react';
import { Bell, Plus, Trash2 } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function TeacherAnnouncementsPage({ params }: { params: { id: string } }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    { id: '1', title: 'Welcome to the course!', content: 'Please review the syllabus before our first session.', date: 'Oct 12, 2026' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setAnnouncements(prev => [{ id: Date.now().toString(), title, content, date: 'Just now' }, ...prev]);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
            <Bell className="w-7 h-7 text-[var(--color-primary)]" /> Announcements
          </h1>
          <p className="text-gray-600 mt-1">Post announcements visible to all enrolled students.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm">
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> New</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea rows={4} value={content} onChange={e => setContent(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] text-sm">Post</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {announcements.map(a => (
          <div key={a.id} className="bg-[var(--color-accent)] border border-[var(--color-primary)]/20 rounded-xl p-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-semibold text-[var(--color-primary)]">{a.date}</span>
                <h3 className="font-bold text-gray-900 mt-1">{a.title}</h3>
                <p className="text-sm text-gray-700 mt-2">{a.content}</p>
              </div>
              <button onClick={() => setAnnouncements(prev => prev.filter(x => x.id !== a.id))} className="ml-4 p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
