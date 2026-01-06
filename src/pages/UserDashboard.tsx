
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Heart, 
  Star, 
  User, 
  MapPin, 
  Clock, 
  Phone,
  Mail,
  Camera,
  Trash2,
  Edit,
  ExternalLink,
  TrendingUp,
  Award,
  BookOpen,
  Zap,
  Shield,
  Bell,
  Brain
} from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { fetchRestaurantImages, fetchFoodImages, fetchUserAvatars } from "../utils/pixabayApi";
import SmartReorder from "../components/SmartReorder";
import LoyaltyPassport from "../components/LoyaltyPassport";
import DietPreferencesEngine from "../components/DietPreferences";
import TableAlertsComponent from "../components/TableAlerts";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [restaurantImages, setRestaurantImages] = useState<string[]>([]);
  const [foodImages, setFoodImages] = useState<string[]>([]);
  const [userAvatars, setUserAvatars] = useState<string[]>([]);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    avatar: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadImages = async () => {
      const [restaurants, foods, avatars] = await Promise.all([
        fetchRestaurantImages(),
        fetchFoodImages(),
        fetchUserAvatars()
      ]);
      setRestaurantImages(restaurants);
      setFoodImages(foods);
      setUserAvatars(avatars);
      setProfileData(prev => ({
        ...prev,
        avatar: avatars[0] || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
      }));
    };
    loadImages();
  }, []);

  // Mock data - in real app, this would come from API
  const bookings = [
    {
      id: "book-001",
      restaurant: "Murugan Idli Shop",
      date: "2024-06-25",
      time: "7:00 PM",
      guests: 4,
      status: "confirmed",
      image: restaurantImages[0] || "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "book-002", 
      restaurant: "Copper Chimney",
      date: "2024-06-20",
      time: "8:30 PM",
      guests: 2,
      status: "completed",
      image: restaurantImages[1] || "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "book-003",
      restaurant: "Chettinad Mansion",
      date: "2024-06-18",
      time: "7:30 PM",
      guests: 6,
      status: "completed",
      image: restaurantImages[2] || "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const savedRestaurants = [
    {
      id: "murugan-idli-shop",
      name: "Murugan Idli Shop",
      cuisine: "South Indian",
      rating: 4.5,
      priceForTwo: 300,
      image: restaurantImages[3] || "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "absolute-barbecue",
      name: "Absolute Barbecue", 
      cuisine: "Barbecue",
      rating: 4.7,
      priceForTwo: 1500,
      image: restaurantImages[4] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "buhari-hotel",
      name: "Buhari Hotel",
      cuisine: "Biryani",
      rating: 4.4,
      priceForTwo: 600,
      image: restaurantImages[5] || "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "kerala-kitchen",
      name: "Kerala Kitchen",
      cuisine: "Kerala",
      rating: 4.5,
      priceForTwo: 650,
      image: restaurantImages[6] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const reviews = [
    {
      id: "rev-001",
      restaurant: "Buhari Hotel",
      rating: 5,
      comment: "Amazing biryani! The flavors were incredible and service was excellent.", 
      date: "2024-06-15",
      image: foodImages[0] || "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "rev-002",
      restaurant: "Chettinad Mansion",
      rating: 4,
      comment: "Authentic Chettinad flavors with perfect spice levels. The crab masala was outstanding!",
      date: "2024-06-10",
      image: foodImages[1] || "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "rev-003",
      restaurant: "Kerala Kitchen",
      rating: 5,
      comment: "The fish moilee was exceptional! Authentic Kerala taste with perfect coconut balance.",
      date: "2024-06-05",
      image: foodImages[2] || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const handleRemoveSaved = (restaurantId: string) => {
    toast({
      title: "Removed from Saved",
      description: "Restaurant removed from your saved list.",
    });
  };

  const handleProfileUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const getDirections = (restaurantName: string) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(restaurantName + " Chennai")}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-full bg-cover bg-center border-4 border-orange-200"
                style={{ backgroundImage: `url(${profileData.avatar})` }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profileData.name}!</h1>
                <p className="text-gray-600">Manage your bookings, reviews, and preferences</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Saved Restaurants</p>
                    <p className="text-2xl font-bold text-gray-900">{savedRestaurants.length}</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Reviews Written</p>
                    <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Rating Given</p>
                    <p className="text-2xl font-bold text-gray-900">4.7</p>
                  </div>
                  <Award className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-1">
              <TabsTrigger value="bookings" className="flex items-center text-xs md:text-sm">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Bookings</span>
                <span className="sm:hidden">Book</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center text-xs md:text-sm">
                <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Saved</span>
                <span className="sm:hidden">Save</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center text-xs md:text-sm">
                <Star className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Reviews</span>
                <span className="sm:hidden">Rev</span>
              </TabsTrigger>
              <TabsTrigger value="reorder" className="flex items-center text-xs md:text-sm md:col-span-1">
                <Zap className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Quick Reorder</span>
                <span className="md:hidden hidden sm:inline">Reorder</span>
                <span className="sm:hidden">Re</span>
              </TabsTrigger>
              <TabsTrigger value="loyalty" className="flex items-center text-xs md:text-sm md:col-span-1">
                <Award className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Loyalty</span>
                <span className="md:hidden hidden sm:inline">Points</span>
                <span className="sm:hidden">Pts</span>
              </TabsTrigger>
              <TabsTrigger value="diet" className="flex items-center text-xs md:text-sm md:col-span-1">
                <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden md:inline">Diet Prefs</span>
                <span className="md:hidden hidden sm:inline">Diet</span>
                <span className="sm:hidden">D</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center text-xs md:text-sm md:col-span-1">
                <User className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                <span className="hidden sm:inline">Profile</span>
                <span className="sm:hidden">Me</span>
              </TabsTrigger>
            </TabsList>

            {/* My Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                          <div 
                            className="w-20 h-20 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${booking.image})` }}
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{booking.restaurant}</h3>
                            <div className="flex items-center text-gray-600 text-sm mt-1 space-x-4">
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {booking.date}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {booking.time}
                              </span>
                              <span>
                                {booking.guests} guests
                              </span>
                            </div>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => getDirections(booking.restaurant)}
                          >
                            <MapPin className="h-4 w-4 mr-1" />
                            Directions
                          </Button>
                          {booking.status === 'confirmed' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Saved Restaurants Tab */}
            <TabsContent value="saved" className="space-y-4">
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
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{restaurant.rating}</span>
                        </div>
                        <span className="text-sm text-gray-600">₹{restaurant.priceForTwo} for two</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                          <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                            Book Now
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRemoveSaved(restaurant.id)}
                          className="flex-1"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-4">
              <div className="grid gap-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                          <div 
                            className="w-20 h-20 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${review.image})` }}
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold">{review.restaurant}</h3>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                            </div>
                            <p className="text-gray-700 mt-2">{review.comment}</p>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-20 h-20 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${profileData.avatar})` }}
                    />
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <Button onClick={handleProfileUpdate} className="w-full md:w-auto">
                    Update Profile
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Smart Reorder Tab */}
            <TabsContent value="reorder" className="space-y-6">
              <SmartReorder />
            </TabsContent>

            {/* Loyalty Passport Tab */}
            <TabsContent value="loyalty" className="space-y-6">
              <LoyaltyPassport />
            </TabsContent>

            {/* Diet Preferences Tab */}
            <TabsContent value="diet" className="space-y-6">
              <DietPreferencesEngine />
            </TabsContent>

          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;
