import { NextResponse } from 'next/server';

import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

export async function POST(req: Request) {
    const { username, password } = await req.json();
    try {
        const { data } = await axiosService.post(
            ENDPOINTS.auth.login,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        const res = NextResponse.json({ message: 'Logged in' });
        // 15 min & 1 day hours as before
        res.cookies.set('access', data.access, { httpOnly: true, path: '/', maxAge: 60 * 15 });
        res.cookies.set('refresh', data.refresh, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });
        return res;
    } catch (err: any) {
        return NextResponse.json(
            { error: err.response?.data || 'Auth failed' },
            { status: err.response?.status || 500 }
        );
    }
}
