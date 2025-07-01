
import { useState } from "react";
import { ArrowLeft, Camera, MapPin, Clock, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const StudyCheck = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState("");
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
    <div className="min-h-screen bg-cafe-gradient pb-20">
      {/* 헤더 */}
      <div className="bg-white/95 backdrop-blur-md border-b border-cafe-200 sticky top-0 z-40">
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
                <div className="border-2 border-dashed border-cafe-300 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <Camera className="w-12 h-12 text-cafe-400 mx-auto mb-3" />
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

        {/* 간단 후기 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">오늘의 카공 후기 (선택)</h3>
            <Textarea
              placeholder="오늘 이 카페에서 공부한 느낌을 간단히 남겨보세요! 다른 카공족들에게 도움이 될 거예요."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[80px] bg-white/70 backdrop-blur-sm border-cafe-200"
            />
            <p className="text-xs text-muted-foreground mt-2">
              💡 콘센트 위치, 조용함 정도, 좌석 정보 등을 공유해주세요!
            </p>
          </CardContent>
        </Card>

        {/* 예상 리워드 */}
        <Card className="bg-gradient-to-r from-study-50 to-cafe-50">
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
