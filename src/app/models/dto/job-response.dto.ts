export interface JobSkillDto {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface JobCompanyDto {
    id: number;
    name: string;
    description?: string;
    address?: string;
    logo?: string;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface JobResponseDto {
    id: number;
    name: string;
    title?: string; // Optional, for compatibility
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    salary?: number | string;
    quantity?: number;
    level?: string;
    jobType?: string;
    experience?: string;
    education?: string;
    deadline?: string;
    startDate?: string;
    endDate?: string;
    status?: string;
    active?: boolean;
    viewCount?: number;
    applicationCount?: number;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
    company?: JobCompanyDto;
    skills?: JobSkillDto[];
}

export interface JobDetailResponseDto extends JobResponseDto {
    responsibilities?: string[];
    tags?: string[];
    contactPerson?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}
