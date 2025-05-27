'use client'
import { Star, StarHalf } from "lucide-react";

type Props = {
    rating: number; // ví dụ: 4.5
};

export function ProductRating({ rating }: Props) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex gap-1 text-yellow-400 items-center">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400" />
            ))}
            {halfStar && <StarHalf className="w-4 h-4 fill-yellow-400 relative">
                <Star className="w-4 h-4 absolute" />
            </StarHalf>}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} className="w-4 h-4" />
            ))}
        </div>
    );
}
