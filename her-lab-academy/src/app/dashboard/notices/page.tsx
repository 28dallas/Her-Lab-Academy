import { Bell } from 'lucide-react';

const notices = [
  {
    id: '1',
    title: 'Graduation Ceremony Date',
    date: 'Oct 15, 2026',
    content: 'The graduation ceremony for the upcoming cohort will be held on December 1st, 2026. All students who have completed at least one course are invited. Venue details will be shared soon.',
  },
  {
    id: '2',
    title: 'New Course Added',
    date: 'Oct 10, 2026',
    content: 'We have just added a new short course on Digital Marketing. Check with your admin for enrollment details and the enrollment code.',
  },
  {
    id: '3',
    title: 'Platform Maintenance Notice',
    date: 'Oct 5, 2026',
    content: 'Her Lab Academy will undergo scheduled maintenance on Saturday October 8th from 10pm to 2am EAT. The platform will be unavailable during this window. Please plan your studies accordingly.',
  },
];

export default function NoticesPage() {
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
          <Bell className="w-8 h-8 text-[var(--color-primary)]" /> Notice Board
        </h1>
        <p className="text-gray-600 mt-2">Important announcements from the Her Lab Academy administration.</p>
      </div>

      {notices.length === 0 ? (
        <div className="text-center py-20 bg-white border border-dashed border-gray-200 rounded-xl">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No notices posted yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map(n => (
            <div
              key={n.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:border-[var(--color-primary)]/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bell className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <h3 className="font-bold text-gray-900">{n.title}</h3>
                    <span className="text-xs font-semibold text-[var(--color-primary)] flex-shrink-0">{n.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{n.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
