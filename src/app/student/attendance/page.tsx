'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { QRScanner } from '../../../components/qr-scanner';
import { QrCode, ArrowLeft, CheckCircle2, Clock, Calendar } from 'lucide-react';

export default function StudentAttendancePage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const student = store.activePersona.studentProfile;
  const myAttendances = store.attendances.filter((a) => a.studentId === student?.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Hub</span>
      </Link>

      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-lg border border-emerald-800/40">
        <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <QrCode className="w-3.5 h-3.5" /> Live Attendance Scanner
        </span>
        <h1 className="text-2xl sm:text-3xl font-black mt-2">
          QR Code Attendance Check-In
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Scan the active rotating QR code during fellowship services or practice sessions to record your attendance.
        </p>
      </div>

      {/* QR Scanner Component */}
      <QRScanner />

      {/* Student Attendance Record History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">
            My Attendance History ({myAttendances.length} sessions)
          </h3>
          <span className="text-emerald-700 font-semibold text-[11px]">Verified Records</span>
        </div>

        {myAttendances.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            No attendance records yet. Scan a QR code at your next fellowship to check in!
          </p>
        ) : (
          <div className="space-y-2">
            {myAttendances.map((att) => (
              <div
                key={att.id}
                className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{att.eventTitle}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(att.scannedAt).toLocaleString()}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Present
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

