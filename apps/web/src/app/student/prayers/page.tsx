'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { PrayerRequest, PrayerVisibility } from '../../../types';
import {
  Heart,
  PlusCircle,
  ArrowLeft,
  X
} from 'lucide-react';

export default function StudentPrayersPage() {
  const [, setRerender] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [visibility, setVisibility] = useState<PrayerVisibility>('LEADERS_ONLY');

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const student = store.activePersona.studentProfile;
  const myPrayers = store.prayers.filter((p) => p.studentId === student?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !requestBody.trim()) return;

    store.submitPrayerRequest({
      title,
      requestBody,
      visibility,
    });

    setShowModal(false);
    setTitle('');
    setRequestBody('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Hub</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-4 border border-purple-900/40">
        <div>
          <span className="px-3 py-1 bg-purple-400/20 text-purple-300 border border-purple-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-purple-300" /> Pastoral Care & Prayer Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-2">
            My Confidential Prayer Requests
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Submit private requests directly to fellowship pastoral mentors or post anonymously to the community wall.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Prayer Request</span>
        </button>
      </div>

      {/* Prayers List */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
          Submitted Requests ({myPrayers.length})
        </h3>

        {myPrayers.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center space-y-3">
            <Heart className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
            <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">No prayer requests submitted yet</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Our fellowship leaders and intercessors are ready to stand in faith with you.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myPrayers.map((prayer) => (
              <div
                key={prayer.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      prayer.visibility === 'LEADERS_ONLY'
                        ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300'
                        : 'bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300'
                    }`}
                  >
                    {prayer.visibility === 'LEADERS_ONLY' ? '🔒 Leaders Only (Confidential)' : '👥 Community Wall'}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {new Date(prayer.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 dark:text-white">{prayer.title}</h4>
                <p className="text-slate-600 dark:text-slate-300 italic bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-700">
                  &ldquo;{prayer.requestBody}&rdquo;
                </p>

                <div className="pt-2 flex justify-between items-center text-slate-500 dark:text-slate-400">
                  <span>🙏 {prayer.prayedCount} prayer affirmations received</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active in Prayer</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>Submit Prayer Request</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Subject / Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Guidance, Health, Spiritual Growth"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Prayer Message *</label>
                <textarea
                  rows={4}
                  required
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  placeholder="Write your prayer message in confidence..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Privacy</label>
                <select
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="LEADERS_ONLY">Leaders Only (Strict Pastoral Confidentiality)</option>
                  <option value="ANONYMOUS_COMMUNITY">Anonymous Public Prayer Wall</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow"
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
