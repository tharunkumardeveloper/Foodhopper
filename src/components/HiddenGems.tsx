import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Eye, Heart, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { chennaiRestaurants, Restaurant } from "../data/chennaiRestaurants";

interface HiddenGem extends Restaurant {
  hiddenGemScore: number;
  localFavorite: boolean;
  discoveryReason: string;
}

const HiddenGems = () => {
  const [hiddenGems, setHiddenGems] = useState<HiddenGem[]>([]);
  const [currentGemIndex, setCurrentGemIndex] = useState(0);
  const [discoveredGems, setDiscoveredGems] = useState<string[]>([]);

  useEffect(() => {
    // Calculate hidden gem scores and filter
    const gems = chennaiRestaurants
      .map(restaurant => ({
        ...restaurant,
        hiddenGemScore: calculateHiddenGemScore(restaurant),
        localFavorite: restaurant.reviews < 1000 && restaurant.rating >= 4.3,
        discoveryReason: getDiscoveryReason(restaurant)
      }))
      .filter(restaurant => 
        restaurant.hiddenGemScore > 70 && 
        restaurant.reviews < 2000 // Less popular but high quality
      )
      .sort((a, b) => b.hiddenGemScore - a.hiddenGemScore);

    setHiddenGems(gems);

    // Load discovered gems from localStorage
    const discovered = localStorage.getItem('discoveredGems');
    if (discovered) {
      setDiscoveredGems(JSON.parse(discovered));
    }
  }, []);

  const calculateHiddenGemScore = (restaurant: Restaurant): number => {
    let score = 0;
    
    // High rating but low review count = hidden gem
    if (restaurant.rating >= 4.3 && restaurant.reviews < 1500) score += 30;
    if (restaurant.rating >= 4.5 && restaurant.reviews < 1000) score += 20;
    
    // Unique cuisine combinations
    if (restaurant.cuisine.length > 2) score += 15;
    
    // Price value (good rating with reasonable price)
    if (restaurant.rating >= 4.2 && restaurant.priceForTwo < 600) score += 20;
    
    // Location-based (some areas have more hidden gems)
    if (restaurant.address.includes('Mylapore') || 
        restaurant.address.includes('Kilpauk') || 
        restaurant.address.includes('Perambur')) score += 15;
    
    // Specialty features
    if (restaurant.features.includes('Traditional Recipes') || 
        restaurant.features.includes('Heritage')) score += 10;
    
    return Math.min(score, 100);
  };

  const getDiscoveryReason = (restaurant: Restaurant): string => {
    if (restaurant.rating >= 4.5 && restaurant.reviews < 800) {
      return "Exceptional quality with few reviews";
    }
    if (restaurant.features.includes('Traditional Recipes')) {
      return "Authentic family recipes";
    }
    if (restaurant.priceForTwo < 400 && restaurant.rating >= 4.3) {
      return "Amazing value for money";
    }
    if (restaurant.cuisine.length > 2) {
      return "Unique cuisine combination";
    }
    return "Local favorite spot";
  };

  const handleDiscoverGem = (gemId: string) => {
    const newDiscovered = [...discoveredGems, gemId];
    setDiscoveredGems(newDiscovered);
    localStorage.setItem('discoveredGems', JSON.stringify(newDiscovered));
    
    // Move to next gem
    if (currentGemIndex < hiddenGems.length - 1) {
      setCurrentGemIndex(currentGemIndex + 1);
    } else {
      setCurrentGemIndex(0); // Loop back to start
    }
  };

  const nextGem = () => {
    setCurrentGemIndex((prev) => 
      prev < hiddenGems.length - 1 ? prev + 1 : 0
    );
  };

  if (hiddenGems.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Eye className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Hidden Gems Found</h3>
          <p className="text-gray-600">Check back later for new discoveries!</p>
        </CardContent>
      </Card>
    );
  }

  const currentGem = hiddenGems[currentGemIndex];
  const isDiscovered = discoveredGems.includes(currentGem.id);

  return (
    <div className="space-y-6">
      {/* Featured Hidden Gem */}
      <Card className="overflow-hidden border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="relative">
          <div 
            className="h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentGem.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-orange-500 text-white">
                <Eye className="w-3 h-3 mr-1" />
                Hidden Gem #{currentGemIndex + 1}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90">
                Score: {currentGem.hiddenGemScore}/100
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h2 className="text-2xl font-bold mb-2">{currentGem.name}</h2>
              <p className="text-orange-200 font-medium mb-1">
                {currentGem.discoveryReason}
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 mr-1" />
                <span className="font-semibold text-sm md:text-base">{currentGem.rating}</span>
              </div>
              <p className="text-xs text-gray-600">{currentGem.reviews} reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Users className="w-3 h-3 md:w-4 md:h-4 text-blue-500 mr-1" />
                <span className="font-semibold text-sm md:text-base">₹{currentGem.priceForTwo}</span>
              </div>
              <p className="text-xs text-gray-600">for two</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
                <span className="font-semibold text-xs md:text-sm">Local</span>
              </div>
              <p className="text-xs text-gray-600">favorite</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1 md:mb-2">
                <Award className="w-3 h-3 md:w-4 md:h-4 text-purple-500 mr-1" />
                <span className="font-semibold text-xs md:text-sm">Unique</span>
              </div>
              <p className="text-xs text-gray-600">experience</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-700 mb-2">{currentGem.description}</p>
            <div className="flex flex-wrap gap-2">
              {currentGem.cuisine.map((cuisine) => (
                <Badge key={cuisine} variant="outline" className="text-xs">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link to={`/restaurant/${currentGem.id}`} className="flex-1">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Explore This Gem
              </Button>
            </Link>
            
            {!isDiscovered ? (
              <Button 
                variant="outline"
                onClick={() => handleDiscoverGem(currentGem.id)}
                className="flex items-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Discover</span>
              </Button>
            ) : (
              <Badge variant="secondary" className="px-4 py-2">
                <Heart className="w-4 h-4 mr-1 text-red-500" />
                Discovered
              </Badge>
            )}
            
            <Button variant="ghost" onClick={nextGem}>
              Next Gem
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Discovery Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Discovery Journey</h3>
            <Badge variant="secondary">
              {discoveredGems.length} gems discovered
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Eye className="w-8 h-8 mx-auto text-orange-500 mb-2" />
              <p className="font-semibold">{hiddenGems.length}</p>
              <p className="text-sm text-gray-600">Hidden Gems Available</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Heart className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <p className="font-semibold">{discoveredGems.length}</p>
              <p className="text-sm text-gray-600">Gems Discovered</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Award className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <p className="font-semibold">
                {Math.round((discoveredGems.length / hiddenGems.length) * 100)}%
              </p>
              <p className="text-sm text-gray-600">Discovery Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recently Discovered */}
      {discoveredGems.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recently Discovered</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hiddenGems
                .filter(gem => discoveredGems.includes(gem.id))
                .slice(-6)
                .map((gem) => (
                  <div key={gem.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-3 mb-2">
                      <div 
                        className="w-12 h-12 rounded-lg bg-cover bg-center"
                        style={{ backgroundImage: `url(${gem.image})` }}
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{gem.name}</h4>
                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{gem.rating}</span>
                          <span>•</span>
                          <span>₹{gem.priceForTwo}</span>
                        </div>
                      </div>
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{gem.discoveryReason}</p>
                    <Link to={`/restaurant/${gem.id}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Visit Again
                      </Button>
                    </Link>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HiddenGems;