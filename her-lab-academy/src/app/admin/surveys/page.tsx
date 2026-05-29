import { FileCheck, BarChart2 } from 'lucide-react';

const mockResponses = [
  { id: '1', student: 'Jane Doe', course: 'Fashion Design', submittedAt: 'Nov 16, 2026', responses: { 'Overall satisfaction': '5', 'Would recommend': 'Yes', 'Suggestions': 'More hands-on sessions' } },
  { id: '2', student: 'Mary P.', course: 'Beadwork', submittedAt: 'Nov 12, 2026', responses: { 'Overall satisfaction': '4', 'Would recommend': 'Yes', 'Suggestions': 'Provide more materials' } },
];

export default function AdminSurveysPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <FileCheck className="w-8 h-8 text-[var(--color-primary)]" /> Satisfaction Surveys
        </h1>
        <p className="text-gray-600 mt-2">View student survey responses submitted after course completion.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-display font-bold text-[var(--color-primary)]">{mockResponses.length}</div>
          <div className="text-sm text-gray-600 mt-1">Total Responses</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-display font-bold text-[var(--color-secondary)]">4.5</div>
          <div className="text-sm text-gray-600 mt-1">Avg. Satisfaction</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-display font-bold text-green-600">100%</div>
          <div className="text-sm text-gray-600 mt-1">Would Recommend</div>
        </div>
      </div>

      <div className="space-y-4">
        {mockResponses.map(r => (
          <div key={r.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-gray-900">{r.student}</p>
                <p className="text-sm text-gray-500">{r.course} · {r.submittedAt}</p>
              </div>
              <BarChart2 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-2">
              {Object.entries(r.responses).map(([q, a]) => (
                <div key={q} className="flex gap-4 text-sm">
                  <span className="text-gray-500 min-w-[160px] flex-shrink-0">{q}:</span>
                  <span className="font-medium text-gray-900">{a}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
