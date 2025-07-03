
import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RatingSelectorProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const RatingSelector = ({ rating, onRatingChange }: RatingSelectorProps) => {
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          카공 점수 평가
        </h3>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">이 카페의 카공 환경은 어떠셨나요?</p>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRatingChange(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="p-1 transition-colors"
              >
                <Star 
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating) 
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p className="text-sm font-medium text-primary">
              {rating === 1 && "아쉬워요"}
              {rating === 2 && "별로예요"}
              {rating === 3 && "보통이에요"}
              {rating === 4 && "좋아요"}
              {rating === 5 && "최고예요"}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RatingSelector;
