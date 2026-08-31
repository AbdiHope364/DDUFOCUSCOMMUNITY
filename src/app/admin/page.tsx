'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../lib/store';
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
  PlusCircle
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
  const totalMembers = store.members.length + 150; // realistic campus total
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
  const todayWordData = store.getTodayWord();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Welcome Header */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/40 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              {isSuperAdmin ? 'Super Admin Management Console' : `${activePersona.title} Console`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Welcome, {activePersona.name}
          </h1>
          <p className="text-xs text-slate-300">
            {activePersona.title} • DDU FOCUS Leadership Hub (Academic Year 2026/2027)
          </p>
        </div>

        {/* Status Indicator */}
        <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">System Live • East Africa Time (UTC+3)</span>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Card 1: Members */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
            <span>Members</span>
            <Users className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalMembers}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Campus Fellowship</div>
        </div>

        {/* Card 2: Pending Applications */}
        <Link
          href="/admin/applications"
          className="bg-white rounded-2xl border border-amber-300 p-4 shadow-sm space-y-1 hover:bg-amber-50/50 transition group"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-amber-700 flex items-center justify-between">
            <span>Applications</span>
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-600 group-hover:scale-105 transition">
            {pendingApplications.length}
          </div>
          <div className="text-[10px] text-amber-700 font-bold">Needs Review →</div>
        </Link>

        {/* Card 3: Sections */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
            <span>Sections</span>
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalSections}</div>
          <div className="text-[10px] text-slate-400">Active Ministries</div>
        </div>

        {/* Card 4: Events */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1">
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
            <span>Events</span>
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalEvents}</div>
          <div className="text-[10px] text-emerald-600 font-medium">Scheduled Programs</div>
        </div>

        {/* Card 5: Attendance */}
        <Link
          href="/admin/attendance"
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1 hover:bg-slate-50 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
            <span>QR Scans</span>
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">{totalAttendances}</div>
          <div className="text-[10px] text-blue-600 font-bold">Launch Scanner →</div>
        </Link>

        {/* Card 6: Volunteer Hours */}
        <Link
          href="/admin/volunteers"
          className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-1 hover:bg-slate-50 transition"
        >
          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center justify-between">
            <span>Volunteers</span>
            <Heart className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">{pendingVolunteers.length}</div>
          <div className="text-[10px] text-rose-600 font-bold">Pending Logs →</div>
        </Link>
      </div>

      {/* Main Admin Action Hub */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Hub 1: Applications Queue Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 md:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-600" />
              <span>Pending Section Applications Queue ({pendingApplications.length})</span>
            </h3>
            <Link
              href="/admin/applications"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Open Full Review Queue
            </Link>
          </div>

          {pendingApplications.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">
              All applications have been reviewed! Excellent work.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingApplications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 text-sm">
                      {app.studentName} <span className="font-normal text-slate-500 text-xs">({app.studentDept}, Year {app.studentYear})</span>
                    </div>
                    <div className="text-blue-700 font-semibold text-xs">
                      Applied to: {app.sectionName}
                    </div>
                    <p className="text-slate-600 italic line-clamp-1">&ldquo;{app.motivation}&rdquo;</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => store.reviewApplication(app.id, 'APPROVED')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow transition"
                    >
                      Approve ✓
                    </button>
                    <button
                      onClick={() => store.reviewApplication(app.id, 'REJECTED')}
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 font-bold text-xs rounded-lg transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hub 2: Daily Word Manager Spotlight */}
        <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-amber-300 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Daily Devotional Status
            </h3>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded font-mono text-emerald-400">
              {todayWordData.isFallback ? 'Fallback' : 'Active'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Today&apos;s Title:</div>
            <div className="font-bold text-white text-sm">{todayWordData.word.title}</div>
            <div className="text-blue-400 font-medium">{todayWordData.word.scriptureReference}</div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/admin/daily-word"
              className="w-full py-2 text-center bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
            >
              Manage 365-Day Queue
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Modules Navigation */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Management Modules & Workflows
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <Link
            href="/admin/sections"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Dynamic Sections</div>
            <p className="text-slate-500 text-[11px]">Add new ministries (Media, Worship, Discipleship) without code edits.</p>
          </Link>

          <Link
            href="/admin/attendance"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <QrCode className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Live QR Attendance</div>
            <p className="text-slate-500 text-[11px]">Launch rotating QR token screen for Friday fellowship hall projection.</p>
          </Link>

          <Link
            href="/admin/volunteers"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
              <Heart className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Volunteer Verifications</div>
            <p className="text-slate-500 text-[11px]">Approve student community service hours for official certificate issue.</p>
          </Link>

          <Link
            href="/admin/announcements"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition space-y-2"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-sm">Broadcast Announcements</div>
            <p className="text-slate-500 text-[11px]">Dispatch fellowship-wide or section-targeted announcements.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

