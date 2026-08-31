import type { Metadata } from "next";
import "./globals.css";
import { PersonaSwitcher } from "../components/persona-switcher";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://ddu-focus.edu.et'),
  title: "DDU FOCUS — Dire Dawa University Student Fellowship",
  description: "Official digital fellowship and student community platform for the Fellowship of Christian University Students at Dire Dawa University (DDU FOCUS). Knowing Christ, Growing Together, Serving Others.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "DDU FOCUS — Student Fellowship",
    description: "Knowing Christ, Growing Together, Serving Others — Matthew 5:16",
    images: [{ url: "/logo.png" }],
  },
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

