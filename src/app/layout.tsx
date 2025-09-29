import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export const metadata: Metadata = {
  title: {
    default: 'Aptly Dressed | Modern & Sustainable Fashion',
    template: '%s | Aptly Dressed',
  },
  description: 'Discover timeless elegance with a modern edge. Aptly Dressed offers curated collections of high-quality, sustainable fashion for the style-conscious individual.',
  keywords: ['sustainable fashion', 'modern style', 'capsule wardrobe', 'minimalist fashion', 'Aptly Dressed'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Arial:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Breadcrumbs />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
