// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('access')?.value;
    console.error('Middleware: token:', token);
    const { pathname } = req.nextUrl;

    // List paths (or patterns) that require auth:
    const protectedPaths = ['/dashboard', '/dashboard/upload'];

    // If the request URL starts with one of those and no token, redirect:
    if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
        const loginUrl = new URL('/login', req.url);
        // Optionally append `?from=` so you can redirect back after login
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};
