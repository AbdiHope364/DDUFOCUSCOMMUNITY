'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { store } from '../../../lib/store';
import { Certificate } from '../../../components/certificate';
import {
  Heart,
  Award,
  PlusCircle,
  Clock,
  ArrowLeft,
  X
} from 'lucide-react';

export default function StudentVolunteersPage() {
  const [, setRerender] = useState(0);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form states
  const [activityName, setActivityName] = useState('');
  const [hoursServed, setHoursServed] = useState<number>(3);
  const [serviceDate, setServiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [selectedSection, setSelectedSection] = useState('sec-charity');

  useEffect(() => {
    store.initClient();
    const unsub = store.subscribe(() => setRerender((v) => v + 1));
    return unsub;
  }, []);

  const activePersona = store.activePersona;
  const student = activePersona.studentProfile;
  const myLogs = store.volunteerLogs.filter((v) => v.studentId === student?.id);
  const verifiedLogs = myLogs.filter((v) => v.isVerified);
  const totalHours = verifiedLogs.reduce((sum, v) => sum + v.hoursServed, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim() || hoursServed <= 0) return;

    store.logVolunteerHours({
      activityName,
      hoursServed: Number(hoursServed),
      serviceDate,
      sectionId: selectedSection,
      description,
    });

    setShowLogModal(false);
    setActivityName('');
    setDescription('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        href="/student"
        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Student Hub</span>
      </Link>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-amber-950 text-white rounded-3xl p-8 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="px-3 py-1 bg-rose-400/20 text-rose-300 border border-rose-400/30 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-rose-300" /> Community Service & Volunteer Hub
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Volunteer Hours & Certification
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Log your charity campaigns, campus cleanups, and service activities. Verified hours generate an official DDU FOCUS Certificate of Service.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="bg-slate-950/80 px-5 py-3 rounded-2xl border border-slate-800 text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-400">{totalHours.toFixed(1)}h</div>
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Verified Hours</div>
          </div>

          <button
            onClick={() => setShowLogModal(true)}
            className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Log Service Hours</span>
          </button>
        </div>
      </div>

      {/* Service Hours History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Logged Volunteer Activities ({myLogs.length})
          </h3>
          <span className="text-slate-400 dark:text-slate-500 text-[11px]">Reviewed by Charity Ministry Lead</span>
        </div>

        <div className="space-y-3">
          {myLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1 max-w-lg">
                <div className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                  <span>{log.activityName}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      log.isVerified
                        ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                        : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {log.isVerified ? 'Verified ✓' : '🟡 Pending Verification'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{log.description}</p>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                  <span>Date: {log.serviceDate}</span>
                  {log.verifiedBy && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">• Approved by {log.verifiedBy}</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-slate-900 dark:text-white">{log.hoursServed.toFixed(1)} hrs</div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Credit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Certificate Section */}
      {totalHours > 0 && student && (
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="font-bold text-lg text-slate-900 dark:text-white">Your Official Fellowship Certificate</h2>
          </div>
          <Certificate
            studentName={activePersona.name}
            studentId={student.studentIdNumber}
            department={student.department}
            hoursServed={totalHours}
          />
        </div>
      )}

      {/* Log Hours Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                <span>Log Volunteer / Service Hours</span>
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Activity Name *</label>
                <input
                  type="text"
                  required
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                  placeholder="e.g. Hospital Visitation, Campus Clean-up, Tutoring"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hours Served *</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    required
                    value={hoursServed}
                    onChange={(e) => setHoursServed(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Service Date *</label>
                  <input
                    type="date"
                    required
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ministry Section Affiliation</label>
                <select
                  value={selectedSection}
                  onChange={(e) => setSelectedSection(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  {store.sections.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description / Notes</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your volunteer contribution..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow transition"
                >
                  Submit Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
