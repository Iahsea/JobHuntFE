export interface Company {
    id: number;
    name: string;
    description: string;
    logo?: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
    industry: string;
    size?: string;
    createdAt?: Date;
    updatedAt?: Date;
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
