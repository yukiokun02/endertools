
import { useState } from "react";
import { LucideIcon, Upload, X, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { mergeResourcePacks, generateDownloadLink, generateSHA1Hash } from "@/utils/api";

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
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<(UploadedFile | null)[]>(
    new Array(uploadSections).fill(null)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFiles(prev => {
        const newFiles = [...prev];
        newFiles[index] = { name: file.name, file };
        return newFiles;
      });
      // Reset result when a new file is uploaded
      setResult(null);
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
      // Reset result when a new file is dropped
      setResult(null);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = null;
      return newFiles;
    });
    // Reset result when a file is removed
    setResult(null);
  };

  const handleProcessFiles = async () => {
    // Validate that all required files are uploaded
    const allFilesUploaded = uploadedFiles.every(file => file !== null);
    if (!allFilesUploaded) {
      toast({
        title: "Missing Files",
        description: uploadSections > 1 
          ? "Please upload all resource packs first." 
          : "Please upload a resource pack first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      let processingResult: string | Blob;

      // Determine which tool to use based on the id
      switch (id) {
        case "merger":
          if (uploadedFiles[0]?.file && uploadedFiles[1]?.file) {
            processingResult = await mergeResourcePacks(uploadedFiles[0].file, uploadedFiles[1].file);
            // Create download link for the merged pack
            const url = URL.createObjectURL(processingResult as Blob);
            setResult(url);
            toast({
              title: "Resource Packs Merged Successfully",
              description: "Your resource packs have been combined into one.",
              variant: "default",
            });
          }
          break;

        case "link-generator":
          if (uploadedFiles[0]?.file) {
            processingResult = await generateDownloadLink(uploadedFiles[0].file);
            setResult(processingResult as string);
            toast({
              title: "Download Link Generated",
              description: "Your resource pack link is ready to share.",
              variant: "default",
            });
          }
          break;

        case "hash-generator":
          if (uploadedFiles[0]?.file) {
            processingResult = await generateSHA1Hash(uploadedFiles[0].file);
            setResult(processingResult as string);
            toast({
              title: "SHA-1 Hash Generated",
              description: "Your SHA-1 hash has been created.",
              variant: "default",
            });
          }
          break;

        default:
          throw new Error("Unknown tool type");
      }
    } catch (error) {
      console.error(`Error processing files for ${id}:`, error);
      toast({
        title: "Processing Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

  // Render the result section based on the tool type
  const renderResult = () => {
    if (!result) return null;

    switch (id) {
      case "merger":
        return (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-500" />
              <h4 className="font-medium">Merged Resource Pack Ready</h4>
            </div>
            <a 
              href={result} 
              download="merged_resource_pack.zip"
              className="text-primary hover:text-primary/80 text-sm underline flex items-center gap-1.5"
            >
              <Download className="h-4 w-4" />
              Download Merged Pack
            </a>
          </div>
        );

      case "link-generator":
        return (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-500" />
              <h4 className="font-medium">Download Link Generated</h4>
            </div>
            <div className="flex items-stretch mt-2">
              <Input 
                value={result} 
                readOnly 
                className="bg-background text-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="ml-2"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast({
                    title: "Copied to clipboard",
                    description: "The download link has been copied to your clipboard.",
                  });
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        );

      case "hash-generator":
        return (
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-500" />
              <h4 className="font-medium">SHA-1 Hash Generated</h4>
            </div>
            <div className="flex items-stretch mt-2">
              <Input 
                value={result} 
                readOnly 
                className="bg-background text-sm font-mono text-xs md:text-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="ml-2"
                onClick={() => {
                  navigator.clipboard.writeText(result);
                  toast({
                    title: "Copied to clipboard",
                    description: "The SHA-1 hash has been copied to your clipboard.",
                  });
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        {renderResult()}
      </CardContent>
      
      <CardFooter className="p-6">
        <Button 
          className="w-full bg-primary hover:bg-primary/80 text-white font-medium
                   transition-all duration-200 hover:shadow-[0_0_10px_rgba(139,92,246,0.3)]"
          onClick={handleProcessFiles}
          disabled={isLoading || !uploadedFiles.some(file => file !== null)}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;
