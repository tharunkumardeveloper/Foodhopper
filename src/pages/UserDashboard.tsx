
import { useState } from "react";
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
  ExternalLink
} from "lucide-react";
import Navigation from "../components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
  });
  const { toast } = useToast();

  // Mock data - in real app, this would come from API
  const bookings = [
    {
      id: "book-001",
      restaurant: "Murugan Idli Shop",
      date: "2024-06-25",
      time: "7:00 PM",
      guests: 4,
      status: "confirmed",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "book-002", 
      restaurant: "Copper Chimney",
      date: "2024-06-20",
      time: "8:30 PM",
      guests: 2,
      status: "completed",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const savedRestaurants = [
    {
      id: "murugan-idli-shop",
      name: "Murugan Idli Shop",
      cuisine: "South Indian",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      id: "absolute-barbecue",
      name: "Absolute Barbecue", 
      cuisine: "Barbecue",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  const reviews = [
    {
      id: "rev-001",
      restaurant: "Buhari Hotel",
      rating: 5,
      comment: "Amazing biryani! The flavors were incredible and service was excellent.", 
      date: "2024-06-15",
      image: "https://images.unsplash.com/photo-1563379091339-03246967d4d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
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
                className="w-16 h-16 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url(${profileData.avatar})` }}
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profileData.name}!</h1>
                <p className="text-gray-600">Manage your bookings, reviews, and preferences</p>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bookings" className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                My Bookings
              </TabsTrigger>
              <TabsTrigger value="saved" className="flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Saved
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                Profile
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedRestaurants.map((restaurant) => (
                  <Card key={restaurant.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex space-x-4">
                          <div 
                            className="w-20 h-20 rounded-lg bg-cover bg-center"
                            style={{ backgroundImage: `url(${restaurant.image})` }}
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{restaurant.name}</h3>
                            <p className="text-gray-600">{restaurant.cuisine}</p>
                            <div className="flex items-center mt-1">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm">{restaurant.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col space-y-2">
                          <Link to={`/restaurant/${restaurant.id}`}>
                            <Button size="sm" className="w-full">
                              Book Now
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemoveSaved(restaurant.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
