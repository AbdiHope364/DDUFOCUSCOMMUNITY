'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../lib/store';
import { DailyWord } from '../types';
import {
  BookOpen,
  Sparkles,
  Heart,
  Target,
  Share2,
  AlertTriangle,
  Calendar,
  X
} from 'lucide-react';

export function DailyWordCard() {
  const [wordData, setWordData] = useState<{ word: DailyWord; isFallback: boolean }>(store.getTodayWord());
  const [activeModal, setActiveModal] = useState<'reflection' | 'prayer' | 'challenge' | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setWordData(store.getTodayWord());
    });
    return unsub;
  }, []);

  const { word, isFallback } = wordData;

  const handleShare = () => {
    const text = `📖 DDU FOCUS Daily Word:\n"${word.verseText}" - ${word.scriptureReference}\n\nRead more on DDU FOCUS Platform!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-2xl border border-blue-800/40">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Fallback Banner if applicable */}
      {isFallback && (
        <div className="bg-amber-500/90 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>⚠️ Today&apos;s Daily Word hasn&apos;t been scheduled yet. Displaying the latest published word.</span>
          </div>
          <span className="text-[10px] bg-slate-950/20 px-2 py-0.5 rounded font-mono">Fail-Safe Active</span>
        </div>
      )}

      <div className="p-6 sm:p-8 relative z-10">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
              Today&apos;s Word Spotlight
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {word.publishDate}
            </span>
          </div>

          <button
            onClick={handleShare}
            className="text-xs text-slate-300 hover:text-amber-300 transition flex items-center gap-1 bg-slate-800/60 px-2.5 py-1 rounded-lg border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Verse! ✓' : 'Share Verse'}</span>
          </button>
        </div>

        {/* Title & Scripture Quote */}
        <div className="py-6 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-blue-400">
            {word.title}
          </h3>

          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-slate-100 font-medium leading-relaxed italic drop-shadow-sm">
            &ldquo;{word.verseText}&rdquo;
          </blockquote>

          <div className="font-sans font-bold text-amber-400 text-base sm:text-lg tracking-wide">
            — {word.scriptureReference}
          </div>
        </div>

        {/* Interactive Action Hub */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-800/60">
          <button
            onClick={() => setActiveModal('reflection')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 text-white text-xs font-semibold transition hover:scale-[1.02]"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Read Reflection</span>
          </button>

          <button
            onClick={() => setActiveModal('prayer')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white text-xs font-semibold transition hover:scale-[1.02]"
          >
            <Heart className="w-4 h-4 text-purple-400" />
            <span>Today&apos;s Prayer</span>
          </button>

          <button
            onClick={() => setActiveModal('challenge')}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/30 text-white text-xs font-semibold transition hover:scale-[1.02]"
          >
            <Target className="w-4 h-4 text-amber-400" />
            <span>Today&apos;s Challenge</span>
          </button>
        </div>
      </div>

      {/* Modal Dialogs */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'reflection' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
                  <BookOpen className="w-5 h-5" />
                  <h4>Today&apos;s Spiritual Reflection</h4>
                </div>
                <div className="text-xs text-amber-300 font-medium">
                  {word.scriptureReference} — &quot;{word.title}&quot;
                </div>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {word.reflection}
                </p>
              </div>
            )}

            {activeModal === 'prayer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-base">
                  <Heart className="w-5 h-5" />
                  <h4>Daily Prayer for DDU Students</h4>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed italic border-l-2 border-purple-500 pl-4 py-1">
                  &quot;{word.prayer}&quot;
                </p>
              </div>
            )}

            {activeModal === 'challenge' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                  <Target className="w-5 h-5" />
                  <h4>Today&apos;s Practical Action Challenge</h4>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  🎯 {word.challenge || 'Spread encouragement and express gratitude to someone in your fellowship today.'}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

