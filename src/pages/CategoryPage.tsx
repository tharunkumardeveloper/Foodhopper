import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Users } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { chennaiRestaurants, Restaurant } from "../data/chennaiRestaurants";
import { fetchCategoryImages } from "../utils/pixabayApi";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [categoryImage, setCategoryImage] = useState<string>("");

  useEffect(() => {
    // Filter restaurants by category/dine type
    const filtered = chennaiRestaurants.filter(restaurant => {
      const categoryLower = categoryName?.toLowerCase() || '';
      
      // Map URL categories to restaurant data
      const categoryMappings: { [key: string]: string[] } = {
        'fine-dining': ['Fine Dining', 'fine dining'],
        'fast-food': ['Fast Food', 'Quick Bites', 'quick bites'],
        'cafes': ['Cafes and Bakeries', 'Café', 'cafe'],
        'buffet': ['Buffet Restaurants', 'buffet'],
        'family-friendly': ['Family Restaurants', 'Family Dining', 'family'],
        'romantic': ['Fine Dining', 'romantic'],
        'street-food': ['street food', 'Street Food'],
        'vegan': ['Vegetarian', 'vegan'],
        'desserts': ['Desserts', 'dessert'],
        'south-indian': ['South Indian'],
        'north-indian': ['North Indian', 'Punjabi'],
        'biryani': ['Biryani']
      };

      const searchTerms = categoryMappings[categoryLower] || [categoryLower];
      
      return restaurant.dineTypes.some(type => 
        searchTerms.some(term => type.toLowerCase().includes(term.toLowerCase()))
      ) ||
      restaurant.cuisine.some(cuisine => 
        searchTerms.some(term => cuisine.toLowerCase().includes(term.toLowerCase()))
      ) ||
      restaurant.features.some(feature => 
        searchTerms.some(term => feature.toLowerCase().includes(term.toLowerCase()))
      );
    });
    
    setRestaurants(filtered);
    
    // Load category image
    const loadCategoryImage = async () => {
      if (categoryName) {
        const images = await fetchCategoryImages(categoryName);
        setCategoryImage(images[0] || "");
      }
    };
    loadCategoryImage();
  }, [categoryName]);

  const getCategoryTitle = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'fine-dining': 'Fine Dining',
      'fast-food': 'Fast Food',
      'cafes': 'Cafes & Coffee Shops',
      'buffet': 'Buffet Restaurants',
      'family-friendly': 'Family-Friendly Restaurants',
      'romantic': 'Romantic Dining',
      'street-food': 'Street Food',
      'vegan': 'Vegetarian & Vegan',
      'desserts': 'Desserts & Sweets',
      'quick-bites': 'Quick Bites',
      'south-indian': 'South Indian Cuisine',
      'north-indian': 'North Indian Cuisine',
      'biryani': 'Biryani Specialists'
    };
    return categoryMap[category || ''] || category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Restaurants';
  };

  const openInGoogleMaps = (restaurant: Restaurant) => {
    const url = `https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header with Category Image */}
          <div className="mb-8">
            {categoryImage && (
              <div 
                className="h-64 bg-cover bg-center rounded-lg mb-6 relative"
                style={{ backgroundImage: `url(${categoryImage})` }}
              >
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-2">
                      {getCategoryTitle(categoryName)}
                    </h1>
                    <p className="text-lg opacity-90">
                      Explore the best {getCategoryTitle(categoryName).toLowerCase()} in Chennai
                    </p>
                  </div>
                </div>
              </div>
            )}
            {!categoryImage && (
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {getCategoryTitle(categoryName)}
                </h1>
                <p className="text-gray-600">
                  Explore the best {getCategoryTitle(categoryName).toLowerCase()} in Chennai
                </p>
              </div>
            )}
          </div>

          {/* Restaurant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
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
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {restaurant.dineTypes.slice(0, 2).map((type, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
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

          {restaurants.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
              <p className="text-gray-600 mb-4">We couldn't find any restaurants in this category.</p>
              <Link to="/search">
                <Button>Browse All Restaurants</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
