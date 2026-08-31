'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { store } from '../lib/store';
import { Persona, Notification } from '../types';
import {
  Flame,
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
  ChevronRight
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
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-[37px] z-40 shadow-sm transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-full overflow-hidden bg-white shadow-md border border-slate-200 flex items-center justify-center p-0.5 group-hover:scale-105 transition transform shrink-0">
              <img
                src="/logo.png"
                alt="DDU FOCUS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight flex items-center gap-1">
                <span>DDU</span>
                <span className="text-blue-600 font-black">FOCUS</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                Student Fellowship
              </p>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs(!showNotifs)}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full relative transition"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {showNotifs && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="font-semibold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-blue-600" /> Notifications ({unreadCount} unread)
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          notifications.forEach((n) => store.markNotificationRead(n.id));
                        }}
                        className="text-[11px] text-blue-600 hover:underline font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-6">No notifications yet.</p>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`py-2.5 px-2 rounded-lg transition ${
                            notif.isRead ? 'opacity-70 hover:bg-slate-50' : 'bg-blue-50/50 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-xs text-slate-900">{notif.title}</div>
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
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{notif.message}</p>
                          {notif.actionUrl && (
                            <Link
                              href={notif.actionUrl}
                              onClick={() => {
                                store.markNotificationRead(notif.id);
                                setShowNotifs(false);
                              }}
                              className="text-[11px] font-semibold text-blue-600 hover:underline inline-flex items-center gap-0.5 mt-1"
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                  pathname.startsWith('/student')
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Student Hub</span>
              </Link>

              {isLeaderOrAdmin && (
                <Link
                  href="/admin"
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                    pathname.startsWith('/admin')
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>
                    {activePersona.role === 'SUPER_ADMIN' ? 'Admin Console' : `${activePersona.title.split(' ')[0]} Console`}
                  </span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === link.href ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/student"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2 text-center bg-emerald-600 text-white text-xs font-semibold rounded-lg shadow"
            >
              Student Portal Hub
            </Link>
            {isLeaderOrAdmin && (
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 text-center bg-blue-600 text-white text-xs font-semibold rounded-lg shadow"
              >
                Leadership & Admin Console
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

