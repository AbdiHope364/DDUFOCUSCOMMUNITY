'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { SectionApplication } from '../../../types';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowLeft,
  Filter,
  Search,
  MessageSquare,
  Shield,
  Sparkles
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [, setRerender] = useState(0);
  const [filterSection, setFilterSection] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('PENDING');
  const [selectedApp, setSelectedApp] = useState<SectionApplication | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const activePersona = store.activePersona;
  const isSuperAdmin = activePersona.role === 'SUPER_ADMIN' || activePersona.role === 'FOCUS_COORDINATOR';

  const applications = store.applications.filter((app) => {
    // If section leader, restrict to assigned section unless super admin
    if (!isSuperAdmin && activePersona.sectionSlug) {
      if (!app.sectionId.includes(activePersona.sectionSlug)) return false;
    }

    const matchSec = filterSection === 'ALL' || app.sectionId === filterSection;
    const matchStat = filterStatus === 'ALL' || app.status === filterStatus;
    return matchSec && matchStat;
  });

  const handleReview = (status: 'APPROVED' | 'REJECTED') => {
    if (!selectedApp) return;
    store.reviewApplication(selectedApp.id, status, notes);
    setSelectedApp(null);
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Leadership Console</span>
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5" /> Membership Review Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Section Membership Applications
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Review student applicants, inspect their spiritual motivation and weekly availability, and grant section membership.
          </p>
        </div>

        <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
          <div className="text-xl font-black text-amber-400">{applications.length}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Filtered Applications</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Status:</span>
          {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition capitalize ${
                filterStatus === st
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Section Filter (if super admin) */}
        {isSuperAdmin && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Section:</span>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="p-1.5 rounded-xl border border-slate-300 bg-white font-medium text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="ALL">All Sections</option>
              {store.sections.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Applications List Grid */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <FileCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-base text-slate-800">No applications found</h3>
          <p className="text-xs text-slate-500">
            No applicant submissions match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    {app.sectionName}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {app.status === 'APPROVED' ? 'Approved ✓' : app.status === 'PENDING' ? '🟡 Pending Review' : 'Rejected'}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{app.studentName}</h3>
                  <p className="text-xs text-slate-500">
                    {app.studentDept} • Year {app.studentYear} • Experience: <span className="font-semibold text-slate-700 capitalize">{app.experienceLevel.toLowerCase()}</span>
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-2">
                  <div>
                    <span className="font-bold text-slate-700">Motivation:</span>
                    <p className="text-slate-600 italic mt-0.5 leading-relaxed">&ldquo;{app.motivation}&rdquo;</p>
                  </div>

                  {app.skillsExperience && (
                    <div>
                      <span className="font-bold text-slate-700">Skills / Background:</span>
                      <p className="text-slate-600 mt-0.5">{app.skillsExperience}</p>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-slate-700">Availability Days:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {app.availabilityDays.map((d) => (
                        <span key={d} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-700">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {app.reviewerNotes && (
                  <div className="text-xs text-blue-900 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                    <span className="font-bold">Review Note:</span> &quot;{app.reviewerNotes}&quot;
                  </div>
                )}
              </div>

              {/* Action Buttons for Pending */}
              {app.status === 'PENDING' && (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setNotes('Welcome to the ministry team! Vocal/interview requirements met.');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Application</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setNotes('Thank you for applying. Currently at maximum capacity.');
                    }}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Confirmation Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span>Review Application for {selectedApp.studentName}</span>
            </h3>

            <div className="text-xs text-slate-600 space-y-1">
              <div>Target Section: <span className="font-bold text-slate-800">{selectedApp.sectionName}</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Reviewer Feedback / Welcome Note to Student
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReview('REJECTED')}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow"
              >
                Confirm Rejection
              </button>
              <button
                onClick={() => handleReview('APPROVED')}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow"
              >
                Confirm Approval ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

