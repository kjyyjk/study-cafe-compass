
import { useState } from "react";
import { Clock, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TimeSelectorProps {
  selectedTime: Date;
  onTimeSelect: (time: Date) => void;
}

const TimeSelector = ({ selectedTime, onTimeSelect }: TimeSelectorProps) => {
  const [showTimeSelect, setShowTimeSelect] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [selectedMinute, setSelectedMinute] = useState(new Date().getMinutes());

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일 ${hours}:${minutes}`;
  };

  const handleTimeSelect = () => {
    const newTime = new Date(selectedDate);
    newTime.setHours(selectedHour);
    newTime.setMinutes(selectedMinute);
    onTimeSelect(newTime);
    setShowTimeSelect(false);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            카공 시작 시간
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTimeSelect(!showTimeSelect)}
          >
            <ChevronDown className="w-3 h-3 mr-1" />
            변경
          </Button>
        </div>
        
        {!showTimeSelect ? (
          <p className="text-sm text-muted-foreground">{formatTime(selectedTime)}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">날짜 선택</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "yyyy년 MM월 dd일") : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-2 block">시간</label>
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}시
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">분</label>
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
                  className="w-full p-2 border rounded-md text-sm"
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i.toString().padStart(2, '0')}분
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <Button onClick={handleTimeSelect} className="w-full">
              시간 설정 완료
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeSelector;
