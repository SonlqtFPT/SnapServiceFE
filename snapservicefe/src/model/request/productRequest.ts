export interface productListRequest {
    page: number;
    pageSize: number;
}

export interface searchProductRequest {
    q: string;
    categoryId?: number | null;
    page: number;
    size: number;
    sortBy: string;
    sortOrder: string;
}

export interface productDetailSlugRequest {
    slug: string;
}