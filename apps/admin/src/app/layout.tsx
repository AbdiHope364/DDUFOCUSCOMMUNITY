import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@ddu-focus/shared';
import { AdminNav } from '../components/admin-nav';
import { PersonaSwitcher } from '../components/persona-switcher';
import { ThemeToggle } from '@ddu-focus/shared';

export const metadata: Metadata = {
  metadataBase: new URL('https://ddu-focus.edu.et'),
  title: 'DDU FOCUS — Leadership & Administration Console',
  description: 'Management & governance portal for Dire Dawa University Student Fellowship leaders.',
  icons: {
    icon: '/logo.png',
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider>
          <PersonaSwitcher />
          
          <div className="flex min-h-[calc(100vh-40px)]">
            <AdminNav />
            
            <div className="flex-1 flex flex-col min-w-0">
              {/* Mobile Admin Header */}
              <header className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full" />
                  <span className="font-black text-sm text-slate-900 dark:text-white">DDU ADMIN</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </header>

              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
