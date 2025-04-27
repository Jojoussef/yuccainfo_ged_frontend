import axiosService from '@/lib/axios';

export async function logout() {
    await axiosService.post('/api/auth/logout/');
}
