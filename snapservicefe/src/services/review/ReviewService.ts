// src/services/review/ReviewService.ts
import { getAPI } from '@/lib/axios';
import { ReviewListResponse } from '@/model/response/review';

const api = getAPI();

export const fetchReviewsByProduct = async (
  productId: number,
  page: number,
  pageSize: number
): Promise<ReviewListResponse> => {
  const response = await api.get('/api/Review/all', {
    params: {
      productId,
      page,
      pageSize,
    },
  });

  return response.data.data;
};
