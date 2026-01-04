
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { searchPixabayImages } from "../utils/pixabayApi";

const DiningTypes = () => {
  const [diningImages, setDiningImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadDiningImages = async () => {
      const fineDiningImages = await searchPixabayImages('fine dining elegant restaurant luxury interior', 1);
      const rooftopImages = await searchPixabayImages('rooftop restaurant terrace dining view', 1);
      const cafeImages = await searchPixabayImages('cozy cafe coffee shop interior ambiance', 1);
      const fastFoodImages = await searchPixabayImages('fast food restaurant modern counter service', 1);
      const familyImages = await searchPixabayImages('family restaurant friendly dining children', 1);
      const romanticImages = await searchPixabayImages('romantic restaurant intimate dining candles', 1);

      setDiningImages({
        'Fine Dining': fineDiningImages[0],
        'Rooftop': rooftopImages[0],
        'Café': cafeImages[0],
        'Fast Food': fastFoodImages[0],
        'Family-Friendly': familyImages[0],
        'Romantic': romanticImages[0]
      });
    };
    loadDiningImages();
  }, []);
  
  const diningTypes = [
    {
      name: "Fine Dining",
      description: "Elegant restaurants with premium cuisine and exceptional service",
      link: "/search?type=fine-dining"
    },
    {
      name: "Rooftop",
      description: "Stunning views with great food and ambiance",
      link: "/search?type=rooftop"
    },
    {
      name: "Café",
      description: "Cozy spots perfect for coffee, light meals, and conversations",
      link: "/search?type=cafe"
    },
    {
      name: "Fast Food",
      description: "Quick, convenient, and delicious meals on the go",
      link: "/search?type=fast-food"
    },
    {
      name: "Family-Friendly",
      description: "Welcoming spaces perfect for dining with kids and family",
      link: "/search?type=family-friendly"
    },
    {
      name: "Romantic",
      description: "Intimate settings perfect for date nights and special occasions",
      link: "/search?type=romantic"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explore Dining Types
            </h1>
            <p className="text-lg text-gray-600">
              Discover the perfect dining experience for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diningTypes.map((type, index) => (
              <div 
                key={type.name}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {diningImages[type.name] && (
                  <div 
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${diningImages[type.name]})` }}
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{type.name}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <Link 
                    to={type.link}
                    className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Restaurants
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiningTypes;
