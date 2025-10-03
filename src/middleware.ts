
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the site is in pre-launch mode, only allow access to the homepage
  // and redirect all other requests to the homepage.
  // We exclude API routes, static files, and image optimization routes.
  const isPrelaunch = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === 'false'; // Set to false to allow navigation

  if (isPrelaunch && pathname !== '/') {
     if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.')
    ) {
      // Allow these paths to pass through
    } else {
      return NextResponse.redirect(new URL('/', request.url));
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

    