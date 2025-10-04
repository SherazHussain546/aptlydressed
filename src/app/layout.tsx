
import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { headers } from 'next/headers';
import { FirebaseClientProvider } from '@/firebase';
import { CookieBanner } from '@/components/layout/CookieBanner';

export const metadata: Metadata = {
  title: {
    default: 'APTLY DRESSED | Modern & Sustainable Fashion',
    template: '%s | APTLY DRESSED',
  },
  description: 'Discover timeless elegance with a modern edge. APTLY DRESSED offers curated collections of high-quality, sustainable fashion for the style-conscious individual.',
  keywords: ['sustainable fashion', 'modern style', 'capsule wardrobe', 'minimalist fashion', 'APTLY DRESSED'],
  icons: {
    icon: '/favicon.ico',
  },
  verification: {
    google: 'fMHJxWAc9jNltWd-FPJmv7iYrnSru1A1kwInFe_00_k',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';

  // The coming soon page has a special layout
  if (pathname === '/coming-soon') {
    return (
       <html lang="en" className="h-full">
         <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Arial:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased h-full bg-background">
            <FirebaseClientProvider>
              <div className="flex min-h-screen flex-col">
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <Toaster />
              <CookieBanner />
            </FirebaseClientProvider>
        </body>
      </html>
    )
  }

  const isMainSite = pathname === '/main-site';

  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Arial:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <FirebaseClientProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            {!isMainSite && <Breadcrumbs />}
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <CookieBanner />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
