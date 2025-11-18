export interface Company {
    id: number;
    name: string;
    description: string;
    logo?: string;
    address: string;
    phone: string;
    email: string;
    industry: string;
    size?: string;
    website?: string;
    companySize?: string;
    coverImage?: string;
    foundedDate?: string;
    employeeCount?: number;
    benefits?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
    createdBy?: string;
    updatedBy?: string;
}

export interface CompanyCreate {
    name: string;
    description: string;
    logo?: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    industry: string;
    size?: string;
}
