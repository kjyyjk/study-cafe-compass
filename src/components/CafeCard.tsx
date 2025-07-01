
import { MapPin, Wifi, Zap, Volume2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CafeCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  studyScore?: number; // 사용자 개인 점수 (선택적)
  features: string[];
  crowdLevel: "low" | "medium" | "high";
  imageUrl?: string;
}

const CafeCard = ({ 
  id, 
  name, 
  address, 
  distance, 
  rating, 
  features, 
  crowdLevel,
  imageUrl 
}: CafeCardProps) => {
  const getCrowdText = (level: string) => {
    switch(level) {
      case "low": return "여유";
      case "medium": return "보통";
      case "high": return "혼잡";
      default: return "알 수 없음";
    }
  };

  const getCrowdColor = (level: string) => {
    switch(level) {
      case "low": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      case "high": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch(feature) {
      case "wifi": return <Wifi className="w-3 h-3" />;
      case "outlet": return <Zap className="w-3 h-3" />;
      case "quiet": return <Volume2 className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <Link to={`/cafe/${id}`}>
      <div className="cafe-card group">
        <div className="flex gap-3">
          {imageUrl && (
            <div className="w-16 h-16 rounded-lg bg-cafe-100 flex-shrink-0 overflow-hidden">
              <img 
                src={imageUrl} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground text-sm leading-tight truncate">{name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">{address}</span>
                  <span className="text-xs text-cafe-600 font-medium">· {distance}</span>
                </div>
              </div>
              
              <Badge className={`text-xs px-2 py-1 ${getCrowdColor(crowdLevel)}`}>
                {getCrowdText(crowdLevel)}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="cafe-rating">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-medium">{rating}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {features.map((feature) => (
                  <div key={feature} className="text-cafe-500">
                    {getFeatureIcon(feature)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CafeCard;
