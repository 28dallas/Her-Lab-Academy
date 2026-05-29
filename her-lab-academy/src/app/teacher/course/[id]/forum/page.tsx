'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, CornerDownRight, Reply } from 'lucide-react';
import { AvatarFallback } from '@/components/ui/AvatarFallback';

interface Post {
  id: string;
  author: { name: string; role: string };
  content: string;
  createdAt: string;
  isAnswered: boolean;
  replies: { id: string; author: { name: string; role: string }; content: string; createdAt: string }[];
}

export default function TeacherForumPage({ params }: { params: { id: string } }) {
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: { name: 'Jane Doe', role: 'student' },
      content: 'I am having trouble understanding the circuit diagram in Module 2. Can you explain it?',
      createdAt: 'Oct 14, 2026',
      isAnswered: false,
      replies: [],
    },
    {
      id: '2',
      author: { name: 'Mary P.', role: 'student' },
      content: 'Is the practical session on Friday still happening?',
      createdAt: 'Oct 13, 2026',
      isAnswered: true,
      replies: [{ id: '2a', author: { name: 'Sarah K.', role: 'teacher' }, content: 'Yes, Friday session is confirmed at 9am.', createdAt: 'Oct 13, 2026' }],
    },
  ]);

  const sendReply = (postId: string) => {
    const text = replyText[postId]?.trim();
    if (!text) return;
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        isAnswered: true,
        replies: [...p.replies, { id: Date.now().toString(), author: { name: 'Sarah K.', role: 'teacher' }, content: text, createdAt: 'Just now' }],
      };
    }));
    setReplyText(prev => ({ ...prev, [postId]: '' }));
    setReplyingTo(null);
  };

  const toggleAnswered = (postId: string) => {
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, isAnswered: !p.isAnswered } : p));
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <MessageSquare className="w-7 h-7 text-[var(--color-primary)]" /> Forum Moderation
        </h1>
        <p className="text-gray-600 mt-1">Reply to student questions and mark them as answered.</p>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${post.isAnswered ? 'border-green-200' : 'border-gray-200'}`}>
            <div className={`p-6 ${post.isAnswered ? 'bg-green-50/30' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <AvatarFallback name={post.author.name} size="md" />
                  <div>
                    <span className="font-bold text-gray-900">{post.author.name}</span>
                    <p className="text-xs text-gray-500">{post.createdAt}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isAnswered && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Answered
                    </span>
                  )}
                  <button
                    onClick={() => toggleAnswered(post.id)}
                    className="text-xs font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {post.isAnswered ? 'Unmark' : 'Mark Answered'}
                  </button>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{post.content}</p>
              <button
                onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline"
              >
                <Reply className="w-4 h-4" /> Reply
              </button>

              {replyingTo === post.id && (
                <div className="mt-4 space-y-3">
                  <textarea
                    rows={3}
                    value={replyText[post.id] || ''}
                    onChange={e => setReplyText(prev => ({ ...prev, [post.id]: e.target.value }))}
                    placeholder="Write your reply..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y"
                  />
                  <div className="flex gap-2">
                    <button onClick={() => sendReply(post.id)} className="px-4 py-2 bg-[var(--color-primary)] text-white text-sm font-medium rounded-lg hover:bg-[#cf5626] transition-colors">Send Reply</button>
                    <button onClick={() => setReplyingTo(null)} className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                  </div>
                </div>
              )}
            </div>

            {post.replies.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 space-y-3">
                {post.replies.map(reply => (
                  <div key={reply.id} className="flex gap-3 relative pl-4">
                    <CornerDownRight className="w-4 h-4 text-gray-300 absolute left-0 top-2" />
                    <AvatarFallback name={reply.author.name} size="sm" className={reply.author.role === 'teacher' ? 'bg-[var(--color-secondary)]' : ''} />
                    <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{reply.author.name}</span>
                          {reply.author.role === 'teacher' && (
                            <span className="px-1.5 py-0.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[10px] font-bold uppercase rounded">Instructor</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{reply.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-700">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
