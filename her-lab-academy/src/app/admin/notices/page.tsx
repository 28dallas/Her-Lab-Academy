'use client';

import React, { useState } from 'react';
import { Bell, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function AdminNoticesPage() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([
    { id: '1', title: 'Graduation Ceremony Date', content: 'The graduation ceremony for the upcoming cohort will be held on December 1st, 2026.', createdAt: 'Oct 15, 2026' },
    { id: '2', title: 'New Course Added', content: 'We have just added a new short course on Digital Marketing. Check with your admin for enrollment.', createdAt: 'Oct 10, 2026' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setNotices(prev => [{ id: Date.now().toString(), title, content, createdAt: 'Just now' }, ...prev]);
    setTitle('');
    setContent('');
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const deleteNotice = (id: string) => setNotices(prev => prev.filter(n => n.id !== id));

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
            <Bell className="w-8 h-8 text-[var(--color-primary)]" /> Platform Notices
          </h1>
          <p className="text-gray-600 mt-2">Notices appear on all student dashboards.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> New Notice</>}
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Notice posted successfully.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900">Post a New Notice</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" placeholder="Notice title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea rows={4} value={content} onChange={e => setContent(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" placeholder="Notice content..." />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] text-sm">Post Notice</button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {notices.map(n => (
          <div key={n.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[var(--color-primary)]">{n.createdAt}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{n.title}</h3>
                <p className="text-sm text-gray-600">{n.content}</p>
              </div>
              <button onClick={() => deleteNotice(n.id)} className="ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
