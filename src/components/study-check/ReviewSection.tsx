
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface ReviewSectionProps {
  review: string;
  onReviewChange: (review: string) => void;
}

const ReviewSection = ({ review, onReviewChange }: ReviewSectionProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-3">오늘의 카공 후기 (선택)</h3>
        <Textarea
          placeholder="오늘 이 카페에서 공부한 느낌을 간단히 남겨보세요! 다른 카공족들에게 도움이 될 거예요."
          value={review}
          onChange={(e) => onReviewChange(e.target.value)}
          className="min-h-[80px] bg-white border-gray-200"
        />
        <p className="text-xs text-muted-foreground mt-2">
          💡 개인적인 팁이나 추천사항을 공유해주세요!
        </p>
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
