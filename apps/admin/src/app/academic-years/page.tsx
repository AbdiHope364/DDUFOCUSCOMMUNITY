'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import {
  Calendar,
  Users,
  Shield,
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  RotateCcw,
  PlusCircle,
  Sparkles
} from 'lucide-react';

export default function AcademicYearsPage() {
  const [, setRerender] = useState(0);
  const [currentYear, setCurrentYear] = useState('2026/2027');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Form states
  const [selectedSection, setSelectedSection] = useState('sec-choir');
  const [newLeaderName, setNewLeaderName] = useState('');
  const [termTitle, setTermTitle] = useState('Choir Ministry Leader');

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const handleAssignLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeaderName.trim()) return;

    const sec = store.sections.find((s) => s.id === selectedSection);
    if (sec) {
      sec.leaderName = newLeaderName;
      // Add notification
      store.notifications.unshift({
        id: `notif-${Date.now()}`,
        userId: 'user-yonas',
        title: `Leadership Transition: ${sec.name}`,
        message: `${newLeaderName} appointed as ${termTitle} for ${currentYear}.`,
        actionUrl: `/sections/${sec.slug}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      });
      store.personas.push({
        id: `user-${newLeaderName.toLowerCase().replace(/\s+/g, '')}`,
        name: newLeaderName,
        email: `${newLeaderName.toLowerCase().replace(/\s+/g, '')}@ddu.edu.et`,
        role: 'SECTION_LEADER',
        title: termTitle,
        sectionSlug: sec.slug,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      });
    }

    setShowAssignModal(false);
    setNewLeaderName('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Leadership Console</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4 border border-blue-800/40">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> Institutional Memory & Transition Engine
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Academic Year & Leadership Continuity
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Rotate section leaders annually and manage membership lifecycles across academic cycles without losing historical records.
          </p>
        </div>

        <button
          onClick={() => setShowAssignModal(true)}
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Appoint New Section Leader</span>
        </button>
      </div>

      {/* Current Academic Year Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Active Academic Term: {currentYear}</span>
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Term Active ✓
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Enrolled Students:</div>
            <div className="text-xl font-black text-slate-900 mt-1">1,248</div>
            <div className="text-[10px] text-emerald-600 font-medium">98% Active Status</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Graduating Class:</div>
            <div className="text-xl font-black text-slate-900 mt-1">182</div>
            <div className="text-[10px] text-blue-600 font-medium">Alumni Transition Ready</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-400 uppercase font-bold">Appointed Leaders:</div>
            <div className="text-xl font-black text-slate-900 mt-1">{store.sections.length}</div>
            <div className="text-[10px] text-purple-600 font-medium">Full Quorum</div>
          </div>
        </div>
      </div>

      {/* Leadership Roster by Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">
            Current Section Leaders & Tenures ({store.sections.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {store.sections.map((sec) => (
            <div key={sec.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-900">{sec.name}</div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-600" /> Leader: <span className="font-semibold text-slate-700">{sec.leaderName || 'Unassigned'}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[10px] font-mono font-bold">
                  2026/2027 Term
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Appoint Leader Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Appoint Section Leader ({currentYear})</span>
            </h3>

            <form onSubmit={handleAssignLeader} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Ministry Section</label>
                <select
                  value={selectedSection}
                  onChange={(e) => {
                    setSelectedSection(e.target.value);
                    const sec = store.sections.find((s) => s.id === e.target.value);
                    if (sec) setTermTitle(`${sec.name} Leader`);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {store.sections.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Leader Full Name *</label>
                <input
                  type="text"
                  required
                  value={newLeaderName}
                  onChange={(e) => setNewLeaderName(e.target.value)}
                  placeholder="e.g. Eyob Tadesse"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Title</label>
                <input
                  type="text"
                  value={termTitle}
                  onChange={(e) => setTermTitle(e.target.value)}
                  placeholder="e.g. Choir Ministry Leader"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

