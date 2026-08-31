'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../lib/store';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  Trophy,
  Sparkles,
  ArrowRight,
  Flame,
  Award,
  BookOpen,
  Heart,
  Users
} from 'lucide-react';
import Link from 'next/link';

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  actionUrl?: string;
  actionLabel?: string;
  icon: React.ReactNode;
}

export function JourneyCard() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const student = store.activePersona.studentProfile;
  const activeMemberships = store.members.filter((m) => m.studentId === student?.id);
  const attendances = store.attendances.filter((a) => a.studentId === student?.id);
  const verifiedVolunteers = store.volunteerLogs.filter(
    (v) => v.studentId === student?.id && v.isVerified
  );
  const totalVolunteerHours = verifiedVolunteers.reduce((sum, v) => sum + v.hoursServed, 0);

  const milestones: Milestone[] = [
    {
      id: 'm1',
      title: 'Created Account & Profile',
      description: 'Enrolled in DDU FOCUS Digital Platform',
      completed: true,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      id: 'm2',
      title: 'Joined a Ministry Section',
      description: activeMemberships.length > 0
        ? `Active member of ${activeMemberships.map((m) => m.sectionName).join(', ')}`
        : 'Submit an application to Choir, EVAN, Charity, etc.',
      completed: activeMemberships.length > 0,
      actionUrl: '/sections',
      actionLabel: 'Join a Section',
      icon: <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      id: 'm3',
      title: 'Attended First Fellowship Program',
      description: attendances.length > 0
        ? `${attendances.length} event(s) recorded in attendance history`
        : 'Scan the live QR code at Friday Fellowship',
      completed: attendances.length > 0,
      actionUrl: '/student/attendance',
      actionLabel: 'Scan Attendance',
      icon: <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
    },
    {
      id: 'm4',
      title: 'Read Today’s Word & Devotional',
      description: 'Strengthen your walk with daily scripture & prayer',
      completed: true,
      actionUrl: '/daily-word',
      actionLabel: 'Read Devotional',
      icon: <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
    },
    {
      id: 'm5',
      title: 'Community Volunteer Service',
      description: totalVolunteerHours >= 5
        ? `${totalVolunteerHours.toFixed(1)} verified hours completed!`
        : `${totalVolunteerHours.toFixed(1)} of 5.0 hours logged`,
      completed: totalVolunteerHours >= 5,
      actionUrl: '/student/volunteers',
      actionLabel: 'Log Service Hours',
      icon: <Heart className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
    },
  ];

  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>My FOCUS Journey</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal participation & spiritual growth onboarding
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{progressPercent}% Completed</div>
          <div className="text-[11px] text-slate-400 dark:text-slate-500">{completedCount} of {milestones.length} milestones</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 h-2.5 rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Milestones List */}
      <div className="space-y-3">
        {milestones.map((m, idx) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-2xl border transition flex items-start justify-between gap-3 ${
              m.completed
                ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-900 text-slate-800 dark:text-slate-200'
                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className="mt-0.5 shrink-0">
                {m.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                )}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>{idx + 1}. {m.title}</span>
                  {m.completed && (
                    <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold px-1.5 py-0.2 rounded-full">
                      Done ✓
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{m.description}</p>
              </div>
            </div>

            {!m.completed && m.actionUrl && (
              <Link
                href={m.actionUrl}
                className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition flex items-center gap-1 shadow-sm"
              >
                <span>{m.actionLabel || 'Go'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-4 rounded-2xl font-medium text-xs text-center flex flex-col items-center gap-2 shadow-md">
          <div className="flex items-center gap-1.5 font-bold text-sm">
            <Award className="w-5 h-5" />
            <span>All Onboarding Milestones Achieved! 🎉</span>
          </div>
          <p className="text-slate-950 text-xs font-semibold">
            Thank you for being an active pillar of DDU Christian Student Fellowship.
          </p>
          <button
            onClick={triggerCelebration}
            className="mt-1 px-4 py-1.5 bg-slate-950 text-amber-300 font-bold rounded-xl text-xs hover:bg-slate-900 transition"
          >
            Celebrate Again! 🎊
          </button>
        </div>
      )}
    </div>
  );
}
