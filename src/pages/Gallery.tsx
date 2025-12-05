import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Camera, 
  ArrowRight,
  X
} from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  category: string | null;
}

const defaultGalleryImages = [
  { id: "1", title: "Classroom Session", image_url: "/placeholder.svg", category: "classroom" },
  { id: "2", title: "Science Lab", image_url: "/placeholder.svg", category: "lab" },
  { id: "3", title: "Annual Day Celebration", image_url: "/placeholder.svg", category: "events" },
  { id: "4", title: "Award Ceremony", image_url: "/placeholder.svg", category: "events" },
  { id: "5", title: "Study Hall", image_url: "/placeholder.svg", category: "classroom" },
  { id: "6", title: "Sports Day", image_url: "/placeholder.svg", category: "events" },
];

const categories = ["All", "Classroom", "Lab", "Events", "General"];

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>(defaultGalleryImages);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setImages(data);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-primary-foreground mb-6">
              <Camera className="w-4 h-4 text-accent" />
              Photo Gallery
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Glimpses of Our Journey
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Explore moments captured at TutorzIndia - from classroom learning to celebrations and achievements.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "hero" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id}
                  className="group relative aspect-square bg-muted rounded-2xl overflow-hidden cursor-pointer shadow-soft hover:shadow-card transition-all duration-300"
                  onClick={() => setLightboxImage(image)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-primary-foreground font-medium text-sm truncate">
                        {image.title}
                      </p>
                      {image.category && (
                        <p className="text-primary-foreground/70 text-xs capitalize">
                          {image.category}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                No Images Yet
              </h3>
              <p className="text-muted-foreground">
                Gallery images will appear here once uploaded by admin.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button 
            className="absolute top-4 right-4 w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden">
            <img
              src={lightboxImage.image_url}
              alt={lightboxImage.title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-primary-foreground">
            <p className="font-display font-semibold text-lg">{lightboxImage.title}</p>
            {lightboxImage.category && (
              <p className="text-primary-foreground/70 text-sm capitalize">{lightboxImage.category}</p>
            )}
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Be Part of Our Story
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10">
              Join TutorzIndia and create your own memorable moments on the path to success.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/inquiry">
                <Button variant="accent" size="xl">
                  Register Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline-light" size="xl">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
