export interface FileUploadResponseData {
    fileName: string;
    uploadedAt: string;
}

export interface FileUploadResponse {
    statusCode: number;
    error: string | null;
    message: string;
    data: FileUploadResponseData;
}
