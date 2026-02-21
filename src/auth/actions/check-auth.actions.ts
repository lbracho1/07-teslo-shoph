import { tesloApi } from "@/api/tesloAPi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthActions = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        const { data } = await tesloApi<AuthResponse>('/auth/check-status')

        localStorage.setItem('token', data.token);

        return data;
    } catch (error) {
        localStorage.removeItem('token ')
        throw new Error('token expired or not valid')
    }

};