'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../../lib/store';
import { PrayerRequest, PrayerVisibility } from '../../types';
import {
  Heart,
  PlusCircle,
  ShieldCheck,
  Lock,
  Users,
  CheckCircle2,
  X
} from 'lucide-react';

export default function PrayerWallPage() {
  const [prayers, setPrayers] = useState<PrayerRequest[]>(store.prayers);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [title, setTitle] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [visibility, setVisibility] = useState<PrayerVisibility>('ANONYMOUS_COMMUNITY');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    store.initClient();
    setPrayers([...store.prayers]);
    const unsub = store.subscribe(() => {
      setPrayers([...store.prayers]);
    });
    return unsub;
  }, []);

  const handlePray = (id: string) => {
    store.incrementPrayerCount(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !requestBody.trim()) return;

    store.submitPrayerRequest({
      title,
      requestBody,
      visibility,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitModal(false);
      setTitle('');
      setRequestBody('');
    }, 1500);
  };

  // Filter prayers visible on public wall (only ANONYMOUS_COMMUNITY)
  const publicPrayers = prayers.filter((p) => p.visibility === 'ANONYMOUS_COMMUNITY');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl border border-purple-900/40 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-purple-400/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-purple-300 text-purple-300" /> Community Prayer Wall
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Bearing One Another&apos;s Burdens
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Share prayer requests with full privacy controls. Lift fellow university students up in prayer or click &quot;I Prayed for This&quot; to encourage someone today.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 transform hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit a Prayer Request</span>
        </button>
      </div>

      {/* Public Prayer Wall Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Displaying {publicPrayers.length} community prayer requests</span>
          <span className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
            <ShieldCheck className="w-4 h-4 text-purple-500" /> Privacy protected (Author names anonymized)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publicPrayers.map((prayer) => (
            <div
              key={prayer.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-800">
                    {prayer.authorName || 'Anonymous Student'}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {new Date(prayer.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {prayer.title}
                </h4>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 italic">
                  &ldquo;{prayer.requestBody}&rdquo;
                </p>
              </div>

              {/* Encouragement Button */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  🙏 <span className="font-bold text-purple-600 dark:text-purple-400">{prayer.prayedCount}</span> students prayed for this
                </span>

                <button
                  onClick={() => handlePray(prayer.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold transition flex items-center gap-1.5 active:scale-95"
                >
                  <Heart className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 fill-purple-200 dark:fill-purple-900" />
                  <span>I Prayed for This</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Prayer Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 space-y-4">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Submit Prayer Request</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose who can view and pray for your request.
              </p>
            </div>

            {submitted && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Prayer request received! God bless you.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Prayer Title / Subject <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Guidance for Exams, Family Healing, Spiritual Walk"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Prayer Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder="Write your prayer request here..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* Visibility Options */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confidentiality & Visibility
                </label>
                <div className="space-y-2 text-xs">
                  <label className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition ${visibility === 'ANONYMOUS_COMMUNITY' ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'}`}>
                    <input
                      type="radio"
                      name="vis"
                      checked={visibility === 'ANONYMOUS_COMMUNITY'}
                      onChange={() => setVisibility('ANONYMOUS_COMMUNITY')}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Anonymous Community Wall
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">Visible to all fellowship students. Your name is hidden.</p>
                    </div>
                  </label>

                  <label className={`p-3 rounded-2xl border flex items-start gap-2.5 cursor-pointer transition ${visibility === 'LEADERS_ONLY' ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800' : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700'}`}>
                    <input
                      type="radio"
                      name="vis"
                      checked={visibility === 'LEADERS_ONLY'}
                      onChange={() => setVisibility('LEADERS_ONLY')}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Pastoral & Executive Leaders Only
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">Strictly confidential. Visible only to authorized pastoral coordinators.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Submit Prayer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
