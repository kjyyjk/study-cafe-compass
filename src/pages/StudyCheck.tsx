
import { useState } from "react";
import { ArrowLeft, Clock, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import CafeSelector from "@/components/study-check/CafeSelector";
import TimeSelector from "@/components/study-check/TimeSelector";
import PhotoUpload from "@/components/study-check/PhotoUpload";
import RatingSelector from "@/components/study-check/RatingSelector";
import EnvironmentCheck from "@/components/study-check/EnvironmentCheck";
import ReviewSection from "@/components/study-check/ReviewSection";

const StudyCheck = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [selectedCafe, setSelectedCafe] = useState({
    name: "스타벅스 강남점",
    address: "서울 강남구 테헤란로 123",
    isVerified: true
  });
  const [selectedTime, setSelectedTime] = useState(new Date());
  
  // 환경 체크 상태들
  const [outlet, setOutlet] = useState<string>("");
  const [noise, setNoise] = useState<string>("");
  const [wifi, setWifi] = useState<string>("");
  const [seat, setSeat] = useState<string>("");
  
  const { toast } = useToast();
  const navigate = useNavigate();

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
        title: "카공 점수를 선택해주세요",
        description: "카페에 대한 카공 평가를 남겨주세요",
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
        <CafeSelector 
          selectedCafe={selectedCafe}
          onCafeSelect={setSelectedCafe}
        />

        {/* 카공 시작 시간 */}
        <TimeSelector 
          selectedTime={selectedTime}
          onTimeSelect={setSelectedTime}
        />

        {/* 인증 사진 업로드 */}
        <PhotoUpload 
          selectedImage={selectedImage}
          onImageUpload={handleImageUpload}
          onImageRemove={() => setSelectedImage(null)}
        />

        {/* 카공 점수 평가 */}
        <RatingSelector 
          rating={rating}
          onRatingChange={setRating}
        />

        {/* 카페 환경 체크 */}
        <EnvironmentCheck 
          outlet={outlet}
          noise={noise}
          wifi={wifi}
          seat={seat}
          onOutletChange={setOutlet}
          onNoiseChange={setNoise}
          onWifiChange={setWifi}
          onSeatChange={setSeat}
        />

        {/* 간단 후기 */}
        <ReviewSection 
          review={review}
          onReviewChange={setReview}
        />

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
