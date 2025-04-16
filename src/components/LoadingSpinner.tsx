
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <Loader2 className="w-8 h-8 animate-spin text-primary" />
    </div>
  );
};

export default LoadingSpinner;
