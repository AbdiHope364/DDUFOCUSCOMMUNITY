'use client';

import React, { useEffect, useState } from 'react';
import { store } from '../lib/store';
import { Persona } from '../types';
import { Users, Shield, Award, CheckCircle2, RotateCcw } from 'lucide-react';

export function PersonaSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [activePersona, setActivePersona] = useState<Persona>(store.activePersona);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    store.initClient();
    setActivePersona(store.activePersona);
    const unsub = store.subscribe(() => {
      setActivePersona(store.activePersona);
    });
    return unsub;
  }, []);

  const handleSelect = (p: Persona) => {
    store.setPersona(p.id);
    setIsOpen(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1"><Shield className="w-3 h-3"/> Super Admin</span>;
      case 'SECTION_LEADER':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1"><Award className="w-3 h-3"/> Section Leader</span>;
      case 'STUDENT':
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Student</span>;
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50 shadow-md">
      <div className="flex items-center gap-2">
        <span className="font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-amber-400" />
          Interactive Role Switcher:
        </span>
        <span className="text-slate-300 hidden sm:inline">Currently viewing as</span>
        <div className="flex items-center gap-2 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
          <img src={activePersona.avatar} alt={activePersona.name} className="w-5 h-5 rounded-full object-cover" />
          <span className="font-medium text-white">{activePersona.name}</span>
          {getRoleBadge(activePersona.role)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded transition flex items-center gap-1.5"
          >
            <span>Switch Role / User</span>
            <span className="text-[10px]">▼</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                Select Persona to Test Workflows:
              </div>
              <div className="space-y-1 mt-1">
                {store.personas.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className={`w-full text-left p-2 rounded-md flex items-center gap-2.5 transition ${
                      activePersona.id === p.id ? 'bg-amber-500/20 border border-amber-500/50 text-white' : 'hover:bg-slate-800 text-slate-300'
                    }`}
                  >
                    <img src={p.avatar} alt={p.name} className="w-7 h-7 rounded-full object-cover border border-slate-600" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-xs truncate flex items-center justify-between">
                        <span>{p.name}</span>
                        {p.role === 'SUPER_ADMIN' && <span className="text-[10px] text-purple-400">Admin</span>}
                        {p.role === 'SECTION_LEADER' && <span className="text-[10px] text-blue-400">Leader</span>}
                        {p.role === 'STUDENT' && <span className="text-[10px] text-emerald-400">Student</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{p.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            if (confirm('Reset store demo data to initial defaults?')) {
              store.resetToDefaults();
            }
          }}
          title="Reset demo data"
          className="p-1 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

