'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { DailyWord } from '../../../types';
import {
  BookOpen,
  Calendar,
  PlusCircle,
  Clock,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Send
} from 'lucide-react';

export default function AdminDailyWordPage() {
  const [, setRerender] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Form inputs
  const [publishDate, setPublishDate] = useState<string>('2026-09-03');
  const [title, setTitle] = useState('');
  const [verseText, setVerseText] = useState('');
  const [scriptureReference, setScriptureReference] = useState('');
  const [reflection, setReflection] = useState('');
  const [prayer, setPrayer] = useState('');
  const [challenge, setChallenge] = useState('');
  const [status, setStatus] = useState<'SCHEDULED' | 'PUBLISHED'>('SCHEDULED');

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !verseText.trim() || !scriptureReference.trim()) return;

    store.scheduleDailyWord({
      publishDate,
      title,
      verseText,
      scriptureReference,
      reflection,
      prayer,
      challenge,
      status,
    });

    setShowScheduleModal(false);
    setTitle('');
    setVerseText('');
    setScriptureReference('');
    setReflection('');
    setPrayer('');
    setChallenge('');
  };

  const todayData = store.getTodayWord();

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
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-6 border border-blue-800/40">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Devotional Engine & 365-Day Scheduler
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Daily Word Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Schedule spiritual devotionals 30, 90, or 365 days in advance. Automatic publication switches at 00:00 UTC+3 with intelligent fail-safe fallbacks.
          </p>
        </div>

        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Schedule New Daily Word</span>
        </button>
      </div>

      {/* Current Day Status Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Today&apos;s Active Devotional Status</span>
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${todayData.isFallback ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'}`}>
            {todayData.isFallback ? '⚠️ Fail-Safe Fallback Active' : '✓ Scheduled & Published'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-1">
            <div className="text-[10px] uppercase text-slate-400 font-bold">Active Title & Reference:</div>
            <div className="font-bold text-sm text-slate-900">{todayData.word.title}</div>
            <div className="text-blue-700 font-semibold">{todayData.word.scriptureReference}</div>
            <blockquote className="text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 mt-2">
              &ldquo;{todayData.word.verseText}&rdquo;
            </blockquote>
          </div>

          <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> Auto-Publish Schedule Details
            </div>
            <p className="text-[11px] leading-relaxed">
              System cron runs every midnight at <span className="font-mono font-bold text-slate-800">00:00:00 East Africa Time (UTC+3)</span>.
              If no entry is scheduled for the date, the engine automatically serves the most recent published word with zero broken states.
            </p>
          </div>
        </div>
      </div>

      {/* Devotionals Queue Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">
            All Devotionals in Queue ({store.dailyWords.length})
          </h3>
          <span className="text-slate-400 text-[11px]">365-Day Buffer</span>
        </div>

        <div className="divide-y divide-slate-100">
          {store.dailyWords.map((word) => (
            <div
              key={word.id}
              className="py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs hover:bg-slate-50/60 p-2 rounded-xl transition"
            >
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                    {word.publishDate}
                  </span>
                  <span className="font-bold text-slate-900">{word.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      word.status === 'PUBLISHED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {word.status}
                  </span>
                </div>
                <div className="text-slate-500 font-medium">{word.scriptureReference} — &ldquo;{word.verseText}&rdquo;</div>
              </div>

              <div className="text-right text-[11px] text-slate-400">
                {word.status === 'PUBLISHED' ? 'Currently Live' : 'Pending Auto-Release'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Schedule New Daily Word</span>
            </h3>

            <form onSubmit={handleSchedule} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Publish Date *</label>
                  <input
                    type="date"
                    required
                    value={publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="SCHEDULED">Scheduled (Auto-Release on Date)</option>
                    <option value="PUBLISHED">Publish Immediately</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Devotional Theme *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. WALKING IN THE SPIRIT"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Bible Verse Text *</label>
                  <textarea
                    rows={2}
                    required
                    value={verseText}
                    onChange={(e) => setVerseText(e.target.value)}
                    placeholder="Verse quote..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Scripture Reference *</label>
                  <input
                    type="text"
                    required
                    value={scriptureReference}
                    onChange={(e) => setScriptureReference(e.target.value)}
                    placeholder="e.g. Galatians 5:16"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Spiritual Reflection</label>
                <textarea
                  rows={3}
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Encouraging commentary for university students..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Daily Student Prayer</label>
                  <textarea
                    rows={2}
                    value={prayer}
                    onChange={(e) => setPrayer(e.target.value)}
                    placeholder="Prayer..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Action Challenge</label>
                  <textarea
                    rows={2}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    placeholder="e.g. Pray for your roommate..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save to Devotional Queue</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

