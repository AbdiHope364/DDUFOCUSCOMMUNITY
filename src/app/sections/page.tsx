'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../../lib/store';
import { SectionCard } from '../../components/section-card';
import { Section } from '../../types';
import { Layers, Search, PlusCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>(store.sections);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setSections([...store.sections]);
    });
    return unsub;
  }, []);

  const filtered = sections.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg border border-blue-800/40 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> DDU FOCUS Ministry Sections
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Discover Your Calling & Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Every section in DDU FOCUS offers fellowship, leadership training, and practical ministry. Select a section to apply and connect with your leader.
          </p>
        </div>

        <Link
          href="/student/sections"
          className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>My Joined Sections & Applications</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections (e.g. Choir, Evangelism, Charity)..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-800">{filtered.length}</span> active sections
        </div>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}

