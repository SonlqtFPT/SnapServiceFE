export interface Review {
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