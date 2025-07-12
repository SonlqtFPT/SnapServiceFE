export interface ReviewType {
  id: number;
  productId: number;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

export interface ReviewListResponse {
  totalItems: number;
  page: number;
  pageSize: number;
  totalPage: number;
  items: ReviewType[];
}
