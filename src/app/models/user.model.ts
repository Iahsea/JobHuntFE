export interface User {
    id: number;
    email: string;
    fullName: string;
    phone?: string;
    avatar?: string;
    role: 'user' | 'admin' | 'company';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserRegistration {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    role?: string;
}

export interface UserLogin {
    username: string;
    password: string;
}
