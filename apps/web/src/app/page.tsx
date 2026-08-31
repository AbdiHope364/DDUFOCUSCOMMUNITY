'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../lib/store';
import { DailyWordCard } from '../components/daily-word-card';
import { SectionCard } from '../components/section-card';
import {
  Flame,
  Calendar,
  Users,
  BookOpen,
  ArrowRight,
  Sparkles,
  Heart,
  ShieldCheck,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquareQuote,
  Layers
} from 'lucide-react';

export default function HomePage() {
  const [, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const sections = store.sections.slice(0, 6);
  const upcomingEvents = store.events.slice(0, 3);
  const announcements = store.announcements.slice(0, 2);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 border-b border-blue-900/40">
        {/* Background glow elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          {/* Official Fellowship Logo Avatar */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl ring-4 ring-amber-400/50 flex items-center justify-center animate-in zoom-in">
              <img
                src="/logo.png"
                alt="Dire Dawa University FOCUS Student Fellowship Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/70 border border-blue-700/60 text-blue-200 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Dire Dawa University Christian Student Fellowship</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto">
            Knowing Christ, Growing Together, Serving Others
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to DDU FOCUS — your spiritual home on campus. Join dynamic ministry sections, grow in daily scripture, attend inspiring fellowship programs, and impact Dire Dawa University together.
          </p>

          {/* Quick Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/sections"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Join a Ministry Section</span>
            </Link>

            <Link
              href="/events"
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-xs sm:text-sm rounded-xl transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Fellowship Programs</span>
            </Link>

            <Link
              href="/student"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
            >
              <span>Student Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Fellowship Schedule Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto text-xs">
            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl text-left">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Friday Fellowship
              </div>
              <p className="text-slate-300 text-[11px] mt-0.5">5:00 PM – 7:30 PM • Main Auditorium</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl text-left">
              <div className="text-blue-400 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Choir & Practice
              </div>
              <p className="text-slate-300 text-[11px] mt-0.5">Fridays 6:00 PM • Hall B</p>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl text-left">
              <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> EVAN Outreach
              </div>
              <p className="text-slate-300 text-[11px] mt-0.5">Saturdays 9:00 AM • Campus Quad</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DAILY WORD SPOTLIGHT SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <DailyWordCard />
      </section>

      {/* 3. "FOCUS TODAY" LIVE HUB */}
      <section id="focus-today" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-800/50 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-white uppercase">FOCUS Today Live Hub</h2>
                <p className="text-xs text-blue-200">Everything happening in fellowship today</p>
              </div>
            </div>
            <span className="text-xs font-mono bg-blue-950 px-3 py-1 rounded-full border border-blue-700 text-amber-300">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Today's Devotional Spotlight */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-blue-700/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Daily Word
                </div>
                <h4 className="font-bold text-sm text-white mt-1">Joshua 1:9 — Be Strong</h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  &quot;Be strong and courageous. Do not be afraid; the Lord your God is with you...&quot;
                </p>
              </div>
              <Link
                href="/daily-word"
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 pt-2"
              >
                <span>Read Full Devotional</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 2: Today's Fellowship Program */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-blue-700/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Next Gathering
                </div>
                <h4 className="font-bold text-sm text-white mt-1">General Campus Fellowship</h4>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> Main Auditorium • 5:00 PM
                </p>
              </div>
              <Link
                href="/events"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 pt-2"
              >
                <span>View Full Schedule</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Card 3: Active Fellowship Announcement */}
            <div className="bg-slate-950/60 rounded-2xl p-4 border border-blue-700/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider font-bold text-purple-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Announcements
                </div>
                <h4 className="font-bold text-sm text-white mt-1">{announcements[0]?.title || 'Welcome back to DDU!'}</h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                  {announcements[0]?.content || 'General fellowship meets every Friday at 5:00 PM.'}
                </p>
              </div>
              <Link
                href="/student"
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 pt-2"
              >
                <span>Student Bulletin</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTIONS & MINISTRIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Ministry Sections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Find Your Place to Serve & Grow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mt-1">
              DDU FOCUS features specialized student ministry teams. Select a section, submit your application, and get approved by section leadership.
            </p>
          </div>

          <Link
            href="/sections"
            className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs rounded-xl transition flex items-center gap-1.5 border border-blue-200"
          >
            <span>View All Sections ({store.sections.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </section>

      {/* 5. UPCOMING FELLOWSHIP EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Fellowship Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Upcoming Programs & Gatherings
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mt-1">
              From weekly Friday fellowship to choir rehearsals and community outreaches.
            </p>
          </div>

          <Link
            href="/events"
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5 border border-slate-300 dark:border-slate-700"
          >
            <span>Full Calendar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                    {evt.sectionName || 'General Fellowship'}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${evt.audience === 'PUBLIC' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300' : 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300'}`}>
                    {evt.audience === 'PUBLIC' ? 'Open to All' : 'Members Only'}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                  {evt.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{new Date(evt.startTime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{evt.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TESTIMONIES OF CAMPUS FAITH */}
      <section className="bg-slate-100 dark:bg-slate-900/50 py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Campus Testimonies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              How DDU FOCUS Impacts Student Lives
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="text-amber-500 text-2xl font-serif">“</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &quot;Joining the Choir Ministry gave me a family in my 1st year at DDU when everything felt overwhelming. Serving God through worship kept my priorities grounded.&quot;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Kalkidan Assefa</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Mechanical Engineering, Year 3</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="text-amber-500 text-2xl font-serif">“</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &quot;The EVAN outreach team taught me how to share Christ boldly with my classmates. It completely transformed my campus mindset from just studying to living with purpose.&quot;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Natnael Kebede</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Civil Engineering, Year 5</div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="text-amber-500 text-2xl font-serif">“</div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                &quot;Through the Charity team, we were able to provide study materials and food support to fellow students in need. DDU FOCUS is Christ’s love in practical action.&quot;
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Sara Hailu</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Public Health, Year 4</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. COMMUNITY CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md mx-auto flex items-center justify-center text-amber-300">
            <Flame className="w-8 h-8 fill-amber-300" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your FOCUS Journey at DDU?
          </h2>

          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            Whether you sing, love outreach, serve behind the scenes in facilities, or care for community charity, there is a place for you in the fellowship.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/sections"
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition transform hover:scale-105"
            >
              Explore Ministry Sections
            </Link>

            <Link
              href="/prayer-wall"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm rounded-xl transition"
            >
              Visit Community Prayer Wall
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

