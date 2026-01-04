import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { searchPixabayImages } from "../utils/pixabayApi";
import { Users, Utensils, Coffee, Zap, Heart, Sparkles } from "lucide-react";

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
      const buffetImages = await searchPixabayImages('buffet restaurant food spread variety', 1);
      const streetFoodImages = await searchPixabayImages('street food vendor stall authentic', 1);

      setDiningImages({
        'Fine Dining': fineDiningImages[0],
        'Rooftop': rooftopImages[0],
        'Café': cafeImages[0],
        'Fast Food': fastFoodImages[0],
        'Family-Friendly': familyImages[0],
        'Romantic': romanticImages[0],
        'Buffet': buffetImages[0],
        'Street Food': streetFoodImages[0]
      });
    };
    loadDiningImages();
  }, []);
  
  const diningTypes = [
    {
      name: "Fine Dining",
      description: "Elegant restaurants with premium cuisine and exceptional service",
      link: "/search?type=fine-dining",
      icon: Sparkles,
      color: "from-purple-600 to-pink-600"
    },
    {
      name: "Rooftop",
      description: "Stunning views with great food and ambiance",
      link: "/search?type=rooftop",
      icon: Heart,
      color: "from-blue-600 to-cyan-600"
    },
    {
      name: "Café",
      description: "Cozy spots perfect for coffee, light meals, and conversations",
      link: "/search?type=cafe",
      icon: Coffee,
      color: "from-amber-600 to-orange-600"
    },
    {
      name: "Fast Food",
      description: "Quick, convenient, and delicious meals on the go",
      link: "/search?type=fast-food",
      icon: Zap,
      color: "from-red-600 to-orange-600"
    },
    {
      name: "Family-Friendly",
      description: "Welcoming spaces perfect for dining with kids and family",
      link: "/search?type=family-friendly",
      icon: Users,
      color: "from-green-600 to-emerald-600"
    },
    {
      name: "Romantic",
      description: "Intimate settings perfect for date nights and special occasions",
      link: "/search?type=romantic",
      icon: Heart,
      color: "from-rose-600 to-pink-600"
    },
    {
      name: "Buffet",
      description: "All-you-can-eat spreads with diverse cuisines and unlimited options",
      link: "/search?type=buffet",
      icon: Utensils,
      color: "from-teal-600 to-green-600"
    },
    {
      name: "Street Food",
      description: "Authentic local flavors and traditional recipes at affordable prices",
      link: "/search?type=street-food",
      icon: Utensils,
      color: "from-yellow-600 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Explore Dining Types
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the perfect dining experience for every occasion. From romantic dinners to family gatherings, find exactly what you're looking for.
            </p>
          </div>

          {/* Dining Types Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diningTypes.map((type) => {
              const Icon = type.icon;
              return (
                <Link 
                  key={type.name}
                  to={type.link}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-48 overflow-hidden">
                    {diningImages[type.name] ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url(${diningImages[type.name]})` }}
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${type.color}`} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white mb-2">
                        <Icon className="h-6 w-6 mr-2" />
                        <h3 className="text-xl font-bold">{type.name}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3">{type.description}</p>
                    <span className="text-orange-500 font-semibold text-sm group-hover:text-orange-600 transition-colors">
                      View Restaurants →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Can't decide?</h2>
            <p className="text-lg mb-6 opacity-90">
              Browse all restaurants and filter by your preferences
            </p>
            <Link 
              to="/search"
              className="inline-block bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore All Restaurants
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DiningTypes;
