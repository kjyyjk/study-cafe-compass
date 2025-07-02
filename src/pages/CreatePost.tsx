
import { useState } from "react";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "제목을 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "내용을 입력해주세요",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // 게시글 작성 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "게시글이 작성되었습니다! 🎉",
        description: "커뮤니티에서 확인해보세요!"
      });
      navigate("/community");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/community">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold text-foreground">새 글 작성</h1>
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              size="sm"
              className="bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? "작성 중..." : "완료"}
            </Button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 max-w-md mx-auto space-y-4">
        {/* 제목 입력 */}
        <Card>
          <CardContent className="p-4">
            <Input
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-semibold border-none p-0 focus-visible:ring-0"
            />
          </CardContent>
        </Card>

        {/* 내용 입력 */}
        <Card>
          <CardContent className="p-4">
            <Textarea
              placeholder="카공족들과 공유하고 싶은 이야기를 자유롭게 써주세요!&#10;&#10;예시:&#10;- 추천 카페 정보&#10;- 공부 팁이나 루틴&#10;- 카공 후기&#10;- 질문이나 고민"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] border-none p-0 focus-visible:ring-0 resize-none"
            />
          </CardContent>
        </Card>

        {/* 이미지 업로드 */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Camera className="w-4 h-4 text-primary" />
              사진 첨부 (선택)
            </h3>
            
            {!selectedImage ? (
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors">
                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">사진을 추가해보세요</p>
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
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  삭제
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 작성 가이드 */}
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-2">💡 좋은 글 작성 팁</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• 구체적이고 도움이 되는 정보를 공유해주세요</li>
              <li>• 카페 위치나 특징을 자세히 설명해주세요</li>
              <li>• 다른 카공족들에게 도움이 될 팁을 공유해주세요</li>
              <li>• 사진을 함께 올리면 더 좋아요!</li>
            </ul>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreatePost;
