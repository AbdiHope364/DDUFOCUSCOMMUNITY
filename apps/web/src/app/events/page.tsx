'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../../lib/store';
import { Event } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Bookmark
} from 'lucide-react';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>(store.events);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAudience, setFilterAudience] = useState<'ALL' | 'PUBLIC' | 'MEMBERS_ONLY'>('ALL');
  const [rsvpdEvents, setRsvpdEvents] = useState<string[]>([]);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setEvents([...store.events]);
    });
    return unsub;
  }, []);

  const handleRSVP = (id: string) => {
    if (rsvpdEvents.includes(id)) {
      setRsvpdEvents(rsvpdEvents.filter((e) => e !== id));
    } else {
      setRsvpdEvents([...rsvpdEvents, id]);
    }
  };

  const filtered = events.filter((e) => {
    const matchQuery =
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.sectionName && e.sectionName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchAudience =
      filterAudience === 'ALL' || e.audience === filterAudience;

    return matchQuery && matchAudience;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 shadow-lg border border-blue-800/40">
        <span className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" /> DDU FOCUS Fellowship Calendar
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-2">
          Programs, Services & Outreach Events
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
          Stay connected with campus fellowships, section practice schedules, prayer walks, and special ministry workshops.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search programs by title or ministry..."
            className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterAudience('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterAudience === 'ALL'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            All Events
          </button>
          <button
            onClick={() => setFilterAudience('PUBLIC')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterAudience === 'PUBLIC'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Open to All Students
          </button>
          <button
            onClick={() => setFilterAudience('MEMBERS_ONLY')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              filterAudience === 'MEMBERS_ONLY'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Section Members Only
          </button>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((evt) => {
          const isRsvpd = rsvpdEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                    {evt.sectionName || 'General Fellowship'}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      evt.audience === 'PUBLIC'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {evt.audience === 'PUBLIC' ? 'Public Gathering' : 'Members Only'}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {evt.description}
                </p>

                {evt.speakerName && (
                  <div className="text-xs text-slate-700 font-medium pt-1">
                    <span className="text-slate-400">Speaker/Lead:</span> {evt.speakerName}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="space-y-1 text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {new Date(evt.startTime).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRSVP(evt.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isRsvpd
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  {isRsvpd ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>RSVP Confirmed ✓</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>I&apos;m Attending</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

