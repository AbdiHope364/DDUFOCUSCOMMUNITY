'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Phone, Mail, MessageSquare, AlertCircle, ArrowLeft } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-slate-900 text-slate-950 rounded-3xl p-8 shadow-xl space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center font-bold">
          <Heart className="w-6 h-6 fill-amber-300" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          Need Someone to Talk To?
        </h1>
        <p className="text-xs sm:text-sm text-slate-100 max-w-2xl leading-relaxed">
          University life can bring academic stress, personal struggles, and emotional weights. You do not have to carry them alone. Our spiritual mentors and fellowship counselors are here for you.
        </p>
      </div>

      {/* Disclaimer Notice */}
      <div className="bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 rounded-3xl p-5 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-slate-900 dark:text-white">Confidentiality & Care Notice:</div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            DDU FOCUS provides confidential spiritual mentorship, prayer support, and peer encouragement. Conversations are held in strict Christian confidence. For severe clinical or medical emergencies, please reach out to the Dire Dawa University Student Health Center.
          </p>
        </div>
      </div>

      {/* Contact Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
              alt="Yonas Solomon"
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Yonas Solomon</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">FOCUS Executive Coordinator</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Available for spiritual counseling, academic guidance, and prayer appointments.
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>yonas.solomon@ddu.edu.et</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+251 91 123 4567</span>
            </div>
          </div>
        </div>

        {/* Contact 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
              alt="Sara Hailu"
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-300"
            />
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">Sara Hailu</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">Pastoral Care & SISTA Lead</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Dedicated pastoral support for female students, dorm challenges, and personal prayer.
          </p>
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>sara.hailu@ddu.edu.et</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>+251 92 987 6543</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative: Submit Private Request */}
      <div className="bg-slate-900 dark:bg-slate-900/90 border border-slate-800 text-white rounded-3xl p-6 shadow-md text-center space-y-3">
        <h3 className="text-base font-bold">Prefer Writing a Confidential Message?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          You can submit a confidential prayer or counseling request through the student portal with privacy set to &quot;Leaders Only&quot;.
        </p>
        <Link
          href="/prayer-wall"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow transition"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Submit Confidential Request</span>
        </Link>
      </div>
    </div>
  );
}
