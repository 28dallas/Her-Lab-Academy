'use client';

import React, { useState } from 'react';
import { UploadCloud, FileText, Video, Link as LinkIcon, FileImage, Trash2, Plus } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

export default function ResourceUpload({ params }: { params: { id: string } }) {
  const [activeModule, setActiveModule] = useState('1');
  const [resourceType, setResourceType] = useState<'pdf' | 'video' | 'doc' | 'link' | 'image' | 'text'>('pdf');

  const modules = [
    { id: '1', title: 'Introduction to Journalism' },
    { id: '2', title: 'Audio Recording & Editing' },
    { id: '3', title: 'Community Storytelling' },
  ];

  const onDrop = (acceptedFiles: File[]) => {
    // Mock upload logic
    console.log('Uploading files:', acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--color-text-dark)]">Manage Resources</h1>
        <p className="text-gray-600 mt-1">Upload and organize materials for your course modules.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Module Sidebar */}
        <div className="md:col-span-1">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Select Module</h3>
          <div className="space-y-2">
            {modules.map(mod => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeModule === mod.id
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {mod.title}
              </button>
            ))}
          </div>
        </div>

        {/* Upload Area */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            Add New Resource
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource Type</label>
            <div className="flex flex-wrap gap-3">
              {[
                { type: 'pdf', icon: FileText, label: 'PDF Document' },
                { type: 'video', icon: Video, label: 'Video' },
                { type: 'doc', icon: FileText, label: 'Word/Doc' },
                { type: 'link', icon: LinkIcon, label: 'External Link' },
                { type: 'image', icon: FileImage, label: 'Image' },
                { type: 'text', icon: FileText, label: 'Inline Text' },
              ].map((item) => {
                const isSelected = resourceType === item.type;
                return (
                  <button
                    key={item.type}
                    onClick={() => setResourceType(item.type as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm font-medium transition-colors ${
                      isSelected 
                        ? 'border-[var(--color-primary)] bg-[var(--color-accent)] text-[var(--color-primary)]' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resource Title</label>
              <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]" placeholder="e.g., Chapter 1 Notes" />
            </div>

            {resourceType === 'link' || resourceType === 'video' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL / Embed Link</label>
                <input type="url" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]" placeholder="https://..." />
              </div>
            ) : resourceType === 'text' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea rows={6} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]" placeholder="Write instructions or content here..."></textarea>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                    isDragActive ? 'border-[var(--color-primary)] bg-[var(--color-accent)]' : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  {isDragActive ? (
                    <p className="text-[var(--color-primary)] font-medium">Drop the files here ...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 font-medium">Drag & drop a file here, or click to select</p>
                      <p className="text-sm text-gray-500 mt-1">Supports {resourceType.toUpperCase()} up to 50MB</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-md font-medium hover:bg-[#cf5626] shadow-sm">
                Save Resource
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
