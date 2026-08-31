'use client';

import React from 'react';
import Link from 'next/link';
import { JourneyCard } from '../../../components/journey-card';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function StudentJourneyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Hub</span>
      </Link>

      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-slate-900 text-slate-950 rounded-3xl p-8 shadow-xl">
        <span className="px-3 py-1 bg-slate-950 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Trophy className="w-3.5 h-3.5" /> Spiritual & Campus Onboarding
        </span>
        <h1 className="text-2xl sm:text-4xl font-black text-white mt-2">
          My FOCUS Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-100 max-w-xl mt-1">
          A personal, non-competitive milestone tracker designed to help you integrate seamlessly into Christian fellowship at Dire Dawa University.
        </p>
      </div>

      {/* Main Journey Card */}
      <JourneyCard />
    </div>
  );
}
