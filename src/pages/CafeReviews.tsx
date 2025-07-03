
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CafeReviews = () => {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState<"high" | "low">("high");

  const reviews = [
    {
      id: 1,
      user: "카공러버",
      level: 15,
      rating: 4,
      content: "콘센트가 많아서 좋고 와이파이도 빨라요! 다만 점심시간에는 좀 시끄러워요.",
      studyTime: "3시간",
      createdAt: "2시간 전",
      images: ["https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&h=100&fit=crop"]
    },
    {
      id: 2, 
      user: "스터디맨",
      level: 8,
      rating: 5,
      content: "오후 3시쯤 가니까 자리도 여유롭고 분위기 완전 좋았어요. 4시간 공부했는데 집중 잘 됐습니다!",
      studyTime: "4시간",
      createdAt: "1일 전"
    },
    {
      id: 3,
      user: "공부왕",
      level: 12,
      rating: 3,
      content: "평범한 카페입니다. 특별히 나쁘지도 좋지도 않아요. 그냥 무난한 정도?",
      studyTime: "2시간",
      createdAt: "3일 전"
    },
    {
      id: 4,
      user: "취준생화이팅",
      level: 20,
      rating: 5,
      content: "진짜 최고의 카공 카페! 조용하고 콘센트도 충분하고 음료도 맛있어요. 자주 올 것 같아요!",
      studyTime: "5시간",
      createdAt: "1주일 전",
      images: [
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop"
      ]
    },
    {
      id: 5,
      user: "대학생A",
      level: 5,
      rating: 2,
      content: "너무 시끄러워요... 카공하기엔 부적합한 것 같습니다.",
      studyTime: "1시간",
      createdAt: "2주일 전"
    }
  ];

  const sortedReviews = [...reviews].sort((a, b) => {
    return sortBy === "high" ? b.rating - a.rating : a.rating - b.rating;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Link to={`/cafe/${id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">카공 후기</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 정렬 옵션 */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">전체 후기 ({reviews.length}개)</h2>
          <Select value={sortBy} onValueChange={(value: "high" | "low") => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="정렬" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">별점 높은순</SelectItem>
              <SelectItem value="low">별점 낮은순</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-4">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{review.user}</span>
                    <Badge variant="outline" className="text-xs">LV.{review.level}</Badge>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-200"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.createdAt}</span>
                </div>
                
                <p className="text-sm text-foreground mb-2">{review.content}</p>
                
                {review.images && (
                  <div className="flex gap-2 mb-2">
                    {review.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt="리뷰 사진"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>📚 공부시간: {review.studyTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CafeReviews;
