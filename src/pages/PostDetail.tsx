
import { useState } from "react";
import { ArrowLeft, Heart, Share2, User, Send } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const PostDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");

  // 더미 게시글 데이터 (실제로는 API에서 id로 가져와야 함)
  const [post, setPost] = useState({
    id: parseInt(id || "1"),
    user: {
      name: "카공러버",
      level: 15,
      score: 1520
    },
    title: "강남역 근처 카공하기 좋은 카페 추천해주세요!",
    content: "내일 강남역에서 친구 만나기 전에 2-3시간 정도 공부하려고 하는데, 조용하고 콘센트 많은 카페 있을까요? 스타벅스는 너무 시끄러워서... 분위기 좋고 공부하기 적합한 곳 아시는 분 계시면 추천 부탁드려요!",
    image: null,
    createdAt: "2시간 전",
    likes: 12,
    comments: [
      { id: 1, user: "스터디맨", content: "메가커피 강남점 추천해요! 조용하고 콘센트도 많아요", createdAt: "1시간 전" },
      { id: 2, user: "카페탐험가", content: "투썸플레이스도 괜찮아요. 좀 비싸긴 하지만 분위기 좋아요", createdAt: "30분 전" }
    ],
    isLiked: false
  });

  const handleLike = () => {
    setPost(prevPost => ({
      ...prevPost,
      isLiked: !prevPost.isLiked,
      likes: prevPost.isLiked ? prevPost.likes - 1 : prevPost.likes + 1
    }));
    
    toast({
      title: post.isLiked ? "좋아요 취소" : "좋아요! 👍",
      description: "게시글에 반응을 남겼어요"
    });
  };

  const handleShare = () => {
    toast({
      title: "링크가 복사되었습니다",
      description: "다른 사람들과 공유해보세요!"
    });
  };

  const handleComment = () => {
    if (!newComment.trim()) return;

    setPost(prevPost => ({
      ...prevPost,
      comments: [
        ...prevPost.comments,
        {
          id: Date.now(),
          user: "김세윤",
          content: newComment,
          createdAt: "방금 전"
        }
      ]
    }));

    setNewComment("");
    toast({
      title: "댓글이 작성되었습니다! 💬",
      description: "다른 카공족들과 소통해보세요"
    });
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Link to="/community">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">게시글</h1>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 max-w-md mx-auto">
        <Card className="bg-white border-gray-200">
          <CardContent className="p-4">
            {/* 작성자 정보 */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.user.name}</span>
                  <Badge variant="outline" className="text-xs">LV.{post.user.level}</Badge>
                  <span className="text-xs text-muted-foreground">점수 {post.user.score}</span>
                </div>
                <span className="text-sm text-muted-foreground">{post.createdAt}</span>
              </div>
            </div>

            {/* 제목 */}
            <h1 className="text-lg font-bold text-foreground mb-3">{post.title}</h1>

            {/* 내용 */}
            <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

            {/* 이미지 */}
            {post.image && (
              <img 
                src={post.image} 
                alt="게시글 이미지"
                className="w-full h-64 rounded-lg object-cover mb-4"
              />
            )}

            {/* 액션 버튼들 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current text-red-500" : ""}`} />
                  <span>{post.likes}</span>
                </button>
              </div>

              <button 
                onClick={handleShare}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>공유</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <div className="mt-4 space-y-4">
          <h2 className="font-semibold text-foreground">댓글 {post.comments.length}개</h2>
          
          {/* 댓글 작성 */}
          <div className="flex gap-2">
            <Input
              placeholder="댓글을 작성해보세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleComment();
                }
              }}
            />
            <Button
              size="sm"
              onClick={handleComment}
              disabled={!newComment.trim()}
            >
              <Send className="w-3 h-3" />
            </Button>
          </div>

          {/* 댓글 리스트 */}
          <div className="space-y-3">
            {post.comments.map((comment) => (
              <Card key={comment.id} className="bg-gray-50">
                <CardContent className="p-3">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">{comment.user}</span>
                        <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm text-foreground">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
