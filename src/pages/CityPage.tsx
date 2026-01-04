
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Users } from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { chennaiRestaurants, Restaurant } from "../data/chennaiRestaurants";

const CityPage = () => {
  const { cityName } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    // In real app, fetch restaurants by city from API
    // For now, using Chennai restaurants as default
    setRestaurants(chennaiRestaurants);
    setFilteredRestaurants(chennaiRestaurants);
  }, [cityName]);

  useEffect(() => {
    let filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (cuisineFilter) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.includes(cuisineFilter)
      );
    }

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.priceForTwo - b.priceForTwo;
        case 'price-high':
          return b.priceForTwo - a.priceForTwo;
        default:
          return 0;
      }
    });

    setFilteredRestaurants(filtered);
  }, [searchTerm, cuisineFilter, sortBy, restaurants]);

  const openInGoogleMaps = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Restaurants in {cityName || 'Chennai'}
            </h1>
            <p className="text-gray-600">
              Discover amazing dining experiences in your city
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search restaurants or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Cuisines</SelectItem>
                <SelectItem value="South Indian">South Indian</SelectItem>
                <SelectItem value="North Indian">North Indian</SelectItem>
                <SelectItem value="Continental">Continental</SelectItem>
                <SelectItem value="Biryani">Biryani</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="text-sm text-gray-600 flex items-center">
              {filteredRestaurants.length} restaurants found
            </div>
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.image})` }}
                />
                <CardContent className="p-6">
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine.join(", ")}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{restaurant.rating} ({restaurant.reviews})</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>₹{restaurant.priceForTwo} for two</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-6">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurant.workingHours}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => openInGoogleMaps(restaurant)}
                      className="px-3"
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
