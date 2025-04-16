
import { useState } from "react";
import { LucideIcon, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface UploadedFile {
  name: string;
  file: File;
}

interface ToolCardProps {
  id: string;
  title: React.ReactNode;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  className?: string;
  uploadSections?: number;
}

const ToolCard = ({
  id,
  title,
  description,
  icon: Icon,
  buttonText,
  className,
  uploadSections = 1,
}: ToolCardProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<(UploadedFile | null)[]>(
    new Array(uploadSections).fill(null)
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = { name: file.name, file };
        return newFiles;
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = { name: file.name, file };
        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
  };

  const renderUploadSection = (index: number) => (
    <div key={index} className="space-y-4">
      {uploadSections > 1 && (
        <h4 className="text-sm font-medium text-muted-foreground">
          Resource Pack {index + 1}
        </h4>
      )}
      <div className="relative">
        <div
          className={cn(
            "flex items-center justify-center p-8 my-2 rounded-lg border-2 border-dashed",
            "border-border/50 bg-secondary/20 transition-colors",
            "hover:border-primary/40 hover:bg-secondary/40 cursor-pointer"
          )}
          onDrop={(e) => handleDrop(e, index)}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploadedFiles[index] ? (
            <div className="relative w-full">
              <div className="flex items-center justify-between bg-secondary/30 p-3 rounded">
                <span className="text-sm text-muted-foreground">{uploadedFiles[index]?.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-destructive hover:text-destructive/90"
                  onClick={() => handleRemoveFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-muted-foreground">Drag & drop your resource pack here</p>
              <p className="text-xs text-muted-foreground mt-1">or use the button below</p>
            </div>
          )}
        </div>
        {!uploadedFiles[index] && (
          <div className="flex justify-center mt-2">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto"
              onClick={() => document.getElementById(`file-upload-${id}-${index}`)?.click()}
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </Button>
            <input
              id={`file-upload-${id}-${index}`}
              type="file"
              className="hidden"
              accept=".zip"
              onChange={(e) => handleFileUpload(e, index)}
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card 
      id={id}
      className={cn(
        "border border-border/50 overflow-hidden group transition-all duration-300 hover:border-primary/50",
        "hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] min-h-[400px]",
        "w-full md:min-w-[350px]",
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
      
      <CardContent className="pt-2 space-y-6">
        {Array.from({ length: uploadSections }, (_, i) => renderUploadSection(i))}
      </CardContent>
      
      <CardFooter className="p-6">
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
