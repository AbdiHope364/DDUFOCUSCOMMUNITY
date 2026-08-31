'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Award, Printer, ShieldCheck, Flame, Sparkles } from 'lucide-react';

interface CertificateProps {
  studentName: string;
  studentId: string;
  department: string;
  hoursServed: number;
  verifierName?: string;
  issueDate?: string;
}

export function Certificate({
  studentName,
  studentId,
  department,
  hoursServed,
  verifierName = 'Sara Hailu (Charity Ministry Leader)',
  issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
}: CertificateProps) {
  const handlePrint = () => {
    window.print();
  };

  const verificationUrl = `https://ddu-focus.edu.et/verify/cert-${studentId}-${hoursServed}`;

  return (
    <div className="space-y-4">
      <div className="flex justify-end no-print">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export Certificate (PDF)</span>
        </button>
      </div>

      {/* Printable Certificate Frame */}
      <div className="bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 border-8 border-double border-amber-600/60 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden text-center text-slate-900 font-serif">
        {/* Corner Ornaments */}
        <div className="absolute top-3 left-3 text-amber-600/40 text-xl font-mono">❖</div>
        <div className="absolute top-3 right-3 text-amber-600/40 text-xl font-mono">❖</div>
        <div className="absolute bottom-3 left-3 text-amber-600/40 text-xl font-mono">❖</div>
        <div className="absolute bottom-3 right-3 text-amber-600/40 text-xl font-mono">❖</div>

        {/* Fellowship Header */}
        <div className="flex flex-col items-center space-y-2 pb-6 border-b-2 border-amber-600/30">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white p-0.5 shadow-md border border-amber-500/40 shrink-0">
            <img
              src="/logo.png"
              alt="DDU FOCUS Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-sans font-extrabold text-sm sm:text-base uppercase tracking-widest text-slate-800">
            DIRE DAWA UNIVERSITY
          </h1>
          <h2 className="font-sans font-black text-xs uppercase tracking-widest text-blue-800">
            FELLOWSHIP OF CHRISTIAN UNIVERSITY STUDENTS (DDU FOCUS)
          </h2>
          <p className="font-sans text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
            &quot;Knowing Christ, Growing Together, Serving Others&quot; — Matthew 5:16
          </p>
        </div>

        {/* Certificate Title */}
        <div className="my-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full font-sans text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            Official Commendation
          </div>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 italic font-serif">
            Certificate of Community Service
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto font-sans">
            This certificate is proudly awarded in recognition of faithful Christian service, compassionate outreach, and active volunteer contribution to the campus and local community.
          </p>
        </div>

        {/* Recipient Details */}
        <div className="my-6 space-y-1">
          <div className="text-xs font-sans uppercase tracking-widest text-slate-500 font-bold">
            Presented to
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif underline decoration-amber-400 underline-offset-8">
            {studentName}
          </div>
          <div className="text-xs text-slate-600 font-sans pt-2">
            ID: <span className="font-mono font-bold text-slate-800">{studentId}</span> | Department of {department}
          </div>
        </div>

        {/* Service Hours Badge */}
        <div className="my-8 inline-block bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-lg border border-slate-800 font-sans">
          <div className="text-2xl font-black text-amber-400">{hoursServed.toFixed(1)} Hours</div>
          <div className="text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
            Verified Community Service & Ministry Hours
          </div>
        </div>

        {/* Scripture Verse */}
        <div className="text-xs italic text-slate-600 font-serif max-w-lg mx-auto py-2">
          &ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.&rdquo; — Colossians 3:23
        </div>

        {/* Signatures & Verification QR */}
        <div className="mt-10 pt-6 border-t-2 border-amber-600/30 grid grid-cols-3 gap-4 items-center text-center font-sans">
          {/* Signature 1 */}
          <div className="space-y-1">
            <div className="font-serif italic text-sm font-bold text-slate-800">Yonas Solomon</div>
            <div className="h-0.5 w-28 bg-slate-400 mx-auto" />
            <div className="text-[10px] text-slate-500 font-bold uppercase">FOCUS Executive Coordinator</div>
          </div>

          {/* QR Verification Seal */}
          <div className="flex flex-col items-center">
            <div className="p-1 bg-white border border-slate-300 rounded-lg shadow-sm">
              <QRCodeSVG value={verificationUrl} size={64} level="M" />
            </div>
            <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">Official Digital Seal</span>
          </div>

          {/* Signature 2 */}
          <div className="space-y-1">
            <div className="font-serif italic text-sm font-bold text-slate-800">{verifierName.split(' ')[0]} {verifierName.split(' ')[1]}</div>
            <div className="h-0.5 w-28 bg-slate-400 mx-auto" />
            <div className="text-[10px] text-slate-500 font-bold uppercase">Charity & Service Leader</div>
          </div>
        </div>

        <div className="mt-6 text-[10px] text-slate-400 font-sans">
          Issued on {issueDate} • Dire Dawa University • DDU FOCUS Community Outreach
        </div>
      </div>
    </div>
  );
}

