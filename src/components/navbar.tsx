'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { logout } from '@/api/logout';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';

import { FileText, LogOut, Menu, Upload, X } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-white shadow-xs'>
            <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
                <div className='flex items-center gap-2'>
                    <Link href='/dashboard' className='flex items-center gap-2'>
                        <FileText className='h-6 w-6 text-[#1E3A8A] dark:text-[#638dff]' />
                        <span className='text-xl font-bold text-[#1E3A8A] dark:text-[#638dff]'>
                            Document Management System
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden items-center gap-6 md:flex'>
                    <Link
                        href='/dashboard'
                        className={`font-medium transition-colors hover:text-[#38BDF8] ${
                            isActive('/dashboard')
                                ? 'text-lg text-[#1E3A8A] dark:text-[#638dff]'
                                : 'text-sm text-[#334155] dark:text-[#c4d2e4]'
                        }`}>
                        Documents
                    </Link>
                    <Link
                        href='/dashboard/upload'
                        className={`font-medium transition-colors hover:text-[#38BDF8] ${
                            isActive('/dashboard/upload')
                                ? 'text-lg text-[#1E3A8A] dark:text-[#638dff]'
                                : 'text-sm text-[#334155] dark:text-[#c4d2e4]'
                        }`}>
                        Upload
                    </Link>
                    <ThemeToggle />
                    <Button
                        variant='ghost'
                        size='sm'
                        className='text-[#334155] hover:bg-transparent hover:text-[#EF4444] dark:text-[#c4d2e4]'
                        onClick={handleLogout}>
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </Button>
                </nav>

                {/* Mobile Menu Button */}
                <Button variant='ghost' size='icon' className='md:hidden' onClick={toggleMenu}>
                    {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    <span className='sr-only'>Toggle menu</span>
                </Button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className='border-t md:hidden'>
                    <nav className='flex flex-col space-y-3 bg-white p-4 dark:bg-gray-800'>
                        <Link
                            href='/dashboard'
                            className={`flex items-center gap-2 rounded-md p-2 ${
                                isActive('/dashboard')
                                    ? 'bg-[#F1F5F9] text-lg font-medium text-[#1E3A8A] dark:text-[#638dff]'
                                    : 'text-[#334155] hover:bg-[#F1F5F9] dark:text-[#c4d2e4] dark:hover:text-[#334155]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}>
                            <FileText className='h-5 w-5' />
                            Documents
                        </Link>
                        <Link
                            href='/dashboard/upload'
                            className={`flex items-center gap-2 rounded-md p-2 ${
                                isActive('/dashboard/upload')
                                    ? 'bg-[#F1F5F9] text-lg font-medium text-[#1E3A8A]'
                                    : 'text-[#334155] hover:bg-[#F1F5F9] dark:text-[#c4d2e4] dark:hover:text-[#334155]'
                            }`}
                            onClick={() => setIsMenuOpen(false)}>
                            <Upload className='h-5 w-5' />
                            Upload
                        </Link>
                        <div className='p-2'>
                            <ThemeToggle />
                        </div>
                        <Button
                            variant='ghost'
                            className='flex items-center justify-start gap-2 rounded-md p-2 text-[#334155] hover:bg-[#F1F5F9] hover:text-[#EF4444] dark:text-[#c4d2e4] dark:hover:text-[#334155]'
                            onClick={handleLogout}>
                            <LogOut className='h-5 w-5' />
                            Logout
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
