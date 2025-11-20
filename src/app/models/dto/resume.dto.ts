// Enum for resume status
export enum ResumeStatus {
    PENDING = 'PENDING',
    REVIEWING = 'REVIEWING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface ResumeCreateDto {
    email: string;
    url: string;
    status: ResumeStatus.PENDING;
    user: {
        id: number;
    };
    job: {
        id: number;
    };
}

export interface ResumeResponseDto {
    id: number;
    email: string;
    url: string;
    status: ResumeStatus;
    createdAt: string;
    updatedAt: string;
    user: {
        id: number;
        name?: string;
        email?: string;
    };
    job: {
        id: number;
        name?: string;
    };
}

export interface ResumeSubmitFormData {
    name: string;
    email: string;
    phone: string;
    currentJobTitle: string;
    resumeFile: File | null;
}
