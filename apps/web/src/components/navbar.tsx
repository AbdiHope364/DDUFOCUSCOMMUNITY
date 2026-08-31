'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { store } from '../lib/store';
import { Persona, Notification } from '../types';
import { ThemeToggle } from '@ddu-focus/shared';
import {
  Bell,
  CheckCircle,
  Calendar,
  Layers,
  BookOpen,
  Heart,
  Users,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const [activePersona, setActivePersona] = useState<Persona>(store.activePersona);
  const [notifications, setNotifications] = useState<Notification[]>(store.notifications);
  const [showNotifs, setShowNotifs] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    store.initClient();
    setActivePersona(store.activePersona);
    setNotifications([...store.notifications]);
    const unsub = store.subscribe(() => {
      setActivePersona(store.activePersona);
      setNotifications([...store.notifications]);
    });
    return unsub;
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isLeaderOrAdmin =
    activePersona.role === 'SUPER_ADMIN' ||
    activePersona.role === 'FOCUS_COORDINATOR' ||
    activePersona.role === 'SECTION_LEADER' ||
    activePersona.role === 'EVENT_MANAGER' ||
    activePersona.role === 'CONTENT_MANAGER';

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Ministries & Sections', href: '/sections' },
    { label: 'Events & Calendar', href: '/events' },
    { label: 'Daily Word', href: '/daily-word' },
    { label: 'Resources', href: '/resources' },
    { label: 'Prayer Wall', href: '/prayer-wall' },
    { label: 'Leaders', href: '/leaders' },
  ];

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-[37px] z-40 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center p-0.5 group-hover:scale-105 transition transform shrink-0">
              <img
                src="/logo.png"
                alt="DDU FOCUS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
                <span>DDU</span>
                <span className="text-blue-600 dark:text-blue-400 font-black">FOCUS</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase">
                Student Fellowship
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold'
                      : 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle showLabel={false} />

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl relative transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-slate-900 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Notifications ({unreadCount} unread)
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          notifications.forEach((n) => store.markNotificationRead(n.id));
                        }}
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6">No notifications yet.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`py-2.5 px-2 rounded-xl transition ${
                            notif.isRead ? 'opacity-70 hover:bg-slate-50 dark:hover:bg-slate-800/50' : 'bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-xs text-slate-900 dark:text-white">{notif.title}</div>
                            {!notif.isRead && (
                              <button
                                onClick={() => store.markNotificationRead(notif.id)}
                                title="Mark as read"
                                className="text-slate-400 hover:text-emerald-600"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">{notif.message}</p>
                          {notif.actionUrl && (
                            <Link
                              href={notif.actionUrl}
                              onClick={() => {
                                store.markNotificationRead(notif.id);
                                setShowNotifs(false);
                              }}
                              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-0.5 mt-1"
                            >
                              <span>View details</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Portal Action Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/student"
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                  pathname.startsWith('/student')
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Student Hub</span>
              </Link>

              {isLeaderOrAdmin && (
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Admin Console</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
                </a>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <nav className="space-y-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl transition ${
                  pathname === link.href
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Enter Student Hub</span>
            </Link>

            {isLeaderOrAdmin && (
              <a
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Launch Admin Console (Port 3001)</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
