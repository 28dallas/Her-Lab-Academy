'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, Mail } from 'lucide-react';

const faqs = [
  {
    q: 'How do I enroll in a course?',
    a: 'You need an enrollment code from your administrator or teacher. Go to the Register page, enter your details and the enrollment code, and you will be automatically enrolled in the course.',
  },
  {
    q: 'How is my progress tracked?',
    a: 'Every time you open or view a resource inside a module, it is marked as viewed. Your progress percentage is calculated as the number of viewed resources divided by the total resources in the course.',
  },
  {
    q: 'When do I get my certificate?',
    a: 'Your certificate is issued automatically once you reach 100% progress in a course — meaning you have viewed all resources in all modules. You can download it from the Certificates page.',
  },
  {
    q: 'How do I evaluate my lecturer?',
    a: 'After completing 100% of a course, the Evaluate Lecturer option unlocks. You can find it in the Grades tab of your course, or from the Quick Access grid on your dashboard.',
  },
  {
    q: 'Can other students see my complaints?',
    a: 'No. Complaints are completely private between you and the admin. No other student or teacher can see what you submit.',
  },
  {
    q: 'What if a resource link is broken?',
    a: 'Submit a complaint through the Complaints page describing the issue (which course, which module, which resource). The admin will fix it and reply to you directly.',
  },
  {
    q: 'How do I change my password?',
    a: 'Go to My Profile from the Quick Access grid or the sidebar. Scroll down to the Change Password section, enter your new password, and click Update Password.',
  },
  {
    q: 'The platform is slow on my phone. What can I do?',
    a: 'Her Lab Academy is optimised for low-bandwidth connections. Try using a Wi-Fi connection if available. PDFs open in a new tab to save data. Videos only play when you tap them — they never autoplay.',
  },
];

export default function HelpPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-[var(--color-primary)]" /> Help & FAQs
        </h1>
        <p className="text-gray-600 mt-2">Answers to common questions about using Her Lab Academy.</p>
      </div>

      {/* FAQ accordion */}
      <div className="space-y-3 mb-10">
        {faqs.map((faq, i) => {
          const isOpen = openId === i;
          return (
            <div
              key={i}
              className={`bg-white border rounded-xl shadow-sm overflow-hidden transition-colors ${
                isOpen ? 'border-[var(--color-primary)]/40' : 'border-gray-200'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                {isOpen
                  ? <ChevronUp className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                }
              </button>
              {isOpen && (
                <div className="px-6 pb-5 border-t border-gray-100 pt-4 bg-[var(--color-accent)]/40">
                  <p className="text-sm text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still need help */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h2 className="font-bold text-gray-900 mb-4">Still need help?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/dashboard/complaints"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-accent)] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 group-hover:text-[var(--color-primary)]">Submit a Complaint</p>
              <p className="text-xs text-gray-500 mt-0.5">Private message to admin</p>
            </div>
          </Link>

          <a
            href="mailto:info@perurraysofhopeke.org"
            className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-[var(--color-primary)] hover:bg-[var(--color-accent)] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900 group-hover:text-[var(--color-primary)]">Email Support</p>
              <p className="text-xs text-gray-500 mt-0.5">info@perurraysofhopeke.org</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
