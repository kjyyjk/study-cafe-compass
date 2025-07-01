
import { MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  location?: string;
  showNotification?: boolean;
}

const Header = ({ title, location, showNotification = true }: HeaderProps) => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-cafe-200 sticky top-0 z-40">
      <div className="px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            {location && (
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4 text-cafe-600" />
                <span className="text-sm text-cafe-600">{location}</span>
              </div>
            )}
          </div>
          
          {showNotification && (
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
