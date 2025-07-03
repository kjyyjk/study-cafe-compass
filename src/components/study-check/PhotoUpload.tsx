
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PhotoUploadProps {
  selectedImage: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

const PhotoUpload = ({ selectedImage, onImageUpload, onImageRemove }: PhotoUploadProps) => {
  return (
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
              onChange={onImageUpload}
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
              onClick={onImageRemove}
            >
              다시 찍기
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoUpload;
