export interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: {
        id: number;
        email: string;
        name: string;
        role: string;
    };
}

export interface TokenPayload {
    userId: number;
    email: string;
    role: string;
    exp: number;
}
