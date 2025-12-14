const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-24 h-24 rounded-full border-4 border-primary/20 animate-spin-slow" />
        
        {/* Inner ring */}
        <div className="absolute inset-2 w-20 h-20 rounded-full border-4 border-transparent border-t-primary border-r-accent animate-spin" />
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-primary animate-pulse-glow" />
        </div>
      </div>
      
      <div className="space-y-2 text-center">
        <p className="text-lg font-display text-gradient animate-pulse">
          Creating Magic
        </p>
        <p className="text-sm text-muted-foreground">
          Your image is being generated...
        </p>
      </div>
    </div>
  );
};

export default LoadingAnimation;
