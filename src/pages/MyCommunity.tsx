
import { useState } from "react";
import { ArrowLeft, MessageCircle, Heart, User, TrendingUp, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyCommunity = () => {
  const [activeTab, setActiveTab] = useState<"myPosts" | "likedPosts">("myPosts");

  const myPosts = [
    {
      id: 1,
      title: "강남역 근처 카공하기 좋은 카페 추천해주세요!",
      content: "내일 강남역에서 친구 만나기 전에 2-3시간 정도 공부하려고 하는데, 조용하고 콘센트 많은 카페 있을까요?",
      createdAt: "2시간 전",
      likes: 12,
      comments: 8,
      isLiked: false
    },
    {
      id: 2,
      title: "카공 중 집중력 높이는 꿀팁 공유",
      content: "저만의 카공 루틴 공유해요! 1. 카페 도착하면 30분 동안 정리정돈 2. 타이머 1시간 설정...",
      createdAt: "5시간 전",
      likes: 45,
      comments: 23,
      isLiked: false
    }
  ];

  const likedPosts = [
    {
      id: 3,
      user: "스터디맨",
      title: "오늘 카공 인증! 🔥",
      content: "홍대 카페에서 4시간 집중 완료! 분위기 너무 좋았어요.",
      createdAt: "3시간 전",
      likes: 28,
      comments: 15,
      isLiked: true
    },
    {
      id: 4,
      user: "취준생화이팅",
      title: "이 카페 진짜 최고에요 ㅠㅠ",
      content: "서울숲 근처에 있는 작은 카페인데 사장님도 친절하시고 음료도 맛있고...",
      createdAt: "1일 전",
      likes: 67,
      comments: 31,
      isLiked: true
    }
  ];

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
            <h1 className="text-xl font-bold text-foreground">내 커뮤니티 활동</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 탭 메뉴 */}
        <div className="flex bg-gray-50 rounded-xl p-1">
          <Button
            variant={activeTab === "myPosts" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("myPosts")}
            className={`flex-1 ${activeTab === "myPosts" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <User className="w-4 h-4 mr-1" />
            내 글 ({myPosts.length})
          </Button>
          <Button
            variant={activeTab === "likedPosts" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("likedPosts")}
            className={`flex-1 ${activeTab === "likedPosts" ? "bg-primary text-primary-foreground" : ""}`}
          >
            <Heart className="w-4 h-4 mr-1" />
            좋아요 글 ({likedPosts.length})
          </Button>
        </div>

        {/* 내 글 목록 */}
        {activeTab === "myPosts" && (
          <div className="space-y-3">
            {myPosts.map((post) => (
              <Card key={post.id} className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <Link to={`/post/${post.id}`}>
                    <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 좋아요한 글 목록 */}
        {activeTab === "likedPosts" && (
          <div className="space-y-3">
            {likedPosts.map((post) => (
              <Card key={post.id} className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{post.user}</span>
                    <span className="text-xs text-muted-foreground">{post.createdAt}</span>
                  </div>
                  
                  <Link to={`/post/${post.id}`}>
                    <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <Heart className="w-4 h-4 fill-current" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCommunity;
