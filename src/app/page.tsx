'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoginForm } from '@/components/login-form';

export default function Home() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for access token in cookies
        const cookies = document.cookie.split(';');
        const hasAccessToken = cookies.some((cookie) => cookie.trim().startsWith('accessToken='));

        if (hasAccessToken) {
            router.push('/dashboard');
        } else {
            router.push('/login');
            setIsLoading(false);
        }
    }, [router]);

    return (
        <main className='animate-fade-in flex min-h-screen items-center justify-center bg-[#F9FAFB]'>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <div className='loader'></div>
                </div>
            ) : (
                <LoginForm />
            )}
        </main>
    );
}
