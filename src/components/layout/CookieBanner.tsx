
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const COOKIE_CONSENT_KEY = 'aptly_dressed_cookie_consent';

export function CookieBanner() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      } else {
        setConsent(false); // Show banner if no consent is stored
      }
    } catch (error) {
      // If localStorage is not available (e.g. in SSR or private browsing), show banner
      setConsent(false);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(true));
    } catch (error) {
      console.error("Could not save cookie consent choice.", error);
    }
    setConsent(true);
  };

  if (consent === null || consent === true) {
    return null; // Don't render anything if consent is given or not yet determined
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="max-w-screen-xl mx-auto shadow-2xl">
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <CardTitle className="text-base font-semibold">We Value Your Privacy</CardTitle>
              <CardDescription className="text-sm mt-1">
                We use cookies to enhance your browsing experience and ensure our site functions correctly. By clicking "Accept," you agree to our use of cookies. Read our{' '}
                <Link href="/privacy-policy" className="underline hover:text-primary">
                  Privacy Policy
                </Link> for more information.
              </CardDescription>
            </div>
            <div className="flex-shrink-0">
              <Button onClick={handleAccept} size="lg">Accept</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
