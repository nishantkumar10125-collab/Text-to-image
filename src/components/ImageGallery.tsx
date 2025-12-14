import ImageCard from "./ImageCard";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
}

interface ImageGalleryProps {
  images: GeneratedImage[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display text-gradient">Your Creations</h2>
        <span className="text-sm text-muted-foreground">
          {images.length} image{images.length !== 1 ? "s" : ""} generated
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            imageUrl={image.url}
            prompt={image.prompt}
            timestamp={image.timestamp}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
