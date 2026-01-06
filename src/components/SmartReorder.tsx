import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Calendar, Zap, Heart } from "lucide-react";

interface PastBooking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  image: string;
  date: string;
  time: string;
  guests: number;
  preferences: {
    seating: string;
    occasion: string;
    dietary: string[];
  };
  totalAmount: number;
  rating?: number;
}

const SmartReorder = () => {
  const [pastBookings, setPastBookings] = useState<PastBooking[]>([]);
  const [favorites, setFavorites] = useState<PastBooking[]>([]);

  useEffect(() => {
    // Load past bookings from localStorage
    const stored = localStorage.getItem('pastBookings');
    if (stored) {
      const bookings = JSON.parse(stored);
      setPastBookings(bookings);
      
      // Filter favorites (rated 4+ or frequently visited)
      const favs = bookings.filter((booking: PastBooking) => 
        booking.rating && booking.rating >= 4
      ).slice(0, 3);
      setFavorites(favs);
    } else {
      // Mock data for demonstration
      const mockBookings: PastBooking[] = [
        {
          id: "1",
          restaurantId: "murugan-idli-shop",
          restaurantName: "Murugan Idli Shop",
          image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          date: "2024-01-15",
          time: "19:30",
          guests: 2,
          preferences: {
            seating: "Window seat",
            occasion: "Date night",
            dietary: ["Vegetarian"]
          },
          totalAmount: 850,
          rating: 5
        },
        {
          id: "2",
          restaurantId: "buhari-hotel",
          restaurantName: "Buhari Hotel",
          image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
          date: "2024-01-10",
          time: "20:00",
          guests: 4,
          preferences: {
            seating: "Private booth",
            occasion: "Family dinner",
            dietary: ["Non-vegetarian"]
          },
          totalAmount: 2400,
          rating: 4
        }
      ];
      setPastBookings(mockBookings);
      setFavorites(mockBookings);
      localStorage.setItem('pastBookings', JSON.stringify(mockBookings));
    }
  }, []);

  const handleQuickRebook = (booking: PastBooking) => {
    // Create a new booking with same preferences
    const newBooking = {
      ...booking,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      time: booking.time
    };

    // In a real app, this would make an API call
    console.log('Quick rebooking:', newBooking);
    
    // Show success message
    alert(`Quick booking confirmed for ${booking.restaurantName}! 
    Date: Today
    Time: ${booking.time}
    Guests: ${booking.guests}
    Same preferences applied.`);
  };

  const getNextAvailableSlot = (time: string) => {
    const today = new Date();
    const [hours, minutes] = time.split(':');
    const bookingTime = new Date();
    bookingTime.setHours(parseInt(hours), parseInt(minutes));
    
    if (bookingTime < today) {
      bookingTime.setDate(bookingTime.getDate() + 1);
    }
    
    return bookingTime.toLocaleDateString();
  };

  if (pastBookings.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-8 text-center">
          <Clock className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Past Bookings</h3>
          <p className="text-gray-600">Make your first booking to enable smart reorder!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Reorder Favorites */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <span>One-Tap Favorites</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
            {favorites.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-2 md:space-x-3 mb-3">
                  <div 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${booking.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs md:text-sm truncate">{booking.restaurantName}</h4>
                    <div className="flex items-center space-x-1 text-xs text-gray-600">
                      <Users className="w-3 h-3" />
                      <span>{booking.guests}</span>
                      <span>•</span>
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 flex-shrink-0" />
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {booking.preferences.dietary.map((diet) => (
                      <Badge key={diet} variant="secondary" className="text-xs">
                        {diet}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-xs">
                      {booking.preferences.seating}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600">
                    Next available: {getNextAvailableSlot(booking.time)}
                  </p>
                </div>

                <Button 
                  onClick={() => handleQuickRebook(booking)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-sm"
                  size="sm"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Quick Rebook
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>Recent Bookings</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-16 h-16 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${booking.image})` }}
                  />
                  <div>
                    <h4 className="font-semibold">{booking.restaurantName}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{booking.guests} guests</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {booking.preferences.occasion} • ₹{booking.totalAmount}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {booking.rating && (
                    <Badge variant="secondary">
                      ⭐ {booking.rating}
                    </Badge>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickRebook(booking)}
                  >
                    Rebook
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartReorder;