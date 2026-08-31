'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Section } from '@/types';
import {
  Layers,
  PlusCircle,
  Users,
  Calendar,
  MapPin,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Send
} from 'lucide-react';

export default function AdminSectionsPage() {
  const [, setRerender] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Users');
  const [coverImageUrl, setCoverImageUrl] = useState('https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80');
  const [meetingSchedule, setMeetingSchedule] = useState('Thursdays at 6:00 PM');
  const [meetingLocation, setMeetingLocation] = useState('Block 40, Seminar Room');
  const [leaderName, setLeaderName] = useState('');
  const [maxMembers, setMaxMembers] = useState(40);

  useEffect(() => {
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim() || !description.trim()) return;

    store.addSection({
      name,
      slug: slug.toLowerCase().replace(/\s+/g, '-'),
      description,
      icon,
      coverImageUrl,
      meetingSchedule,
      meetingLocation,
      leaderName: leaderName || 'To Be Appointed',
      maxMembers: Number(maxMembers),
      status: 'PUBLISHED',
    });

    setShowAddModal(false);
    setName('');
    setSlug('');
    setDescription('');
  };

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
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-6 border border-indigo-900/40">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-indigo-400/20 text-indigo-300 border border-indigo-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Dynamic Ministry Management
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Fellowship Sections Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Create and expand fellowship sections dynamically (e.g. Media Team, Worship Team, Prayer Ministry, Academic Support) without altering source code.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Add New Section</span>
        </button>
      </div>

      {/* Sections Table & List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider">
            Active Ministry Sections ({store.sections.length})
          </h3>
          <span className="text-slate-400 text-[11px]">Database-Managed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {store.sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-base text-slate-900">{sec.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                    {sec.memberCount} members
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-2">{sec.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                <div><span className="font-semibold text-slate-700">Leader:</span> {sec.leaderName || 'Unassigned'}</div>
                <div><span className="font-semibold text-slate-700">Schedule:</span> {sec.meetingSchedule}</div>
                <div><span className="font-semibold text-slate-700">Venue:</span> {sec.meetingLocation}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Section Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-600" />
              <span>Create New Fellowship Section</span>
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Section Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (!slug) setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }}
                    placeholder="e.g. Media & Projection Team"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. media-team"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ministry Description *</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the ministry's purpose, activities, and role in fellowship..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Section Leader</label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="e.g. Eyob Tadesse"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Schedule</label>
                  <input
                    type="text"
                    value={meetingSchedule}
                    onChange={(e) => setMeetingSchedule(e.target.value)}
                    placeholder="e.g. Wednesdays at 5:00 PM"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meeting Location</label>
                  <input
                    type="text"
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    placeholder="e.g. Block 40 Room 102"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Create Section</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

