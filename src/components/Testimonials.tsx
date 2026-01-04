
import { useState, useEffect } from "react";
import { searchPixabayImages } from "../utils/pixabayApi";

const Testimonials = () => {
  const [userAvatars, setUserAvatars] = useState<string[]>([]);

  useEffect(() => {
    const loadUserAvatars = async () => {
      const avatars = await searchPixabayImages('professional portrait headshot business person', 3);
      setUserAvatars(avatars);
    };
    loadUserAvatars();
  }, []);
  
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "FoodHopper made it so easy to find and book amazing restaurants. The booking process was seamless!",
      rating: 5
    },
    {
      name: "Rahul Singh",
      location: "Delhi",
      text: "Great platform! Found some hidden gems in my city. The reviews are authentic and helpful.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      location: "Bangalore",
      text: "Love the variety of restaurants and cuisines available. Makes dining out so much more exciting!",
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600">Real experiences from real food lovers</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {userAvatars[index] && (
                  <img 
                    src={userAvatars[index]} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400">★</span>
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
