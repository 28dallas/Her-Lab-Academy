'use client';

import React, { useState } from 'react';
import { Users, Search, Plus, UserCheck, Trash2, CheckCircle2 } from 'lucide-react';
import { AvatarFallback } from '@/components/ui/AvatarFallback';

type Role = 'student' | 'teacher' | 'admin';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: Role;
  joinedAt: string;
}

const COURSES = [
  'Electrical Installation', 'Solar PV Installation', 'Plumbing', 'Cosmetology',
  'Fashion Design', 'Regenerative Agriculture', 'Core Agriculture', 'Reproductive Health',
  'ICT', 'Basic Digital Literacy', 'Entrepreneurship', 'Beadwork',
];

const roleColors: Record<Role, string> = {
  student: 'bg-blue-100 text-blue-700',
  teacher: 'bg-green-100 text-green-700',
  admin: 'bg-purple-100 text-purple-700',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([
    { id: '1', name: 'Jane Doe', email: 'jane@example.com', role: 'student', joinedAt: 'Oct 1, 2026' },
    { id: '2', name: 'Mary P.', email: 'mary@example.com', role: 'student', joinedAt: 'Oct 3, 2026' },
    { id: '3', name: 'Sarah K.', email: 'sarah@example.com', role: 'teacher', joinedAt: 'Sep 15, 2026' },
    { id: '4', name: 'James O.', email: 'james@example.com', role: 'teacher', joinedAt: 'Sep 15, 2026' },
    { id: '5', name: 'Admin', email: 'admin@herlab.org', role: 'admin', joinedAt: 'Sep 1, 2026' },
  ]);

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);

  // Add teacher form state
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPassword, setTPassword] = useState('');
  const [tCourse, setTCourse] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const changeRole = (id: string, role: Role) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tName.trim() || !tEmail.trim() || !tPassword.trim()) return;
    const newTeacher: UserRow = {
      id: Date.now().toString(),
      name: tName,
      email: tEmail,
      role: 'teacher',
      joinedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    setUsers(prev => [newTeacher, ...prev]);
    setTName(''); setTEmail(''); setTPassword(''); setTCourse('');
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const teachers = users.filter(u => u.role === 'teacher');
  const students = users.filter(u => u.role === 'student');

  return (
    <div className="max-w-5xl mx-auto pb-12 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--color-text-dark)] flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--color-primary)]" /> Manage Users
          </h1>
          <p className="text-gray-600 mt-1">Add teachers, manage roles, and view all platform users.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#cf5626] transition-colors shadow-sm"
        >
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Teacher</>}
        </button>
      </div>

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
          <CheckCircle2 className="w-4 h-4" /> Teacher account created successfully.
        </div>
      )}

      {/* Add Teacher Form */}
      {showForm && (
        <form onSubmit={handleAddTeacher} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck className="w-5 h-5 text-[var(--color-primary)]" />
            <h2 className="font-bold text-gray-900">Create Teacher Account</h2>
          </div>
          <p className="text-sm text-gray-500 -mt-2">
            Teachers can only be created by admins. They will log in with the email and password you set here.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={tName}
                onChange={e => setTName(e.target.value)}
                required
                placeholder="e.g. Grace Wanjiru"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={tEmail}
                onChange={e => setTEmail(e.target.value)}
                required
                placeholder="teacher@example.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
              <input
                type="password"
                value={tPassword}
                onChange={e => setTPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign Course <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <select
                value={tCourse}
                onChange={e => setTCourse(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none bg-white"
              >
                <option value="">Select a course...</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-lg hover:bg-[#cf5626] text-sm transition-colors"
            >
              <UserCheck className="w-4 h-4" /> Create Teacher
            </button>
          </div>
        </form>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Users', value: users.length, color: 'text-gray-900' },
          { label: 'Teachers', value: teachers.length, color: 'text-green-700' },
          { label: 'Students', value: students.length, color: 'text-blue-700' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent outline-none"
        />
      </div>

      {/* Users table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">User</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden sm:table-cell">Email</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Role</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600 hidden md:table-cell">Joined</th>
              <th className="text-left px-6 py-3 font-semibold text-gray-600">Change Role</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <AvatarFallback name={u.name} size="sm" />
                    <span className="font-medium text-gray-900">{u.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">{u.email}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500 hidden md:table-cell">{u.joinedAt}</td>
                <td className="px-6 py-4">
                  <select
                    value={u.role}
                    onChange={e => changeRole(u.id, e.target.value as Role)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-[var(--color-primary)] outline-none bg-white"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500 text-sm">
                  No users match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
