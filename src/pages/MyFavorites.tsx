
import { ArrowLeft, Star, MapPin, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyFavorites = () => {
  const favoriteCafes = [
    {
      id: "1",
      name: "스타벅스 강남점",
      address: "서울 강남구 테헤란로",
      distance: "200m",
      rating: 4.3,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "medium" as const,
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&h=100&fit=crop",
      visitCount: 15
    },
    {
      id: "4",
      name: "투썸플레이스 청담점",
      address: "서울 강남구 청담동",
      distance: "1.2km", 
      rating: 4.5,
      features: ["wifi", "outlet", "quiet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=100&h=100&fit=crop",
      visitCount: 8
    },
    {
      id: "2", 
      name: "카페베네 역삼점",
      address: "서울 강남구 역삼동",
      distance: "350m",
      rating: 4.6,
      features: ["wifi", "outlet"],
      crowdLevel: "low" as const,
      imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&h=100&fit=crop",
      visitCount: 5
    }
  ];

  const getFeatureText = (feature: string) => {
    switch(feature) {
      case "wifi": return "와이파이";
      case "outlet": return "콘센트";
      case "quiet": return "조용함";
      default: return feature;
    }
  };

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
            <h1 className="text-xl font-bold text-foreground">즐겨찾는 카페 ({favoriteCafes.length})</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {favoriteCafes.map((cafe) => (
          <Link key={cafe.id} to={`/cafe/${cafe.id}`}>
            <Card className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <img 
                    src={cafe.imageUrl} 
                    alt={cafe.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{cafe.name}</h3>
                      <Bookmark className="w-4 h-4 text-primary fill-current" />
                    </div>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{cafe.address}</span>
                      <span className="text-xs text-muted-foreground">• {cafe.distance}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-yellow-400" />
                        <span className="text-xs font-medium">{cafe.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">방문 {cafe.visitCount}회</Badge>
                    </div>
                    
                    <div className="flex gap-1">
                      {cafe.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs bg-gray-100">
                          {getFeatureText(feature)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyFavorites;
