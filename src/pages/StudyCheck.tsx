import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Upload, CheckCircle2, Star, Search, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const StudyCheck = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [showCafeSearch, setShowCafeSearch] = useState(false);
  const [cafeSearchQuery, setCafeSearchQuery] = useState("");
  const [selectedCafe, setSelectedCafe] = useState({
    name: "스타벅스 강남점",
    address: "서울 강남구 테헤란로 123",
    isVerified: true
  });
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  
  // 환경 체크 상태들
  const [outlet, setOutlet] = useState<string>("");
  const [noise, setNoise] = useState<string>("");
  const [wifi, setWifi] = useState<string>("");
  const [seat, setSeat] = useState<string>("");
  
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCafeSelect = (cafe: any) => {
    setSelectedCafe({
      name: cafe.name,
      address: cafe.address,
      isVerified: true
    });
    setShowCafeSearch(false);
    setCafeSearchQuery("");
  };

  // 15분 단위, 정각 기준 시간 생성
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    for (let i = 0; i < 96; i++) { // 24시간 * 4 (15분 단위)
      const time = new Date(now);
      time.setMinutes(time.getMinutes() - (i * 15));
      // 15분 단위로 정확히 맞춤
      const minutes = Math.floor(time.getMinutes() / 15) * 15;
      time.setMinutes(minutes);
      time.setSeconds(0);
      time.setMilliseconds(0);
      options.push(time);
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: "사진을 업로드해주세요",
        description: "카공 인증을 위해 공부 사진이 필요해요",
        variant: "destructive"
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "별점을 선택해주세요",
        description: "카페에 대한 평가를 남겨주세요",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);
    
    // 업로드 시뮬레이션
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "카공 인증 완료! 🎉",
        description: "카공 점수 10점을 획득했어요!",
      });
      // 홈페이지로 이동
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">카공 인증</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 카페 선택 */}
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

        {/* 시간 선택 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                카공 시간
              </h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowTimeSelect(!showTimeSelect)}
              >
                <ChevronDown className="w-3 h-3 mr-1" />
                변경
              </Button>
            </div>
            
            {!showTimeSelect ? (
              <p className="text-sm text-muted-foreground">{formatTime(selectedTime)}</p>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-1">
                {timeOptions.map((time, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded cursor-pointer text-sm ${
                      selectedTime.getTime() === time.getTime() 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setSelectedTime(time);
                      setShowTimeSelect(false);
                    }}
                  >
                    {formatTime(time)}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 인증 사진 업로드 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              공부 인증 사진
            </h3>
            
            {!selectedImage ? (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  capture="environment"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground mb-1">공부하는 모습을 사진으로 찍어주세요</p>
                  <p className="text-xs text-muted-foreground">책상, 노트, 노트북 등이 보이면 좋아요!</p>
                </div>
              </label>
            ) : (
              <div className="relative">
                <img 
                  src={selectedImage} 
                  alt="업로드된 사진"
                  className="w-full h-48 object-cover rounded-xl"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  다시 찍기
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 카페 별점 평가 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              카페 별점 평가
            </h3>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">이 카페는 어떠셨나요?</p>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
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

        {/* 카페 환경 체크 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              카페 환경 체크
            </h3>
            
            {/* 콘센트 */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium">콘센트</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "available", label: "콘센트 사용 가능" },
                  { value: "unavailable", label: "콘센트 사용 불가" },
                  { value: "seats-available", label: "콘센트 좌석 여유" },
                  { value: "seats-full", label: "콘센트 좌석 없음" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={outlet === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setOutlet(outlet === option.value ? "" : option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 소음 */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium">소음 정도</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "quiet", label: "조용함" },
                  { value: "normal", label: "보통" },
                  { value: "noisy", label: "시끄러움" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={noise === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNoise(noise === option.value ? "" : option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 와이파이 */}
            <div className="space-y-3 mb-4">
              <h4 className="text-sm font-medium">와이파이</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "fast", label: "빠름" },
                  { value: "normal", label: "보통" },
                  { value: "slow", label: "느림" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={wifi === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWifi(wifi === option.value ? "" : option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* 좌석 */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">좌석 상황</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "spacious", label: "여유로움" },
                  { value: "normal", label: "보통" },
                  { value: "crowded", label: "붐빔" },
                  { value: "comfortable", label: "편안한 좌석" },
                  { value: "uncomfortable", label: "불편한 좌석" }
                ].map((option) => (
                  <Button
                    key={option.value}
                    variant={seat === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSeat(seat === option.value ? "" : option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 간단 후기 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">오늘의 카공 후기 (선택)</h3>
            <Textarea
              placeholder="오늘 이 카페에서 공부한 느낌을 간단히 남겨보세요! 다른 카공족들에게 도움이 될 거예요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[80px] bg-white border-gray-200"
            />
            <p className="text-xs text-muted-foreground mt-2">
              💡 개인적인 팁이나 추천사항을 공유해주세요!
            </p>
          </CardContent>
        </Card>

        {/* 예상 리워드 */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-foreground">인증 완료시 획득</h4>
                <p className="text-sm text-muted-foreground">매일 꾸준히 하면 더 많은 점수를!</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">+10</div>
                <div className="text-xs text-muted-foreground">카공 점수</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 인증 버튼 */}
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
          onClick={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              인증 중...
            </>
          ) : (
            <>
              <Clock className="w-4 h-4 mr-2" />
              카공 인증하기
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          인증된 정보는 다른 카공족들과 공유되어 더 나은 카공 환경을 만드는데 도움이 됩니다
        </p>
      </div>
    </div>
  );
};

export default StudyCheck;
