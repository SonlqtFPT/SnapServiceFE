'use client';

import { useEffect, useState } from 'react';
import { ReviewType } from '@/model/response/review';
import { fetchReviewsByProduct } from '@/services/review/ReviewService'; // import service
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react';

type Props = {
    productId: number;
    description: string;
};

export default function ProductTabs({ productId, description }: Props) {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
    const [reviews, setReviews] = useState<ReviewType[]>([]);
    const [totalReviews, setTotalReviews] = useState(0);
    const REVIEWS_PER_PAGE = 3; //mỗi trang 3 review
    const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  if (activeTab === 'reviews' && productId) {
    const load = async () => {
      try {
        const res = await fetchReviewsByProduct(productId, currentPage, REVIEWS_PER_PAGE);
        setReviews(res.items);
        setTotalReviews(res.totalItems);
      } catch (err) {
        console.error("🚨 Error loading reviews:", err);
      }
    };

    load();
  }
}, [activeTab, productId, currentPage]);

useEffect(() => {
  if (productId) {
    const preload = async () => {
      try {
        const res = await fetchReviewsByProduct(productId, 1, 1); // lấy page 1, chỉ 1 item vì chỉ xem totalItems khi render detail
        setTotalReviews(res.totalItems); 
      } catch (err) {
        console.error("🚨 Error preloading total reviews:", err);
      }
    };
    preload();
  }
}, [productId]);



    const totalPages = Math.ceil(totalReviews / REVIEWS_PER_PAGE); //lấy total/3 ra số trang

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
            />
        ));
    };

    return (
        <div className="mt-8">
            <div className="flex border-b">
                <button
                    className={`px-4 py-2 ${activeTab === 'description' ? 'border-b-2 border-black font-semibold' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'reviews' ? 'border-b-2 border-black font-semibold' : ''}`}
                    onClick={() => {
                        setCurrentPage(1); // reset page
                        setActiveTab('reviews');
                    }}
                >
                    Reviews ({totalReviews})
                </button>
            </div>

            <div className="mt-4">
                {activeTab === 'description' && (
                    <p className="text-gray-700">{description}</p>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            reviews.map((review) => (
                                <Card key={review.id}>
                                    <CardContent>
                                        <div className="flex gap-4">
                                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                                {review.user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-medium">{review.user.username}</div>
                                                <div className="flex items-center gap-2">
                                                    {renderStars(review.rating)}
                                                    <span className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-muted-foreground">{review.content}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                        <div className="flex justify-between mt-4">
                            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                ← Prev
                            </button>
                            <div>Page {currentPage} / {totalPages}</div>
                            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                                Next →
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
