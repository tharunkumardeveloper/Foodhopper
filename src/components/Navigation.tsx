
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, Search, User, Home, Utensils, Phone, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Restaurants Nearby", path: "/search?nearby=true", icon: MapPin },
    { name: "Dine Types", path: "/dining-types", icon: Utensils },
    { name: "Search", path: "/search", icon: Search },
    { name: "Owner Login", path: "/owner-login", icon: User },
    { name: "User Dashboard", path: "/dashboard", icon: User },
    { name: "Contact Us", path: "/contact", icon: Phone },
    { name: "Help", path: "/help", icon: HelpCircle }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path.split('?')[0])) return true;
    return false;
  };

  return (
    <nav className="bg-white shadow-lg fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-500">
            FoodHopper
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "bg-orange-100 text-orange-600"
                      : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-1" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.path)
                        ? "bg-orange-100 text-orange-600"
                        : "text-gray-600 hover:text-orange-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
