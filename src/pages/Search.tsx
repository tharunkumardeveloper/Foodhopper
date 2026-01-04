
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, MapPin, Star, Clock, Filter } from "lucide-react";
import { getRestaurantImages } from "../utils/pixabayApi";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const isNearby = searchParams.get('nearby') === 'true';
  const diningType = searchParams.get('type') || '';
  const restaurantImages = getRestaurantImages();

  const mockRestaurants = [
    {
      id: 1,
      name: "The Spice Route",
      cuisine: "Indian, Asian",
      rating: 4.8,
      reviews: 1250,
      price: "₹1,200 for two",
      image: restaurantImages[0],
      location: "Bandra West",
      distance: "2.3 km",
      time: "30-40 mins"
    },
    {
      id: 2,
      name: "Artisan Bistro",
      cuisine: "Continental, Italian",
      rating: 4.6,
      reviews: 890,
      price: "₹1,800 for two",
      image: restaurantImages[1],
      location: "Connaught Place",
      distance: "1.8 km",
      time: "25-35 mins"
    },
    {
      id: 3,
      name: "Coastal Kitchen",
      cuisine: "Seafood, South Indian",
      rating: 4.7,
      reviews: 1560,
      price: "₹900 for two",
      image: restaurantImages[2],
      location: "Koramangala",
      distance: "3.1 km",
      time: "20-30 mins"
    },
    {
      id: 4,
      name: "Mumbai Delights",
      cuisine: "Street Food, Indian",
      rating: 4.4,
      reviews: 780,
      price: "₹600 for two",
      image: restaurantImages[3],
      location: "Linking Road",
      distance: "1.5 km",
      time: "15-25 mins"
    },
    {
      id: 5,
      name: "Garden Café",
      cuisine: "Continental, Café",
      rating: 4.5,
      reviews: 650,
      price: "₹800 for two",
      image: restaurantImages[4],
      location: "Banjara Hills",
      distance: "4.2 km",
      time: "35-45 mins"
    },
    {
      id: 6,
      name: "Royal Biryani House",
      cuisine: "Mughlai, North Indian",
      rating: 4.9,
      reviews: 2100,
      price: "₹1,000 for two",
      image: restaurantImages[5],
      location: "Old City",
      distance: "3.8 km",
      time: "25-35 mins"
    }
  ];

  useEffect(() => {
    if (isNearby) {
      setLocation("Near your location");
    }
    if (diningType) {
      setSearchQuery(diningType.replace('-', ' '));
    }
  }, [isNearby, diningType]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 px-8 bg-orange-500 hover:bg-orange-600"
              >
                Search
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="h-12 px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Cuisines</option>
                    <option>Indian</option>
                    <option>Chinese</option>
                    <option>Italian</option>
                    <option>Continental</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Prices</option>
                    <option>Under ₹500</option>
                    <option>₹500 - ₹1000</option>
                    <option>₹1000 - ₹2000</option>
                    <option>Above ₹2000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Ratings</option>
                    <option>4.5+ Stars</option>
                    <option>4.0+ Stars</option>
                    <option>3.5+ Stars</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dining Type</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>All Types</option>
                    <option>Dine-in</option>
                    <option>Takeaway</option>
                    <option>Delivery</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isNearby ? "Restaurants Near You" : "Search Results"}
            </h2>
            <p className="text-gray-600">{mockRestaurants.length} restaurants found</p>
          </div>

          {/* Restaurant Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold mr-2">
                        <Star className="h-3 w-3 inline mr-1" />
                        {restaurant.rating}
                      </div>
                      <span className="text-gray-500 text-sm">({restaurant.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-700 font-semibold">{restaurant.price}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="mr-4">{restaurant.location}</span>
                    {isNearby && (
                      <>
                        <span className="mr-4">• {restaurant.distance}</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.time}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600">
                      Book Table
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
