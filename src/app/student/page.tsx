'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../lib/store';
import { JourneyCard } from '../../components/journey-card';
import {
  Users,
  Calendar,
  Heart,
  QrCode,
  Sparkles,
  BookOpen,
  ArrowRight,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Trophy,
  Award
} from 'lucide-react';

export default function StudentDashboardPage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const activePersona = store.activePersona;
  const student = activePersona.studentProfile;
  const todayWord = store.getTodayWord().word;

  // Query student applications & memberships
  const myApplications = store.applications.filter((a) => a.studentId === student?.id);
  const myMemberships = store.members.filter((m) => m.studentId === student?.id);
  const myAttendances = store.attendances.filter((a) => a.studentId === student?.id);
  const myVolunteers = store.volunteerLogs.filter((v) => v.studentId === student?.id);
  const totalVerifiedHours = myVolunteers
    .filter((v) => v.isVerified)
    .reduce((sum, v) => sum + v.hoursServed, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={activePersona.avatar}
            alt={activePersona.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md"
          />
          <div>
            <div className="text-xs text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Student Personal Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Good day, {activePersona.name.split(' ')[0]} 👋
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {student?.department} • Year {student?.yearLevel} • ID: {student?.studentIdNumber}
            </p>
          </div>
        </div>

        {/* Quick Participation Counters */}
        <div className="flex items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 text-xs">
          <div className="text-center px-3 border-r border-slate-800">
            <div className="text-lg font-black text-amber-400">{myMemberships.length}</div>
            <div className="text-[10px] text-slate-400 uppercase">Sections</div>
          </div>
          <div className="text-center px-3 border-r border-slate-800">
            <div className="text-lg font-black text-emerald-400">{myAttendances.length}</div>
            <div className="text-[10px] text-slate-400 uppercase">Attended</div>
          </div>
          <div className="text-center px-3">
            <div className="text-lg font-black text-blue-400">{totalVerifiedHours.toFixed(1)}h</div>
            <div className="text-[10px] text-slate-400 uppercase">Service</div>
          </div>
        </div>
      </div>

      {/* Grid: FOCUS Today Widget + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Focus Today & My Sections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Word Spotlight Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="font-bold text-amber-600 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Today&apos;s Daily Word Spotlight
              </span>
              <span className="text-slate-400 font-mono">{todayWord.publishDate}</span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{todayWord.title}</h3>
              <p className="text-xs text-slate-700 italic font-serif mt-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                &ldquo;{todayWord.verseText}&rdquo; — <span className="font-sans font-bold text-blue-700">{todayWord.scriptureReference}</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/daily-word"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Read Today&apos;s Reflection & Prayer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* My Active Sections & Applications */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" /> My Sections & Applications
              </h3>
              <Link
                href="/student/sections"
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Manage All
              </Link>
            </div>

            {myApplications.length === 0 && myMemberships.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-slate-500">You haven&apos;t joined or applied to any ministry sections yet.</p>
                <Link
                  href="/sections"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  <PlusCircle className="w-4 h-4" /> Explore & Join Sections
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myApplications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        <span>{app.sectionName}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'PENDING'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {app.status === 'APPROVED' ? 'Active Member ✓' : app.status === 'PENDING' ? '🟡 Pending Review' : 'Rejected'}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px]">
                        Applied on {new Date(app.createdAt).toLocaleDateString()} • {app.experienceLevel.toLowerCase()} level
                      </p>
                      {app.reviewerNotes && (
                        <p className="text-blue-700 text-[11px] font-medium bg-blue-50/80 p-2 rounded-lg border border-blue-200">
                          Leader Note: &quot;{app.reviewerNotes}&quot;
                        </p>
                      )}
                    </div>

                    <Link
                      href={`/sections/${app.sectionName.toLowerCase().includes('choir') ? 'choir' : 'charity'}`}
                      className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-100 transition shrink-0"
                    >
                      View Section
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Actions & Journey Progress */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              <Link
                href="/student/attendance"
                className="p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-100 rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <QrCode className="w-4 h-4 text-emerald-400" />
                  <span>Scan QR Attendance</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/sections"
                className="p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-100 rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Apply to New Ministry</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/student/volunteers"
                className="p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-100 rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Log Service Hours & Certificate</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

              <Link
                href="/prayer-wall"
                className="p-3 bg-slate-800/80 hover:bg-slate-800 text-slate-100 rounded-xl border border-slate-700 text-xs font-bold flex items-center justify-between transition"
              >
                <span className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span>Submit Prayer Request</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          </div>

          {/* FOCUS Journey Progress Tracker */}
          <JourneyCard />
        </div>
      </div>
    </div>
  );
}

