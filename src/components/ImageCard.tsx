import { useState } from "react";
import { Download, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageCardProps {
  imageUrl: string;
  prompt: string;
  timestamp: Date;
}

const ImageCard = ({ imageUrl, prompt, timestamp }: ImageCardProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ai-image-${timestamp.getTime()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <div className="group relative bg-gradient-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-card hover:shadow-glow">
        <div className="aspect-square relative overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 animate-shimmer rounded-xl" />
          )}
          <img
            src={imageUrl}
            alt={prompt}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <Button
                variant="glow"
                size="sm"
                className="flex-1"
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="glow"
                size="icon"
                className="shrink-0"
                onClick={() => setIsFullscreen(true)}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-2">
          <p className="text-sm text-foreground line-clamp-2">{prompt}</p>
          <p className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10"
            onClick={() => setIsFullscreen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
          <img
            src={imageUrl}
            alt={prompt}
            className="max-w-full max-h-[90vh] rounded-xl shadow-glow object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ImageCard;
