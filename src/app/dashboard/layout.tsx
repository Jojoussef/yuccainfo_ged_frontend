import type React from 'react';

import { Navbar } from '@/components/navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen'>
            <Navbar />
            <main className='container mx-auto px-4 py-6 md:px-6'>{children}</main>
        </div>
    );
}
