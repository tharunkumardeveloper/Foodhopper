
import { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchHeroImages } from "../utils/pixabayApi";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const images = await fetchHeroImages();
      setHeroImages(images);
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background Image with Overlay */}
      {heroImages.length > 0 && (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${heroImages[currentImageIndex]}')`
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Discover Your Next
          <span className="text-orange-400 block">Favorite Restaurant</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-fade-in">
          Book tables at the best restaurants in your city
        </p>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg p-4 shadow-2xl max-w-2xl mx-auto animate-scale-in">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search restaurants, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-gray-800"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-gray-800"
              />
            </div>
            <Button 
              size="lg" 
              className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-105"
            >
              Search Now
            </Button>
          </div>
        </div>
        
        {/* Image indicators */}
        {heroImages.length > 0 && (
          <div className="flex justify-center space-x-2 mt-8">
            {heroImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentImageIndex ? 'bg-orange-400' : 'bg-white/50'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
