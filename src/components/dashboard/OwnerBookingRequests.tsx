
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OwnerBookingRequests = () => {
  const bookings = [
    { name: "Priya Sharma", time: "7:30 PM", people: 4, status: "Confirmed", date: "2024-06-25" },
    { name: "Raj Kumar", time: "8:00 PM", people: 2, status: "Pending", date: "2024-06-25" },
    { name: "Anita Singh", time: "8:30 PM", people: 6, status: "Confirmed", date: "2024-06-25" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Booking Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {bookings.map((booking, index) => (
            <div key={index} className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <p className="font-medium">{booking.name}</p>
                <p className="text-sm text-gray-600">{booking.date} • {booking.time} • {booking.people} people</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'}>
                  {booking.status}
                </Badge>
                {booking.status === 'Pending' && (
                  <div className="flex space-x-1">
                    <Button size="sm" variant="outline">Approve</Button>
                    <Button size="sm" variant="outline">Decline</Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OwnerBookingRequests;
