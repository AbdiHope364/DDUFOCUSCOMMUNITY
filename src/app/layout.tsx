import type { Metadata } from "next";
import "./globals.css";
import { PersonaSwitcher } from "../components/persona-switcher";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  title: "DDU FOCUS — Student Fellowship Management & Community Platform",
  description: "Official digital fellowship and student community platform for the Fellowship of Christian University Students at Dire Dawa University (DDU FOCUS).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
        <PersonaSwitcher />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

