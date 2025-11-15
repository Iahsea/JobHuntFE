export interface JobResponseDto {
    id: number;
    title: string;
    description?: string;
    requirements?: string;
    benefits?: string;
    location?: string;
    salary?: string;
    jobType?: string;
    experience?: string;
    education?: string;
    deadline?: string;
    status?: string;
    companyId: number;
    companyName?: string;
    companyLogo?: string;
    categoryId?: number;
    categoryName?: string;
    viewCount?: number;
    applicationCount?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface JobDetailResponseDto extends JobResponseDto {
    responsibilities?: string[];
    skills?: string[];
    tags?: string[];
    contactPerson?: {
        name?: string;
        email?: string;
        phone?: string;
    };
}
