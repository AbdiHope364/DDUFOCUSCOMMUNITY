import Link from 'next/link';
import { Flame, ArrowLeft, Home, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-xl">
        <Flame className="w-8 h-8 fill-amber-300 text-amber-300" />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold uppercase rounded-full tracking-wider">
          404 — Page Not Found
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Lost in Fellowship?
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          The fellowship resource, section, or page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
        <Link
          href="/"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition flex items-center gap-1.5"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/sections"
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition flex items-center gap-1.5 border border-slate-200"
        >
          <Layers className="w-4 h-4" />
          <span>Browse Sections</span>
        </Link>
      </div>
    </div>
  );
}
