
import { Calendar, Star, Trophy, MapPin, Camera, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MyPage = () => {
  // 더미 사용자 데이터 - 카공 점수는 사용자의 누적 점수
  const user = {
    name: "김세윤",
    level: 15,
    totalScore: 1520, // 사용자가 쌓은 총 카공 점수
    nextLevelScore: 1600,
    studyDays: 45,
    totalStudyTime: "183시간",
    favoritesCafes: 12,
    writtenReviews: 28,
    badges: [
      { name: "카공 마스터", icon: "🏆", description: "30일 연속 카공 달성" },
      { name: "리뷰왕", icon: "✍️", description: "리뷰 20개 작성" },
      { name: "탐험가", icon: "🗺️", description: "15곳 이상 카페 방문" }
    ]
  };

  const recentActivity = [
    {
      id: 1,
      type: "study",
      cafe: "스타벅스 강남점",
      date: "오늘",
      score: 10,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=60&h=60&fit=crop"
    },
    {
      id: 2,
      type: "review",
      cafe: "카페베네 역삼점", 
      date: "어제",
      score: 5
    },
    {
      id: 3,
      type: "study",
      cafe: "이디야커피 선릉점",
      date: "2일 전",
      score: 10,
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=60&h=60&fit=crop"
    }
  ];

  const levelProgress = ((user.totalScore % 100) / 100) * 100;

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="마이페이지" showNotification={false} />
      
      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 프로필 카드 */}
        <Card className="bg-gradient-to-r from-primary/10 to-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/20 text-primary">LV.{user.level}</Badge>
                  <span className="text-sm text-muted-foreground">카공러버</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">다음 레벨까지</span>
                <span className="text-sm font-medium">{user.nextLevelScore - user.totalScore}점</span>
              </div>
              <Progress value={levelProgress} className="h-2" />
              <div className="text-right">
                <span className="text-xs text-muted-foreground">내 카공 점수: {user.totalScore}점</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 카드들 */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4 text-center">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{user.studyDays}</div>
              <div className="text-xs text-muted-foreground">총 카공 일수</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{user.favoritesCafes}</div>
              <div className="text-xs text-muted-foreground">즐겨찾는 카페</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white border-gray-200">
            <CardContent className="p-4 text-center">
              <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{user.writtenReviews}</div>
              <div className="text-xs text-muted-foreground">작성한 리뷰</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardContent className="p-4 text-center">
              <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-xs text-muted-foreground">커뮤니티 글</div>
            </CardContent>
          </Card>
        </div>

        {/* 획득한 뱃지 */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              획득한 뱃지
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {user.badges.map((badge, index) => (
                <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs font-medium text-foreground">{badge.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 */}
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              최근 활동
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  {activity.image ? (
                    <img 
                      src={activity.image} 
                      alt="활동 사진"
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {activity.type === "study" ? (
                        <Camera className="w-5 h-5 text-primary" />
                      ) : (
                        <Star className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{activity.cafe}</span>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {activity.type === "study" ? "카공 인증" : "리뷰 작성"}
                      </span>
                      <span className="text-xs font-medium text-primary">+{activity.score}점</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default MyPage;
