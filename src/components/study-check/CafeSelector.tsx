
import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CafeSelectorProps {
  selectedCafe: {
    name: string;
    address: string;
    isVerified: boolean;
  };
  onCafeSelect: (cafe: any) => void;
}

const CafeSelector = ({ selectedCafe, onCafeSelect }: CafeSelectorProps) => {
  const [showCafeSearch, setShowCafeSearch] = useState(false);
  const [cafeSearchQuery, setCafeSearchQuery] = useState("");

  // 더미 카페 검색 결과
  const searchResults = [
    { id: "1", name: "스타벅스 강남점", address: "서울 강남구 테헤란로 123" },
    { id: "2", name: "카페베네 역삼점", address: "서울 강남구 역삼동 456" },
    { id: "3", name: "이디야커피 선릉점", address: "서울 강남구 선릉로 789" },
  ];

  const filteredCafes = searchResults.filter(cafe => 
    cafe.name.toLowerCase().includes(cafeSearchQuery.toLowerCase()) ||
    cafe.address.toLowerCase().includes(cafeSearchQuery.toLowerCase())
  );

  const handleCafeSelect = (cafe: any) => {
    onCafeSelect({
      name: cafe.name,
      address: cafe.address,
      isVerified: true
    });
    setShowCafeSearch(false);
    setCafeSearchQuery("");
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            카페 선택
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowCafeSearch(!showCafeSearch)}
          >
            <Search className="w-3 h-3 mr-1" />
            변경
          </Button>
        </div>
        
        {!showCafeSearch ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-foreground">{selectedCafe.name}</h4>
                {selectedCafe.isVerified && (
                  <Badge className="bg-green-100 text-green-700">위치 확인됨</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{selectedCafe.address}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <Input
              placeholder="카페 이름이나 주소를 검색하세요"
              value={cafeSearchQuery}
              onChange={(e) => setCafeSearchQuery(e.target.value)}
              className="w-full"
            />
            <div className="max-h-40 overflow-y-auto space-y-2">
              {filteredCafes.map((cafe) => (
                <div
                  key={cafe.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handleCafeSelect(cafe)}
                >
                  <h4 className="font-medium">{cafe.name}</h4>
                  <p className="text-sm text-muted-foreground">{cafe.address}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CafeSelector;
