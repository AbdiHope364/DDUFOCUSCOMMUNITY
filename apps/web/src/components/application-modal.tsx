'use client';

import React, { useState } from 'react';
import { store } from '../lib/store';
import { Section } from '../types';
import {
  X,
  CheckCircle,
  AlertCircle,
  Calendar,
  Send,
  User,
  Phone,
  GraduationCap,
  Building,
  Home,
  HeartHandshake,
  Sparkles,
  Shield
} from 'lucide-react';

interface ApplicationModalProps {
  section: Section;
  onClose: () => void;
}

const DDU_DEPARTMENTS = [
  'Software Engineering',
  'Computer Science',
  'Electrical & Computer Engineering',
  'Civil Engineering',
  'Mechanical Engineering',
  'Chemical Engineering',
  'Biomedical Engineering',
  'Architecture & Urban Planning',
  'Medicine & Health Sciences',
  'Public Health',
  'Nursing',
  'Pharmacy',
  'Medical Laboratory Science',
  'Business Administration & Management',
  'Accounting & Finance',
  'Economics',
  'Law & Governance',
  'Natural & Computational Sciences',
  'Social Sciences & Humanities',
  'Other / Freshmen Division'
];

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export function ApplicationModal({ section, onClose }: ApplicationModalProps) {
  const activeStudent = store.activePersona.studentProfile;

  // Student Identity Fields
  const [studentName, setStudentName] = useState(store.activePersona.name || '');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [studentIdNumber, setStudentIdNumber] = useState(activeStudent?.studentIdNumber || 'DDU/R/1042/15');
  const [department, setDepartment] = useState(activeStudent?.department || 'Software Engineering');
  const [yearLevel, setYearLevel] = useState<number>(activeStudent?.yearLevel || 4);
  const [phoneNumber, setPhoneNumber] = useState('+251 91 102 3456');
  const [dormInfo, setDormInfo] = useState('Block 43, Room 204');
  const [spiritualBackground, setSpiritualBackground] = useState('DDU FOCUS Campus Fellowship');

  // Ministry Fields
  const [motivation, setMotivation] = useState('');
  const [skillsExperience, setSkillsExperience] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'BEGINNER' | 'INTERMEDIATE' | 'EXPERIENCED'>('BEGINNER');
  const [availabilityDays, setAvailabilityDays] = useState<string[]>(['Friday', 'Sunday']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  const toggleDay = (day: string) => {
    if (availabilityDays.includes(day)) {
      setAvailabilityDays(availabilityDays.filter((d) => d !== day));
    } else {
      setAvailabilityDays([...availabilityDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setFeedback({ success: false, message: 'Please enter your full name.' });
      return;
    }
    if (!phoneNumber.trim()) {
      setFeedback({ success: false, message: 'Please enter your phone number so leaders can contact you.' });
      return;
    }
    if (!motivation.trim()) {
      setFeedback({ success: false, message: 'Please share your motivation for joining this ministry section.' });
      return;
    }

    setIsSubmitting(true);
    const res = store.applyToSection({
      sectionId: section.id,
      studentName,
      studentDept: department,
      studentYear: Number(yearLevel),
      gender,
      phoneNumber,
      studentIdNumber,
      dormInfo,
      spiritualBackground,
      motivation,
      skillsExperience,
      experienceLevel,
      availabilityDays,
    });

    setIsSubmitting(false);
    setFeedback(res);

    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            {section.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-1.5">
              <span>Section Membership Registration:</span>
              <span className="text-blue-600">{section.name}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Please complete your student profile and ministry details. Reviewed directly by {section.name} leadership.
            </p>
          </div>
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            className={`my-4 p-3.5 rounded-2xl text-xs flex items-center gap-2.5 ${
              feedback.success
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                : 'bg-rose-50 text-rose-900 border border-rose-300'
            }`}
          >
            {feedback.success ? (
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <span className="font-medium leading-relaxed">{feedback.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* PART 1: STUDENT PERSONAL & ACADEMIC INFORMATION */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-blue-800">
              <User className="w-4 h-4 text-blue-600" />
              <span>1. Student Identity & Academic Profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Abdi Tesfaye"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                />
              </div>

              {/* Sex / Gender */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Sex / Gender <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('MALE')}
                    className={`py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 border ${
                      gender === 'MALE'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>👨 Male</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('FEMALE')}
                    className={`py-2 px-3 rounded-xl font-bold transition flex items-center justify-center gap-1.5 border ${
                      gender === 'FEMALE'
                        ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>👩 Female</span>
                  </button>
                </div>
              </div>

              {/* Student ID Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  DDU Student ID Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentIdNumber}
                  onChange={(e) => setStudentIdNumber(e.target.value)}
                  placeholder="e.g. DDU/R/1042/15"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-mono"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Phone Number (Telegram / Calling) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +251 91 123 4567"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                  />
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Department / Field of Study <span className="text-rose-500">*</span>
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  {DDU_DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Level */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Academic Year Level <span className="text-rose-500">*</span>
                </label>
                <select
                  value={yearLevel}
                  onChange={(e) => setYearLevel(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium"
                >
                  <option value={1}>1st Year (Freshman)</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                  <option value={5}>5th Year</option>
                  <option value={6}>6th Year / Graduating Class</option>
                </select>
              </div>

              {/* Dorm Location */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Campus Dormitory / Residence Info
                </label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={dormInfo}
                    onChange={(e) => setDormInfo(e.target.value)}
                    placeholder="e.g. Block 43, Room 204 or Non-Dorm"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* Spiritual Background / Home Church */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Home Church / Fellowship Background
                </label>
                <div className="relative">
                  <Home className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={spiritualBackground}
                    onChange={(e) => setSpiritualBackground(e.target.value)}
                    placeholder="e.g. Full Gospel, Kale Heywet, Mulu Wongel"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* PART 2: MINISTRY MOTIVATION & AVAILABILITY */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-indigo-800">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>2. Ministry Calling, Skills & Availability</span>
            </div>

            {/* Motivation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Why would you like to join {section.name}? <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                placeholder="Share your spiritual desire, passion, and how you wish to serve fellow students..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            {/* Relevant Skills & Experience */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Relevant Skills, Talents & Ministry Experience
              </label>
              <textarea
                rows={2}
                value={skillsExperience}
                onChange={(e) => setSkillsExperience(e.target.value)}
                placeholder="e.g. Vocal tenor, acoustic guitar, sound mixer, evangelism tracts, event logistics, charity drives..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Experience Level in this Field
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['BEGINNER', 'INTERMEDIATE', 'EXPERIENCED'] as const).map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setExperienceLevel(lvl)}
                    className={`py-2 px-3 rounded-xl font-bold border text-center transition capitalize ${
                      experienceLevel === lvl
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {lvl.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Weekly Availability Checkboxes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Weekly Availability (Select days you are free for rehearsals/meetings)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DAYS_OF_WEEK.map((day) => {
                  const isSelected = availabilityDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border text-center transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{day}</span>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Action Buttons */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black rounded-xl shadow-lg transition transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application to Leader'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
