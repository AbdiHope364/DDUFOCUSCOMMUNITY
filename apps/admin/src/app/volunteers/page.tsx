'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { VolunteerLog } from '@/types';
import {
  Heart,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Calendar,
  Award,
  Filter,
  Shield
} from 'lucide-react';

export default function AdminVolunteersPage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const logs = store.volunteerLogs;
  const pendingLogs = logs.filter((l) => !l.isVerified);
  const verifiedLogs = logs.filter((l) => l.isVerified);

  const handleVerify = (logId: string) => {
    store.verifyVolunteerLog(logId);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Leadership Console</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-amber-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-rose-400/20 text-rose-300 border border-rose-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-300" /> Charity & Community Outreach Lead
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Volunteer Hours Verification Console
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Review student service claims and authorize official verification for community service certificates.
          </p>
        </div>

        <div className="bg-slate-900/80 px-4 py-2.5 rounded-2xl border border-slate-800 text-xs text-center">
          <div className="text-2xl font-black text-rose-400">{pendingLogs.length}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">Pending Approval</div>
        </div>
      </div>

      {/* Pending Logs Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> Pending Submissions ({pendingLogs.length})
          </h3>
        </div>

        {pendingLogs.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            All submitted volunteer logs have been verified!
          </p>
        ) : (
          <div className="space-y-3">
            {pendingLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 rounded-xl bg-rose-50/40 border border-rose-200 flex flex-wrap items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 max-w-lg">
                  <div className="font-bold text-slate-900 text-sm">{log.studentName}</div>
                  <div className="font-semibold text-rose-800">{log.activityName}</div>
                  <p className="text-slate-600 leading-relaxed">{log.description}</p>
                  <div className="text-[11px] text-slate-400">
                    Service Date: {log.serviceDate} • Submitted on {new Date(log.createdAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-black text-slate-900">{log.hoursServed.toFixed(1)} hrs</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Claimed</div>
                  </div>

                  <button
                    onClick={() => handleVerify(log.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Verify</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Logs History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" /> Verified Service History ({verifiedLogs.length})
          </h3>
        </div>

        <div className="space-y-2">
          {verifiedLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-bold text-slate-900">{log.studentName}</span>
                <span className="text-slate-500"> — {log.activityName}</span>
                <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                  ✓ Verified by {log.verifiedBy}
                </div>
              </div>
              <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                {log.hoursServed.toFixed(1)} hrs
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

