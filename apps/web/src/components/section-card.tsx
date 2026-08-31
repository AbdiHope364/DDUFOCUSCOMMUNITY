'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Section } from '../types';
import { ApplicationModal } from './application-modal';
import {
  Users,
  Calendar,
  MapPin,
  Music,
  BookOpen,
  Shield,
  HeartHandshake,
  Settings,
  Heart,
  Camera,
  ArrowRight,
  UserPlus
} from 'lucide-react';

interface SectionCardProps {
  section: Section;
}

export function SectionCard({ section }: SectionCardProps) {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const getSectionIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'music':
        return <Music className="w-5 h-5" />;
      case 'bookopen':
        return <BookOpen className="w-5 h-5" />;
      case 'shield':
        return <Shield className="w-5 h-5" />;
      case 'hearthandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'settings':
        return <Settings className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'camera':
        return <Camera className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
        {/* Cover Image Banner */}
        <div className="relative h-44 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          {section.coverImageUrl ? (
            <img
              src={section.coverImageUrl}
              alt={section.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-blue-700 to-indigo-900 flex items-center justify-center text-white/40">
              <Users className="w-12 h-12" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

          {/* Top Badge: Member count */}
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-amber-300 border border-slate-700/50 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow">
            <Users className="w-3 h-3" />
            <span>{section.memberCount} members</span>
          </div>

          {/* Section Name & Icon */}
          <div className="absolute bottom-3 left-3 right-3 text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/90 backdrop-blur-md flex items-center justify-center shadow-lg border border-blue-400/40 shrink-0">
              {getSectionIcon(section.icon)}
            </div>
            <h3 className="font-bold text-base leading-tight drop-shadow truncate">
              {section.name}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {section.description}
          </p>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            {section.leaderName && (
              <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
                <span className="text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500">Leader:</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{section.leaderName}</span>
              </div>
            )}
            {section.meetingSchedule && (
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate">{section.meetingSchedule}</span>
              </div>
            )}
            {section.meetingLocation && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{section.meetingLocation}</span>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/sections/${section.slug}`}
              className="py-2 px-3 text-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition flex items-center justify-center gap-1"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={() => setShowApplyModal(true)}
              className="py-2 px-3 text-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm flex items-center justify-center gap-1 hover:shadow"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join</span>
            </button>
          </div>
        </div>
      </div>

      {showApplyModal && (
        <ApplicationModal
          section={section}
          onClose={() => setShowApplyModal(false)}
        />
      )}
    </>
  );
}
