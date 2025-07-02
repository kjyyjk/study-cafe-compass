import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Bookmark, 
  Share2, 
  Wifi, 
  Zap, 
  Volume2,
  Clock,
  Users,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CafeDetail = () => {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);

  // 더미 데이터 - studyScore를 rating으로 변경
  const cafe = {
    id,
    name: "스타벅스 강남점",
    address: "서울 강남구 테헤란로 123",
    phone: "02-1234-5678",
    rating: 4.3,
    distance: "200m",
    crowdLevel: "medium",
    images: [
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop"
    ],
    features: {
      wifi: { score: 90, label: "와이파이" },
      outlet: { score: 85, label: "콘센트" },
      quiet: { score: 75, label: "조용함" },
      seat: { score: 80, label: "좌석 편의성" }
    },
    crowdByHour: [
      { hour: "09", level: 30 }, { hour: "10", level: 45 }, { hour: "11", level: 60 },
      { hour: "12", level: 85 }, { hour: "13", level: 90 }, { hour: "14", level: 70 },
      { hour: "15", level: 55 }, { hour: "16", level: 65 }, { hour: "17", level: 80 },
      { hour: "18", level: 75 }, { hour: "19", level: 60 }, { hour: "20", level: 40 }
    ],
    recentReviews: [
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
      }
    ]
  };

  const getCrowdText = (level: string) => {
    switch(level) {
      case "low": return "여유로움";
      case "medium": return "보통";
      case "high": return "혼잡함";
      default: return "알 수 없음";
    }
  };

  const getCrowdColor = (level: string) => {
    switch(level) {
      case "low": return "text-green-600";
      case "medium": return "text-yellow-600";
      case "high": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 헤더 */}
      <div className="relative">
        <div className="h-64 bg-cafe-100 overflow-hidden">
          <img 
            src={cafe.images[0]} 
            alt={cafe.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Link to="/">
            <Button variant="secondary" size="icon" className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              className="bg-white/80 backdrop-blur-sm"
              onClick={() => setIsSaved(!isSaved)}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current text-primary" : ""}`} />
            </Button>
            <Button variant="secondary" size="icon" className="bg-white/80 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 기본 정보 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h1 className="text-xl font-bold text-foreground">{cafe.name}</h1>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{cafe.address}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 text-cafe-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-semibold">{cafe.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">{cafe.distance}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 카공 특징 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">카공 적합도</h3>
            <div className="space-y-3">
              {Object.entries(cafe.features).map(([key, feature]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {key === "wifi" && <Wifi className="w-4 h-4 text-cafe-600" />}
                    {key === "outlet" && <Zap className="w-4 h-4 text-cafe-600" />}
                    {key === "quiet" && <Volume2 className="w-4 h-4 text-cafe-600" />}
                    {key === "seat" && <Users className="w-4 h-4 text-cafe-600" />}
                    <span className="text-sm">{feature.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={feature.score} className="w-16 h-2" />
                    <span className="text-xs font-medium w-8">{feature.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 시간대별 혼잡도 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-cafe-600" />
              <h3 className="font-semibold">시간대별 혼잡도</h3>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {cafe.crowdByHour.map(({ hour, level }) => (
                <div key={hour} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{hour}시</div>
                  <div 
                    className={`h-8 rounded-sm ${
                      level < 40 ? "bg-green-200" : 
                      level < 70 ? "bg-yellow-200" : "bg-red-200"
                    }`}
                    style={{ height: `${Math.max(level * 0.3, 8)}px` }}
                  ></div>
                  <div className="text-xs text-muted-foreground mt-1">{level}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 리뷰 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">최근 카공 후기</h3>
            <div className="space-y-4">
              {cafe.recentReviews.map((review) => (
                <div key={review.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 카공 인증 버튼 */}
        <Link to="/study-check">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3">
            <Camera className="w-4 h-4 mr-2" />
            이 카페에서 카공 인증하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CafeDetail;
