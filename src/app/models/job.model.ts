export interface JobSkill {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface JobCompany {
    id: number;
    name: string;
    description?: string;
    address?: string;
    logo?: string;
    coverImage?: string
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface Job {
    id: number;
    name: string;
    title?: string;
    description?: string;
    logo?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    jobType?: string;
    salary?: number | string;
    quantity?: number;
    level?: string;
    workMode?: string;
    experience?: string;
    education?: string;
    deadline?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    active?: boolean;
    companyId?: number;
    companyName?: string;
    companyLogo?: string;
    categoryId?: number;
    categoryName?: string;
    viewCount?: number;
    applicationCount?: number;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    company?: JobCompany;
    skills?: JobSkill[];
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
