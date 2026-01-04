
import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const UserBookings = () => {
  const { toast } = useToast();

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

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: "Booking Cancelled",
      description: "Your booking has been cancelled successfully.",
    });
  };

  const getDirections = (restaurantName: string) => {
    const url = `https://www.google.com/maps/search/${encodeURIComponent(restaurantName + " Chennai")}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Bookings</h2>
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
  );
};

export default UserBookings;
