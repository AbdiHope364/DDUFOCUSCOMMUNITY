'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@ddu-focus/shared';
import { store } from '../lib/store';
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
  Sparkles,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Search,
  ChevronRight,
  Radio,
  SlidersHorizontal,
  Home
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  category: 'CORE CONSOLE' | 'MINISTRIES & FELLOWSHIP' | 'OPERATIONS & TOOLS';
  icon: React.ElementType;
  badge?: number;
  badgeColor?: string;
  description: string;
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [rerender, setRerender] = useState(0);

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const pendingApps = store.applications.filter((a) => a.status === 'PENDING').length;
  const pendingVols = store.volunteerLogs.filter((v) => !v.isVerified).length;
  const activePersona = store.activePersona;

  const navItems: NavItem[] = [
    {
      href: '/',
      label: 'Overview Console',
      category: 'CORE CONSOLE',
      icon: LayoutDashboard,
      description: 'Key metrics, activity feed & urgent tasks',
    },
    {
      href: '/applications',
      label: 'Membership Queue',
      category: 'CORE CONSOLE',
      icon: FileCheck,
      badge: pendingApps,
      badgeColor: 'bg-amber-500 text-slate-950 ring-amber-300 animate-pulse',
      description: 'Review student ministry applications',
    },
    {
      href: '/attendance',
      label: 'Hall QR Projector',
      category: 'MINISTRIES & FELLOWSHIP',
      icon: QrCode,
      description: '30-second live rotating attendance token',
    },
    {
      href: '/daily-word',
      label: '365 Devotionals',
      category: 'MINISTRIES & FELLOWSHIP',
      icon: BookOpen,
      description: 'Scripture scheduler & offline fallback',
    },
    {
      href: '/sections',
      label: 'Ministry Sections',
      category: 'MINISTRIES & FELLOWSHIP',
      icon: Users,
      badge: store.sections.length,
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
      description: 'Manage rosters, leaders & descriptions',
    },
    {
      href: '/volunteers',
      label: 'Volunteer Service',
      category: 'OPERATIONS & TOOLS',
      icon: Award,
      badge: pendingVols,
      badgeColor: 'bg-rose-500 text-white ring-rose-300 animate-pulse',
      description: 'Verify community hours & certificates',
    },
    {
      href: '/announcements',
      label: 'Broadcast Alerts',
      category: 'OPERATIONS & TOOLS',
      icon: Bell,
      description: 'Send campus push notifications & news',
    },
    {
      href: '/academic-years',
      label: 'Academic Term',
      category: 'OPERATIONS & TOOLS',
      icon: Clock,
      description: 'Annual leadership handover & archive',
    },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['CORE CONSOLE', 'MINISTRIES & FELLOWSHIP', 'OPERATIONS & TOOLS'] as const;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 transition-colors duration-200">
      {/* TOP HEADER WITH RIGHT-ALIGNED TOGGLE CONTROLS */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 px-4 sm:px-6 flex items-center justify-between shadow-xs">
        {/* Left Side: Brand Crest & Breadcrumb */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 shadow-sm group-hover:scale-105 transition shrink-0">
              <img src="/logo.png" alt="DDU FOCUS Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-black text-sm sm:text-base text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                <span>DDU FOCUS</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold hidden sm:block">
                Leadership & Governance Console (Port 3001)
              </p>
            </div>
          </Link>
        </div>

        {/* MOST RIGHT SIDE: INTERACTIVE CONTROLS & TOGGLE BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto justify-end">
          {/* Live Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>Active Session</span>
          </div>

          {/* Quick Link to Public Web */}
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Public & Student Web Portal"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition border border-slate-200 dark:border-slate-700"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Public Web</span>
            <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
          </a>

          {/* RIGHT SIDE THEME TOGGLE */}
          <div className="flex items-center">
            <ThemeToggle showLabel={false} className="hover:scale-105 active:scale-95 transition transform" />
          </div>

          {/* MOST RIGHT SIDE INTERACTIVE SIDEBAR TOGGLE BUTTON (DESKTOP) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-300 border border-amber-300/80 dark:border-amber-500/40 hover:bg-amber-500/20 active:scale-95 transition transform shadow-xs font-bold text-xs"
            title={isCollapsed ? 'Expand Sidebar Menu' : 'Collapse Sidebar to Icons'}
            aria-label="Toggle Sidebar Collapse"
          >
            {isCollapsed ? (
              <>
                <PanelLeftOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden xl:inline text-[11px]">Expand Sidebar</span>
              </>
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="hidden xl:inline text-[11px]">Collapse</span>
              </>
            )}
          </button>

          {/* MOST RIGHT SIDE MOBILE DRAWER TOGGLE BUTTON */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-95 transition shadow-sm font-bold"
            aria-label="Open Mobile Sidebar Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* BODY WITH COLLAPSIBLE INTERACTIVE SIDEBAR */}
      <div className="flex flex-1 relative">
        {/* DESKTOP INTERACTIVE SIDEBAR */}
        <aside
          className={`hidden md:flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto ${
            isCollapsed ? 'w-20 p-3' : 'w-72 p-4'
          }`}
        >
          <div className="space-y-6">
            {/* Sidebar Search Filter (Hidden when collapsed) */}
            {!isCollapsed && (
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter console actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition"
                />
              </div>
            )}

            {/* Navigation Lists Grouped by Category */}
            <nav className="space-y-5">
              {categories.map((category) => {
                const itemsInCategory = filteredNavItems.filter((i) => i.category === category);
                if (itemsInCategory.length === 0) return null;

                return (
                  <div key={category} className="space-y-1.5">
                    {!isCollapsed && (
                      <div className="px-3 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                        {category}
                      </div>
                    )}

                    <div className="space-y-1">
                      {itemsInCategory.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            title={isCollapsed ? `${item.label} — ${item.description}` : undefined}
                            className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-2xl font-bold transition-all duration-200 ${
                              isActive
                                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 shadow-xs scale-[1.02]'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white hover:translate-x-1'
                            } ${isCollapsed ? 'justify-center p-3' : ''}`}
                          >
                            <div className="relative shrink-0">
                              <Icon
                                className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${
                                  isActive
                                    ? 'text-amber-600 dark:text-amber-400'
                                    : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-500'
                                }`}
                              />
                              {isCollapsed && item.badge !== undefined && item.badge > 0 && (
                                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                              )}
                            </div>

                            {!isCollapsed && (
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1.5">
                                  <span className="text-xs truncate">{item.label}</span>
                                  {item.badge !== undefined && item.badge > 0 && (
                                    <span
                                      className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                                        item.badgeColor || 'bg-slate-200 text-slate-800'
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] font-normal text-slate-400 dark:text-slate-500 truncate">
                                  {item.description}
                                </p>
                              </div>
                            )}

                            {isActive && !isCollapsed && (
                              <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 opacity-70" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Profile Card */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            {!isCollapsed ? (
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={activePersona.avatar}
                    alt={activePersona.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-400 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {activePersona.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate">
                      {activePersona.title}
                    </div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Online" />
              </div>
            ) : (
              <div className="flex justify-center">
                <img
                  src={activePersona.avatar}
                  alt={activePersona.name}
                  title={`${activePersona.name} (${activePersona.title})`}
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 shadow-sm"
                />
              </div>
            )}
          </div>
        </aside>

        {/* MOBILE SLIDE-OUT DRAWER */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white">DDU ADMIN</div>
                      <div className="text-[10px] text-amber-500 font-bold uppercase">Executive Hub</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between p-3 rounded-2xl font-bold text-xs transition ${
                          isActive
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                              isActive ? 'bg-slate-950 text-white' : item.badgeColor
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <a
                  href="http://localhost:3000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl flex items-center justify-between"
                >
                  <span>Open Public Web</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* MAIN CONSOLE CONTENT WRAPPER */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

