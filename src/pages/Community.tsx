
import { useState } from "react";
import { MessageCircle, Heart, Share2, Plus, TrendingUp, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const [activeTab, setActiveTab] = useState<"hot" | "recent">("hot");

  // 더미 커뮤니티 데이터
  const posts = [
    {
      id: 1,
      user: {
        name: "카공러버",
        level: 15,
        score: 1520
      },
      title: "강남역 근처 카공하기 좋은 카페 추천해주세요!",
      content: "내일 강남역에서 친구 만나기 전에 2-3시간 정도 공부하려고 하는데, 조용하고 콘센트 많은 카페 있을까요? 스타벅스는 너무 시끄러워서...",
      image: null,
      createdAt: "2시간 전",
      likes: 12,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      user: {
        name: "스터디맨",
        level: 22,
        score: 2340
      },
      title: "오늘 카공 인증! 🔥",
      content: "홍대 카페에서 4시간 집중 완료! 분위기 너무 좋았어요. 다른 분들도 화이팅~",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      createdAt: "3시간 전",
      likes: 28,
      comments: 15,
      isLiked: true
    },
    {
      id: 3,
      user: {
        name: "공부왕",
        level: 8,
        score: 750
      },
      title: "카공 중 집중력 높이는 꿀팁 공유",
      content: "저만의 카공 루틴 공유해요! 1. 카페 도착하면 30분 동안 정리정돈 2. 타이머 1시간 설정 3. 50분 집중 + 10분 휴식...",
      image: null,
      createdAt: "5시간 전",
      likes: 45,
      comments: 23,
      isLiked: false
    },
    {
      id: 4,
      user: {
        name: "취준생화이팅",
        level: 12,
        score: 1100
      },
      title: "이 카페 진짜 최고에요 ㅠㅠ",
      content: "서울숲 근처에 있는 작은 카페인데 사장님도 친절하시고 음료도 맛있고 무엇보다 진짜 조용해요! 콘센트도 테이블마다 있고...",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
      createdAt: "1일 전",
      likes: 67,
      comments: 31,
      isLiked: true
    }
  ];

  const handleLike = (postId: number) => {
    // 좋아요 기능 구현 (나중에 백엔드 연동)
    console.log(`Post ${postId} liked`);
  };

  const handleShare = (postId: number) => {
    // 공유 기능 구현
    console.log(`Post ${postId} shared`);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      <Header title="커뮤니티" showNotification={true} />
      
      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 탭 메뉴 */}
        <div className="flex bg-gray-50 rounded-xl p-1">
          <Button
            variant={activeTab === "hot" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("hot")}
            className={`flex-1 ${activeTab === "hot" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            인기글
          </Button>
          <Button
            variant={activeTab === "recent" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("recent")}
            className={`flex-1 ${activeTab === "recent" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <Clock className="w-4 h-4 mr-1" />
            최신글
          </Button>
        </div>

        {/* 글쓰기 버튼 */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          새 글 작성하기
        </Button>

        {/* 게시글 리스트 */}
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* 작성자 정보 */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{post.user.name}</span>
                      <Badge variant="outline" className="text-xs">LV.{post.user.level}</Badge>
                      <span className="text-xs text-muted-foreground">점수 {post.user.score}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  </div>
                </div>

                {/* 제목 */}
                <h3 className="font-semibold text-foreground mb-2">{post.title}</h3>

                {/* 내용 */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{post.content}</p>

                {/* 이미지 */}
                {post.image && (
                  <img 
                    src={post.image} 
                    alt="게시글 이미지"
                    className="w-full h-48 rounded-lg object-cover mb-3"
                  />
                )}

                {/* 액션 버튼들 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current text-red-500" : ""}`} />
                      <span>{post.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>공유</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Community;
