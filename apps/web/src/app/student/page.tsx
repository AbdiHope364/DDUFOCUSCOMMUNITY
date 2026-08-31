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
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Today&apos;s Daily Word Spotlight
              </span>
              <span className="text-slate-400 font-mono">{todayWord.publishDate}</span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{todayWord.title}</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif mt-1 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                &ldquo;{todayWord.verseText}&rdquo; — <span className="font-sans font-bold text-blue-600 dark:text-blue-400">{todayWord.scriptureReference}</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href="/daily-word"
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>Read Today&apos;s Reflection & Prayer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* My Active Sections & Applications */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>My Active Ministry Sections ({myMemberships.length})</span>
              </h3>
              <Link
                href="/student/sections"
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
              >
                View All
              </Link>
            </div>

            {myMemberships.length === 0 ? (
              <div className="text-center py-6 space-y-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  You have not joined any ministry section yet. Discover Choir, EVAN, Charity, and more!
                </p>
                <Link
                  href="/sections"
                  className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Browse & Join Sections</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {myMemberships.map((mem) => {
                  const sec = store.sections.find((s) => s.id === mem.sectionId);
                  return (
                    <div
                      key={mem.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{sec?.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                            Active Member ✓
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span>{sec?.meetingSchedule || 'Fridays 5:00 PM'}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-500" />
                          <span>{sec?.meetingLocation || 'Hall B'}</span>
                        </div>
                      </div>

                      <Link
                        href={`/sections/${sec?.slug || 'choir'}`}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-end"
                      >
                        <span>Section Portal</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Quick Actions & FOCUS Journey */}
        <div className="space-y-6">
          {/* Fast Actions Tile */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Student Quick Actions
            </h3>

            <Link
              href="/student/attendance"
              className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">QR Attendance Check-In</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Scan hall projector screen</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </Link>

            <Link
              href="/student/volunteers"
              className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Log Volunteer Hours</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Download Service Certificate</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </Link>

            <Link
              href="/student/prayers"
              className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-900 flex items-center justify-between text-xs hover:scale-[1.01] transition"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Confidential Prayer</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Direct to pastoral mentors</div>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </Link>
          </div>

          {/* FOCUS Journey Card */}
          <JourneyCard />
        </div>
      </div>
    </div>
  );
}
