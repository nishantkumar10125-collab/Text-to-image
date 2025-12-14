import { Wand2 } from "lucide-react";

const Header = () => {
  return (
    <header className="relative py-12 text-center overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(280_100%_65%/0.15)_0%,transparent_50%)]" />
      
      <div className="relative z-10 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow animate-float">
          <Wand2 className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
          <span className="text-gradient">Text to Image</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
          Transform your imagination into stunning visuals with AI-powered image generation
        </p>
      </div>
    </header>
  );
};

export default Header;
