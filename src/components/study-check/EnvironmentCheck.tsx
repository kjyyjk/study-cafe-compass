
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EnvironmentCheckProps {
  outlet: string;
  noise: string;
  wifi: string;
  seat: string;
  onOutletChange: (value: string) => void;
  onNoiseChange: (value: string) => void;
  onWifiChange: (value: string) => void;
  onSeatChange: (value: string) => void;
}

const EnvironmentCheck = ({ 
  outlet, 
  noise, 
  wifi, 
  seat, 
  onOutletChange, 
  onNoiseChange, 
  onWifiChange, 
  onSeatChange 
}: EnvironmentCheckProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          카페 환경 체크
        </h3>
        
        {/* 콘센트 */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium">콘센트</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "seats-available", label: "콘센트 좌석 여유" },
              { value: "seats-full", label: "콘센트 좌석 없음" },
              { value: "unavailable", label: "콘센트 사용 불가" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={outlet === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onOutletChange(outlet === option.value ? "" : option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 소음 */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium">소음 정도</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "quiet", label: "조용함" },
              { value: "normal", label: "보통" },
              { value: "noisy", label: "시끄러움" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={noise === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onNoiseChange(noise === option.value ? "" : option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 와이파이 */}
        <div className="space-y-3 mb-4">
          <h4 className="text-sm font-medium">와이파이</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "fast", label: "빠름" },
              { value: "normal", label: "보통" },
              { value: "slow", label: "느림" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={wifi === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onWifiChange(wifi === option.value ? "" : option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* 좌석 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">좌석 상황</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "spacious", label: "여유로움" },
              { value: "normal", label: "보통" },
              { value: "crowded", label: "붐빔" }
            ].map((option) => (
              <Button
                key={option.value}
                variant={seat === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => onSeatChange(seat === option.value ? "" : option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentCheck;
