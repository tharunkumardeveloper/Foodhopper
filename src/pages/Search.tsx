import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, MapPin, Star, Clock, Filter, X } from "lucide-react";
import { chennaiRestaurants, Restaurant } from "../data/chennaiRestaurants";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [location, setLocation] = useState(searchParams.get('location') || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(chennaiRestaurants);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [diningTypeFilter, setDiningTypeFilter] = useState("");
  
  const isNearby = searchParams.get('nearby') === 'true';
  const diningType = searchParams.get('type') || '';

  useEffect(() => {
    if (isNearby) {
      setLocation("Chennai");
    }
    if (diningType) {
      // Map URL dining types to filter values
      const diningTypeMap: { [key: string]: string } = {
        'fine-dining': 'Fine Dining',
        'fast-food': 'Quick Bites',
        'cafe': 'Cafes and Bakeries',
        'family-friendly': 'Family Dining',
        'buffet': 'Buffet',
        'romantic': 'Fine Dining',
        'street-food': 'Quick Bites',
        'rooftop': 'Fine Dining'
      };
      
      const mappedType = diningTypeMap[diningType] || diningType.replace('-', ' ');
      setDiningTypeFilter(mappedType);
    }
  }, [isNearby, diningType]);

  useEffect(() => {
    let filtered = chennaiRestaurants;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
        r.dineTypes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Cuisine filter
    if (cuisineFilter) {
      filtered = filtered.filter(r => r.cuisine.includes(cuisineFilter));
    }

    // Price filter
    if (priceFilter) {
      switch (priceFilter) {
        case "under-500":
          filtered = filtered.filter(r => r.priceForTwo < 500);
          break;
        case "500-1000":
          filtered = filtered.filter(r => r.priceForTwo >= 500 && r.priceForTwo <= 1000);
          break;
        case "1000-2000":
          filtered = filtered.filter(r => r.priceForTwo >= 1000 && r.priceForTwo <= 2000);
          break;
        case "above-2000":
          filtered = filtered.filter(r => r.priceForTwo > 2000);
          break;
      }
    }

    // Rating filter
    if (ratingFilter) {
      const minRating = parseFloat(ratingFilter);
      filtered = filtered.filter(r => r.rating >= minRating);
    }

    // Dining type filter
    if (diningTypeFilter) {
      filtered = filtered.filter(r =>
        r.dineTypes.some(d => d.toLowerCase().includes(diningTypeFilter.toLowerCase()))
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchQuery, cuisineFilter, priceFilter, ratingFilter, diningTypeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filters are applied via useEffect
  };

  const clearFilters = () => {
    setCuisineFilter("");
    setPriceFilter("");
    setRatingFilter("");
    setDiningTypeFilter("");
    setSearchQuery("");
  };

  const openInGoogleMaps = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-4 md:p-6 shadow-lg mb-6 md:mb-8">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <Input
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 md:pl-12 h-10 md:h-12 text-sm md:text-base"
                />
              </div>
              <Button 
                type="submit"
                size="lg" 
                className="h-10 md:h-12 px-4 md:px-8 bg-orange-500 hover:bg-orange-600 text-sm md:text-base"
              >
                <span className="hidden sm:inline">Search</span>
                <span className="sm:hidden">Go</span>
              </Button>
              <Button 
                type="button"
                variant="outline"
                size="lg"
                className="h-10 md:h-12 px-3 md:px-4 text-sm md:text-base"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Filters</span>
                <span className="sm:hidden">Filter</span>
              </Button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">Filter Results</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs md:text-sm">
                    <X className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Cuisine</label>
                    <select 
                      className="w-full p-2 border rounded-md text-xs md:text-sm h-9 md:h-10"
                      value={cuisineFilter}
                      onChange={(e) => setCuisineFilter(e.target.value)}
                    >
                      <option value="">All Cuisines</option>
                      <option value="South Indian">South Indian</option>
                      <option value="North Indian">North Indian</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Continental">Continental</option>
                      <option value="Biryani">Biryani</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={priceFilter}
                      onChange={(e) => setPriceFilter(e.target.value)}
                    >
                      <option value="">All Prices</option>
                      <option value="under-500">Under ₹500</option>
                      <option value="500-1000">₹500 - ₹1000</option>
                      <option value="1000-2000">₹1000 - ₹2000</option>
                      <option value="above-2000">Above ₹2000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={ratingFilter}
                      onChange={(e) => setRatingFilter(e.target.value)}
                    >
                      <option value="">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Dining Type</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={diningTypeFilter}
                      onChange={(e) => setDiningTypeFilter(e.target.value)}
                    >
                      <option value="">All Types</option>
                      <option value="Fine Dining">Fine Dining</option>
                      <option value="Family">Family Restaurants</option>
                      <option value="Buffet">Buffet</option>
                      <option value="Quick Bites">Quick Bites</option>
                      <option value="Cafe">Cafes</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isNearby ? "Restaurants Near You" : searchQuery ? `Results for "${searchQuery}"` : "All Restaurants"}
            </h2>
            <p className="text-gray-600">{filteredRestaurants.length} restaurants found</p>
          </div>

          {/* Restaurant Cards */}
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredRestaurants.map((restaurant) => (
                <div 
                  key={restaurant.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${restaurant.image})` }}
                  >
                    <div className="absolute top-3 right-3 flex gap-2">
                      {restaurant.cuisine.slice(0, 1).map((c, i) => (
                        <span key={i} className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
                    <p className="text-gray-600 mb-3">{restaurant.cuisine.join(", ")}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold mr-2 flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {restaurant.rating}
                        </div>
                        <span className="text-gray-500 text-sm">({restaurant.reviews} reviews)</span>
                      </div>
                      <span className="text-gray-700 font-semibold">₹{restaurant.priceForTwo} for two</span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="mr-4 truncate">{restaurant.address.split(',')[0]}</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.workingHours}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Button 
                        variant="outline"
                        className="px-3"
                        onClick={() => openInGoogleMaps(restaurant)}
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                      <Link to={`/restaurant/${restaurant.id}#booking`} className="flex-1">
                        <Button className="w-full bg-orange-500 hover:bg-orange-600">
                          Book Table
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No restaurants found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} className="bg-orange-500 hover:bg-orange-600">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;
