import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);
const isApplicationRoute = createRouteMatcher(['/application(.*)']);

// Set to true to close applications and redirect /application to /profile
const APPLICATIONS_CLOSED = true;

export default clerkMiddleware(async (auth, req) => {
  // Block application route if applications are closed
  // if (APPLICATIONS_CLOSED && isApplicationRoute(req)) {
  //   return Response.redirect(new URL('/profile', req.url));
  // }

  // Protect admin routes
  if (isAdminRoute(req)) {
    const { sessionClaims } = await auth();
    
    // Debug: Log the session claims to see what we're getting
    console.log('Session Claims:', JSON.stringify(sessionClaims, null, 2));
    console.log('Public Metadata:', sessionClaims?.publicMetadata);
    console.log('Metadata:', sessionClaims?.metadata);
    
    // Check if user has admin role in public metadata (not just metadata)
    const publicMetadata = sessionClaims?.publicMetadata as { role?: string } | undefined;
    const metadata = sessionClaims?.metadata as { role?: string } | undefined;
    
    console.log('Admin check - publicMetadata.role:', publicMetadata?.role);
    console.log('Admin check - metadata.role:', metadata?.role);
    
    if (publicMetadata?.role !== 'admin' && metadata?.role !== 'admin') {
      console.log('Access denied - redirecting to home');
      // Redirect to home if not admin
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    console.log('Access granted - user is admin');
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
