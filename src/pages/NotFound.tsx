import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, MapPin, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "../components/Navigation";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="text-center px-4">
          {/* Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <span className="text-9xl font-bold text-orange-500">4</span>
              <div className="inline-block mx-2">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                  <Utensils className="w-10 h-10 text-orange-500" />
                </div>
              </div>
              <span className="text-9xl font-bold text-orange-500">4</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Oops! This page seems to be off the menu
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to discovering great restaurants!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                <Home className="w-5 h-5 mr-2" />
                Go to Homepage
              </Button>
            </Link>
            <Link to="/search">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Search Restaurants
              </Button>
            </Link>
          </div>
          
          {/* Quick Links */}
          <div className="border-t pt-8">
            <p className="text-gray-600 mb-4">Or explore these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/dining-types" className="text-orange-500 hover:text-orange-600 flex items-center">
                <Utensils className="w-4 h-4 mr-1" />
                Dining Types
              </Link>
              <Link to="/city/Chennai" className="text-orange-500 hover:text-orange-600 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                Restaurants in Chennai
              </Link>
              <Link to="/help" className="text-orange-500 hover:text-orange-600">
                Help Center
              </Link>
              <Link to="/contact" className="text-orange-500 hover:text-orange-600">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
