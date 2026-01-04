import { Star, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFoodImages } from "../../utils/pixabayApi";

const UserReviews = () => {
  const foodImages = getFoodImages();
  
  const reviews = [
    {
      id: "rev-001",
      restaurant: "Buhari Hotel",
      rating: 5,
      comment: "Amazing biryani! The flavors were incredible and service was excellent.", 
      date: "2024-06-15",
      image: foodImages[0]
    },
    {
      id: "rev-002",
      restaurant: "Sangeetha Restaurant", 
      rating: 4,
      comment: "Great vegetarian options and authentic South Indian taste. Highly recommended!",
      date: "2024-06-10",
      image: foodImages[1]
    },
    {
      id: "rev-003",
      restaurant: "Dakshin Restaurant",
      rating: 5,
      comment: "Exceptional fine dining experience with traditional recipes beautifully presented.",
      date: "2024-06-05", 
      image: foodImages[2]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
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
  );
};

export default UserReviews;
