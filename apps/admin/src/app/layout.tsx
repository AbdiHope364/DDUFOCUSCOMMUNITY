import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@ddu-focus/shared';
import { PersonaSwitcher } from '../components/persona-switcher';
import { AdminShell } from '../components/admin-shell';

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
      <body suppressHydrationWarning className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500 selection:text-slate-950">
        <ThemeProvider>
          <PersonaSwitcher />
          <AdminShell>
            {children}
          </AdminShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
