
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Star, Filter } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import CafeCard from "@/components/CafeCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"distance" | "rating" | "recent">("distance");

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const searchResults = [
    {
      id: "1",
      name: "스타벅스 강남점",
      address: "서울 강남구 테헤란로",
      distance: "200m",
      distanceInMeters: 200,
      rating: 4.3,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop",
      lastReviewDate: new Date('2024-07-02T10:00:00')
    },
    {
      id: "2", 
      name: "카페베네 역삼점",
      address: "서울 강남구 역삼동",
      distance: "350m",
      distanceInMeters: 350,
      rating: 4.6,
      features: ["wifi", "outlet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop",
      lastReviewDate: new Date('2024-07-02T14:30:00')
    },
    {
      id: "3",
      name: "이디야커피 선릉점", 
      address: "서울 강남구 선릉로",
      distance: "500m",
      distanceInMeters: 500,
      rating: 4.0,
      features: ["wifi", "quiet"],
      crowdLevel: "high" as const,
      imageUrl: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=100&h=100&fit=crop",
      lastReviewDate: new Date('2024-07-01T16:20:00')
    },
    {
      id: "4",
      name: "투썸플레이스 청담점",
      address: "서울 강남구 청담동",
      distance: "1.2km", 
      distanceInMeters: 1200,
      rating: 4.5,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop",
      lastReviewDate: new Date('2024-07-02T09:15:00')
    }
  ];

  const popularSearches = ["조용한 카페", "콘센트 많은", "24시간", "스타벅스", "이디야"];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 검색어로 필터링된 결과
  const filteredResults = searchResults.filter(cafe => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return cafe.name.toLowerCase().includes(query) || 
           cafe.address.toLowerCase().includes(query) ||
           cafe.features.some(feature => {
             switch(feature) {
               case "wifi": return "와이파이".includes(query) || "wifi".includes(query);
               case "outlet": return "콘센트".includes(query) || "outlet".includes(query);
               case "quiet": return "조용".includes(query) || "quiet".includes(query);
               default: return false;
             }
           });
  });

  // 정렬된 검색 결과
  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (activeFilter) {
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return a.distanceInMeters - b.distanceInMeters;
      case "recent":
        return b.lastReviewDate.getTime() - a.lastReviewDate.getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="카페 검색" location="강남구 역삼동" />
      
      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 검색 입력 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="카페 이름이나 지역을 검색해보세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>

        {/* 인기 검색어 */}
        {!searchQuery && (
          <Card>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-3">인기 검색어</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Badge 
                    key={term} 
                    variant="secondary" 
                    className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSearch(term)}
                  >
                    {term}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 필터 옵션 */}
        <div className="flex gap-2">
          <Button
            variant={activeFilter === "distance" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("distance")}
            className="flex items-center gap-1"
          >
            <MapPin className="w-3 h-3" />
            거리순
          </Button>
          <Button
            variant={activeFilter === "rating" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("rating")}
            className="flex items-center gap-1"
          >
            <Star className="w-3 h-3" />
            별점순
          </Button>
          <Button
            variant={activeFilter === "recent" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("recent")}
            className="flex items-center gap-1"
          >
            <Filter className="w-3 h-3" />
            최근 리뷰순
          </Button>
        </div>

        {/* 검색 결과 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">
              {searchQuery ? `'${searchQuery}' 검색 결과` : "내 주변 카페"} ({sortedResults.length}곳)
            </h3>
          </div>
          
          {sortedResults.map((cafe) => (
            <CafeCard key={cafe.id} {...cafe} />
          ))}
        </div>

        {/* 검색 결과가 없을 때 */}
        {searchQuery && sortedResults.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>검색 결과가 없어요</p>
            <p className="text-xs">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
