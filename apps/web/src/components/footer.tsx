'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@ddu-focus/shared';
import {
  Heart,
  Mail,
  MapPin,
  ShieldAlert,
  Sparkles,
  Layers,
  Calendar,
  BookOpen,
  FolderOpen,
  Flame,
  LayoutDashboard,
  FileCheck,
  QrCode,
  Award,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Brand & Campus Statement Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white dark:bg-slate-900 p-0.5 shadow-md border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                src="/logo.png"
                alt="DDU FOCUS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span>DIRE DAWA UNIVERSITY</span>
                <span className="text-blue-600 dark:text-blue-400 font-extrabold">FOCUS</span>
              </div>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                Fellowship of Christian University Students
              </p>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>&quot;Knowing Christ, Growing Together, Serving Others&quot; — Matthew 5:16</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/help"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 hover:bg-amber-500/20 transition text-xs font-bold shadow-sm"
            >
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Pastoral Care & Counseling Help</span>
            </Link>

            <ThemeToggle showLabel={true} />
          </div>
        </div>

        {/* SINGLE ROW WITH TWO BALANCED CATEGORIES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pb-8 border-b border-slate-200 dark:border-slate-800">
          {/* CATEGORY 1: FELLOWSHIP COMMUNITY & SPIRITUAL GROWTH */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  1. Fellowship & Public Exploration
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Open community programs, scripture resources & ministries
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/sections"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <Layers className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Ministries & Teams</span>
              </Link>

              <Link
                href="/events"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Programs Calendar</span>
              </Link>

              <Link
                href="/daily-word"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>365 Daily Devotionals</span>
              </Link>

              <Link
                href="/resources"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <FolderOpen className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>Bible Studies & Sermons</span>
              </Link>

              <Link
                href="/prayer-wall"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Community Prayer Wall</span>
              </Link>

              <Link
                href="/leaders"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>Leadership Directory</span>
              </Link>
            </div>
          </div>

          {/* CATEGORY 2: STUDENT & LEADERSHIP PORTALS */}
          <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                  2. Student & Leadership Portals
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Personal growth, attendance check-in & admin console
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/student"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Student Hub Dashboard</span>
              </Link>

              <Link
                href="/student/sections"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                <FileCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Section Applications</span>
              </Link>

              <Link
                href="/student/attendance"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                <QrCode className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>In-App QR Scanner</span>
              </Link>

              <Link
                href="/student/volunteers"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Volunteer Certificates</span>
              </Link>

              <Link
                href="/student/journey"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>FOCUS Journey Steps</span>
              </Link>

              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition flex items-center justify-between text-amber-700 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Admin Console (Port 3001)</span>
                </div>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Campus Location & Department Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>Dire Dawa University Main Campus • Main Auditorium / Hall B</span>
          </div>

          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} DDU FOCUS • Developed by Software Engineering Department</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
