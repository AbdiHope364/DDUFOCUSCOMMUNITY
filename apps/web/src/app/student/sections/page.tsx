'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { Users, Clock, MapPin, CheckCircle2, PlusCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function MySectionsPage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const student = store.activePersona.studentProfile;
  const myApplications = store.applications.filter((a) => a.studentId === student?.id);
  const myMemberships = store.members.filter((m) => m.studentId === student?.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Hub</span>
      </Link>

      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg border border-blue-800/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> My Ministry Sections Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Active Memberships & Applications
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Track your approval status, practice schedules, and leadership announcements.
          </p>
        </div>

        <Link
          href="/sections"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Apply to Another Section</span>
        </Link>
      </div>

      {/* Active Memberships */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
          Active Section Rosters ({myMemberships.length})
        </h2>

        {myMemberships.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <Users className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">No active memberships yet</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Once a section leader approves your application, your active section cards will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myMemberships.map((mem) => {
              const sec = store.sections.find((s) => s.id === mem.sectionId);
              return (
                <div
                  key={mem.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{mem.sectionName}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Approved Member
                    </span>
                  </div>

                  {sec && (
                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{sec.meetingSchedule || 'Fridays 6:00 PM'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sec.meetingLocation || 'Hall B'}</span>
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                      Joined on {new Date(mem.joinedAt).toLocaleDateString()}
                    </span>
                    <Link
                      href={`/sections/${sec?.slug || 'choir'}`}
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Section Portal</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Applications Status Tracker */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">
          Application History & Status Tracker
        </h2>

        <div className="space-y-3">
          {myApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-bold text-sm text-slate-900 dark:text-white">{app.sectionName} Application</div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
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

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex flex-wrap items-center gap-3 text-slate-700 dark:text-slate-300 font-medium">
                  <span>Applicant: <strong className="text-slate-900 dark:text-white">{app.studentName}</strong></span>
                  <span>• {app.studentDept} (Year {app.studentYear})</span>
                  <span>• {app.gender === 'FEMALE' ? '👩 Female' : '👨 Male'}</span>
                  <span>• Tel: {app.phoneNumber}</span>
                </div>
                <div><span className="font-semibold text-slate-700 dark:text-slate-300">Motivation:</span> &quot;{app.motivation}&quot;</div>
                {app.skillsExperience && (
                  <div><span className="font-semibold text-slate-700 dark:text-slate-300">Skills / Talents:</span> {app.skillsExperience}</div>
                )}
                <div>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Availability:</span> {app.availabilityDays.join(', ')}
                </div>
              </div>

              {app.reviewerNotes && (
                <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 rounded-2xl text-xs text-blue-900 dark:text-blue-200 font-medium">
                  Leader Feedback: &quot;{app.reviewerNotes}&quot;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
