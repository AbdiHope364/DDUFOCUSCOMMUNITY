'use client';

import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { store } from '../lib/store';
import { Event } from '../types';
import { QrCode, RefreshCw, Users, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface QRGeneratorProps {
  event: Event;
}

export function QRGenerator({ event }: QRGeneratorProps) {
  const [currentToken, setCurrentToken] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [, setRerender] = useState(0);

  useEffect(() => {
    // Generate initial token
    const token = store.generateEventQRToken(event.id);
    setCurrentToken(token);
    setTimeLeft(30);

    // Refresh token every 30 seconds
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextToken = store.generateEventQRToken(event.id);
          setCurrentToken(nextToken);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    const unsub = store.subscribe(() => setRerender((v) => v + 1));

    return () => {
      clearInterval(interval);
      unsub();
    };
  }, [event.id]);

  const eventAttendances = store.attendances.filter((a) => a.eventId === event.id);

  return (
    <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live Attendance Session Active
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2 text-white">{event.title}</h2>
          <p className="text-xs text-slate-400 mt-1">
            Display this screen to students in the fellowship hall. Code rotates every 30s to prevent link-sharing.
          </p>
        </div>

        <div className="bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-700 text-center">
          <div className="text-2xl font-black text-amber-400">{eventAttendances.length}</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Present Now</div>
        </div>
      </div>

      {/* Main QR Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* QR Code Container */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl border-4 border-amber-400">
          {currentToken ? (
            <QRCodeSVG
              value={currentToken}
              size={220}
              level="H"
              includeMargin={true}
            />
          ) : (
            <div className="w-56 h-56 bg-slate-100 flex items-center justify-center text-slate-400">
              <QrCode className="w-12 h-12" />
            </div>
          )}

          {/* Token text & Countdown Timer */}
          <div className="mt-4 flex items-center gap-2 text-slate-900 font-mono text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />
            <span>Token rotates in: </span>
            <span className={`px-1.5 py-0.5 rounded text-white ${timeLeft <= 5 ? 'bg-rose-600' : 'bg-blue-600'}`}>
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Live Attendee Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-white">
              <Users className="w-4 h-4 text-blue-400" />
              Live Check-In Roster ({eventAttendances.length})
            </span>
            <span className="text-[11px] text-emerald-400 font-normal">Real-time sync</span>
          </div>

          <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-3 max-h-64 overflow-y-auto space-y-2">
            {eventAttendances.length === 0 ? (
              <div className="text-center py-10 text-slate-500 text-xs">
                <QrCode className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                <p>Waiting for students to scan the QR code...</p>
              </div>
            ) : (
              eventAttendances.map((att, idx) => (
                <div
                  key={att.id}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-white">{att.studentName}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(att.scannedAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Present
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="text-xs text-slate-400 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Encrypted anti-spoof token validation active. Duplicates automatically blocked.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

