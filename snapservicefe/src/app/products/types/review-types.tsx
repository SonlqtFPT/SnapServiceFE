export type UserType = {
  id: number
  username: string
}

export type ReviewType = {
  id: number
  productId: number
  content: string
  rating: number
  createdAt: string
  user: UserType
}

export type ReviewStatsType = {
  totalReviews: number
  averageRating: number
  ratingCounts: number[] // [1-star count, 2-star count, 3-star count, 4-star count, 5-star count]
}
