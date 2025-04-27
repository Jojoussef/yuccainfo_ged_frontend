'use client';

import type React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosService from '@/lib/axios';
import { ENDPOINTS } from '@/lib/endpoints';

import { Eye, EyeOff } from 'lucide-react';

export function RegistrationForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<{
        username?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        terms?: string;
    }>({
        username: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined,
        terms: 'Our Terms and Conditions etc ...'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors: {
            username?: string;
            lastName?: string;
            email?: string;
            password?: string;
            confirmPassword?: string;
            terms?: string;
        } = {};
        let isValid = true;

        // Validate first name
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            isValid = false;
        }

        // Validate email
        if (!formData.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        // Validate terms acceptance
        if (!acceptTerms) {
            newErrors.terms = 'You must accept the terms and conditions';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({
            username: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
            terms: undefined
        });
        try {
            await axiosService.post(ENDPOINTS.auth.register, {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
        } catch (err: any) {
            setErrors({
                username: undefined,
                email: undefined,
                password: undefined,
                confirmPassword: undefined,
                terms: err.response?.data?.error || 'Registration failed'
            });
        }
    };

    return (
        <Card className='animate-fade-in-up mx-4 w-full max-w-md rounded-xl shadow-lg'>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-center text-2xl font-bold'>Create an Account</CardTitle>
                <CardDescription className='text-center'>Enter your information to register</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <Label htmlFor='username'>Username</Label>
                            <Input
                                id='username'
                                name='username'
                                placeholder='John'
                                value={formData.username}
                                onChange={handleChange}
                                className={errors.username ? 'border-[#EF4444]' : ''}
                            />
                            {errors.username && <p className='text-sm font-medium text-[#EF4444]'>{errors.username}</p>}
                        </div>
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                            id='email'
                            name='email'
                            type='email'
                            placeholder='name@example.com'
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'border-[#EF4444]' : ''}
                        />
                        {errors.email && <p className='text-sm font-medium text-[#EF4444]'>{errors.email}</p>}
                    </div>

                    <div className='space-y-2'>
                        <Label htmlFor='password'>Password</Label>
                        <div className='relative'>
                            <Input
                                id='password'
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='••••••••'
                                value={formData.password}
                                onChange={handleChange}
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

                    <div className='space-y-2'>
                        <Label htmlFor='confirmPassword'>Confirm Password</Label>
                        <div className='relative'>
                            <Input
                                id='confirmPassword'
                                name='confirmPassword'
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder='••••••••'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={errors.confirmPassword ? 'border-[#EF4444] pr-10' : 'pr-10'}
                            />
                            <button
                                type='button'
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.confirmPassword && (
                            <p className='text-sm font-medium text-[#EF4444]'>{errors.confirmPassword}</p>
                        )}
                    </div>

                    <div className='flex items-center space-x-2'>
                        <Checkbox
                            id='terms'
                            checked={acceptTerms}
                            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                        />
                        <label
                            htmlFor='terms'
                            className='text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                            I accept the{' '}
                            <a href='#' className='text-[#38BDF8] hover:underline'>
                                terms and conditions
                            </a>
                        </label>
                    </div>
                    {errors.terms && <p className='-mt-2 text-sm font-medium text-[#EF4444]'>{errors.terms}</p>}

                    <Button
                        type='submit'
                        className='w-full bg-[#1E3A8A] text-white hover:bg-[#1E3A8A]/90'
                        disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
                                Creating account...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center'>
                <p className='text-muted-foreground text-sm'>
                    Already have an account?{' '}
                    <Link href='/' className='text-[#38BDF8] hover:underline'>
                        Sign in
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
