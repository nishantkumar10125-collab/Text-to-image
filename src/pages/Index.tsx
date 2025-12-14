import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ImageGallery from "@/components/ImageGallery";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useImageGeneration } from "@/hooks/useImageGeneration";

const Index = () => {
  const { images, isLoading, generateImage } = useImageGeneration();

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <Header />

        <main className="space-y-16">
          <section>
            <PromptInput onGenerate={generateImage} isLoading={isLoading} />
          </section>

          {isLoading && (
            <section>
              <LoadingAnimation />
            </section>
          )}

          <section>
            <ImageGallery images={images} />
          </section>
        </main>

        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Powered by AI • Free to use • No sign-up required</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
