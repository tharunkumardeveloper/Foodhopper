import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Search, Star, TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchPixabayImages } from "../utils/pixabayApi";
import AISearchSuggestions from "./AISearchSuggestions";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await searchPixabayImages('elegant restaurant dining fine cuisine luxury interior', 5);
        if (images.length > 0) {
          setHeroImages(images);
        } else {
          // Fallback to high-quality restaurant images
          setHeroImages([
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
            "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
          ]);
        }
      } catch (error) {
        console.error('Error loading hero images:', error);
        setHeroImages([
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
        ]);
      }
    };
    loadImages();
  }, []);

  useEffect(() => {
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate(`/search?q=${searchQuery}&location=${location}`);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${suggestion}&location=${location}`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'nearby':
        navigate(`/search?nearby=true&location=${location}`);
        break;
      case 'intent':
        navigate('/intent-selection');
        break;
      case 'dining-types':
        navigate('/dining-types');
        break;
      default:
        navigate('/search');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {heroImages.length > 0 && (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-2000 ease-in-out transform scale-105"
            style={{
              backgroundImage: `url('${heroImages[currentImageIndex]}')`
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Main Heading */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Discover Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 block">
              Dining Experience
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-4xl mx-auto leading-relaxed">
            AI-powered recommendations to find restaurants that match your mood, budget, and taste preferences
          </p>
        </div>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto mb-12 relative">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search restaurants, cuisines, or dishes..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 h-14 text-gray-800 text-lg border-0 focus:ring-2 focus:ring-orange-500"
              />
              <AISearchSuggestions
                query={searchQuery}
                onSuggestionClick={handleSuggestionClick}
                isVisible={showSuggestions}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-12 h-14 text-gray-800 text-lg border-0 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Button 
              type="submit"
              size="lg" 
              className="h-14 px-8 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg shadow-lg"
            >
              Find Restaurants
            </Button>
          </div>
        </form>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <Button 
            onClick={() => handleQuickAction('nearby')}
            variant="outline"
            size="lg"
            className="h-16 bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm"
          >
            <MapPin className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Explore Nearby</div>
              <div className="text-sm opacity-80">Restaurants around you</div>
            </div>
          </Button>
          
          <Button 
            onClick={() => handleQuickAction('intent')}
            variant="outline"
            size="lg"
            className="h-16 bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm"
          >
            <Star className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">AI Recommendations</div>
              <div className="text-sm opacity-80">Personalized for you</div>
            </div>
          </Button>
          
          <Button 
            onClick={() => handleQuickAction('dining-types')}
            variant="outline"
            size="lg"
            className="h-16 bg-white/10 border-white/30 text-white hover:bg-white hover:text-gray-800 transition-all duration-300 backdrop-blur-sm"
          >
            <TrendingUp className="h-6 w-6 mr-3" />
            <div className="text-left">
              <div className="font-semibold">Browse Categories</div>
              <div className="text-sm opacity-80">Fine dining, cafes & more</div>
            </div>
          </Button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-8 w-8 text-orange-400 mr-2" />
              <div className="text-4xl font-bold text-orange-400">5000+</div>
            </div>
            <div className="text-sm text-gray-300">Verified Restaurants</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-orange-400 mr-2" />
              <div className="text-4xl font-bold text-orange-400">50K+</div>
            </div>
            <div className="text-sm text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-orange-400 mr-2" />
              <div className="text-4xl font-bold text-orange-400">4.8</div>
            </div>
            <div className="text-sm text-gray-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-orange-400 mr-2" />
              <div className="text-4xl font-bold text-orange-400">95%</div>
            </div>
            <div className="text-sm text-gray-300">AI Match Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
