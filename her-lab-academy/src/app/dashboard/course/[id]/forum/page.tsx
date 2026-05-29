'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AvatarFallback } from '@/components/ui/AvatarFallback';
import { ArrowLeft, MessageSquare, Plus, CheckCircle2, MoreVertical, Reply, CornerDownRight } from 'lucide-react';

export default function DiscussionForum({ params }: { params: { id: string } }) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  // Mock Forum Posts
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: { name: 'Sarah K.', role: 'teacher' },
      content: 'Welcome to the Media & Journalism forum! Feel free to ask any questions you have about the syllabus or assignments here.',
      createdAt: 'Oct 12, 2026',
      isAnswered: false,
      replies: [
        { id: '1a', author: { name: 'Jane Doe', role: 'student' }, content: 'Thank you Sarah! Im looking forward to learning about audio editing.', createdAt: 'Oct 13, 2026' }
      ]
    },
    {
      id: '2',
      author: { name: 'Mary P.', role: 'student' },
      content: 'I am having trouble downloading the Zoom H4N manual from Module 2. Is the link broken?',
      createdAt: 'Oct 14, 2026',
      isAnswered: true,
      replies: [
        { id: '2a', author: { name: 'Sarah K.', role: 'teacher' }, content: 'Hi Mary, I just updated the link. Please try again now. Let me know if you still have issues!', createdAt: 'Oct 14, 2026' }
      ]
    }
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = {
      id: Date.now().toString(),
      author: { name: 'Jane Doe', role: 'student' }, // Current user mock
      content: newPostContent,
      createdAt: 'Just now',
      isAnswered: false,
      replies: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setIsCreatingPost(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <Link href={`/dashboard/course/${params.id}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Course
        </Link>
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-[var(--color-primary)]" />
              Discussion Forum
            </h1>
            <p className="text-gray-600 mt-2">Ask questions, share insights, and discuss course topics with your peers and instructor.</p>
          </div>
          <button 
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm"
          >
            {isCreatingPost ? 'Cancel' : <><Plus className="w-5 h-5" /> New Post</>}
          </button>
        </div>
      </div>

      {/* Create Post Form */}
      {isCreatingPost && (
        <form onSubmit={handlePostSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Create a New Discussion</h3>
          <textarea
            rows={4}
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Type your question or discussion topic here..."
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none resize-y mb-4"
            required
          />
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsCreatingPost(false)}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] transition-colors"
            >
              Post Discussion
            </button>
          </div>
        </form>
      )}

      {/* Forum Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden ${post.isAnswered ? 'border-green-200' : 'border-gray-200'}`}>
            {/* Main Post */}
            <div className={`p-6 ${post.isAnswered ? 'bg-green-50/30' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <AvatarFallback name={post.author.name} size="md" className={post.author.role === 'teacher' ? 'bg-[var(--color-secondary)]' : ''} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">{post.author.name}</span>
                      {post.author.role === 'teacher' && (
                        <span className="px-2 py-0.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-bold uppercase tracking-wider rounded">Instructor</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{post.createdAt}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {post.isAnswered && (
                    <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="w-4 h-4" /> Answered
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-gray-600 p-1">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
              
              <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                <button className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] transition-colors">
                  <Reply className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>

            {/* Replies */}
            {post.replies.length > 0 && (
              <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 space-y-4">
                {post.replies.map(reply => (
                  <div key={reply.id} className="flex gap-3 relative pl-4">
                    <CornerDownRight className="w-5 h-5 text-gray-300 absolute left-0 top-1.5" />
                    <AvatarFallback name={reply.author.name} size="sm" className={reply.author.role === 'teacher' ? 'bg-[var(--color-secondary)]' : ''} />
                    <div className="flex-1 bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900">{reply.author.name}</span>
                          {reply.author.role === 'teacher' && (
                            <span className="px-1.5 py-0.5 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-[10px] font-bold uppercase tracking-wider rounded">Instructor</span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{reply.createdAt}</span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-16 bg-white border border-gray-200 border-dashed rounded-xl">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900">No discussions yet</h3>
            <p className="text-gray-500 mt-1">Be the first to start a conversation in this course!</p>
          </div>
        )}
      </div>
    </div>
  );
}
