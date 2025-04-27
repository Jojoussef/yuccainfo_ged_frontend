import { NextResponse } from 'next/server';

import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

export default async function POST(req: Request) {
    console.log('Registration attempt started');
    const { username, password, email } = await req.json();

    // Log registration attempt (not including password)
    console.log(`Registration attempt for user: ${username}, email: ${email}`);

    try {
        console.log('Sending registration request to backend');
        const { data } = await axiosService.post(
            ENDPOINTS.auth.register,
            { username, password, email },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Registration successful:', data);
    } catch (err: any) {
        console.error('Registration failed:', err.response?.data || err.message);
        return NextResponse.json(
            { error: err.response?.data || 'Registration failed' },
            { status: err.response?.status || 500 }
        );
    }

    // 2) Auto-login to get JWT tokens
    console.log('Attempting auto-login after registration');
    try {
        const { data } = await axiosService.post(
            ENDPOINTS.auth.login,
            { username, password },
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Auto-login successful');

        const res = NextResponse.json({ message: 'Registered & logged in' }, { status: 201 });
        // set cookies
        res.cookies.set('access', data.access, { httpOnly: true, path: '/', maxAge: 60 * 15 });
        res.cookies.set('refresh', data.refresh, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 });
        return res;
    } catch (err: any) {
        // user created, but login failed—ask them to sign in manually
        console.error('Auto-login failed after registration:', err.response?.data || err.message);
        return NextResponse.json(
            { message: 'User created; please login', details: err.response?.data },
            { status: 201 }
        );
    }
}
