export interface CompanyResponseDto {
    id: number;
    name: string;
    description?: string;
    address?: string;
    logo?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    foundedYear?: string;
    jobCount?: number;
    createdAt?: string;
    updatedAt?: string;
    createdBy?: string;
    updatedBy?: string;
}

export interface CompanyDetailResponseDto extends CompanyResponseDto {
    socialLinks?: {
        twitter?: string;
        facebook?: string;
        linkedin?: string;
    };
}

export interface JobSummaryDto {
    id: number;
    title: string;
    location?: string;
    salary?: string;
    jobType?: string;
    experience?: string;
    deadline?: string;
    createdAt?: string;
}

export interface CompanyListMetaDto {
    page: number;
    pageSize: number;
    pages: number;
    total: number;
}

export interface CompanyListResponseDto {
    meta: CompanyListMetaDto;
    result: CompanyResponseDto[];
}
