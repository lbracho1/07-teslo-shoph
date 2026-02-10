import { tesloApi } from "@/api/tesloAPi";
import type { AuthResponse } from "../interfaces/auth.response";

export const registerAction = async (
    email: string,
    password: string,
    fullName: string
): Promise<AuthResponse> => {

    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email,
            password,
            fullName,
        });

        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }

};