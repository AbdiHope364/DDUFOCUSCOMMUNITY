'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@ddu-focus/shared';
import { PersonaSwitcher } from './persona-switcher';
import {
  LayoutDashboard,
  FileCheck,
  Calendar,
  BookOpen,
  QrCode,
  Users,
  Award,
  Bell,
  Clock,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function AdminNav() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview Console', icon: LayoutDashboard },
    { href: '/applications', label: 'Membership Queue', icon: FileCheck },
    { href: '/daily-word', label: '365 Devotionals', icon: BookOpen },
    { href: '/attendance', label: 'Hall QR Projector', icon: QrCode },
    { href: '/sections', label: 'Ministry Sections', icon: Users },
    { href: '/volunteers', label: 'Service Hours', icon: Award },
    { href: '/announcements', label: 'Broadcast Alerts', icon: Bell },
    { href: '/academic-years', label: 'Academic Term', icon: Clock },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 hidden md:flex min-h-screen sticky top-0 transition-colors">
      <div className="p-4 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
            <img src="/logo.png" alt="DDU FOCUS Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              <span>DDU</span>
              <span className="text-amber-500 font-black">ADMIN</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
              Leadership Console
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 text-xs">
          {links.map((l) => {
            const isActive = pathname === l.href;
            const Icon = l.icon;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold transition ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Utilities */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">Theme Mode</span>
          <ThemeToggle showLabel={false} />
        </div>

        <a
          href="http://localhost:3000"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition flex items-center justify-between"
        >
          <span>Open Public Web</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
