
import { useState, useEffect } from "react";
import { searchPixabayImages } from "../utils/pixabayApi";

const FeaturedCities = () => {
  const [cityImages, setCityImages] = useState<string[]>([]);

  useEffect(() => {
    const loadCityImages = async () => {
      const images = await searchPixabayImages('indian city skyline urban modern architecture', 6);
      setCityImages(images);
    };
    loadCityImages();
  }, []);
  
  const cities = [
    {
      name: "Mumbai",
      restaurants: "2,500+",
      description: "The financial capital with diverse culinary experiences"
    },
    {
      name: "Delhi",
      restaurants: "3,200+",
      description: "Historic city blending traditional and modern flavors"
    },
    {
      name: "Bangalore",
      restaurants: "2,100+",
      description: "Tech hub with innovative dining concepts"
    },
    {
      name: "Pune",
      restaurants: "1,800+",
      description: "Cultural city with authentic local cuisine"
    },
    {
      name: "Chennai",
      restaurants: "1,600+",
      description: "Gateway to South Indian culinary traditions"
    },
    {
      name: "Hyderabad",
      restaurants: "1,400+", 
      description: "City of Nizams famous for biryani and kebabs"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Cities</h2>
          <p className="text-lg text-gray-600">Discover amazing restaurants in these popular destinations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <div 
              key={city.name}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              {cityImages[index] && (
                <div 
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${cityImages[index]})` }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                <p className="text-orange-300 font-semibold mb-2">{city.restaurants} restaurants</p>
                <p className="text-gray-200 text-sm">{city.description}</p>
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Popular
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCities;
