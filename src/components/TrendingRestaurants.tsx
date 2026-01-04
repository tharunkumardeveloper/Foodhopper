import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";
import { chennaiRestaurants } from "../data/chennaiRestaurants";

const TrendingRestaurants = () => {
  // Use actual restaurant data
  const restaurants = chennaiRestaurants.slice(0, 3).map(r => ({
    id: r.id,
    name: r.name,
    cuisine: r.cuisine.join(", "),
    rating: r.rating,
    reviews: r.reviews,
    price: `₹${r.priceForTwo} for two`,
    image: r.image,
    location: r.address.split(',')[0],
    time: r.workingHours
  }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Trending Restaurants</h2>
          <p className="text-lg text-gray-600">Most popular restaurants based on ratings and bookings</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div 
              key={restaurant.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                    <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold mr-2 flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {restaurant.rating}
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
                  <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </Link>
                  <Link to={`/restaurant/${restaurant.id}#booking`} className="flex-1">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/search">
            <Button size="lg" variant="outline" className="px-8">
              View All Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TrendingRestaurants;
