export interface Job {
    id: number;
    title: string;
    description: string;
    requirements: string;
    benefits?: string;
    salary?: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'internship';
    level: 'intern' | 'junior' | 'middle' | 'senior' | 'lead';
    companyId: number;
    companyName?: string;
    companyLogo?: string;
    deadline?: Date;
    status: 'active' | 'closed';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface JobCreate {
    title: string;
    description: string;
    requirements: string;
    benefits?: string;
    salary?: string;
    location: string;
    jobType: string;
    level: string;
    companyId: number;
    deadline?: Date;
}
