import { Star } from 'lucide-react';

const evaluations = [
  { id: '1', student: 'Mary P.', rating: 5, feedback: 'Excellent teaching! Very clear explanations.', submittedAt: 'Nov 12, 2026' },
  { id: '2', student: 'Esther K.', rating: 4, feedback: 'Good course, would love more practical examples.', submittedAt: 'Nov 14, 2026' },
];

const avgRating = evaluations.reduce((s, e) => s + e.rating, 0) / evaluations.length;

export default function TeacherEvaluationsPage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <Star className="w-7 h-7 text-[var(--color-primary)]" /> Student Evaluations
        </h1>
        <p className="text-gray-600 mt-1">Feedback submitted by students after completing the course.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6 flex items-center gap-6">
        <div className="text-center">
          <div className="text-5xl font-display font-bold text-[var(--color-primary)]">{avgRating.toFixed(1)}</div>
          <div className="flex justify-center gap-0.5 mt-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className="w-5 h-5" fill={s <= Math.round(avgRating) ? '#E8612C' : 'none'} stroke={s <= Math.round(avgRating) ? '#E8612C' : '#D1D5DB'} strokeWidth={1.5} />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">{evaluations.length} reviews</p>
        </div>
        <div className="flex-1 space-y-2">
          {[5,4,3,2,1].map(star => {
            const count = evaluations.filter(e => e.rating === star).length;
            const pct = evaluations.length ? (count / evaluations.length) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-gray-600">{star}</span>
                <Star className="w-3.5 h-3.5 text-[var(--color-primary)]" fill="#E8612C" />
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full bg-[var(--color-primary)]" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-gray-500 w-4">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {evaluations.map(e => (
          <div key={e.id} className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-gray-900">{e.student}</p>
                <p className="text-xs text-gray-500">{e.submittedAt}</p>
              </div>
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4" fill={s <= e.rating ? '#E8612C' : 'none'} stroke={s <= e.rating ? '#E8612C' : '#D1D5DB'} strokeWidth={1.5} />
                ))}
              </div>
            </div>
            {e.feedback && <p className="text-sm text-gray-700">{e.feedback}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
