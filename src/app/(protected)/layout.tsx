import type { ReactNode } from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
    const cookiesStore = await cookies();
    const access = cookiesStore.get('access')?.value;
    const refresh = cookiesStore.get('refresh')?.value;

    const isLoggedIn = !!access && !!refresh;

    console.log('ProtectedLayout: isLoggedIn:', isLoggedIn);

    if (!isLoggedIn) {
        // No JWT → send to login
        redirect('/login');
    }

    return <div className=''>{children}</div>;
}
