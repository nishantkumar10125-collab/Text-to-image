import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput = ({ onGenerate, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const maxLength = 500;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  };

  const examplePrompts = [
    "A cyberpunk city at night with neon lights and flying cars",
    "A magical forest with glowing mushrooms and fairy lights",
    "An astronaut riding a horse on Mars with Earth in the background",
    "A steampunk robot serving tea in a Victorian parlor",
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, maxLength))}
            placeholder="Describe the image you want to create..."
            className="min-h-[140px] resize-none bg-card border-border focus:border-primary/50 focus:ring-primary/20 text-foreground placeholder:text-muted-foreground text-lg p-4 rounded-xl transition-all duration-300"
            disabled={isLoading}
          />
          <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
            {prompt.length}/{maxLength}
          </div>
        </div>

        <Button
          type="submit"
          variant="gradient"
          size="xl"
          className="w-full font-display tracking-wider uppercase"
          disabled={!prompt.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Image
            </>
          )}
        </Button>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          Try an example prompt:
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {examplePrompts.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-xs bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground rounded-full border border-border/50 hover:border-primary/30 transition-all duration-300"
              disabled={isLoading}
            >
              {example.slice(0, 40)}...
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
