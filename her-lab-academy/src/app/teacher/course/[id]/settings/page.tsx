'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, RefreshCw } from 'lucide-react';

export default function TeacherCourseSettings({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('Electrical Installation');
  const [description, setDescription] = useState('A comprehensive course covering domestic and commercial electrical installation.');
  const [durationWeeks, setDurationWeeks] = useState('10');
  const [enrollmentCode, setEnrollmentCode] = useState('ELEC2026');
  const [saved, setSaved] = useState(false);

  const regenerateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setEnrollmentCode(code);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <Settings className="w-7 h-7 text-[var(--color-primary)]" /> Course Settings
        </h1>
        <p className="text-gray-600 mt-1">Edit course information and enrollment code.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration (weeks)</label>
          <input type="number" min="1" value={durationWeeks} onChange={e => setDurationWeeks(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={enrollmentCode}
              onChange={e => setEnrollmentCode(e.target.value.toUpperCase())}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono uppercase focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
            />
            <button type="button" onClick={regenerateCode} className="flex items-center gap-1.5 border border-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              <RefreshCw className="w-4 h-4" /> Regenerate
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Share this code with students to allow self-registration.</p>
        </div>
        <div className="flex justify-end pt-2">
          <button type="submit" className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#cf5626] transition-colors">
            <Save className="w-4 h-4" /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
