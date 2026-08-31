'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { store } from '../../../lib/store';
import { Section, SectionMember, Event, Announcement } from '../../../types';
import { ApplicationModal } from '../../../components/application-modal';
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  UserPlus,
  Shield,
  Flame,
  Sparkles,
  CheckCircle2,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function SectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [section, setSection] = useState<Section | undefined>(undefined);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [, setRerender] = useState(0);

  useEffect(() => {
    const update = () => {
      const found = store.sections.find((s) => s.slug === slug);
      setSection(found);
      setRerender((v) => v + 1);
    };
    update();
    const unsub = store.subscribe(update);
    return unsub;
  }, [slug]);

  if (!section) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Ministry Section Not Found</h2>
        <p className="text-xs text-slate-500">The section &quot;{slug}&quot; does not exist or has been renamed.</p>
        <Link
          href="/sections"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sections Directory
        </Link>
      </div>
    );
  }

  const sectionMembers = store.members.filter((m) => m.sectionId === section.id);
  const sectionEvents = store.events.filter((e) => e.sectionId === section.id);
  const sectionAnnouncements = store.announcements.filter((a) => a.sectionId === section.id);
  const student = store.activePersona.studentProfile;
  const isMember = sectionMembers.some((m) => m.studentId === student?.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Back Navigation */}
      <Link
        href="/sections"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Sections</span>
      </Link>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 text-white border border-slate-800">
        <div className="relative h-64 sm:h-80 w-full">
          {section.coverImageUrl && (
            <img
              src={section.coverImageUrl}
              alt={section.name}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

          {/* Banner Content */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Official DDU FOCUS Section
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight drop-shadow-md">
                {section.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                {section.leaderName && (
                  <span className="flex items-center gap-1 font-semibold text-amber-300">
                    <Shield className="w-3.5 h-3.5" /> Leader: {section.leaderName}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" /> {section.memberCount} Active Members
                </span>
              </div>
            </div>

            {/* Action CTA */}
            {isMember ? (
              <div className="px-4 py-2.5 rounded-xl bg-emerald-600/90 backdrop-blur-md text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-emerald-400/40">
                <CheckCircle2 className="w-4 h-4" />
                <span>You are an Active Member</span>
              </div>
            ) : (
              <button
                onClick={() => setShowApplyModal(true)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl transition transform hover:scale-105 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Apply to Join {section.name}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Schedule + Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: About & Announcements & Events (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs text-blue-700">
              Ministry Vision & Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {section.description}
            </p>
          </div>

          {/* Section Announcements */}
          {sectionAnnouncements.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="w-4 h-4" /> Section Announcements
              </h3>
              <div className="space-y-3">
                {sectionAnnouncements.map((ann) => (
                  <div
                    key={ann.id}
                    className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 text-xs space-y-1"
                  >
                    <div className="font-bold text-slate-900">{ann.title}</div>
                    <p className="text-slate-600 leading-relaxed">{ann.content}</p>
                    <div className="text-[10px] text-slate-400 pt-1">
                      Posted {new Date(ann.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Section Activities */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Upcoming Section Activities & Practice
            </h3>
            {sectionEvents.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">
                No special events scheduled this week. Regular meeting times apply.
              </p>
            ) : (
              <div className="space-y-3">
                {sectionEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{evt.title}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {evt.audience}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{evt.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1 border-t border-slate-200/60">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {new Date(evt.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {evt.venue}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Schedule & Active Roster (1 col) */}
        <div className="space-y-6">
          {/* Meeting Schedule Box */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Meeting Times & Venue
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Schedule:</div>
                <div className="text-slate-100 font-medium mt-0.5">
                  {section.meetingSchedule || 'Fridays at 6:00 PM'}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Location:</div>
                <div className="text-slate-100 font-medium mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{section.meetingLocation || 'Hall B / Main Sanctuary'}</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Section Capacity:</div>
                <div className="text-slate-100 font-medium mt-0.5">
                  {section.memberCount} of {section.maxMembers} spots filled
                </div>
              </div>
            </div>

            {!isMember && (
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow transition"
              >
                Join This Section
              </button>
            )}
          </div>

          {/* Member Roster Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 uppercase tracking-wider">Active Roster</span>
              <span className="text-slate-500 font-semibold">{sectionMembers.length} members</span>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {sectionMembers.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No members listed yet.</p>
              ) : (
                sectionMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                  >
                    <span className="font-medium text-slate-800">{m.studentName}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                      {m.role}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplicationModal
          section={section}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </div>
  );
}

