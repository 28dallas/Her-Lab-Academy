'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, FileText, PlayCircle, FileImage,
  Link as LinkIcon, CheckCircle2, Download, ExternalLink
} from 'lucide-react';

interface Resource {
  id: string;
  type: 'pdf' | 'video' | 'doc' | 'link' | 'image' | 'text';
  title: string;
  fileSize?: string;
  url?: string;
  textContent?: string;
  viewed: boolean;
}

const MOCK_MODULE = {
  title: 'Electrical Safety & Tools',
  description: 'Safety rules, PPE, and basic tools required for electrical installation work.',
  resources: [
    { id: 'r1', type: 'pdf' as const, title: 'Safety Handbook', fileSize: '1.2 MB', url: '#', viewed: false },
    { id: 'r2', type: 'video' as const, title: 'PPE Introduction Video', url: 'https://www.youtube.com/embed/example', viewed: false },
    { id: 'r3', type: 'doc' as const, title: 'Tools Checklist', fileSize: '340 KB', url: '#', viewed: false },
    { id: 'r4', type: 'text' as const, title: 'Safety Rules Summary', textContent: 'Always isolate the circuit before working. Wear insulated gloves. Never work alone on live circuits. Report any faults immediately to your supervisor.', viewed: false },
    { id: 'r5', type: 'link' as const, title: 'Kenya Electrical Code Reference', url: 'https://example.com', viewed: false },
  ],
};

const typeIcon: Record<Resource['type'], React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-500" />,
  video: <PlayCircle className="w-5 h-5 text-purple-500" />,
  doc: <FileText className="w-5 h-5 text-blue-500" />,
  link: <LinkIcon className="w-5 h-5 text-gray-500" />,
  image: <FileImage className="w-5 h-5 text-green-500" />,
  text: <FileText className="w-5 h-5 text-orange-400" />,
};

const typeLabel: Record<Resource['type'], string> = {
  pdf: 'PDF', video: 'Video', doc: 'Document',
  link: 'Link', image: 'Image', text: 'Text',
};

export default function ModuleDetailPage({
  params,
}: {
  params: { id: string; moduleId: string };
}) {
  const [resources, setResources] = useState<Resource[]>(MOCK_MODULE.resources);
  const [expandedText, setExpandedText] = useState<string | null>(null);

  const markViewed = (resourceId: string) => {
    setResources(prev =>
      prev.map(r => r.id === resourceId ? { ...r, viewed: true } : r)
    );
  };

  const viewed = resources.filter(r => r.viewed).length;
  const total = resources.length;
  const pct = total === 0 ? 0 : Math.round((viewed / total) * 100);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      {/* Back link */}
      <Link
        href={`/dashboard/course/${params.id}`}
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[var(--color-primary)] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Course
      </Link>

      {/* Module header */}
      <div className="bg-[var(--color-secondary)] rounded-2xl p-6 text-white mb-8 shadow-md">
        <h1 className="text-2xl font-display font-bold mb-2">{MOCK_MODULE.title}</h1>
        <p className="text-white/80 text-sm mb-4">{MOCK_MODULE.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-white/20 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-sm font-semibold">{viewed}/{total} done</span>
        </div>
      </div>

      {/* Resource list */}
      <div className="space-y-3">
        {resources.map(res => (
          <div
            key={res.id}
            className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-colors ${
              res.viewed ? 'border-green-200' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4 px-5 py-4">
              {/* Viewed indicator */}
              <div className="flex-shrink-0">
                {res.viewed ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>

              {/* Type icon */}
              <div className="flex-shrink-0">{typeIcon[res.type]}</div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${res.viewed ? 'text-gray-500' : 'text-gray-900'}`}>
                  {res.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400 uppercase tracking-wide">{typeLabel[res.type]}</span>
                  {res.fileSize && (
                    <span className="text-xs text-gray-400">· {res.fileSize}</span>
                  )}
                </div>
              </div>

              {/* Action button */}
              {res.type === 'text' ? (
                <button
                  onClick={() => {
                    setExpandedText(expandedText === res.id ? null : res.id);
                    markViewed(res.id);
                  }}
                  className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    res.viewed
                      ? 'bg-gray-100 text-gray-500'
                      : 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20'
                  }`}
                >
                  {expandedText === res.id ? 'Collapse' : 'Read'}
                </button>
              ) : res.type === 'link' || res.type === 'video' ? (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markViewed(res.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Open
                </a>
              ) : (
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => markViewed(res.id)}
                  className="flex-shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> {res.viewed ? 'Review' : 'View'}
                </a>
              )}
            </div>

            {/* Inline text content */}
            {res.type === 'text' && expandedText === res.id && (
              <div className="border-t border-gray-100 px-5 py-4 bg-[var(--color-accent)]">
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {res.textContent}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Completion banner */}
      {pct === 100 && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-5 flex items-center gap-4">
          <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-green-900">Module complete!</p>
            <p className="text-sm text-green-700 mt-0.5">All resources reviewed. Head back to continue the course.</p>
          </div>
          <Link
            href={`/dashboard/course/${params.id}`}
            className="ml-auto text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors flex-shrink-0"
          >
            Back to Course
          </Link>
        </div>
      )}
    </div>
  );
}
