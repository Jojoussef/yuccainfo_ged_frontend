// app/api/auth/refresh/route.ts
import { NextResponse } from 'next/server';

import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

export async function POST(req: Request) {
    const { refresh } = Object.fromEntries(await req.json().then(Object.entries));
    try {
        // Call Django refresh
        const { data } = await axiosService.post(
            ENDPOINTS.auth.refresh,
            { refresh },
            { headers: { 'Content-Type': 'application/json' } }
        );
        const res = NextResponse.json({ message: 'Token refreshed' });

        // Overwrite the access (and refresh if rotated) cookies
        res.cookies.set('access', data.access, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === 'production'
        });
        res.cookies.set('refresh', data.refresh, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });

        // If you enabled rotating refresh tokens, also reset the refresh cookie:
        if (data.refresh) {
            res.cookies.set('refresh', data.refresh, {
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24,
                secure: process.env.NODE_ENV === 'production'
            });
        }
        return res;
    } catch (err: any) {
        return NextResponse.json(
            { error: err.response?.data || 'Refresh failed' },
            { status: err.response?.status || 401 }
        );
    }
}
