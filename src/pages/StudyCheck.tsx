
import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Upload, CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const StudyCheck = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState("");
  const [outlet, setOutlet] = useState<string>("");
  const [noise, setNoise] = useState<string>("");
  const [wifi, setWifi] = useState<string>("");
  const [seat, setSeat] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const { toast } = useToast();

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
    }, 2000);
  };

  // 현재 위치 더미 데이터
  const currentLocation = {
    cafe: "스타벅스 강남점",
    address: "서울 강남구 테헤란로 123",
    isVerified: true
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
        {/* 현재 위치 */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{currentLocation.cafe}</h3>
                  {currentLocation.isVerified && (
                    <Badge className="bg-green-100 text-green-700">위치 확인됨</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{currentLocation.address}</p>
              </div>
            </div>
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
              <Label className="text-sm font-medium">콘센트</Label>
              <RadioGroup value={outlet} onValueChange={setOutlet}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="available" id="outlet-yes" />
                  <Label htmlFor="outlet-yes" className="text-sm">콘센트 사용 가능</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unavailable" id="outlet-no" />
                  <Label htmlFor="outlet-no" className="text-sm">콘센트 사용 불가</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 소음 */}
            <div className="space-y-3 mb-4">
              <Label className="text-sm font-medium">소음 정도</Label>
              <RadioGroup value={noise} onValueChange={setNoise}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quiet" id="noise-quiet" />
                  <Label htmlFor="noise-quiet" className="text-sm">조용함</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="noise-normal" />
                  <Label htmlFor="noise-normal" className="text-sm">보통</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="noisy" id="noise-noisy" />
                  <Label htmlFor="noise-noisy" className="text-sm">시끄러움</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 와이파이 */}
            <div className="space-y-3 mb-4">
              <Label className="text-sm font-medium">와이파이</Label>
              <RadioGroup value={wifi} onValueChange={setWifi}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="fast" id="wifi-fast" />
                  <Label htmlFor="wifi-fast" className="text-sm">빠름</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="wifi-normal" />
                  <Label htmlFor="wifi-normal" className="text-sm">보통</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="slow" id="wifi-slow" />
                  <Label htmlFor="wifi-slow" className="text-sm">느림</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 좌석 */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">좌석 상황</Label>
              <RadioGroup value={seat} onValueChange={setSeat}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="spacious" id="seat-spacious" />
                  <Label htmlFor="seat-spacious" className="text-sm">여유로움</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="seat-normal" />
                  <Label htmlFor="seat-normal" className="text-sm">보통</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="crowded" id="seat-crowded" />
                  <Label htmlFor="seat-crowded" className="text-sm">붐빔</Label>
                </div>
              </RadioGroup>
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
