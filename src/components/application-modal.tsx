'use client';

import React, { useState } from 'react';
import { store } from '../lib/store';
import { Section } from '../types';
import { X, CheckCircle, AlertCircle, Calendar, Send, Sparkles } from 'lucide-react';

interface ApplicationModalProps {
  section: Section;
  onClose: () => void;
}

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
    if (!motivation.trim()) {
      setFeedback({ success: false, message: 'Please provide a short motivation statement.' });
      return;
    }

    setIsSubmitting(true);
    const res = store.applyToSection({
      sectionId: section.id,
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
      <div className="bg-white text-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
            {section.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <span>Apply to Join</span>
              <span className="text-blue-600">{section.name}</span>
            </h3>
            <p className="text-xs text-slate-500">
              Your application will be reviewed directly by the {section.name} Section Leader.
            </p>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`my-4 p-3 rounded-xl text-xs flex items-center gap-2 ${
              feedback.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {feedback.success ? (
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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
              placeholder="Share your spiritual desire, passion, and how you want to serve..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Skills & Experience */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Relevant Skills & Experience
            </label>
            <textarea
              rows={2}
              value={skillsExperience}
              onChange={(e) => setSkillsExperience(e.target.value)}
              placeholder="e.g. Singing vocal range, past evangelism, stage setup, instruments played..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Experience Tier */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['BEGINNER', 'INTERMEDIATE', 'EXPERIENCED'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setExperienceLevel(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition capitalize ${
                    experienceLevel === lvl
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lvl.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Checkbox Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span>Weekly Availability (Select days you are free for practice/outreach)</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = availabilityDays.includes(day);
                return (
                  <button
                    type="button"
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-medium border text-center transition flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 border-blue-300'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{day.substring(0, 3)}</span>
                    {isSelected && <CheckCircle className="w-3 h-3 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

