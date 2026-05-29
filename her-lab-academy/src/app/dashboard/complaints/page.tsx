'use client';

import React, { useState } from 'react';
import { MessageSquare, Plus, ChevronDown, ChevronUp, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'open' | 'replied' | 'closed';

interface Complaint {
  id: string;
  subject: string;
  message: string;
  status: Status;
  createdAt: string;
  replies: { author: string; message: string; date: string }[];
}

const statusConfig: Record<Status, { label: string; color: string; icon: React.ReactNode }> = {
  open: { label: 'Open', color: 'bg-yellow-100 text-yellow-700', icon: <Clock className="w-3.5 h-3.5" /> },
  replied: { label: 'Replied', color: 'bg-blue-100 text-blue-700', icon: <MessageSquare className="w-3.5 h-3.5" /> },
  closed: { label: 'Closed', color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

export default function ComplaintsPage() {
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      subject: 'Cannot access Module 2 resources',
      message: 'I have been trying to download the PDF from Module 2 but the link keeps failing.',
      status: 'replied',
      createdAt: 'Oct 10, 2026',
      replies: [{ author: 'Admin', message: 'Hi Jane, we have fixed the link. Please try again and let us know if the issue persists.', date: 'Oct 11, 2026' }],
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    setComplaints(prev => [{
      id: Date.now().toString(),
      subject,
      message,
      status: 'open',
      createdAt: 'Just now',
      replies: [],
    }, ...prev]);
    setSubject('');
    setMessage('');
    setShowForm(false);
  };

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-[var(--color-primary)]" /> Complaints
          </h1>
          <p className="text-gray-600 mt-2">Submit a private complaint to the admin. Only you and the admin can see these.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> New Complaint</>}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Submit a Complaint</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
                placeholder="Brief description of your issue"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y"
                placeholder="Describe your issue in detail..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors text-sm">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] transition-colors text-sm">Submit</button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {complaints.length === 0 && (
          <div className="text-center py-16 bg-white border border-dashed border-gray-200 rounded-xl">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No complaints submitted yet.</p>
          </div>
        )}
        {complaints.map(c => {
          const cfg = statusConfig[c.status];
          const isOpen = expandedId === c.id;
          return (
            <div key={c.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => setExpandedId(isOpen ? null : c.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>
                    {cfg.icon} {cfg.label}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{c.subject}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.createdAt}</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-6 py-4 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Your message</p>
                    <p className="text-sm text-gray-800">{c.message}</p>
                  </div>
                  {c.replies.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-gray-700">Admin Reply</p>
                      {c.replies.map((r, i) => (
                        <div key={i} className="bg-[var(--color-accent)] border border-[var(--color-primary)]/20 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-[var(--color-primary)]">{r.author}</span>
                            <span className="text-xs text-gray-500">{r.date}</span>
                          </div>
                          <p className="text-sm text-gray-800">{r.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {c.replies.length === 0 && (
                    <p className="text-sm text-gray-500 italic">Awaiting admin response...</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
