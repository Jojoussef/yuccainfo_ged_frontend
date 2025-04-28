'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [authChecking, setAuthChecking] = useState(true);

    useEffect(() => {
        const checkAuthStatus = () => {
            try {
                const cookies = document.cookie.split(';').map((cookie) => cookie.trim());
                const hasAccessToken = cookies.some((cookie) => cookie.startsWith('access='));
                const hasRefreshToken = cookies.some((cookie) => cookie.startsWith('refresh='));
                console.log('Access Token:', hasAccessToken);
                console.log('Refresh Token:', hasRefreshToken);

                if (hasAccessToken || hasRefreshToken) {
                    router.push('/dashboard');
                }
            } catch (error) {
                console.error('Error checking authentication status:', error);
            } finally {
                setAuthChecking(false);
            }
        };

        checkAuthStatus();
    }, [router]);

    // Prevent form rendering until auth check completes
    if (authChecking) {
        return null; // Or return a loading spinner
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validate form
        let hasErrors = false;
        const newErrors: { username?: string; password?: string } = {};

        if (!username) {
            newErrors.username = 'Username is required';
            hasErrors = true;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        // Show loading state
        setIsLoading(true);

        try {
            await axiosService
                .post(ENDPOINTS.auth.login, {
                    username,
                    password
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsLoading(false);
                        setUsername('');
                        setPassword('');
                        setErrors({});
                    }
                });
            router.push('/dashboard');
        } catch (err: any) {
            setErrors(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <Card className='animate-fade-in-up mx-4 w-full max-w-md rounded-xl shadow-lg'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-center text-2xl font-bold'>Smart Document Management System</CardTitle>
                <CardDescription className='text-center'>
                    Enter your credentials to access your documents
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                            id='username'
                            type='text'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={errors.username ? 'border-[#EF4444]' : ''}
                        />
                        {errors.username && <p className='text-sm font-medium text-[#EF4444]'>{errors.username}</p>}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='relative'>
                            <Input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='••••••••'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={errors.password ? 'border-[#EF4444] pr-10' : 'pr-10'}
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className='text-sm font-medium text-[#EF4444]'>{errors.password}</p>}
                    </div>
                    <Button
                        type='submit'
                        className='w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90'
                        disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex flex-col gap-4'>
                <p className='text-muted-foreground text-sm'>
                    Don't have an account?{' '}
                    <Link href='/register' className='text-[#38BDF8] hover:underline'>
                        Register
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
