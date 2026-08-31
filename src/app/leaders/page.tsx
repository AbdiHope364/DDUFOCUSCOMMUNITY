'use client';

import React from 'react';
import { store } from '../../lib/store';
import { ShieldCheck, Mail, Users, Award, Flame } from 'lucide-react';

export default function LeadersPage() {
  const leaders = store.personas.filter((p) => p.role !== 'STUDENT');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg border border-blue-800/40">
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5" /> DDU FOCUS Leadership
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
          Fellowship Executive & Ministry Leaders
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Meet the dedicated student leaders serving the fellowship for the 2026/2027 academic year.
        </p>
      </div>

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {leaders.map((leader) => (
          <div
            key={leader.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition text-center p-6 space-y-4"
          >
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={leader.avatar}
                alt={leader.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-100 shadow"
              />
              <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">{leader.name}</h3>
              <p className="text-xs font-semibold text-blue-700 mt-0.5">{leader.title}</p>
              {leader.studentProfile && (
                <p className="text-[11px] text-slate-400 mt-1">
                  {leader.studentProfile.department}, Year {leader.studentProfile.yearLevel}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span className="truncate">{leader.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

