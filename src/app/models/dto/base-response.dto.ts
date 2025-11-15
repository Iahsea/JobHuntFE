export interface BaseResponse<T> {
    statusCode: number;
    error: string | null;
    message: string;
    data: T;
    timestamp?: string;
}

export interface PaginatedResponse<T> {
    statusCode: number;
    error: string | null;
    message: string;
    data: {
        items: T[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
        pageSize: number;
    };
    timestamp?: string;
}

export interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
    errors?: { [key: string]: string[] };
    timestamp?: string;
}
