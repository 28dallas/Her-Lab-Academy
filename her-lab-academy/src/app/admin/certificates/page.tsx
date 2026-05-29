'use client';

import React, { useState } from 'react';
import { Award, Plus, Download, CheckCircle2 } from 'lucide-react';

interface Certificate {
  id: string;
  studentName: string;
  courseTitle: string;
  issuedAt: string;
  isManual: boolean;
}

export default function AdminCertificatesPage() {
  const [showForm, setShowForm] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [issued, setIssued] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([
    { id: 'cert-001', studentName: 'Jane Doe', courseTitle: 'Fashion Design', issuedAt: 'Nov 15, 2026', isManual: false },
    { id: 'cert-002', studentName: 'Mary P.', courseTitle: 'Beadwork', issuedAt: 'Nov 10, 2026', isManual: false },
  ]);

  const courses = [
    'Electrical Installation', 'Solar PV Installation', 'Plumbing', 'Cosmetology',
    'Fashion Design', 'Regenerative Agriculture', 'Core Agriculture', 'Reproductive Health',
    'ICT', 'Basic Digital Literacy', 'Entrepreneurship', 'Beadwork',
  ];

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !courseTitle) return;
    const newCert: Certificate = {
      id: `cert-${Date.now()}`,
      studentName,
      courseTitle,
      issuedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      isManual: true,
    };
    setCertificates(prev => [newCert, ...prev]);
    setStudentName('');
    setCourseTitle('');
    setShowForm(false);
    setIssued(true);
    setTimeout(() => setIssued(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
            <Award className="w-8 h-8 text-[var(--color-primary)]" /> Certificates
          </h1>
          <p className="text-gray-600 mt-2">View all issued certificates or manually issue one.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Issue Manually</>}
        </button>
      </div>

      {issued && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Certificate issued successfully.
        </div>
      )}

      {showForm && (
        <form onSubmit={handleIssue} className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900">Manual Certificate Issuance</h3>
          <p className="text-sm text-gray-500">Use this to issue a certificate to a student who completed a course outside the platform.</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Full Name</label>
            <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none" placeholder="e.g. Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select value={courseTitle} onChange={e => setCourseTitle(e.target.value)} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white">
              <option value="">Select a course...</option>
              {courses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] text-sm">Issue Certificate</button>
          </div>
        </form>
      )}

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-gray-900">All Certificates ({certificates.length})</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {certificates.map(cert => (
            <div key={cert.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{cert.studentName}</p>
                  <p className="text-sm text-gray-500">{cert.courseTitle} · {cert.issuedAt}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {cert.isManual && (
                  <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Manual</span>
                )}
                <span className="text-xs text-gray-400 font-mono hidden sm:block">{cert.id}</span>
                <button className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:underline">
                  <Download className="w-4 h-4" /> PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
