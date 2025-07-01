
import { useState } from "react";
import { Search, Bookmark, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import CafeCard from "@/components/CafeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"nearby" | "saved">("nearby");

  // 더미 데이터
  const nearbyCafes = [
    {
      id: "1",
      name: "스타벅스 강남점",
      address: "서울 강남구 테헤란로",
      distance: "200m",
      rating: 4.3,
      studyScore: 85,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop"
    },
    {
      id: "2", 
      name: "카페베네 역삼점",
      address: "서울 강남구 역삼동",
      distance: "350m",
      rating: 4.1,
      studyScore: 92,
      features: ["wifi", "outlet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop"
    },
    {
      id: "3",
      name: "이디야커피 선릉점", 
      address: "서울 강남구 선릉로",
      distance: "500m",
      rating: 4.0,
      studyScore: 78,
      features: ["wifi", "quiet"],
      crowdLevel: "high" as const,
      imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=100&h=100&fit=crop"
    }
  ];

  const savedCafes = [
    {
      id: "4",
      name: "투썸플레이스 청담점",
      address: "서울 강남구 청담동",
      distance: "1.2km", 
      rating: 4.5,
      studyScore: 88,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop"
    }
  ];

  const popularTags = ["조용한", "콘센트많음", "24시간", "넓은테이블", "와이파이빠름"];

  return (
    <div className="min-h-screen bg-cafe-gradient pb-20">
      <Header 
        title="카공로그" 
        location="강남구 역삼동"
      />
      
      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 검색 바 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="카페 이름이나 지역을 검색해보세요"
            className="pl-10 bg-white/70 backdrop-blur-sm border-cafe-200"
          />
        </div>

        {/* 인기 태그 */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">인기 검색 태그</h3>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/60 text-cafe-700 hover:bg-white/80">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="flex bg-white/60 backdrop-blur-sm rounded-xl p-1">
          <Button
            variant={activeTab === "nearby" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("nearby")}
            className={`flex-1 ${activeTab === "nearby" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            내 주변
          </Button>
          <Button
            variant={activeTab === "saved" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("saved")}
            className={`flex-1 ${activeTab === "saved" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <Bookmark className="w-4 h-4 mr-1" />
            저장한 카페
          </Button>
        </div>

        {/* 카페 리스트 */}
        <div className="space-y-3">
          {activeTab === "nearby" && (
            <div className="space-y-3 animate-fade-in">
              <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                실시간 카공 추천 ({nearbyCafes.length}곳)
              </h3>
              {nearbyCafes.map((cafe) => (
                <CafeCard key={cafe.id} {...cafe} />
              ))}
            </div>
          )}
          
          {activeTab === "saved" && (
            <div className="space-y-3 animate-fade-in">
              <h3 className="text-sm font-medium text-foreground">저장한 카페 ({savedCafes.length}곳)</h3>
              {savedCafes.length > 0 ? (
                savedCafes.map((cafe) => (
                  <CafeCard key={cafe.id} {...cafe} />
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Bookmark className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>아직 저장한 카페가 없어요</p>
                  <p className="text-sm">마음에 드는 카페를 저장해보세요!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
