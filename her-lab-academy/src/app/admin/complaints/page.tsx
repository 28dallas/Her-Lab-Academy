'use client';

import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, Clock, MessageSquare, CheckCircle2, Send } from 'lucide-react';

type Status = 'open' | 'replied' | 'closed';

interface Complaint {
  id: string;
  student: string;
  subject: string;
  message: string;
  status: Status;
  createdAt: string;
  replies: { author: string; message: string; date: string }[];
}

const statusConfig: Record<Status, { label: string; color: string }> = {
  open: { label: 'Open', color: 'bg-yellow-100 text-yellow-700' },
  replied: { label: 'Replied', color: 'bg-blue-100 text-blue-700' },
  closed: { label: 'Closed', color: 'bg-green-100 text-green-700' },
};

export default function AdminComplaintsPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: '1',
      student: 'Jane Doe',
      subject: 'Cannot access Module 2 resources',
      message: 'I have been trying to download the PDF from Module 2 but the link keeps failing.',
      status: 'open',
      createdAt: 'Oct 10, 2026',
      replies: [],
    },
    {
      id: '2',
      student: 'Mary P.',
      subject: 'Certificate not received',
      message: 'I completed Fashion Design 3 weeks ago but have not received my certificate yet.',
      status: 'open',
      createdAt: 'Oct 8, 2026',
      replies: [],
    },
  ]);

  const sendReply = (id: string) => {
    const text = replyText[id]?.trim();
    if (!text) return;
    setComplaints(prev => prev.map(c => {
      if (c.id !== id) return c;
      return {
        ...c,
        status: 'replied' as Status,
        replies: [...c.replies, { author: 'Admin', message: text, date: 'Just now' }],
      };
    }));
    setReplyText(prev => ({ ...prev, [id]: '' }));
  };

  const closeComplaint = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'closed' } : c));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-[var(--color-primary)]" /> Student Complaints
        </h1>
        <p className="text-gray-600 mt-2">Review and respond to private student complaints.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {(['all', 'open', 'replied', 'closed'] as const).map(f => (
          <button key={f} className="px-4 py-1.5 text-sm font-medium rounded-full border border-gray-200 bg-white hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors capitalize">
            {f === 'all' ? `All (${complaints.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${complaints.filter(c => c.status === f).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-4">
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
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                  <div>
                    <p className="font-semibold text-gray-900">{c.subject}</p>
                    <p className="text-xs text-gray-500 mt-0.5">From: <span className="font-medium">{c.student}</span> · {c.createdAt}</p>
                  </div>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 px-6 py-5 space-y-5">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-500 mb-1">Student message</p>
                    <p className="text-sm text-gray-800">{c.message}</p>
                  </div>

                  {c.replies.map((r, i) => (
                    <div key={i} className="bg-[var(--color-accent)] border border-[var(--color-primary)]/20 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-[var(--color-primary)]">{r.author}</span>
                        <span className="text-xs text-gray-500">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-800">{r.message}</p>
                    </div>
                  ))}

                  {c.status !== 'closed' && (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        value={replyText[c.id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [c.id]: e.target.value }))}
                        placeholder="Type your reply to the student..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => sendReply(c.id)}
                          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#cf5626] transition-colors"
                        >
                          <Send className="w-4 h-4" /> Send Reply
                        </button>
                        <button
                          onClick={() => closeComplaint(c.id)}
                          className="flex items-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark Closed
                        </button>
                      </div>
                    </div>
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
