export interface JobSkillDto {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string | null;
    createdBy?: string;
    updatedBy?: string | null;
}

export interface JobCompanyDto {
    id: number;
    name: string;
    description?: string;
    address?: string;
    logo?: string;
    coverImage?: string;
    website?: string;
    companySize?: string;
    foundedDate?: string;
    employeeCount?: number;
    benefits?: string;
    socialLinks?: string | null;
    createdAt?: string;
    updatedAt?: string | null;
    createdBy?: string;
    updatedBy?: string | null;
}

export interface JobResponseDto {
    id: number;
    name: string;
    location?: string;
    salary?: number;
    quantity?: number;
    level?: string;
    description?: string;
    jobType?: string;
    workMode?: string;
    yearsOfExperience?: number;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    createdAt?: string;
    updatedAt?: string | null;
    createdBy?: string;
    updatedBy?: string | null;
    company?: JobCompanyDto;
    skills?: JobSkillDto[];
}

export interface JobPaginationMeta {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
}

export interface JobPaginationData {
    meta: JobPaginationMeta;
    result: JobResponseDto[];
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
