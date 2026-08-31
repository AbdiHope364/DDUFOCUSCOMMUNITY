import React from 'react';
import Link from 'next/link';
import { Flame, Heart, Phone, Mail, MapPin, ShieldAlert, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Flame className="w-5 h-5 fill-amber-300 text-amber-300" />
              </div>
              <div className="font-bold text-lg text-white tracking-tight">
                DDU <span className="text-blue-400">FOCUS</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fellowship of Christian University Students at Dire Dawa University. Raising disciples of Jesus Christ who shine in academics, campus life, and societal leadership.
            </p>
            <div className="text-xs text-amber-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> &quot;Be strong and courageous.&quot; — Joshua 1:9
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/sections" className="hover:text-blue-400 transition">Ministry Sections & Teams</Link></li>
              <li><Link href="/events" className="hover:text-blue-400 transition">Fellowship Programs & Calendar</Link></li>
              <li><Link href="/daily-word" className="hover:text-blue-400 transition">Daily Word Archive</Link></li>
              <li><Link href="/resources" className="hover:text-blue-400 transition">Bible Study Notes & Sermons</Link></li>
              <li><Link href="/prayer-wall" className="hover:text-blue-400 transition">Community Prayer Wall</Link></li>
            </ul>
          </div>

          {/* Col 3: Student Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Student & Leadership</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/student" className="hover:text-emerald-400 transition">Student Personal Dashboard</Link></li>
              <li><Link href="/student/sections" className="hover:text-emerald-400 transition">My Section Applications</Link></li>
              <li><Link href="/student/attendance" className="hover:text-emerald-400 transition">Dynamic QR Attendance Scanner</Link></li>
              <li><Link href="/student/journey" className="hover:text-emerald-400 transition">My FOCUS Journey Checklist</Link></li>
              <li><Link href="/student/volunteers" className="hover:text-emerald-400 transition">Service Hours & Certificates</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition">Leadership Management Console</Link></li>
            </ul>
          </div>

          {/* Col 4: Campus Fellowship Info & Pastoral Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Fellowship & Support</h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Dire Dawa University Main Campus, Main Auditorium / Hall B</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>focus@ddu.edu.et</span>
              </div>
              <div className="pt-2">
                <Link
                  href="/help"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition text-xs font-medium"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Need Someone to Talk To?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} DDU FOCUS. Developed by DDU Software Engineering Department.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with faith and excellence for Dire Dawa University</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}

