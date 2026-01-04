import { useState, useEffect } from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchRestaurantImages } from "../../utils/pixabayApi";

const UserSavedRestaurants = () => {
  const [restaurantImages, setRestaurantImages] = useState<string[]>([]);
  
  useEffect(() => {
    const loadImages = async () => {
      const images = await fetchRestaurantImages();
      setRestaurantImages(images);
    };
    loadImages();
  }, []);
  
  const savedRestaurants = [
    {
      id: "rest-001",
      name: "Buhari Hotel",
      cuisine: "South Indian, Biryani",
      rating: 4.5,
      location: "T. Nagar, Chennai",
      image: restaurantImages[3] || "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1920.jpg",
      distance: "2.5 km"
    },
    {
      id: "rest-002", 
      name: "Sangeetha Restaurant",
      cuisine: "Vegetarian, South Indian",
      rating: 4.3,
      location: "Anna Nagar, Chennai",
      image: restaurantImages[4] || "https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1920.jpg",
      distance: "3.2 km"
    },
    {
      id: "rest-003",
      name: "Dakshin Restaurant",
      cuisine: "Traditional South Indian",
      rating: 4.7,
      location: "Park Hyatt, Chennai",
      image: restaurantImages[5] || "https://cdn.pixabay.com/photo/2017/01/26/02/06/platter-2009590_1920.jpg",
      distance: "5.1 km"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Restaurants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${restaurant.image})` }}
            />
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                <Heart className="h-5 w-5 text-red-500 fill-current" />
              </div>
              
              <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine}</p>
              
              <div className="flex items-center mb-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium">{restaurant.rating}</span>
              </div>
              
              <div className="flex items-center text-gray-500 text-sm mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{restaurant.location} • {restaurant.distance}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                  Book Now
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserSavedRestaurants;
