
import { ArrowLeft, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyReviews = () => {
  const myReviews = [
    {
      id: 1,
      cafe: "스타벅스 강남점",
      address: "서울 강남구 테헤란로",
      rating: 4,
      content: "콘센트가 많아서 좋고 와이파이도 빨라요! 다만 점심시간에는 좀 시끄러워요.",
      studyTime: "3시간",
      createdAt: "2시간 전",
      images: ["https://images.unsplash.com/photo-1551218808-94e220e084d2?w=100&h=100&fit=crop"]
    },
    {
      id: 2,
      cafe: "카페베네 역삼점",
      address: "서울 강남구 역삼동",
      rating: 5,
      content: "오후 3시쯤 가니까 자리도 여유롭고 분위기 완전 좋았어요. 4시간 공부했는데 집중 잘 됐습니다!",
      studyTime: "4시간",
      createdAt: "1일 전"
    },
    {
      id: 3,
      cafe: "이디야커피 선릉점",
      address: "서울 강남구 선릉로",
      rating: 3,
      content: "가격은 저렴하지만 좌석이 좀 불편해요. 그래도 조용해서 공부하기는 괜찮아요.",
      studyTime: "2시간",
      createdAt: "3일 전"
    }
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/mypage">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">내 리뷰 ({myReviews.length})</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {myReviews.map((review) => (
          <Card key={review.id} className="bg-white border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{review.cafe}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{review.address}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? "fill-current text-yellow-400" : "text-gray-200"}`} 
                        />
                      ))}
                    </div>
                    <Badge variant="outline" className="text-xs">공부시간: {review.studyTime}</Badge>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{review.createdAt}</span>
              </div>
              
              <p className="text-sm text-foreground mb-3">{review.content}</p>
              
              {review.images && (
                <div className="flex gap-2">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
