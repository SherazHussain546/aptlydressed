
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add the paths you want to be accessible during pre-launch mode.
const allowedPaths = [
  '/coming-soon',
  '/collaborate',
  '/contact',
  '/about',
  '/sustainability',
  '/affiliate-disclosure',
  '/privacy-policy',
  '/business-portfolio',
  '/news-and-events', // Also allowing blog/news if needed
  '/account',
  '/faq',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the site is in pre-launch mode, route traffic to the coming-soon page
  const isPrelaunch = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === 'true';

  if (isPrelaunch) {
     if (
      allowedPaths.some(path => pathname.startsWith(path)) ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.') // Allows serving static files like images
    ) {
      // Allow these paths to pass through
    } else {
      return NextResponse.rewrite(new URL('/coming-soon', request.url));
    }
  }


  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
