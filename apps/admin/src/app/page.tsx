'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../lib/store';
import {
  Users,
  Layers,
  FileCheck,
  Calendar,
  BookOpen,
  QrCode,
  Heart,
  Bell,
  ArrowRight,
  ShieldCheck,
  Award,
  AlertTriangle,
  PlusCircle,
  Sparkles,
  Clock
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const activePersona = store.activePersona;
  const isSuperAdmin = activePersona.role === 'SUPER_ADMIN' || activePersona.role === 'FOCUS_COORDINATOR';
  const sectionFilter = activePersona.sectionSlug;

  // Compute metrics
  const totalMembers = store.members.length + 150;
  const pendingApplications = store.applications.filter((a) => {
    if (!isSuperAdmin && sectionFilter) {
      return a.status === 'PENDING' && a.sectionId.includes(sectionFilter);
    }
    return a.status === 'PENDING';
  });

  const totalSections = store.sections.length;
  const totalEvents = store.events.length;
  const totalAttendances = store.attendances.length;
  const pendingVolunteers = store.volunteerLogs.filter((v) => !v.isVerified);

  return (
    <div className="space-y-8">
      {/* Leadership Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" /> DDU FOCUS Executive Console
            </div>
            <h1 className="text-2xl sm:text-4xl font-black">
              Welcome, {activePersona.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Role: <span className="font-bold text-amber-300">{activePersona.title}</span> • Managing fellowship operations, section approvals, and spiritual programs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/applications"
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
            >
              <FileCheck className="w-4 h-4" />
              <span>Review Queue ({pendingApplications.length})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Members */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Students</span>
            <Users className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalMembers}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">98% Active Status</div>
        </div>

        {/* Card 2: Applications */}
        <Link
          href="/applications"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1 hover:border-amber-400 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Applications</span>
            <FileCheck className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{pendingApplications.length}</div>
          <div className="text-[10px] text-amber-700 dark:text-amber-300 font-bold">Needs Review →</div>
        </Link>

        {/* Card 3: Sections */}
        <Link
          href="/sections"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1 hover:border-indigo-400 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Sections</span>
            <Layers className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalSections}</div>
          <div className="text-[10px] text-slate-400">Active Ministries</div>
        </Link>

        {/* Card 4: Events */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Events</span>
            <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalEvents}</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Scheduled Programs</div>
        </div>

        {/* Card 5: Attendance */}
        <Link
          href="/attendance"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1 hover:border-blue-400 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>QR Scans</span>
            <QrCode className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalAttendances}</div>
          <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Launch Projector →</div>
        </Link>

        {/* Card 6: Volunteer Hours */}
        <Link
          href="/volunteers"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-1 hover:border-rose-400 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Volunteers</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{pendingVolunteers.length}</div>
          <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">Verify Hours →</div>
        </Link>
      </div>

      {/* Main Admin Action Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hub 1: Applications Queue Preview */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-500" />
              <span>Pending Section Applications Queue ({pendingApplications.length})</span>
            </h3>
            <Link
              href="/applications"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Open Full Review Queue
            </Link>
          </div>

          {pendingApplications.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-8 text-center">
              All applications have been reviewed! Excellent work.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingApplications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      {app.studentName} <span className="font-normal text-slate-500 dark:text-slate-400 text-xs">({app.studentDept}, Year {app.studentYear})</span>
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-semibold text-xs">
                      Applied to: {app.sectionName} • Tel: {app.phoneNumber}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic line-clamp-1">&ldquo;{app.motivation}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => store.reviewApplication(app.id, 'APPROVED')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition"
                    >
                      Approve ✓
                    </button>
                    <button
                      onClick={() => store.reviewApplication(app.id, 'REJECTED')}
                      className="px-3 py-1.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 font-bold text-xs rounded-xl transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hub 2: Quick Management Shortcuts */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm pb-2 border-b border-slate-100 dark:border-slate-800">
            Administrative Fast Actions
          </h3>

          <Link
            href="/daily-word"
            className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Schedule Daily Word</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">365-Day Devotionals & Fallback</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          </Link>

          <Link
            href="/attendance"
            className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-2.5">
              <QrCode className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Hall QR Attendance</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">30s Rotating Projector Screen</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </Link>

          <Link
            href="/sections"
            className="p-3 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Manage Ministries</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Expand Sections & Rosters</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          </Link>

          <Link
            href="/academic-years"
            className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Academic Term Handover</div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400">Rotate Section Leaders</div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
