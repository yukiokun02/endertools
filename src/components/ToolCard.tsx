
import { LucideIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  className?: string;
}

const ToolCard = ({
  id,
  title,
  description,
  icon: Icon,
  buttonText,
  className,
}: ToolCardProps) => {
  return (
    <Card 
      id={id}
      className={cn(
        "border border-border/50 overflow-hidden group transition-all duration-300 hover:border-primary/50",
        "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
        className
      )}
    >
      <CardHeader className="relative pb-2">
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center 
                      bg-primary/10 text-primary transition-all duration-300 
                      group-hover:bg-primary/20 group-hover:animate-pulse-glow">
          <Icon size={24} />
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-2">
        <div className="flex items-center justify-center p-8 my-2 rounded-lg border-2 border-dashed 
                      border-border/50 bg-secondary/20 transition-colors hover:border-primary/40 
                      hover:bg-secondary/40 cursor-pointer">
          <div className="text-center">
            <p className="text-muted-foreground">Drag & drop your resource pack(s) here</p>
            <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/80 text-white font-medium
                   transition-all duration-200 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
