'use client';

import { useState } from 'react';
import type { ReviewType } from '@/types/product/ProductType';
import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react';
type Props = {
    description: string;
    reviews: ReviewType[];
};

export default function ProductTabs({ description, reviews }: Props) {
    const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    const renderStars = (rating: number, size: "sm" | "md" | "lg" = "sm") => {
        const sizeClasses = {
            sm: "w-4 h-4",
            md: "w-5 h-5",
            lg: "w-6 h-6",
        }

        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`${sizeClasses[size]} ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
            />
        ))
    }

    const REVIEWS_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
    const currentReviews = reviews.slice(
        (currentPage - 1) * REVIEWS_PER_PAGE,
        currentPage * REVIEWS_PER_PAGE
    );

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
                    onClick={() => setActiveTab('reviews')}
                >
                    Reviews ({reviews.length})
                </button>
            </div>

            <div className="mt-4">
                {activeTab === 'description' && (
                    <p className="text-gray-700 ">{description} Trải nghiệm âm thanh crystal-clear với tai nghe không dây cao cấp của chúng tôi. Được trang bị công nghệ chống ồn chủ động, thời lượng pin 30 giờ và đệm tai êm ái cao cấp. Hoàn hảo cho những người yêu âm nhạc, chuyên gia và bất kỳ ai đòi hỏi trải nghiệm âm thanh tốt nhất. Thiết kế hiện đại, chất lượng âm thanh vượt trội và sự thoải mái tối đa trong mọi hoàn cảnh sử dụng.</p>
                )}

                {activeTab === 'reviews' && (
                    <div className="space-y-4">
                        {reviews.length === 0 ? (
                            <p>No reviews yet.</p>
                        ) : (
                            currentReviews.map((review) => (
                                <Card key={review.id}>
                                    <CardContent >
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                                                    {review.user.username.charAt(0).toUpperCase()}
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-medium">{review.user.username}</span>
                                                           
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex">{renderStars(review.rating)}</div>
                                                            <span className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                                                </div>
                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                ← Trước
                            </button>

                            <div className="text-sm text-muted-foreground">
                                Trang {currentPage} / {totalPages} • {reviews.length} đánh giá
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded disabled:opacity-50"
                            >
                                Sau →
                            </button>
                        </div>
                    </div>

                )}

            </div>


        </div>
    );
}
