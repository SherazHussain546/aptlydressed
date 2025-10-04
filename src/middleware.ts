
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If the site is in pre-launch mode, route traffic to the coming-soon page
  const isPrelaunch = process.env.NEXT_PUBLIC_PRELAUNCH_MODE === 'true';

  if (isPrelaunch && !pathname.startsWith('/coming-soon')) {
     if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.includes('.')
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

    
