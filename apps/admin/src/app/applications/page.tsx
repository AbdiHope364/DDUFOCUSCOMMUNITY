'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { SectionApplication } from '@/types';
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Shield,
  Phone,
  Building,
  GraduationCap,
  Home
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [, setRerender] = useState(0);
  const [filterSection, setFilterSection] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('PENDING');
  const [selectedApp, setSelectedApp] = useState<SectionApplication | null>(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const activePersona = store.activePersona;
  const isSuperAdmin = activePersona.role === 'SUPER_ADMIN' || activePersona.role === 'FOCUS_COORDINATOR';

  const applications = store.applications.filter((app) => {
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
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Console Overview</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5" /> Membership Review Queue
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Section Membership Applications
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Review student applicants, inspect their spiritual motivation, academic department, phone contact, and availability.
          </p>
        </div>

        <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
          <div className="text-xl font-black text-amber-400">{applications.length}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Filtered Applications</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">Status:</span>
          {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-bold transition capitalize ${
                filterStatus === st
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {st.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Section Filter (if super admin) */}
        {isSuperAdmin && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-[10px]">Section:</span>
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <FileCheck className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No applications found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            No applicant submissions match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header Tag */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1.5">
                    <span>{app.sectionName}</span>
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      app.status === 'APPROVED'
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : app.status === 'PENDING'
                        ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                        : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                    }`}
                  >
                    {app.status === 'APPROVED' ? 'Approved ✓' : app.status === 'PENDING' ? '🟡 Pending Review' : 'Rejected'}
                  </span>
                </div>

                {/* Applicant Identity Card */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-black text-base text-slate-900 dark:text-white">{app.studentName}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${app.gender === 'FEMALE' ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300' : 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300'}`}>
                        {app.gender === 'FEMALE' ? '👩 Female' : '👨 Male'}
                      </span>
                    </div>

                    {app.studentIdNumber && (
                      <span className="text-[11px] font-mono font-bold bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {app.studentIdNumber}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{app.studentDept}</span>
                      <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.2 rounded font-bold">Yr {app.studentYear}</span>
                    </div>

                    {app.phoneNumber && (
                      <a
                        href={`tel:${app.phoneNumber}`}
                        className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{app.phoneNumber}</span>
                      </a>
                    )}

                    {app.dormInfo && (
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                        <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{app.dormInfo}</span>
                      </div>
                    )}

                    {app.spiritualBackground && (
                      <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                        <Home className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{app.spiritualBackground}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Motivation & Skills */}
                <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Spiritual Motivation:</span>
                    <p className="text-slate-600 dark:text-slate-300 italic mt-0.5 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700">
                      &ldquo;{app.motivation}&rdquo;
                    </p>
                  </div>

                  {app.skillsExperience && (
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Skills & Background:</span>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">{app.skillsExperience}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-semibold">Experience Tier: </span>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 capitalize">{app.experienceLevel.toLowerCase()}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1">Available:</span>
                      {app.availabilityDays.map((d) => (
                        <span key={d} className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded text-[10px] font-bold">
                          {d.substring(0, 3)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {app.reviewerNotes && (
                  <div className="text-xs text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-200 dark:border-blue-800">
                    <span className="font-bold">Reviewer Feedback:</span> &quot;{app.reviewerNotes}&quot;
                  </div>
                )}
              </div>

              {/* Action Buttons for Pending */}
              {app.status === 'PENDING' && (
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setNotes(`Welcome to ${app.sectionName}, ${app.studentName}! Looking forward to serving with you.`);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Application</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedApp(app);
                      setNotes('Thank you for your application. Ministry capacity is currently full for this term.');
                    }}
                    className="px-4 py-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Review Application: {selectedApp.studentName}</span>
            </h3>

            <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>Target Section: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedApp.sectionName}</span></div>
              <div>Department: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedApp.studentDept} (Year {selectedApp.studentYear})</span></div>
              <div>Contact Phone: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedApp.phoneNumber}</span></div>
              <div>Dorm / Block: <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedApp.dormInfo || 'Main Campus'}</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Leader Note / Remarks (Sent directly to Student)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2 text-xs">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
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
