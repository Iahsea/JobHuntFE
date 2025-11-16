export interface CompanyResponseDto {
    id: number;
    name: string;
    description?: string;
    address?: string;
    logo?: string;
    website?: string;
    industry?: string;
    companySize?: string;
    coverImage?: string;
    jobs?: JobSummaryDto[];
    foundedDate?: string;
    benefits?: string;
    employeeCount?: number;
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
    name: string;
    location?: string;
    salary?: string;
    logo?: string;
    quantity?: number;
    level?: string;
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
