'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { QRGenerator } from '../../../components/qr-generator';
import { Event } from '../../../types';
import { QrCode, ArrowLeft, Calendar, Users, Play, Sparkles } from 'lucide-react';

export default function AdminAttendancePage() {
  const [, setRerender] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState<string>(store.events[0].id);

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const selectedEvent = store.events.find((e) => e.id === selectedEventId) || store.events[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/admin"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Leadership Console</span>
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="px-3 py-1 bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <QrCode className="w-3.5 h-3.5" /> Dynamic QR Attendance Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            Launch Live Fellowship Attendance
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Select an event to start projecting the dynamic, rotating QR code in the auditorium.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-300 font-bold uppercase">Select Event:</label>
          <select
            value={selectedEventId}
            onChange={(e) => setSelectedEventId(e.target.value)}
            className="p-2 rounded-xl bg-slate-800 text-white border border-slate-700 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {store.events.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* QR Generator Projector Screen Component */}
      <QRGenerator event={selectedEvent} />
    </div>
  );
}

