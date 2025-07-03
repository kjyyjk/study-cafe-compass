
import { useState } from "react";
import { MessageCircle, Heart, Share2, Plus, TrendingUp, Clock, User, Send } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const [activeTab, setActiveTab] = useState<"hot" | "recent">("hot");
  const [posts, setPosts] = useState([
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
      comments: [
        { id: 1, user: "스터디맨", content: "메가커피 강남점 추천해요! 조용하고 콘센트도 많아요", createdAt: "1시간 전" },
        { id: 2, user: "카페탐험가", content: "투썸플레이스도 괜찮아요. 좀 비싸긴 하지만 분위기 좋아요", createdAt: "30분 전" }
      ],
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
      comments: [
        { id: 3, user: "공부왕", content: "대박! 4시간이나 집중하셨다니 존경해요 👏", createdAt: "2시간 전" }
      ],
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
      comments: [
        { id: 4, user: "취준생", content: "오 좋은 팁이네요!", createdAt: "4시간 전" },
        { id: 5, user: "대학생", content: "저도 써봐야겠어요", createdAt: "3시간 전" },
        { id: 6, user: "직장인", content: "50분 집중 10분 휴식 정말 효과적이에요", createdAt: "2시간 전" }
      ],
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
      comments: [
        { id: 7, user: "카페탐험가", content: "어디인지 알 수 있을까요?", createdAt: "1일 전" },
        { id: 8, user: "서울숲러버", content: "저도 궁금해요!", createdAt: "20시간 전" }
      ],
      isLiked: true
    }
  ]);

  const { toast } = useToast();

  // 정렬된 게시글 목록
  const sortedPosts = [...posts].sort((a, b) => {
    if (activeTab === "hot") {
      return b.likes - a.likes; // 좋아요 많은 순
    } else {
      // 최신순 정렬 (시간 문자열을 간단히 비교)
      const timeA = a.createdAt.includes("시간") ? parseInt(a.createdAt) : 
                   a.createdAt.includes("일") ? parseInt(a.createdAt) * 24 : 0;
      const timeB = b.createdAt.includes("시간") ? parseInt(b.createdAt) : 
                   b.createdAt.includes("일") ? parseInt(b.createdAt) * 24 : 0;
      return timeA - timeB; // 최신순
    }
  });

  const handleLike = (postId: number) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
    
    toast({
      title: posts.find(p => p.id === postId)?.isLiked ? "좋아요 취소" : "좋아요! 👍",
      description: "게시글에 반응을 남겼어요"
    });
  };

  const handleShare = (postId: number) => {
    toast({
      title: "링크가 복사되었습니다",
      description: "다른 사람들과 공유해보세요!"
    });
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
        <Link to="/create-post">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            새 글 작성하기
          </Button>
        </Link>

        {/* 게시글 리스트 */}
        <div className="space-y-3">
          {sortedPosts.map((post) => (
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

                {/* 제목 - 클릭 시 상세 페이지로 이동 */}
                <Link to={`/post/${post.id}`}>
                  <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors cursor-pointer">{post.title}</h3>
                </Link>

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
                    
                    <Link 
                      to={`/post/${post.id}`}
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments.length}</span>
                    </Link>
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
