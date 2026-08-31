'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../../lib/store';
import { Resource, ResourceCategory } from '../../types';
import {
  BookOpen,
  Headphones,
  Video,
  FileText,
  Search,
  Download,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>(store.resources);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setResources([...store.resources]);
    });
    return unsub;
  }, []);

  const categories: { label: string; value: string; icon: React.ReactNode }[] = [
    { label: 'All Resources', value: 'ALL', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Discipleship Guides', value: 'DISCIPLESHIP', icon: <FileText className="w-3.5 h-3.5" /> },
    { label: 'Bible Studies', value: 'BIBLE_STUDY', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Sermons & Audio', value: 'SERMON', icon: <Headphones className="w-3.5 h-3.5" /> },
    { label: 'Worship & Media', value: 'WORSHIP', icon: <Video className="w-3.5 h-3.5" /> },
  ];

  const filtered = resources.filter((r) => {
    const matchCat = selectedCategory === 'ALL' || r.category === selectedCategory;
    const matchQuery =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.speakerAuthor && r.speakerAuthor.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg border border-blue-800/40">
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" /> Resource Center & Media Hub
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
          Study Materials, Sermons & Guides
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Access campus discipleship manuals, small-group Bible study PDFs, sermon recordings, and spiritual growth materials.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c.value}
              onClick={() => setSelectedCategory(c.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                selectedCategory === c.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.icon}
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resources..."
            className="w-full text-xs pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                {item.category.replace('_', ' ')}
              </span>

              <h4 className="font-bold text-sm text-slate-900 leading-snug">
                {item.title}
              </h4>

              {item.speakerAuthor && (
                <div className="text-xs text-slate-500 font-medium">
                  By {item.speakerAuthor}
                </div>
              )}

              {item.description && (
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">{item.createdAt}</span>

              {item.externalMediaUrl ? (
                <a
                  href={item.externalMediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1 transition"
                >
                  <span>Listen / Watch</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  onClick={() => alert(`Downloading: ${item.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-1 transition"
                >
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

