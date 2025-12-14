import { useState, useCallback } from "react";
import { toast } from "@/hooks/use-toast";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

export const useImageGeneration = () => {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = useCallback(async (prompt: string) => {
    setIsLoading(true);

    try {
      // Using Pollinations AI - free, no API key required
      const encodedPrompt = encodeURIComponent(prompt);
      const seed = Math.floor(Math.random() * 1000000);
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true`;

      // Pre-load the image to ensure it's ready
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      const newImage: GeneratedImage = {
        id: `img-${Date.now()}-${seed}`,
        url: imageUrl,
        prompt,
        timestamp: new Date(),
      };

      setImages((prev) => [newImage, ...prev]);

      toast({
        title: "Image Generated!",
        description: "Your AI artwork has been created successfully.",
      });
    } catch (error) {
      console.error("Image generation failed:", error);
      toast({
        title: "Generation Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images,
    isLoading,
    generateImage,
    clearImages,
  };
};
