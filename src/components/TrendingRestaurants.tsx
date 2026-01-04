
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";
import { searchPixabayImages } from "../utils/pixabayApi";

const TrendingRestaurants = () => {
  const [restaurantImages, setRestaurantImages] = useState<string[]>([]);

  useEffect(() => {
    const loadRestaurantImages = async () => {
      const images = await searchPixabayImages('restaurant food platter gourmet dining elegant', 6);
      setRestaurantImages(images);
    };
    loadRestaurantImages();
  }, []);
  
  const restaurants = [
    {
      id: 1,
      name: "The Spice Route",
      cuisine: "Indian, Asian",
      rating: 4.8,
      reviews: 1250,
      price: "₹1,200 for two",
      location: "Bandra West",
      time: "30-40 mins"
    },
    {
      id: 2,
      name: "Artisan Bistro",
      cuisine: "Continental, Italian",
      rating: 4.6,
      reviews: 890,
      price: "₹1,800 for two",
      location: "Connaught Place",
      time: "25-35 mins"
    },
    {
      id: 3,
      name: "Coastal Kitchen",
      cuisine: "Seafood, South Indian",
      rating: 4.7,
      reviews: 1560,
      price: "₹900 for two",
      location: "Koramangala",
      time: "20-30 mins"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Trending Restaurants</h2>
          <p className="text-lg text-gray-600">Most popular restaurants based on ratings and bookings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant, index) => (
            <div 
              key={restaurant.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {restaurantImages[index] && (
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurantImages[index]})` }}
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{restaurant.name}</h3>
                <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold mr-2">
                      ★ {restaurant.rating}
                    </div>
                    <span className="text-gray-500 text-sm">({restaurant.reviews} reviews)</span>
                  </div>
                  <span className="text-gray-700 font-semibold">{restaurant.price}</span>
                </div>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="mr-4">{restaurant.location}</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.time}</span>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">View Details</Button>
                  <Button className="flex-1 bg-orange-500 hover:bg-orange-600">Book Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingRestaurants;
