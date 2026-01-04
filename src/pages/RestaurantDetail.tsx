
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Share2, 
  Heart, 
  Camera,
  ExternalLink,
  Users,
  Calendar,
  ChefHat,
  Car,
  Bus,
  Navigation as NavigationIcon,
  Route
} from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { chennaiRestaurants, Restaurant } from "../data/chennaiRestaurants";
import { useToast } from "@/hooks/use-toast";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [activeTab, setActiveTab] = useState("menu");
  const [bookingData, setBookingData] = useState({
    date: "",
    time: "",
    guests: 2
  });
  const { toast } = useToast();

  useEffect(() => {
    const foundRestaurant = chennaiRestaurants.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }
  }, [id]);

  // Scroll to section if hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Restaurant not found</h1>
          <Link to="/search" className="text-orange-500 hover:text-orange-600 mt-4 inline-block">
            Browse all restaurants
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!bookingData.date || !bookingData.time) {
      toast({
        title: "Booking Error",
        description: "Please select date and time for your booking.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Booking Confirmed! 🎉",
      description: `Table for ${bookingData.guests} reserved at ${restaurant.name} on ${bookingData.date} at ${bookingData.time}`,
    });
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.lat},${restaurant.location.lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const getWalkingDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.location.lat},${restaurant.location.lng}&travelmode=walking`;
    window.open(url, '_blank');
  };

  const bookOla = () => {
    const url = `https://book.olacabs.com/?pickup=&drop=${restaurant.location.lat},${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  const bookUber = () => {
    const url = `https://m.uber.com/ul/?action=setPickup&drop[latitude]=${restaurant.location.lat}&drop[longitude]=${restaurant.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16">
        {/* Hero Section with Image Carousel */}
        <div className="relative h-96 bg-gray-900">
          <Carousel className="w-full h-full">
            <CarouselContent>
              {restaurant.gallery.map((image, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="h-96 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    <div className="absolute inset-0 bg-black/40"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="text-white">
                  <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
                  <p className="text-lg mb-2">{restaurant.cuisine.join(", ")}</p>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{restaurant.rating} ({restaurant.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{restaurant.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4 md:mt-0">
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    <Heart className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-gray-900">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button 
                    onClick={openInGoogleMaps}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    📍 View on Map
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Restaurant Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-semibold">Working Hours</p>
                        <p className="text-sm text-gray-600">{restaurant.workingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-semibold">Contact</p>
                        <p className="text-sm text-gray-600">{restaurant.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="font-semibold">Price for Two</p>
                        <p className="text-sm text-gray-600">₹{restaurant.priceForTwo}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-700">{restaurant.description}</p>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.features.map((feature, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8">
                  {[
                    { id: "menu", name: "Menu", icon: ChefHat },
                    { id: "gallery", name: "Gallery", icon: Camera },
                    { id: "transport", name: "How to Reach", icon: Route },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                          activeTab === tab.id
                            ? 'border-orange-500 text-orange-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "menu" && (
                <div className="space-y-4">
                  {restaurant.menu.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex space-x-4">
                            <div 
                              className="w-20 h-20 bg-cover bg-center rounded-lg"
                              style={{ backgroundImage: `url(${item.image})` }}
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                                </span>
                                {item.isSpicy && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                                    🌶️ Spicy
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                            <Button size="sm" className="mt-2 bg-orange-500 hover:bg-orange-600">
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "gallery" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {restaurant.gallery.map((image, index) => (
                    <div 
                      key={index}
                      className="h-48 bg-cover bg-center rounded-lg cursor-pointer hover:scale-105 transition-transform"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  ))}
                </div>
              )}

              {/* Transport Section */}
              {activeTab === "transport" && (
                <div id="transport" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Route className="h-5 w-5 mr-2" />
                        How to Reach This Restaurant
                      </CardTitle>
                      <CardDescription>
                        Multiple ways to get to {restaurant.name}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Walking Directions */}
                      <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                        <NavigationIcon className="h-6 w-6 text-green-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-800">Walking Route</h4>
                          <p className="text-sm text-green-700 mb-3">
                            Get walking directions to reach the restaurant on foot.
                          </p>
                          <Button 
                            onClick={getWalkingDirections}
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <NavigationIcon className="h-4 w-4 mr-2" />
                            Get Walking Directions
                          </Button>
                        </div>
                      </div>

                      {/* Public Transport */}
                      <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                        <Bus className="h-6 w-6 text-blue-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800">Public Transport</h4>
                          <p className="text-sm text-blue-700 mb-2">
                            Nearest bus stops and metro stations:
                          </p>
                          <ul className="text-sm text-blue-700 space-y-1 mb-3">
                            <li>• T-Nagar Bus Stop - 200m (Routes: 21G, 23B, 47)</li>
                            <li>• Anna Nagar Metro - 500m (Blue Line)</li>
                          </ul>
                          <Button 
                            onClick={getDirections}
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Bus className="h-4 w-4 mr-2" />
                            Get Public Transport Route
                          </Button>
                        </div>
                      </div>

                      {/* Cab Services */}
                      <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                        <Car className="h-6 w-6 text-yellow-600 mt-1" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-yellow-800">Book a Cab</h4>
                          <p className="text-sm text-yellow-700 mb-3">
                            Quick and convenient cab booking options:
                          </p>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={bookOla}
                              size="sm" 
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              <Car className="h-4 w-4 mr-2" />
                              Book Ola
                            </Button>
                            <Button 
                              onClick={bookUber}
                              size="sm" 
                              variant="outline"
                              className="border-yellow-600 text-yellow-700 hover:bg-yellow-50"
                            >
                              <Car className="h-4 w-4 mr-2" />
                              Book Uber
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Universal Directions */}
                      <div className="text-center pt-4 border-t">
                        <Button 
                          onClick={getDirections}
                          className="bg-orange-500 hover:bg-orange-600"
                          size="lg"
                        >
                          <MapPin className="h-5 w-5 mr-2" />
                          Get Directions on Google Maps
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8" id="booking">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Book a Table
                  </CardTitle>
                  <CardDescription>
                    Reserve your table at {restaurant.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <select 
                      id="time"
                      value={bookingData.time}
                      onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">Select time</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="12:30">12:30 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="13:30">1:30 PM</option>
                      <option value="19:00">7:00 PM</option>
                      <option value="19:30">7:30 PM</option>
                      <option value="20:00">8:00 PM</option>
                      <option value="20:30">8:30 PM</option>
                      <option value="21:00">9:00 PM</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <select 
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md"
                    >
                      {[1,2,3,4,5,6,7,8].map(num => (
                        <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-lg font-semibold py-3"
                  >
                    Book Table
                  </Button>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>No booking fees • Instant confirmation</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
