'use client';

import React, { useState } from 'react';
import { store } from '../lib/store';
import { QrCode, CheckCircle2, AlertCircle, Sparkles, Camera, ArrowRight } from 'lucide-react';

export function QRScanner() {
  const [tokenInput, setTokenInput] = useState('');
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSimulatedScan = () => {
    // Check if there is an active QR token in store
    const active = store.activeQRToken?.token || store.generateEventQRToken(store.events[0].id);
    const res = store.recordAttendanceWithToken(active);
    setFeedback(res);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    const res = store.recordAttendanceWithToken(tokenInput.trim());
    setFeedback(res);
    if (res.success) setTokenInput('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 max-w-xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 mx-auto flex items-center justify-center shadow-inner">
          <Camera className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">In-App QR Attendance Check-In</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Scan the dynamic QR code projected on the fellowship auditorium screen or enter the active token to mark your presence.
        </p>
      </div>

      {/* Result Notification */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center gap-3 animate-in zoom-in-95 ${
            feedback.success
              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
          }`}
        >
          {feedback.success ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 shrink-0" />
          )}
          <div className="font-medium text-xs leading-relaxed">{feedback.message}</div>
        </div>
      )}

      {/* Quick 1-Click Scan Simulator */}
      <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-2xl border border-slate-800 text-center space-y-4 shadow-md">
        <div className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Live Camera Scanner Simulator
        </div>
        <p className="text-xs text-slate-300">
          Point camera at the fellowship screen or click below to simulate an instant scan:
        </p>
        <button
          onClick={handleSimulatedScan}
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Active Screen Token Now</span>
        </button>
      </div>

      {/* Manual Token Entry Fallback */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-700 dark:text-slate-300">Or Enter Code Manually:</div>
        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <input
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="e.g. DDU-FOCUS-evt-friday-fellowship..."
            className="flex-1 text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono transition"
          />
          <button
            type="submit"
            className="px-4 py-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition flex items-center gap-1"
          >
            <span>Verify</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
