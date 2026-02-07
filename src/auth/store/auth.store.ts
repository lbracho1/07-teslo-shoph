import { create } from 'zustand';
import type { User } from '@/interface/user.interface';

import { loginAction } from '../actions/login.action';
import { checkAuthActions } from '../actions/check-auth.actions';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    // Getters
    isAdmin: () => boolean;

    // Actions
    login: (mail: string, password: string) => Promise<boolean>;
    logout: () => void;
    register: (mail: string, password: string, fullName: string) => Promise<boolean>;
    checkAuthStatus: () => Promise<boolean>;

};

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Implementación del Store   
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        const roles = get().user?.roles || [];

        return roles.includes('admin')
    },

    // Actions

    login: async (email: string, password: string) => {

        try {
            const data = await loginAction(email, password)
            localStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, authStatus: 'authenticated' })
            console.log({ data })
            return true;
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            return false;
        };
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' })
    },

    register: async (email: string, password: string, fullName: string) => {

        const data = await registerAction(email, password, fullName)
        localStorage.setItem('token', data.token);

        set({ user: data.user, token: data.token, authStatus: 'authenticated' })

        return true
    },

    checkAuthStatus: async () => {

        try {
            const { user, token } = await checkAuthActions();
            set({ user, token, authStatus: 'authenticated' })
            return true;
        } catch (error) {
            set({
                user: undefined,
                token: undefined,
                authStatus: 'not-authenticated'
            })
            return false;
        }

    },
}));

