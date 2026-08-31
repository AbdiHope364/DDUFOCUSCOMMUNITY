'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../../lib/store';
import { DailyWord } from '../../types';
import { DailyWordCard } from '../../components/daily-word-card';
import {
  BookOpen,
  Calendar,
  Search,
  Sparkles,
  Heart,
  Target,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function DailyWordPage() {
  const [dailyWords, setDailyWords] = useState<DailyWord[]>(store.dailyWords);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState<DailyWord>(store.getTodayWord().word);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setDailyWords([...store.dailyWords]);
    });
    return unsub;
  }, []);

  const filteredWords = dailyWords.filter((w) => {
    return (
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.scriptureReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.verseText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.reflection.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white rounded-3xl p-8 shadow-xl border border-blue-800/40">
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> 365-Day Devotional & Scripture Archive
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
          Daily Bread for University Walk
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Root your semester in God’s Word. Search past devotionals, read in-depth reflections, and pray the daily student prayers.
        </p>
      </div>

      {/* Featured Spotlight */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Featured Active Devotional
        </div>
        <DailyWordCard />
      </div>

      {/* Search & Archive Grid */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg text-slate-900">Devotional Archive Library</h3>
            <p className="text-xs text-slate-500">Browse scheduled and published daily words</p>
          </div>

          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, scripture, or keywords (e.g. Faith, Joshua)..."
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredWords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3 h-3 text-blue-600" /> {item.publishDate}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === 'PUBLISHED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 leading-snug">
                  {item.title}
                </h4>

                <div className="text-xs font-semibold text-blue-700">
                  {item.scriptureReference}
                </div>

                <blockquote className="text-xs text-slate-600 line-clamp-3 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  &ldquo;{item.verseText}&rdquo;
                </blockquote>
              </div>

              <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 line-clamp-2">
                {item.reflection}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

